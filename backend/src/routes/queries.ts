import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { routeParams } from '../lib/request';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, async (req, res, next) => {
  try {
    const where: Record<string, unknown> = {};
    if (req.tiaUser!.role === 'CLIENT' && req.tiaUser!.clientId) {
      where.clientId = req.tiaUser!.clientId;
    }

    const queries = await prisma.clientQuery.findMany({
      where,
      include: {
        client: { select: { name: true } },
        user: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: queries });
  } catch (err) {
    next(err);
  }
});

router.post('/', authenticate, async (req, res, next) => {
  try {
    const { subject, message, invoiceId, timesheetId } = req.body;
    const clientId = req.tiaUser!.role === 'CLIENT' ? req.tiaUser!.clientId : req.body.clientId;
    if (!clientId) return res.status(400).json({ success: false, error: 'Client ID required' });

    const query = await prisma.clientQuery.create({
      data: {
        clientId,
        userId: req.tiaUser!.id,
        subject,
        message,
        invoiceId,
        timesheetId,
      },
    });
    res.status(201).json({ success: true, data: query });
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', authenticate, async (req, res, next) => {
  try {
    const { status, response } = req.body;
    const query = await prisma.clientQuery.update({
      where: { id: routeParams(req).id },
      data: { status, response },
    });
    res.json({ success: true, data: query });
  } catch (err) {
    next(err);
  }
});

export default router;
