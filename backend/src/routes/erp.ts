import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { getErpQueueData } from '../services/erpService';

const router = Router();

router.get('/queue', authenticate, async (_req, res, next) => {
  try {
    const data = await getErpQueueData();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

export default router;
