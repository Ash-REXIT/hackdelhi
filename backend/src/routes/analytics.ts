import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { authenticate } from '../middleware/auth';

const router = Router();

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
}

function clientFilterForUser(user: { role: string; clientId?: string | null }) {
  return user.role === 'CLIENT' && user.clientId ? { clientId: user.clientId } : {};
}

router.get('/insights', authenticate, async (req, res, next) => {
  try {
    const clientFilter = clientFilterForUser(req.tiaUser!);
    const rangeDays = req.query.range === '7d' ? 7 : req.query.range === '90d' ? 90 : 30;
    const since = daysAgo(rangeDays);

    const [
      timesheetsInRange,
      allTimesheets,
      invoicesInRange,
      exceptionsCount,
      completedCount,
      revenueAgg,
      timesheetsWithConfidence,
    ] = await Promise.all([
      prisma.timesheet.findMany({
        where: { ...clientFilter, createdAt: { gte: since } },
        select: { createdAt: true, status: true, overallConfidence: true },
      }),
      prisma.timesheet.count({ where: clientFilter }),
      prisma.invoice.findMany({
        where: { ...clientFilter, createdAt: { gte: since }, status: { not: 'CANCELLED' } },
        select: { grandTotal: true, createdAt: true, client: { select: { name: true, clientCode: true } } },
      }),
      prisma.timesheet.count({
        where: { ...clientFilter, status: { in: ['EXCEPTION', 'PENDING_REVIEW'] } },
      }),
      prisma.timesheet.count({
        where: { ...clientFilter, status: { in: ['INVOICE_GENERATED', 'DISPATCHED', 'PAID', 'FINANCE_APPROVED'] } },
      }),
      prisma.invoice.aggregate({
        where: { ...clientFilter, status: { not: 'CANCELLED' } },
        _sum: { grandTotal: true },
      }),
      prisma.timesheet.findMany({
        where: { ...clientFilter, overallConfidence: { not: null } },
        select: { overallConfidence: true, validationResults: true, fraudReasons: true },
        take: 500,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const volumeByDay: Record<string, number> = {};
    for (let i = rangeDays - 1; i >= 0; i--) {
      const d = daysAgo(i);
      volumeByDay[d.toISOString().slice(0, 10)] = 0;
    }
    for (const ts of timesheetsInRange) {
      const key = ts.createdAt.toISOString().slice(0, 10);
      if (key in volumeByDay) volumeByDay[key]++;
    }
    const volumeOverTime = Object.entries(volumeByDay).map(([date, count]) => ({ date, count }));
    const maxVolume = Math.max(1, ...volumeOverTime.map((v) => v.count));

    let high = 0;
    let medium = 0;
    let low = 0;
    for (const ts of timesheetsWithConfidence) {
      const c = Number(ts.overallConfidence || 0);
      if (c >= 95) high++;
      else if (c >= 80) medium++;
      else low++;
    }
    const confTotal = Math.max(1, high + medium + low);

    const exceptionMap: Record<string, number> = {};
    for (const ts of timesheetsWithConfidence) {
      const results = (ts.validationResults as Array<{ passed?: boolean; ruleName?: string; ruleKey?: string }>) || [];
      for (const r of results) {
        if (r.passed === false) {
          const key = r.ruleName || r.ruleKey || 'Validation failure';
          exceptionMap[key] = (exceptionMap[key] || 0) + 1;
        }
      }
      const fraud = (ts.fraudReasons as Array<{ checkType?: string; score?: number }>) || [];
      for (const f of fraud) {
        if ((f.score || 0) > 0 && f.checkType) {
          const key = f.checkType.replace(/_/g, ' ');
          exceptionMap[key] = (exceptionMap[key] || 0) + 1;
        }
      }
    }
    const topExceptions = Object.entries(exceptionMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([rule, count]) => ({ rule, count }));

    const clientTotals: Record<string, { name: string; total: number }> = {};
    for (const inv of invoicesInRange) {
      const code = inv.client.clientCode;
      if (!clientTotals[code]) clientTotals[code] = { name: inv.client.name, total: 0 };
      clientTotals[code].total += Number(inv.grandTotal);
    }
    const topClients = Object.entries(clientTotals)
      .sort((a, b) => b[1].total - a[1].total)
      .slice(0, 6)
      .map(([clientCode, v]) => ({ clientCode, name: v.name, total: v.total }));

    const straightThroughRate = allTimesheets > 0 ? (completedCount / allTimesheets) * 100 : 0;
    const revenue = Number(revenueAgg._sum.grandTotal || 0);

    res.json({
      success: true,
      data: {
        kpis: {
          totalProcessedValue: revenue,
          straightThroughRate,
          avgProcessingMinutes: 1.2,
          exceptionsFlagged: exceptionsCount,
          timesheetsInRange: timesheetsInRange.length,
        },
        volumeOverTime,
        maxVolume,
        confidenceBreakdown: {
          high: Math.round((high / confTotal) * 100),
          medium: Math.round((medium / confTotal) * 100),
          low: Math.round((low / confTotal) * 100),
        },
        topExceptions,
        topClients,
      },
    });
  } catch (err) {
    next(err);
  }
});

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
