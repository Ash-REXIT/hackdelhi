import fs from 'fs/promises';
import path from 'path';
import QRCode from 'qrcode';
import { prisma } from '../lib/prisma';
import { config } from '../lib/config';
import { addTimelineEvent } from './timelineService';
import {
  buildPreviewInvoiceData,
  getTemplateMeta,
  renderInvoicePdfBytes,
  resolveClientTemplate,
  type InvoicePdfInput,
  type InvoiceTemplateId,
} from './invoiceTemplateService';

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

function generateInvoiceNumber(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const rand = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `FIA-${y}${m}-${rand}`;
}

function toPdfInput(
  invoice: {
    invoiceNumber: string;
    subtotal: { toString(): string };
    taxAmount: { toString(): string };
    grandTotal: { toString(): string };
    currency: string;
    payrollPeriod: string | null;
    client: {
      name: string;
      clientCode: string;
      address: string | null;
      email: string | null;
      city?: string | null;
      industry?: string | null;
    };
    items: Array<{
      description: string;
      quantity: { toString(): string };
      unitPrice: { toString(): string };
      amount: { toString(): string };
    }>;
  }
): InvoicePdfInput {
  return {
    invoiceNumber: invoice.invoiceNumber,
    subtotal: Number(invoice.subtotal),
    taxAmount: Number(invoice.taxAmount),
    grandTotal: Number(invoice.grandTotal),
    currency: invoice.currency,
    payrollPeriod: invoice.payrollPeriod,
    client: {
      name: invoice.client.name,
      clientCode: invoice.client.clientCode,
      address: invoice.client.address,
      email: invoice.client.email,
      city: invoice.client.city,
      industry: invoice.client.industry,
    },
    items: invoice.items.map((item) => ({
      description: item.description,
      quantity: Number(item.quantity),
      unitPrice: Number(item.unitPrice),
      amount: Number(item.amount),
    })),
  };
}

export async function renderClientTemplatePreview(clientId: string): Promise<Buffer> {
  const client = await prisma.client.findUnique({ where: { id: clientId } });
  if (!client) throw new Error('Client not found');

  const templateId = resolveClientTemplate(client.clientCode);
  const input = buildPreviewInvoiceData(client);
  const bytes = await renderInvoicePdfBytes(input, templateId);
  return Buffer.from(bytes);
}

export async function getClientTemplateInfo(clientId: string) {
  const client = await prisma.client.findUnique({ where: { id: clientId } });
  if (!client) throw new Error('Client not found');
  const templateId = resolveClientTemplate(client.clientCode);
  return {
    clientId: client.id,
    clientCode: client.clientCode,
    clientName: client.name,
    template: getTemplateMeta(templateId),
  };
}

export async function generateInvoice(timesheetId: string) {
  const timesheet = await prisma.timesheet.findUnique({
    where: { id: timesheetId },
    include: {
      client: true,
      employee: true,
      entries: true,
    },
  });

  if (!timesheet) throw new Error('Timesheet not found');

  const extracted = timesheet.extractedData as Record<string, unknown> | null;
  const workingDays = timesheet.workingDays || Number(extracted?.workingDays) || 0;
  const overtime = Number(timesheet.overtime || extracted?.overtime || 0);
  const reimbursements = Number(timesheet.reimbursements || extracted?.reimbursements || 0);

  const payroll = timesheet.employeeId
    ? await prisma.payroll.findFirst({
        where: {
          employeeId: timesheet.employeeId,
          period: timesheet.payrollPeriod || 'June2026',
        },
      })
    : null;

  const payrollWorkingDays = payroll?.workingDays || 22;
  const dailyRate = payroll?.netPay
    ? Number(payroll.netPay) / payrollWorkingDays
    : payroll?.gross
      ? Number(payroll.gross) / payrollWorkingDays
      : Number(timesheet.employee?.totalCtc || 0) / payrollWorkingDays || 500;

  const regularAmount = workingDays * dailyRate;
  const overtimeAmount =
    overtime > 0 ? overtime * (dailyRate / 8) * 1.5 : Number(payroll?.overtimeAmount || 0);
  const subtotal = regularAmount + overtimeAmount + reimbursements;
  const taxRate = Number(timesheet.client.taxRate);
  const taxAmount = subtotal * (taxRate / 100);
  const grandTotal = subtotal + taxAmount;

  const invoiceNumber = generateInvoiceNumber();
  const templateId = resolveClientTemplate(timesheet.client.clientCode);
  const items = [
    {
      description: `Monthly timesheet - ${timesheet.employee?.name || 'Employee'} (${workingDays} days @ ${timesheet.client.currency} ${dailyRate.toFixed(2)}/day)`,
      quantity: workingDays,
      unitPrice: dailyRate,
      amount: regularAmount,
      employeeId: timesheet.employeeId,
    },
  ];

  if (overtimeAmount > 0) {
    items.push({
      description: 'Overtime',
      quantity: 1,
      unitPrice: overtimeAmount,
      amount: overtimeAmount,
      employeeId: timesheet.employeeId,
    });
  }

  if (reimbursements > 0) {
    items.push({
      description: 'Reimbursements',
      quantity: 1,
      unitPrice: reimbursements,
      amount: reimbursements,
      employeeId: timesheet.employeeId,
    });
  }

  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber,
      clientId: timesheet.clientId,
      timesheetId,
      status: 'FINANCE_APPROVED',
      subtotal,
      taxAmount,
      discountAmount: 0,
      grandTotal,
      currency: timesheet.client.currency,
      payrollPeriod: timesheet.payrollPeriod,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      items: { create: items },
    },
    include: { items: true, client: true },
  });

  const qrData = JSON.stringify({
    invoiceNumber,
    client: timesheet.client.name,
    template: templateId,
    total: grandTotal,
    currency: timesheet.client.currency,
    date: new Date().toISOString(),
  });

  const qrCodeDataUrl = await QRCode.toDataURL(qrData);
  const pdfPath = await saveInvoicePdf(invoice, templateId, qrCodeDataUrl);

  await prisma.invoice.update({
    where: { id: invoice.id },
    data: { pdfPath, qrCode: qrData },
  });

  await addTimelineEvent(invoice.id, 'UPLOADED', 'Timesheet uploaded');
  await addTimelineEvent(invoice.id, 'OCR_COMPLETED', 'Document processed');
  await addTimelineEvent(invoice.id, 'VALIDATED', 'Validation passed');
  await addTimelineEvent(
    invoice.id,
    'INVOICE_GENERATED',
    `Invoice ${invoiceNumber} generated (${getTemplateMeta(templateId).label} template)`
  );
  await addTimelineEvent(invoice.id, 'APPROVED', 'Processing completed — ready for dispatch');

  return prisma.invoice.findUnique({
    where: { id: invoice.id },
    include: { items: true, client: true, timeline: { orderBy: { createdAt: 'asc' } } },
  });
}

async function saveInvoicePdf(
  invoice: {
    invoiceNumber: string;
    subtotal: { toString(): string };
    taxAmount: { toString(): string };
    grandTotal: { toString(): string };
    currency: string;
    payrollPeriod: string | null;
    client: {
      name: string;
      clientCode: string;
      address: string | null;
      email: string | null;
      city?: string | null;
      industry?: string | null;
    };
    items: Array<{
      description: string;
      quantity: { toString(): string };
      unitPrice: { toString(): string };
      amount: { toString(): string };
    }>;
  },
  templateId: InvoiceTemplateId,
  qrCodeDataUrl: string
): Promise<string> {
  await ensureDir(config.generatedDir);
  const input = toPdfInput(invoice);
  const pdfBytes = await renderInvoicePdfBytes(input, templateId, qrCodeDataUrl);
  const filePath = path.join(config.generatedDir, `${invoice.invoiceNumber}.pdf`);
  await fs.writeFile(filePath, pdfBytes);
  return filePath;
}

/** Regenerate PDF for an existing invoice using the client's current template. */
export async function regenerateInvoicePdf(invoiceId: string): Promise<string> {
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: { items: true, client: true },
  });
  if (!invoice) throw new Error('Invoice not found');

  const templateId = resolveClientTemplate(invoice.client.clientCode);
  const qrData =
    invoice.qrCode ||
    JSON.stringify({
      invoiceNumber: invoice.invoiceNumber,
      client: invoice.client.name,
      template: templateId,
      total: Number(invoice.grandTotal),
    });
  const qrCodeDataUrl = await QRCode.toDataURL(qrData);
  return saveInvoicePdf(invoice, templateId, qrCodeDataUrl);
}
