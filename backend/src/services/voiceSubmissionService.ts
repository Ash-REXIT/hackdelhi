import fs from 'fs';
import path from 'path';
import { prisma } from '../lib/prisma';
import { config } from '../lib/config';
import { computeFileHash, processTimesheet } from './workflowService';
import { logAudit } from './auditService';

function defaultPayrollPeriod(): string {
  const now = new Date();
  return now.toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

export function buildVoiceTimesheetText(params: {
  userEmail: string;
  clientName: string;
  clientCode: string;
  transcript: string;
  payrollPeriod?: string;
}): string {
  const period = params.payrollPeriod?.trim() || defaultPayrollPeriod();
  return `From: ${params.userEmail}
To: invoicing@tasc.com
Subject: Voice timesheet submission — ${params.clientName}
Source: Portal Voice Upload

Client: ${params.clientName} (${params.clientCode})
Period: ${period}

${params.transcript.trim()}

Please generate invoices accordingly.`;
}

export async function submitVoiceTimesheet(params: {
  clientId: string;
  userId: string;
  userEmail: string;
  transcript: string;
  payrollPeriod?: string;
}) {
  const client = await prisma.client.findUnique({ where: { id: params.clientId } });
  if (!client) throw new Error('Client not found');

  const content = buildVoiceTimesheetText({
    userEmail: params.userEmail,
    clientName: client.name,
    clientCode: client.clientCode,
    transcript: params.transcript,
    payrollPeriod: params.payrollPeriod,
  });

  if (!fs.existsSync(config.uploadDir)) {
    fs.mkdirSync(config.uploadDir, { recursive: true });
  }

  const fileName = `voice-submission-${Date.now()}.txt`;
  const filePath = path.join(config.uploadDir, fileName);
  fs.writeFileSync(filePath, content, 'utf-8');

  const fileHash = await computeFileHash(filePath);
  const fileSize = Buffer.byteLength(content, 'utf-8');

  const timesheet = await prisma.timesheet.create({
    data: {
      clientId: params.clientId,
      status: 'UPLOADED',
      payrollPeriod: params.payrollPeriod?.trim() || defaultPayrollPeriod(),
      documents: {
        create: {
          fileName,
          filePath,
          fileType: 'txt',
          mimeType: 'text/plain',
          fileSize,
          fileHash,
          source: 'Portal Voice Upload',
        },
      },
    },
    include: { documents: true, client: true },
  });

  await logAudit('TIMESHEET_UPLOADED', 'timesheet', timesheet.id, params.userId, {
    source: 'Portal Voice Upload',
  });

  processTimesheet(timesheet.id).catch((err) =>
    console.error(`Background processing failed for ${timesheet.id}:`, err)
  );

  return timesheet;
}
