import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { routeParams } from '../lib/request';
import { authenticate, authorize } from '../middleware/auth';
import {
  getClientTemplateInfo,
  renderClientTemplatePreview,
} from '../services/invoiceService';

const router = Router();

router.get('/code/:clientCode/invoice-template/preview', authenticate, async (req, res, next) => {
  try {
    const client = await prisma.client.findUnique({
      where: { clientCode: routeParams(req).clientCode },
    });
    if (!client) return res.status(404).json({ success: false, error: 'Client not found' });
    const pdf = await renderClientTemplatePreview(client.id);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="template-preview.pdf"');
    res.send(pdf);
  } catch (err) {
    next(err);
  }
});

router.get('/', authenticate, async (req, res, next) => {
  try {
    const clients = await prisma.client.findMany({
      include: {
        _count: { select: { employees: true, timesheets: true, invoices: true } },
      },
      orderBy: { clientCode: 'asc' },
    });

    const clientIds = clients.map((c) => c.id);

    const [pendingGroups, revenueGroups] = await Promise.all([
      prisma.timesheet.groupBy({
        by: ['clientId'],
        where: {
          clientId: { in: clientIds },
          status: { in: ['PENDING_REVIEW', 'EXCEPTION', 'PENDING_CLIENT_APPROVAL'] },
        },
        _count: { _all: true },
      }),
      prisma.invoice.groupBy({
        by: ['clientId'],
        where: {
          clientId: { in: clientIds },
          status: { notIn: ['CANCELLED', 'DRAFT'] },
        },
        _sum: { grandTotal: true },
      }),
    ]);

    const pendingByClient = Object.fromEntries(
      pendingGroups.map((g) => [g.clientId, g._count._all])
    );
    const revenueByClient = Object.fromEntries(
      revenueGroups.map((g) => [g.clientId, Number(g._sum.grandTotal || 0)])
    );

    const data = clients.map((c) => ({
      ...c,
      pendingReviews: pendingByClient[c.id] || 0,
      revenueYtd: revenueByClient[c.id] || 0,
    }));

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

router.get('/:id/invoice-template', authenticate, async (req, res, next) => {
  try {
    const info = await getClientTemplateInfo(routeParams(req).id);
    res.json({ success: true, data: info });
  } catch (err) {
    next(err);
  }
});

router.get('/:id/invoice-template/preview', authenticate, async (req, res, next) => {
  try {
    const pdf = await renderClientTemplatePreview(routeParams(req).id);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="template-preview.pdf"');
    res.send(pdf);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const client = await prisma.client.findUnique({
      where: { id: routeParams(req).id },
      include: {
        employees: true,
        invoices: { take: 10, orderBy: { createdAt: 'desc' } },
        validationRules: true,
        invoiceRules: true,
      },
    });
    if (!client) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: client });
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', authenticate, authorize('FINOPS'), async (req, res, next) => {
  try {
    const { name, email, currency, taxRate, isActive } = req.body;
    const client = await prisma.client.update({
      where: { id: routeParams(req).id },
      data: { name, email, currency, taxRate, isActive },
    });
    res.json({ success: true, data: client });
  } catch (err) {
    next(err);
  }
});

export default router;
