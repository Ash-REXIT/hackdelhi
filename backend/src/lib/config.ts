import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL!,
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-me',
  sessionSecret: process.env.SESSION_SECRET || 'dev-session-secret',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  uploadDir: process.env.UPLOAD_DIR || path.resolve(__dirname, '../../uploads'),
  generatedDir: process.env.GENERATED_DIR || path.resolve(__dirname, '../../generated'),
  aiServiceUrl: process.env.AI_SERVICE_URL || 'http://localhost:8000',
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackUrl: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/api/auth/google/callback',
  },
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || 'FlowInvoice AI <noreply@flowinvoice.local>',
  },
  seedExcelPath: process.env.SEED_EXCEL_PATH || path.resolve(__dirname, '../../data/TASC_Sample_Database.xlsx'),
  autoInvoiceConfidenceThreshold: parseFloat(process.env.AUTO_INVOICE_CONFIDENCE_THRESHOLD || '95'),
};
