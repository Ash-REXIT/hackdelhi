import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { routeParams } from '../lib/request';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, authorize('FINOPS'), async (_req, res, next) => {
  try {
    const rules = await prisma.validationRule.findMany({
      include: { client: { select: { name: true, clientCode: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: rules });
  } catch (err) {
    next(err);
  }
});

router.post('/', authenticate, authorize('FINOPS'), async (req, res, next) => {
  try {
    const rule = await prisma.validationRule.create({ data: req.body });
    res.status(201).json({ success: true, data: rule });
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', authenticate, authorize('FINOPS'), async (req, res, next) => {
  try {
    const rule = await prisma.validationRule.update({
      where: { id: routeParams(req).id },
      data: req.body,
    });
    res.json({ success: true, data: rule });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authenticate, authorize('FINOPS'), async (req, res, next) => {
  try {
    await prisma.validationRule.delete({ where: { id: routeParams(req).id } });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
