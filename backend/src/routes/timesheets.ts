import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { prisma } from '../lib/prisma';
import { config } from '../lib/config';
import { authenticate, authorize } from '../middleware/auth';
import { processTimesheet, computeFileHash, approveTimesheetReview, rejectTimesheetReview } from '../services/workflowService';
import { explainFlag } from '../services/aiClient';
import { logAudit } from '../services/auditService';
import { routeParams } from '../lib/request';

const router = Router();

if (!fs.existsSync(config.uploadDir)) {
  fs.mkdirSync(config.uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, config.uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.random().toString(36).slice(2)}${path.extname(file.originalname)}`;
    cb(null, unique);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = [
      'application/pdf',
      'text/plain',
      'message/rfc822',
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ];
    if (allowed.includes(file.mimetype) || file.originalname.match(/\.(pdf|xlsx|xls|txt|eml|jpg|jpeg|png|webp)$/i)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'));
    }
  },
});

router.post('/upload', authenticate, upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, error: 'No file uploaded' });

    const clientId = req.tiaUser!.role === 'CLIENT' ? req.tiaUser!.clientId : req.body.clientId;
    if (!clientId) return res.status(400).json({ success: false, error: 'Client ID required' });

    const fileHash = await computeFileHash(req.file.path);
    const ext = path.extname(req.file.originalname).toLowerCase();

    const timesheet = await prisma.timesheet.create({
      data: {
        clientId,
        status: 'UPLOADED',
        documents: {
          create: {
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: ext.replace('.', '') || 'unknown',
            mimeType: req.file.mimetype,
            fileSize: req.file.size,
            fileHash,
            source: req.body.source || 'upload',
          },
        },
      },
      include: { documents: true, client: true },
    });

    await logAudit('TIMESHEET_UPLOADED', 'timesheet', timesheet.id, req.tiaUser!.id);

    processTimesheet(timesheet.id).catch((err) =>
      console.error(`Background processing failed for ${timesheet.id}:`, err)
    );

    res.status(201).json({ success: true, data: timesheet });
  } catch (err) {
    next(err);
  }
});

router.get('/', authenticate, async (req, res, next) => {
  try {
    const { status, clientId, queue } = req.query;
    const where: Record<string, unknown> = {};

    if (req.tiaUser!.role === 'CLIENT' && req.tiaUser!.clientId) {
      where.clientId = req.tiaUser!.clientId;
    } else if (clientId) {
      where.clientId = clientId;
    }

    if (status) where.status = status;

    if (queue === 'processing') {
      where.status = { in: ['OCR_PROCESSING', 'EXTRACTING', 'MATCHING', 'VALIDATING', 'FRAUD_CHECKING'] };
    } else if (queue === 'exceptions') {
      where.status = { in: ['EXCEPTION', 'PENDING_REVIEW'] };
    } else if (queue === 'review') {
      where.status = { in: ['PENDING_REVIEW', 'EXCEPTION'] };
    } else if (queue === 'completed') {
      where.status = { in: ['INVOICE_GENERATED', 'DISPATCHED', 'PAID', 'FINANCE_APPROVED'] };
    }

    const timesheets = await prisma.timesheet.findMany({
      where,
      include: {
        client: { select: { id: true, name: true, clientCode: true } },
        employee: { select: { id: true, name: true, employeeId: true } },
        documents: { select: { id: true, fileName: true, fileType: true, ocrConfidence: true, ocrText: true } },
        invoices: { select: { id: true, invoiceNumber: true, status: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    res.json({ success: true, data: timesheets });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const timesheet = await prisma.timesheet.findUnique({
      where: { id: routeParams(req).id },
      include: {
        client: true,
        employee: true,
        documents: true,
        entries: true,
        fraudLogs: true,
        invoices: { include: { timeline: { orderBy: { createdAt: 'asc' } } } },
      },
    });

    if (!timesheet) return res.status(404).json({ success: false, error: 'Not found' });
    if (req.tiaUser!.role === 'CLIENT' && timesheet.clientId !== req.tiaUser!.clientId) {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    res.json({ success: true, data: timesheet });
  } catch (err) {
    next(err);
  }
});

router.patch('/:id/review', authenticate, authorize('FINOPS'), async (req, res, next) => {
  try {
    const { action, reason, extractedData } = req.body;

    if (extractedData) {
      await prisma.timesheet.update({
        where: { id: routeParams(req).id },
        data: { extractedData },
      });
    }

    if (action === 'approve') {
      const invoice = await approveTimesheetReview(routeParams(req).id, req.tiaUser!.id);
      await logAudit('TIMESHEET_REVIEW_APPROVED', 'timesheet', routeParams(req).id, req.tiaUser!.id);
      return res.json({ success: true, data: invoice });
    }

    if (action === 'reject') {
      const result = await rejectTimesheetReview(routeParams(req).id, req.tiaUser!.id, reason || 'Rejected');
      await logAudit('TIMESHEET_REVIEW_REJECTED', 'timesheet', routeParams(req).id, req.tiaUser!.id);
      return res.json({ success: true, data: result });
    }

    res.status(400).json({ success: false, error: 'Invalid action' });
  } catch (err) {
    next(err);
  }
});

router.post('/:id/reprocess', authenticate, authorize('FINOPS'), async (req, res, next) => {
  try {
    processTimesheet(routeParams(req).id).catch(console.error);
    res.json({ success: true, message: 'Reprocessing started' });
  } catch (err) {
    next(err);
  }
});

router.post('/:id/explain', authenticate, async (req, res, next) => {
  try {
    const timesheet = await prisma.timesheet.findUnique({ where: { id: routeParams(req).id } });
    if (!timesheet) return res.status(404).json({ success: false, error: 'Not found' });

    const explanation = await explainFlag(req.body.ruleKey, {
      timesheet,
      validationResults: timesheet.validationResults,
      fraudReasons: timesheet.fraudReasons,
    });

    res.json({ success: true, data: explanation });
  } catch (err) {
    next(err);
  }
});

router.get('/:id/document/:docId', authenticate, async (req, res, next) => {
  try {
    const doc = await prisma.timesheetDocument.findFirst({
      where: { id: routeParams(req).docId, timesheetId: routeParams(req).id },
      include: { timesheet: true },
    });
    if (!doc) return res.status(404).json({ success: false, error: 'Document not found' });
    if (req.tiaUser!.role === 'CLIENT' && doc.timesheet.clientId !== req.tiaUser!.clientId) {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    const ext = (doc.fileType || path.extname(doc.fileName)).replace('.', '').toLowerCase();
    const mimeTypes: Record<string, string> = {
      txt: 'text/plain; charset=utf-8',
      eml: 'message/rfc822',
      pdf: 'application/pdf',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      xls: 'application/vnd.ms-excel',
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
    };
    if (mimeTypes[ext]) {
      res.type(mimeTypes[ext]);
    }

    res.sendFile(path.resolve(doc.filePath));
  } catch (err) {
    next(err);
  }
});

export default router;
