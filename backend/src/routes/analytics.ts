import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/dashboard', authenticate, async (req, res, next) => {
  try {
    const clientFilter =
      req.tiaUser!.role === 'CLIENT' && req.tiaUser!.clientId
        ? { clientId: req.tiaUser!.clientId }
        : {};

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalTimesheets,
      pendingProcessing,
      approvedInvoices,
      pendingPayments,
      todayUploads,
      processing,
      completed,
      exceptions,
      invoicesGenerated,
      revenueAgg,
      recentActivity,
    ] = await Promise.all([
      prisma.timesheet.count({ where: clientFilter }),
      prisma.timesheet.count({
        where: {
          ...clientFilter,
          status: { in: ['UPLOADED', 'OCR_PROCESSING', 'EXTRACTING', 'MATCHING', 'VALIDATING', 'FRAUD_CHECKING', 'PENDING_REVIEW'] },
        },
      }),
      prisma.invoice.count({
        where: { ...clientFilter, status: { in: ['CLIENT_APPROVED', 'FINANCE_APPROVED', 'DISPATCHED', 'DELIVERED', 'PAID'] } },
      }),
      prisma.invoice.count({
        where: { ...clientFilter, status: { in: ['DISPATCHED', 'DELIVERED'] } },
      }),
      prisma.timesheet.count({ where: { ...clientFilter, createdAt: { gte: today } } }),
      prisma.timesheet.count({
        where: {
          ...clientFilter,
          status: { in: ['OCR_PROCESSING', 'EXTRACTING', 'MATCHING', 'VALIDATING', 'FRAUD_CHECKING'] },
        },
      }),
      prisma.timesheet.count({
        where: { ...clientFilter, status: { in: ['INVOICE_GENERATED', 'DISPATCHED', 'PAID', 'FINANCE_APPROVED'] } },
      }),
      prisma.timesheet.count({
        where: { ...clientFilter, status: { in: ['EXCEPTION', 'PENDING_REVIEW'] } },
      }),
      prisma.invoice.count({ where: clientFilter }),
      prisma.invoice.aggregate({
        where: { ...clientFilter, status: { not: 'CANCELLED' } },
        _sum: { grandTotal: true },
      }),
      prisma.auditLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 20,
        include: { user: { select: { name: true, email: true } } },
      }),
    ]);

    const avgProcessing = await prisma.timesheet.aggregate({
      where: { ...clientFilter, processedAt: { not: null } },
      _avg: { overallConfidence: true },
    });

    res.json({
      success: true,
      data: {
        kpis: {
          submittedTimesheets: totalTimesheets,
          pendingProcessing,
          approvedInvoices,
          pendingPayments,
          todayUploads,
          processing,
          completed,
          exceptions,
          invoicesGenerated,
          averageConfidence: Number(avgProcessing._avg.overallConfidence || 0),
          revenue: Number(revenueAgg._sum.grandTotal || 0),
        },
        recentActivity,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.get('/revenue', authenticate, async (req, res, next) => {
  try {
    const clientFilter =
      req.tiaUser!.role === 'CLIENT' && req.tiaUser!.clientId
        ? { clientId: req.tiaUser!.clientId }
        : {};

    const invoices = await prisma.invoice.findMany({
      where: { ...clientFilter, status: { not: 'CANCELLED' } },
      select: {
        grandTotal: true,
        currency: true,
        createdAt: true,
        payrollPeriod: true,
        client: { select: { name: true, clientCode: true } },
        status: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const byClient: Record<string, { name: string; total: number; count: number }> = {};
    const byMonth: Record<string, number> = {};

    for (const inv of invoices) {
      const key = inv.client.clientCode;
      if (!byClient[key]) byClient[key] = { name: inv.client.name, total: 0, count: 0 };
      byClient[key].total += Number(inv.grandTotal);
      byClient[key].count++;

      const month = inv.createdAt.toISOString().slice(0, 7);
      byMonth[month] = (byMonth[month] || 0) + Number(inv.grandTotal);
    }

    res.json({
      success: true,
      data: {
        totalRevenue: invoices.reduce((s, i) => s + Number(i.grandTotal), 0),
        byClient: Object.entries(byClient).map(([code, v]) => ({ clientCode: code, ...v })),
        byMonth: Object.entries(byMonth).map(([month, total]) => ({ month, total })),
        invoices,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.get('/activity', authenticate, async (req, res, next) => {
  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: { user: { select: { name: true, email: true, role: true } } },
    });
    res.json({ success: true, data: logs });
  } catch (err) {
    next(err);
  }
});

export default router;
