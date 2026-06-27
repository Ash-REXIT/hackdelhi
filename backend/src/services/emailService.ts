import nodemailer from 'nodemailer';
import { config } from '../lib/config';
import { prisma } from '../lib/prisma';
import { addTimelineEvent } from './timelineService';

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: false,
  auth: config.smtp.user ? { user: config.smtp.user, pass: config.smtp.pass } : undefined,
});

export async function dispatchInvoice(invoiceId: string) {
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: { client: true },
  });

  if (!invoice) throw new Error('Invoice not found');

  const recipient = invoice.client.email || 'user@client.com';

  const dispatchLog = await prisma.dispatchLog.create({
    data: {
      invoiceId,
      method: 'portal',
      recipient,
      status: 'pending',
    },
  });

  try {
    if (config.smtp.user && invoice.client.email) {
      await transporter.sendMail({
        from: config.smtp.from,
        to: invoice.client.email,
        subject: `Invoice ${invoice.invoiceNumber} from FlowInvoice AI`,
        html: `
          <h2>Invoice ${invoice.invoiceNumber}</h2>
          <p>Dear ${invoice.client.name},</p>
          <p>Please find your invoice attached. Total: <strong>${invoice.currency} ${Number(invoice.grandTotal).toFixed(2)}</strong></p>
          <p>Due date: ${invoice.dueDate?.toLocaleDateString() || 'N/A'}</p>
          <p>View in your client portal under My Invoices.</p>
          <p>Regards,<br/>FlowInvoice AI</p>
        `,
        attachments: invoice.pdfPath
          ? [{ filename: `${invoice.invoiceNumber}.pdf`, path: invoice.pdfPath }]
          : [],
      });
    } else {
      console.log(`[Dispatch] Invoice ${invoice.invoiceNumber} -> client portal (${invoice.client.name})`);
    }

    const now = new Date();
    await prisma.dispatchLog.update({
      where: { id: dispatchLog.id },
      data: { status: 'sent', sentAt: now, deliveredAt: now },
    });

    await prisma.invoice.update({
      where: { id: invoiceId },
      data: { status: 'DISPATCHED' },
    });

    if (invoice.timesheetId) {
      await prisma.timesheet.update({
        where: { id: invoice.timesheetId },
        data: { status: 'DISPATCHED' },
      });
    }

    await addTimelineEvent(invoiceId, 'DISPATCHED', `Dispatched to ${invoice.client.name} client portal`);
    await addTimelineEvent(invoiceId, 'DELIVERED', 'Available in client dashboard — My Invoices');

    return dispatchLog;
  } catch (error) {
    await prisma.dispatchLog.update({
      where: { id: dispatchLog.id },
      data: {
        status: 'failed',
        error: error instanceof Error ? error.message : 'Dispatch failed',
      },
    });
    throw error;
  }
}
