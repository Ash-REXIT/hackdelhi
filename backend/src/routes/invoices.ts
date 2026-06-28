import { Router } from 'express';
import path from 'path';
import { prisma } from '../lib/prisma';
import { authenticate, authorize } from '../middleware/auth';
import { dispatchInvoice } from '../services/emailService';
import { addTimelineEvent } from '../services/timelineService';
import { logAudit } from '../services/auditService';
import { routeParams } from '../lib/request';
import { regenerateInvoicePdf } from '../services/invoiceService';
import { getTemplateMeta, resolveClientTemplate } from '../services/invoiceTemplateService';

const router = Router();

router.get('/', authenticate, async (req, res, next) => {
  try {
    const { status, clientId, queue } = req.query;
    const where: Record<string, unknown> = {};

    if (req.tiaUser!.role === 'CLIENT' && req.tiaUser!.clientId) {
      where.clientId = req.tiaUser!.clientId;
      if (!status && !queue) {
        where.status = { in: ['DISPATCHED', 'DELIVERED', 'PAID', 'CLIENT_APPROVED'] };
      }
    } else if (clientId) {
      where.clientId = clientId;
    }

    if (status) where.status = status;

    if (queue === 'ready') {
      where.status = { in: ['PENDING_FINANCE_APPROVAL', 'FINANCE_APPROVED'] };
      // Normalize legacy invoices stuck in PENDING_FINANCE_APPROVAL
      await prisma.invoice.updateMany({
        where: { status: 'PENDING_FINANCE_APPROVAL' },
        data: { status: 'FINANCE_APPROVED' },
      });
    } else if (queue === 'dispatched') {
      where.status = { in: ['DISPATCHED', 'DELIVERED', 'PAID'] };
    } else if (queue === 'portal') {
      where.status = { in: ['DISPATCHED', 'DELIVERED'] };
    }

    const invoices = await prisma.invoice.findMany({
      where,
      include: {
        client: { select: { id: true, name: true, clientCode: true, email: true, industry: true } },
        timesheet: {
          select: {
            id: true,
            status: true,
            documents: { select: { fileName: true } },
            employee: { select: { name: true, employeeId: true } },
          },
        },
        items: true,
        timeline: { orderBy: { createdAt: 'asc' }, take: 15 },
        dispatchLogs: { orderBy: { createdAt: 'desc' }, take: 3 },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    res.json({ success: true, data: invoices });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: routeParams(req).id },
      include: {
        client: true,
        items: true,
        timeline: { orderBy: { createdAt: 'asc' } },
        dispatchLogs: true,
        timesheet: { include: { documents: true, employee: true } },
      },
    });

    if (!invoice) return res.status(404).json({ success: false, error: 'Not found' });
    if (req.tiaUser!.role === 'CLIENT' && invoice.clientId !== req.tiaUser!.clientId) {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    res.json({ success: true, data: invoice });
  } catch (err) {
    next(err);
  }
});

router.get('/:id/pdf', authenticate, async (req, res, next) => {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: routeParams(req).id },
      include: { client: true },
    });
    if (!invoice) return res.status(404).json({ success: false, error: 'Not found' });
    if (req.tiaUser!.role === 'CLIENT' && invoice.clientId !== req.tiaUser!.clientId) {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    let pdfPath = invoice.pdfPath;
    if (!pdfPath) {
      pdfPath = await regenerateInvoicePdf(invoice.id);
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${invoice.invoiceNumber}.pdf"`);
    res.sendFile(path.resolve(pdfPath));
  } catch (err) {
    next(err);
  }
});

router.get('/:id/template', authenticate, async (req, res, next) => {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: routeParams(req).id },
      include: { client: true },
    });
    if (!invoice) return res.status(404).json({ success: false, error: 'Not found' });
    const templateId = resolveClientTemplate(invoice.client.clientCode);
    res.json({
      success: true,
      data: {
        template: getTemplateMeta(templateId),
        clientCode: invoice.client.clientCode,
        clientName: invoice.client.name,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.post('/:id/client-action', authenticate, authorize('CLIENT'), async (req, res, next) => {
  try {
    const { action, notes } = req.body;
    const invoice = await prisma.invoice.findUnique({ where: { id: routeParams(req).id } });
    if (!invoice || invoice.clientId !== req.tiaUser!.clientId) {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    const status = action === 'approve' ? 'CLIENT_APPROVED' : 'CLIENT_REJECTED';
    const updated = await prisma.invoice.update({
      where: { id: routeParams(req).id },
      data: { status, financeNotes: notes },
    });

    await addTimelineEvent(routeParams(req).id, 'APPROVED', `Client ${action}d invoice`);
    await logAudit(`INVOICE_CLIENT_${action.toUpperCase()}`, 'invoice', routeParams(req).id, req.tiaUser!.id);

    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
});

router.post('/:id/finance-action', authenticate, authorize('FINANCE', 'FINOPS'), async (req, res, next) => {
  try {
    const { action, notes, modifications } = req.body;
    const invoice = await prisma.invoice.findUnique({
      where: { id: routeParams(req).id },
      include: { items: true },
    });
    if (!invoice) return res.status(404).json({ success: false, error: 'Not found' });

    if (action === 'approve') {
      const updated = await prisma.invoice.update({
        where: { id: routeParams(req).id },
        data: {
          status: 'FINANCE_APPROVED',
          approvedBy: req.tiaUser!.id,
          approvedAt: new Date(),
          financeNotes: notes,
        },
      });
      await addTimelineEvent(routeParams(req).id, 'APPROVED', 'Finance approved invoice');
      await logAudit('INVOICE_FINANCE_APPROVED', 'invoice', routeParams(req).id, req.tiaUser!.id);
      return res.json({ success: true, data: updated });
    }

    if (action === 'reject') {
      const updated = await prisma.invoice.update({
        where: { id: routeParams(req).id },
        data: { status: 'FINANCE_REJECTED', financeNotes: notes },
      });
      await logAudit('INVOICE_FINANCE_REJECTED', 'invoice', routeParams(req).id, req.tiaUser!.id);
      return res.json({ success: true, data: updated });
    }

    if (action === 'modify' && modifications) {
      const updated = await prisma.invoice.update({
        where: { id: routeParams(req).id },
        data: {
          status: 'MODIFIED',
          subtotal: modifications.subtotal ?? invoice.subtotal,
          taxAmount: modifications.taxAmount ?? invoice.taxAmount,
          grandTotal: modifications.grandTotal ?? invoice.grandTotal,
          financeNotes: notes,
        },
      });
      await logAudit('INVOICE_MODIFIED', 'invoice', routeParams(req).id, req.tiaUser!.id, modifications);
      return res.json({ success: true, data: updated });
    }

    res.status(400).json({ success: false, error: 'Invalid action' });
  } catch (err) {
    next(err);
  }
});

router.post('/:id/dispatch', authenticate, authorize('FINOPS', 'FINANCE'), async (req, res, next) => {
  try {
    const log = await dispatchInvoice(routeParams(req).id);
    await logAudit('INVOICE_DISPATCHED', 'invoice', routeParams(req).id, req.tiaUser!.id);
    res.json({ success: true, data: log });
  } catch (err) {
    next(err);
  }
});

router.post('/:id/mark-paid', authenticate, authorize('FINANCE'), async (req, res, next) => {
  try {
    const updated = await prisma.invoice.update({
      where: { id: routeParams(req).id },
      data: { status: 'PAID', paidAt: new Date() },
    });
    await addTimelineEvent(routeParams(req).id, 'PAID', 'Payment received');
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
});

export default router;
