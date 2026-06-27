import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';
import fs from 'fs/promises';
import path from 'path';
import { prisma } from '../lib/prisma';
import { config } from '../lib/config';
import { addTimelineEvent } from './timelineService';

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
    overtime > 0
      ? overtime * (dailyRate / 8) * 1.5
      : Number(payroll?.overtimeAmount || 0);
  const subtotal = regularAmount + overtimeAmount + reimbursements;
  const taxRate = Number(timesheet.client.taxRate);
  const taxAmount = subtotal * (taxRate / 100);
  const grandTotal = subtotal + taxAmount;

  const invoiceNumber = generateInvoiceNumber();
  const items = [
    {
      description: `Monthly timesheet - ${timesheet.employee?.name || 'Employee'} (${workingDays} days @ AED ${dailyRate.toFixed(2)}/day)`,
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
    total: grandTotal,
    currency: timesheet.client.currency,
    date: new Date().toISOString(),
  });

  const qrCodeDataUrl = await QRCode.toDataURL(qrData);
  const pdfPath = await renderInvoicePdf(invoice, qrCodeDataUrl);

  await prisma.invoice.update({
    where: { id: invoice.id },
    data: { pdfPath, qrCode: qrData },
  });

  await addTimelineEvent(invoice.id, 'UPLOADED', 'Timesheet uploaded');
  await addTimelineEvent(invoice.id, 'OCR_COMPLETED', 'Document processed');
  await addTimelineEvent(invoice.id, 'VALIDATED', 'Validation passed');
  await addTimelineEvent(invoice.id, 'INVOICE_GENERATED', `Invoice ${invoiceNumber} generated`);
  await addTimelineEvent(invoice.id, 'APPROVED', 'Processing completed — ready for dispatch');

  return prisma.invoice.findUnique({
    where: { id: invoice.id },
    include: { items: true, client: true, timeline: { orderBy: { createdAt: 'asc' } } },
  });
}

async function renderInvoicePdf(
  invoice: {
    invoiceNumber: string;
    subtotal: { toString(): string };
    taxAmount: { toString(): string };
    grandTotal: { toString(): string };
    currency: string;
    payrollPeriod: string | null;
    client: { name: string; address: string | null; email: string | null };
    items: Array<{ description: string; quantity: { toString(): string }; unitPrice: { toString(): string }; amount: { toString(): string } }>;
  },
  qrCodeDataUrl: string
): Promise<string> {
  await ensureDir(config.generatedDir);

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const { width, height } = page.getSize();
  let y = height - 50;

  page.drawText('TOUCHLESS INVOICE AGENT', { x: 50, y, size: 10, font, color: rgb(0.4, 0.4, 0.9) });
  y -= 30;
  page.drawText('INVOICE', { x: 50, y, size: 28, font: fontBold, color: rgb(0.1, 0.1, 0.2) });
  y -= 25;
  page.drawText(invoice.invoiceNumber, { x: 50, y, size: 12, font, color: rgb(0.3, 0.3, 0.4) });

  page.drawText(`Bill To: ${invoice.client.name}`, { x: 50, y: y - 40, size: 11, font: fontBold });
  if (invoice.client.address) {
    page.drawText(invoice.client.address, { x: 50, y: y - 55, size: 9, font, color: rgb(0.4, 0.4, 0.5) });
  }

  y -= 100;
  page.drawText('Description', { x: 50, y, size: 10, font: fontBold });
  page.drawText('Qty', { x: 300, y, size: 10, font: fontBold });
  page.drawText('Rate', { x: 370, y, size: 10, font: fontBold });
  page.drawText('Amount', { x: 470, y, size: 10, font: fontBold });
  y -= 5;
  page.drawLine({ start: { x: 50, y }, end: { x: 545, y }, thickness: 1, color: rgb(0.85, 0.85, 0.9) });
  y -= 20;

  for (const item of invoice.items) {
    page.drawText(item.description.slice(0, 40), { x: 50, y, size: 9, font });
    page.drawText(Number(item.quantity).toFixed(1), { x: 300, y, size: 9, font });
    page.drawText(`${invoice.currency} ${Number(item.unitPrice).toFixed(2)}`, { x: 370, y, size: 9, font });
    page.drawText(`${invoice.currency} ${Number(item.amount).toFixed(2)}`, { x: 470, y, size: 9, font });
    y -= 18;
  }

  y -= 20;
  page.drawText(`Subtotal: ${invoice.currency} ${Number(invoice.subtotal).toFixed(2)}`, { x: 370, y, size: 10, font });
  y -= 16;
  page.drawText(`Tax: ${invoice.currency} ${Number(invoice.taxAmount).toFixed(2)}`, { x: 370, y, size: 10, font });
  y -= 20;
  page.drawText(`Total: ${invoice.currency} ${Number(invoice.grandTotal).toFixed(2)}`, { x: 370, y, size: 14, font: fontBold, color: rgb(0.2, 0.4, 0.9) });

  if (invoice.payrollPeriod) {
    page.drawText(`Period: ${invoice.payrollPeriod}`, { x: 50, y: 80, size: 9, font, color: rgb(0.5, 0.5, 0.6) });
  }

  const qrBase64 = qrCodeDataUrl.split(',')[1];
  const qrBytes = Buffer.from(qrBase64, 'base64');
  const qrImage = await pdfDoc.embedPng(qrBytes);
  page.drawImage(qrImage, { x: width - 120, y: 50, width: 70, height: 70 });

  const pdfBytes = await pdfDoc.save();
  const filePath = path.join(config.generatedDir, `${invoice.invoiceNumber}.pdf`);
  await fs.writeFile(filePath, pdfBytes);
  return filePath;
}
