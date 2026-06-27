import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { authenticate } from '../middleware/auth';
import { chatAssistant } from '../services/aiClient';

const router = Router();

router.post('/', authenticate, async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ success: false, error: 'Message required' });

    const history = await prisma.chatHistory.findMany({
      where: { userId: req.tiaUser!.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const { reply } = await chatAssistant(
      message,
      req.tiaUser!.id,
      req.tiaUser!.role,
      req.tiaUser!.clientId,
      history.reverse().map((h) => ({ role: h.role, content: h.content }))
    );

    await prisma.chatHistory.createMany({
      data: [
        { userId: req.tiaUser!.id, role: 'user', content: message },
        { userId: req.tiaUser!.id, role: 'assistant', content: reply },
      ],
    });

    res.json({ success: true, data: { reply } });
  } catch (err) {
    next(err);
  }
});

router.get('/history', authenticate, async (req, res, next) => {
  try {
    const history = await prisma.chatHistory.findMany({
      where: { userId: req.tiaUser!.id },
      orderBy: { createdAt: 'asc' },
      take: 50,
    });
    res.json({ success: true, data: history });
  } catch (err) {
    next(err);
  }
});

export default router;
