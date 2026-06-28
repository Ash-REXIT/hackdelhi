import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import fs from 'fs';
import path from 'path';
import { config } from './lib/config';
import { errorHandler } from './middleware/errorHandler';

import authRoutes from './routes/auth';
import timesheetRoutes from './routes/timesheets';
import invoiceRoutes from './routes/invoices';
import clientRoutes from './routes/clients';
import employeeRoutes from './routes/employees';
import validationRuleRoutes from './routes/validationRules';
import invoiceRuleRoutes from './routes/invoiceRules';
import chatRoutes from './routes/chat';
import queryRoutes from './routes/queries';
import analyticsRoutes from './routes/analytics';
import erpRoutes from './routes/erp';
import { ensureDispatchDemoInvoices } from './services/dispatchDemoService';

const app = express();

[config.uploadDir, config.generatedDir].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(passport.initialize());

app.get('/api/health', (_req, res) => {
  res.json({ success: true, service: 'tia-backend', status: 'healthy' });
});

app.use('/api/auth', authRoutes);
app.use('/api/timesheets', timesheetRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/validation-rules', validationRuleRoutes);
app.use('/api/invoice-rules', invoiceRuleRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/erp', erpRoutes);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`FlowInvoice AI backend running on http://localhost:${config.port}`);
  ensureDispatchDemoInvoices()
    .then((n) => {
      if (n > 0) console.log(`Created ${n} dispatch demo invoice(s) for CL001–CL004`);
    })
    .catch((err) => console.warn('Dispatch demo seed skipped:', err.message));
});

export default app;
