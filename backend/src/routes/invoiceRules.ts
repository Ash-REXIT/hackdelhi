import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { routeParams } from '../lib/request';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, authorize('FINOPS'), async (_req, res, next) => {
  try {
    const rules = await prisma.invoiceRule.findMany({
      include: { client: { select: { name: true, clientCode: true } } },
      orderBy: [{ priority: 'asc' }, { createdAt: 'desc' }],
    });
    res.json({ success: true, data: rules });
  } catch (err) {
    next(err);
  }
});

router.post('/', authenticate, authorize('FINOPS'), async (req, res, next) => {
  try {
    const rule = await prisma.invoiceRule.create({ data: req.body });
    res.status(201).json({ success: true, data: rule });
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', authenticate, authorize('FINOPS'), async (req, res, next) => {
  try {
    const rule = await prisma.invoiceRule.update({
      where: { id: routeParams(req).id },
      data: req.body,
    });
    res.json({ success: true, data: rule });
  } catch (err) {
    next(err);
  }
});

export default router;
