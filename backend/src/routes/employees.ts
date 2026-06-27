import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { routeParams } from '../lib/request';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, async (req, res, next) => {
  try {
    const { clientId, search } = req.query;
    const where: Record<string, unknown> = { isActive: true };

    if (clientId) where.clientId = clientId;
    if (search) {
      where.OR = [
        { name: { contains: String(search), mode: 'insensitive' } },
        { employeeId: { contains: String(search), mode: 'insensitive' } },
      ];
    }

    const employees = await prisma.employee.findMany({
      where,
      include: {
        client: { select: { name: true, clientCode: true } },
        payroll: { take: 1, orderBy: { createdAt: 'desc' } },
      },
      take: 50,
    });
    res.json({ success: true, data: employees });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: routeParams(req).id },
      include: { client: true, payroll: true, timesheets: { take: 5, orderBy: { createdAt: 'desc' } } },
    });
    if (!employee) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: employee });
  } catch (err) {
    next(err);
  }
});

export default router;
