import { PDFDocument, PDFPage, rgb, StandardFonts, RGB } from 'pdf-lib';
import QRCode from 'qrcode';

export type InvoiceTemplateId = 'classic' | 'corporate' | 'minimal' | 'gulf';

export interface InvoiceTemplateMeta {
  id: InvoiceTemplateId;
  label: string;
  description: string;
}

export const INVOICE_TEMPLATES: Record<InvoiceTemplateId, InvoiceTemplateMeta> = {
  classic: {
    id: 'classic',
    label: 'Classic Blue',
    description: 'Standard TASC layout with blue header band and itemized table.',
  },
  corporate: {
    id: 'corporate',
    label: 'Corporate Dark',
    description: 'Full-width navy header with gold accents — enterprise clients.',
  },
  minimal: {
    id: 'minimal',
    label: 'Minimal Clean',
    description: 'Lightweight layout with thin rules and left-aligned totals.',
  },
  gulf: {
    id: 'gulf',
    label: 'Gulf Regional',
    description: 'Teal accent styling for UAE/GCC clients with bilingual footer.',
  },
};

/** Stable template per client code from TASC seed (CL001–CL010). */
const CLIENT_TEMPLATE_MAP: Record<string, InvoiceTemplateId> = {
  CL001: 'gulf',
  CL002: 'corporate',
  CL003: 'classic',
  CL004: 'minimal',
  CL005: 'corporate',
  CL006: 'gulf',
  CL007: 'classic',
  CL008: 'minimal',
  CL009: 'gulf',
  CL010: 'corporate',
};

export function resolveClientTemplate(clientCode: string): InvoiceTemplateId {
  if (CLIENT_TEMPLATE_MAP[clientCode]) return CLIENT_TEMPLATE_MAP[clientCode];
  const n = parseInt(clientCode.replace(/\D/g, ''), 10);
  const keys: InvoiceTemplateId[] = ['classic', 'corporate', 'minimal', 'gulf'];
  return keys[(Number.isNaN(n) ? 0 : n) % keys.length];
}

export function getTemplateMeta(templateId: InvoiceTemplateId): InvoiceTemplateMeta {
  return INVOICE_TEMPLATES[templateId];
}

export interface InvoicePdfInput {
  invoiceNumber: string;
  subtotal: number;
  taxAmount: number;
  grandTotal: number;
  currency: string;
  payrollPeriod: string | null;
  client: {
    name: string;
    clientCode?: string;
    address?: string | null;
    email?: string | null;
    city?: string | null;
    industry?: string | null;
  };
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }>;
  isPreview?: boolean;
}

interface TemplateTheme {
  headerBg: RGB;
  headerText: RGB;
  accent: RGB;
  bodyText: RGB;
  muted: RGB;
  tableHeaderBg: RGB;
  footerNote?: string;
}

function themeFor(templateId: InvoiceTemplateId): TemplateTheme {
  switch (templateId) {
    case 'corporate':
      return {
        headerBg: rgb(0.08, 0.12, 0.22),
        headerText: rgb(1, 1, 1),
        accent: rgb(0.85, 0.65, 0.2),
        bodyText: rgb(0.12, 0.14, 0.18),
        muted: rgb(0.45, 0.48, 0.55),
        tableHeaderBg: rgb(0.94, 0.94, 0.96),
        footerNote: 'Corporate invoice — authorized signatory required.',
      };
    case 'minimal':
      return {
        headerBg: rgb(0.97, 0.97, 0.98),
        headerText: rgb(0.15, 0.15, 0.18),
        accent: rgb(0.2, 0.2, 0.25),
        bodyText: rgb(0.15, 0.15, 0.18),
        muted: rgb(0.5, 0.5, 0.55),
        tableHeaderBg: rgb(0.98, 0.98, 0.99),
        footerNote: 'Minimal template — line items only, no decorative header.',
      };
    case 'gulf':
      return {
        headerBg: rgb(0, 0.42, 0.48),
        headerText: rgb(1, 1, 1),
        accent: rgb(0, 0.55, 0.5),
        bodyText: rgb(0.1, 0.15, 0.18),
        muted: rgb(0.4, 0.45, 0.5),
        tableHeaderBg: rgb(0.92, 0.97, 0.96),
        footerNote: 'Tax Invoice — UAE payroll settlement.',
      };
    default:
      return {
        headerBg: rgb(0.2, 0.35, 0.9),
        headerText: rgb(1, 1, 1),
        accent: rgb(0.2, 0.4, 0.9),
        bodyText: rgb(0.1, 0.1, 0.2),
        muted: rgb(0.4, 0.4, 0.5),
        tableHeaderBg: rgb(0.93, 0.94, 0.98),
        footerNote: 'FlowInvoice AI — Touchless Invoice Agent.',
      };
  }
}

function samplePreviewItems(currency: string): InvoicePdfInput['items'] {
  return [
    {
      description: 'Sample payroll — regular hours (preview)',
      quantity: 22,
      unitPrice: 450,
      amount: 9900,
    },
    {
      description: 'Sample overtime (preview)',
      quantity: 1,
      unitPrice: 850,
      amount: 850,
    },
  ];
}

export function buildPreviewInvoiceData(client: {
  name: string;
  clientCode: string;
  address?: string | null;
  email?: string | null;
  city?: string | null;
  industry?: string | null;
  currency: string;
  taxRate?: number | { toString(): string };
}): InvoicePdfInput {
  const items = samplePreviewItems(client.currency);
  const subtotal = items.reduce((s, i) => s + i.amount, 0);
  const taxRate = Number(client.taxRate || 0);
  const taxAmount = subtotal * (taxRate / 100);
  return {
    invoiceNumber: `PREVIEW-${client.clientCode}`,
    subtotal,
    taxAmount,
    grandTotal: subtotal + taxAmount,
    currency: client.currency,
    payrollPeriod: 'June 2026 (Sample)',
    client: {
      name: client.name,
      clientCode: client.clientCode,
      address: client.address,
      email: client.email,
      city: client.city,
      industry: client.industry,
    },
    items,
    isPreview: true,
  };
}

export async function renderInvoicePdfBytes(
  input: InvoicePdfInput,
  templateId: InvoiceTemplateId,
  qrCodeDataUrl?: string
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const theme = themeFor(templateId);
  const meta = getTemplateMeta(templateId);
  const { width, height } = page.getSize();

  drawHeader(page, input, templateId, theme, meta, font, fontBold, width, height);

  let y = height - (templateId === 'minimal' ? 130 : 150);

  if (input.isPreview) {
    page.drawRectangle({
      x: 50,
      y: y - 8,
      width: width - 100,
      height: 22,
      color: rgb(1, 0.96, 0.85),
      borderColor: rgb(0.9, 0.7, 0.3),
      borderWidth: 1,
    });
    page.drawText('TEMPLATE PREVIEW — sample data only, not a payable invoice', {
      x: 58,
      y: y - 2,
      size: 8,
      font: fontBold,
      color: rgb(0.55, 0.35, 0.05),
    });
    y -= 36;
  }

  page.drawText(`Bill To: ${input.client.name}`, { x: 50, y, size: 11, font: fontBold, color: theme.bodyText });
  y -= 14;
  if (input.client.clientCode) {
    page.drawText(`Client: ${input.client.clientCode}`, { x: 50, y, size: 9, font, color: theme.muted });
    y -= 12;
  }
  if (input.client.address) {
    page.drawText(input.client.address, { x: 50, y, size: 9, font, color: theme.muted });
    y -= 12;
  }
  if (input.client.city) {
    page.drawText(input.client.city, { x: 50, y, size: 9, font, color: theme.muted });
    y -= 12;
  }
  if (input.client.email) {
    page.drawText(input.client.email, { x: 50, y, size: 9, font, color: theme.muted });
    y -= 12;
  }

  y -= 16;
  drawTable(page, input, theme, font, fontBold, y);

  y -= 28 + input.items.length * 18;
  page.drawText(`Subtotal: ${input.currency} ${input.subtotal.toFixed(2)}`, {
    x: 370,
    y,
    size: 10,
    font,
    color: theme.bodyText,
  });
  y -= 16;
  page.drawText(`Tax: ${input.currency} ${input.taxAmount.toFixed(2)}`, {
    x: 370,
    y,
    size: 10,
    font,
    color: theme.bodyText,
  });
  y -= 20;
  page.drawText(`Total: ${input.currency} ${input.grandTotal.toFixed(2)}`, {
    x: 370,
    y,
    size: 14,
    font: fontBold,
    color: theme.accent,
  });

  if (input.payrollPeriod) {
    page.drawText(`Period: ${input.payrollPeriod}`, { x: 50, y: 95, size: 9, font, color: theme.muted });
  }

  page.drawText(`Template: ${meta.label}`, { x: 50, y: 78, size: 8, font, color: theme.muted });

  if (theme.footerNote) {
    page.drawText(theme.footerNote, { x: 50, y: 62, size: 7, font, color: theme.muted });
  }

  const qrPayload =
    qrCodeDataUrl ||
    (await QRCode.toDataURL(
      JSON.stringify({
        invoiceNumber: input.invoiceNumber,
        client: input.client.name,
        total: input.grandTotal,
        preview: Boolean(input.isPreview),
      })
    ));

  const qrBase64 = qrPayload.split(',')[1];
  const qrBytes = Buffer.from(qrBase64, 'base64');
  const qrImage = await pdfDoc.embedPng(qrBytes);
  page.drawImage(qrImage, { x: width - 115, y: 55, width: 65, height: 65 });

  return pdfDoc.save();
}

function drawHeader(
  page: PDFPage,
  input: InvoicePdfInput,
  templateId: InvoiceTemplateId,
  theme: TemplateTheme,
  meta: InvoiceTemplateMeta,
  font: Awaited<ReturnType<PDFDocument['embedFont']>>,
  fontBold: Awaited<ReturnType<PDFDocument['embedFont']>>,
  width: number,
  height: number
) {
  const { client, invoiceNumber, currency } = input;

  if (templateId === 'minimal') {
    page.drawText('INVOICE', { x: 50, y: height - 55, size: 24, font: fontBold, color: theme.bodyText });
    page.drawText(invoiceNumber, { x: 50, y: height - 75, size: 11, font, color: theme.muted });
    page.drawLine({
      start: { x: 50, y: height - 85 },
      end: { x: width - 50, y: height - 85 },
      thickness: 1,
      color: theme.accent,
    });
    page.drawText(meta.label, { x: width - 160, y: height - 55, size: 9, font, color: theme.muted });
    return;
  }

  const headerHeight = templateId === 'corporate' ? 100 : 88;
  page.drawRectangle({
    x: 0,
    y: height - headerHeight,
    width,
    height: headerHeight,
    color: theme.headerBg,
  });

  page.drawText(client.name.toUpperCase(), {
    x: 50,
    y: height - 42,
    size: templateId === 'corporate' ? 16 : 14,
    font: fontBold,
    color: theme.headerText,
  });

  page.drawText('INVOICE', {
    x: 50,
    y: height - 62,
    size: 22,
    font: fontBold,
    color: templateId === 'corporate' ? theme.accent : theme.headerText,
  });

  page.drawText(invoiceNumber, {
    x: 50,
    y: height - 78,
    size: 10,
    font,
    color: rgb(0.85, 0.88, 0.95),
  });

  page.drawText(meta.label, {
    x: width - 180,
    y: height - 48,
    size: 9,
    font,
    color: rgb(0.85, 0.88, 0.95),
  });

  page.drawText(currency, {
    x: width - 180,
    y: height - 64,
    size: 10,
    font: fontBold,
    color: theme.headerText,
  });

  if (client.industry && templateId === 'corporate') {
    page.drawText(client.industry, {
      x: width - 180,
      y: height - 78,
      size: 8,
      font,
      color: rgb(0.75, 0.78, 0.85),
    });
  }
}

function drawTable(
  page: PDFPage,
  input: InvoicePdfInput,
  theme: TemplateTheme,
  font: Awaited<ReturnType<PDFDocument['embedFont']>>,
  fontBold: Awaited<ReturnType<PDFDocument['embedFont']>>,
  startY: number
) {
  let y = startY;

  page.drawRectangle({ x: 50, y: y - 14, width: 495, height: 18, color: theme.tableHeaderBg });
  page.drawText('Description', { x: 54, y: y - 10, size: 10, font: fontBold, color: theme.bodyText });
  page.drawText('Qty', { x: 300, y: y - 10, size: 10, font: fontBold, color: theme.bodyText });
  page.drawText('Rate', { x: 370, y: y - 10, size: 10, font: fontBold, color: theme.bodyText });
  page.drawText('Amount', { x: 470, y: y - 10, size: 10, font: fontBold, color: theme.bodyText });
  y -= 22;

  for (const item of input.items) {
    page.drawText(item.description.slice(0, 42), { x: 54, y, size: 9, font, color: theme.bodyText });
    page.drawText(Number(item.quantity).toFixed(1), { x: 300, y, size: 9, font, color: theme.bodyText });
    page.drawText(`${input.currency} ${Number(item.unitPrice).toFixed(2)}`, {
      x: 370,
      y,
      size: 9,
      font,
      color: theme.bodyText,
    });
    page.drawText(`${input.currency} ${Number(item.amount).toFixed(2)}`, {
      x: 470,
      y,
      size: 9,
      font,
      color: theme.bodyText,
    });
    y -= 18;
  }
}
