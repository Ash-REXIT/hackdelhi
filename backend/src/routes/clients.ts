import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { routeParams } from '../lib/request';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, async (req, res, next) => {
  try {
    const clients = await prisma.client.findMany({
      include: {
        _count: { select: { employees: true, timesheets: true, invoices: true } },
      },
      orderBy: { name: 'asc' },
    });
    res.json({ success: true, data: clients });
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
