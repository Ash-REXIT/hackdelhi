import path from 'path';
import fs from 'fs/promises';
import QRCode from 'qrcode';
import { prisma } from '../lib/prisma';
import { config } from '../lib/config';
import { addTimelineEvent } from './timelineService';
import {
  getTemplateMeta,
  renderInvoicePdfBytes,
  resolveClientTemplate,
} from './invoiceTemplateService';
import { regenerateInvoicePdf } from './invoiceService';

const DEMO_CODES = ['CL001', 'CL002', 'CL003', 'CL004'] as const;

/** Varied ERP pipeline states for demo cards */
const DEMO_ERP_STATES: Record<
  string,
  {
    invoiceStatus: 'DISPATCHED' | 'FINANCE_APPROVED' | 'CLIENT_APPROVED' | 'PENDING_FINANCE_APPROVAL';
    timesheetStatus: 'INVOICE_GENERATED' | 'FRAUD_CHECKED' | 'VALIDATED' | 'MATCHING';
    dispatch?: 'sent' | 'failed' | 'none';
    processedOffsetMs: number;
  }
> = {
  CL001: { invoiceStatus: 'DISPATCHED', timesheetStatus: 'INVOICE_GENERATED', dispatch: 'sent', processedOffsetMs: 14_200 },
  CL002: { invoiceStatus: 'FINANCE_APPROVED', timesheetStatus: 'INVOICE_GENERATED', dispatch: 'none', processedOffsetMs: 45_000 },
  CL003: { invoiceStatus: 'FINANCE_APPROVED', timesheetStatus: 'INVOICE_GENERATED', dispatch: 'failed', processedOffsetMs: 12_400 },
  CL004: { invoiceStatus: 'PENDING_FINANCE_APPROVAL', timesheetStatus: 'FRAUD_CHECKED', dispatch: 'none', processedOffsetMs: 28_000 },
};

const DEMO_LABELS: Record<string, { employee: string; amount: number }> = {
  CL001: { employee: 'Carlos Smith', amount: 9834.13 },
  CL002: { employee: 'Sample Employee', amount: 11250.0 },
  CL003: { employee: 'Sample Employee', amount: 9450.0 },
  CL004: { employee: 'Sample Employee', amount: 10800.0 },
};

export async function ensureDispatchDemoInvoices(): Promise<number> {
  let created = 0;

  for (const clientCode of DEMO_CODES) {
    const invoiceNumber = `DEMO-${clientCode}-DISPATCH`;
    const existing = await prisma.invoice.findUnique({
      where: { invoiceNumber },
      include: { timesheet: true, dispatchLogs: true },
    });

    if (existing) {
      try {
        await regenerateInvoicePdf(existing.id);
        await applyDemoErpState(existing.id, clientCode, existing.timesheetId);
      } catch (err) {
        console.warn(`Could not refresh demo ${invoiceNumber}:`, err);
      }
      continue;
    }

    const client = await prisma.client.findUnique({ where: { clientCode } });
    if (!client) continue;

    const employee = await prisma.employee.findFirst({
      where: { clientId: client.id },
      orderBy: { name: 'asc' },
    });

    const demo = DEMO_LABELS[clientCode] || { employee: 'Demo Employee', amount: 9000 };
    const subtotal = demo.amount;
    const taxRate = Number(client.taxRate || 0);
    const taxAmount = subtotal * (taxRate / 100);
    const grandTotal = subtotal + taxAmount;

    const erpState = DEMO_ERP_STATES[clientCode];
    const createdAt = new Date(Date.now() - erpState.processedOffsetMs - 60_000);

    const timesheet = await prisma.timesheet.create({
      data: {
        clientId: client.id,
        employeeId: employee?.id,
        status: erpState.timesheetStatus,
        payrollPeriod: 'June 2026',
        workingDays: 22,
        overtime: 0,
        overallConfidence: 96,
        createdAt,
        processedAt: new Date(createdAt.getTime() + erpState.processedOffsetMs),
      },
    });

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        clientId: client.id,
        timesheetId: timesheet.id,
        status: erpState.invoiceStatus,
        subtotal,
        taxAmount,
        discountAmount: 0,
        grandTotal,
        currency: client.currency,
        payrollPeriod: 'June 2026',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        createdAt,
        items: {
          create: [
            {
              description: `Demo dispatch invoice — ${demo.employee} (June 2026)`,
              quantity: 22,
              unitPrice: subtotal / 22,
              amount: subtotal,
              employeeId: employee?.id,
            },
          ],
        },
      },
      include: { items: true, client: true },
    });

    const templateId = resolveClientTemplate(client.clientCode);
    const qrCodeDataUrl = await QRCode.toDataURL(
      JSON.stringify({
        invoiceNumber,
        client: client.name,
        template: templateId,
        demo: true,
      })
    );

    const pdfBytes = await renderInvoicePdfBytes(
      {
        invoiceNumber,
        subtotal,
        taxAmount,
        grandTotal,
        currency: client.currency,
        payrollPeriod: 'June 2026',
        client: {
          name: client.name,
          clientCode: client.clientCode,
          address: client.address,
          email: client.email,
          city: client.city,
          industry: client.industry,
        },
        items: invoice.items.map((item) => ({
          description: item.description,
          quantity: Number(item.quantity),
          unitPrice: Number(item.unitPrice),
          amount: Number(item.amount),
        })),
      },
      templateId,
      qrCodeDataUrl
    );

    await fs.mkdir(config.generatedDir, { recursive: true });
    const pdfPath = path.join(config.generatedDir, `${invoiceNumber}.pdf`);
    await fs.writeFile(pdfPath, pdfBytes);

    await prisma.invoice.update({
      where: { id: invoice.id },
      data: { pdfPath },
    });

    await addTimelineEvent(
      invoice.id,
      'INVOICE_GENERATED',
      `Demo invoice (${getTemplateMeta(templateId).label} template)`
    );
    await addTimelineEvent(invoice.id, 'APPROVED', 'Ready for dispatch — demo card');

    await applyDemoErpState(invoice.id, clientCode, timesheet.id);

    created++;
  }

  return created;
}

async function applyDemoErpState(invoiceId: string, clientCode: string, timesheetId: string) {
  const erpState = DEMO_ERP_STATES[clientCode];
  if (!erpState) return;

  const client = await prisma.client.findUnique({ where: { clientCode } });
  const createdAt = new Date(Date.now() - erpState.processedOffsetMs - 60_000);

  await prisma.timesheet.update({
    where: { id: timesheetId },
    data: {
      status: erpState.timesheetStatus,
      createdAt,
      processedAt: new Date(createdAt.getTime() + erpState.processedOffsetMs),
    },
  });

  await prisma.invoice.update({
    where: { id: invoiceId },
    data: { status: erpState.invoiceStatus, createdAt },
  });

  await prisma.dispatchLog.deleteMany({ where: { invoiceId } });

  if (erpState.dispatch === 'sent' && client?.email) {
    await prisma.dispatchLog.create({
      data: {
        invoiceId,
        method: 'email',
        recipient: client.email,
        status: 'sent',
        sentAt: new Date(),
        deliveredAt: new Date(),
      },
    });
  } else if (erpState.dispatch === 'failed') {
    await prisma.dispatchLog.create({
      data: {
        invoiceId,
        method: 'api',
        recipient: ERP_TARGETS[clientCode] || 'SAP S/4HANA',
        status: 'failed',
        error: 'ERP API timeout after 30s',
      },
    });
  }
}

const ERP_TARGETS: Record<string, string> = {
  CL001: 'SAP S/4HANA',
  CL002: 'Oracle NetSuite',
  CL003: 'Workday Financials',
  CL004: 'Microsoft Dynamics 365',
};
