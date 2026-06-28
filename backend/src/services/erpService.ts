import { prisma } from '../lib/prisma';
import { InvoiceStatus } from '@prisma/client';

const ERP_TARGETS: Record<string, string> = {
  CL001: 'SAP S/4HANA',
  CL002: 'Oracle NetSuite',
  CL003: 'Workday Financials',
  CL004: 'Microsoft Dynamics 365',
  CL005: 'SAP S/4HANA',
  CL006: 'Oracle NetSuite',
  CL007: 'Workday Financials',
  CL008: 'SAP S/4HANA',
  CL009: 'Oracle NetSuite',
  CL010: 'Microsoft Dynamics 365',
};

type PipelineStage = { name: string; status: 'done' | 'processing' | 'failed' | 'pending'; time: string };
type StageStatus = PipelineStage['status'];

function hashSeed(value: string): number {
  return value.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
}

function stageTimings(seed: string) {
  const h = hashSeed(seed);
  return {
    received: `${(0.08 + (h % 4) * 0.03).toFixed(1)}s`,
    extracted: `${(2.0 + (h % 9) * 0.18).toFixed(1)}s`,
    validated: `${(0.9 + (h % 7) * 0.11).toFixed(1)}s`,
    generated: `${(0.65 + (h % 5) * 0.14).toFixed(1)}s`,
    erpUpload: `${(8.2 + (h % 12) * 0.35).toFixed(1)}s`,
  };
}

function formatElapsed(ms: number): string {
  if (ms < 1000) return `${Math.max(1, Math.round(ms))}ms`;
  const sec = Math.round(ms / 1000);
  if (sec < 60) return `${sec}s`;
  return `${Math.floor(sec / 60)}m ${sec % 60}s`;
}

function buildStages(
  seed: string,
  timesheetStatus: string | undefined,
  invoiceStatus: string,
  dispatchStatus?: string | null
): PipelineStage[] {
  const times = stageTimings(seed);
  const ts = timesheetStatus || '';
  const inv = invoiceStatus;

  const earlyTs = ['UPLOADED', 'OCR_PROCESSING', 'OCR_COMPLETED', 'EXTRACTING'];
  const midTs = ['EXTRACTED', 'MATCHING', 'VALIDATING', 'EXCEPTION', 'PENDING_REVIEW'];
  const lateTs = ['VALIDATED', 'FRAUD_CHECKING', 'FRAUD_CHECKED', 'INVOICE_GENERATED'];

  let received: StageStatus = 'done';
  let extracted: StageStatus = 'pending';
  let validated: StageStatus = 'pending';
  let generated: StageStatus = 'pending';
  let erpUpload: StageStatus = 'pending';

  if (earlyTs.includes(ts)) {
    received = 'done';
    extracted = ts === 'EXTRACTING' ? 'processing' : 'pending';
  } else if (midTs.includes(ts)) {
    received = 'done';
    extracted = ts === 'EXTRACTING' ? 'processing' : 'done';
    validated = ['VALIDATING', 'EXCEPTION', 'PENDING_REVIEW'].includes(ts) ? 'processing' : 'pending';
  } else if (lateTs.includes(ts) || ['DISPATCHED', 'PAID', 'FINANCE_APPROVED'].includes(ts)) {
    received = 'done';
    extracted = 'done';
    validated = ts === 'FRAUD_CHECKING' ? 'processing' : 'done';
  }

  const invGenerated = ['FINANCE_APPROVED', 'CLIENT_APPROVED', 'DISPATCHED', 'DELIVERED', 'PAID'].includes(inv);
  const invGenerating = ['DRAFT', 'PENDING_FINANCE_APPROVAL', 'MODIFIED', 'PENDING_CLIENT_APPROVAL'].includes(inv);

  if (invGenerated) {
    received = extracted = validated = 'done';
    generated = invGenerating ? 'processing' : 'done';
  } else if (invGenerating) {
    received = extracted = 'done';
    validated = validated === 'pending' ? 'done' : validated;
    generated = 'processing';
  }

  if (['DISPATCHED', 'DELIVERED', 'PAID'].includes(inv)) {
    erpUpload = 'done';
  } else if (dispatchStatus?.toLowerCase() === 'failed') {
    received = extracted = validated = generated = 'done';
    erpUpload = 'failed';
  } else if (['FINANCE_APPROVED', 'CLIENT_APPROVED'].includes(inv) && generated === 'done') {
    erpUpload = 'processing';
  } else if (inv === 'PENDING_FINANCE_APPROVAL') {
    erpUpload = 'pending';
  }

  const stageTime = (status: StageStatus, key: keyof ReturnType<typeof stageTimings>) => {
    if (status === 'processing') return '...';
    if (status === 'failed') return 'Failed: API Timeout';
    if (status === 'pending') return '—';
    return times[key];
  };

  return [
    { name: 'Received', status: received, time: stageTime(received, 'received') },
    { name: 'Extracted', status: extracted, time: stageTime(extracted, 'extracted') },
    { name: 'Validated', status: validated, time: stageTime(validated, 'validated') },
    { name: 'Generated', status: generated, time: stageTime(generated, 'generated') },
    { name: 'ERP Upload', status: erpUpload, time: stageTime(erpUpload, 'erpUpload') },
  ];
}

function pipelineStatus(
  invoiceStatus: string,
  dispatchStatus?: string | null
): 'completed' | 'processing' | 'failed' | 'queued' {
  if (dispatchStatus?.toLowerCase() === 'failed') return 'failed';
  if (['DISPATCHED', 'DELIVERED', 'PAID'].includes(invoiceStatus)) return 'completed';
  if (['FINANCE_APPROVED', 'CLIENT_APPROVED', 'PENDING_FINANCE_APPROVAL'].includes(invoiceStatus)) {
    return 'processing';
  }
  return 'queued';
}

const PENDING_ERP_STATUSES: InvoiceStatus[] = [
  'FINANCE_APPROVED',
  'CLIENT_APPROVED',
  'PENDING_FINANCE_APPROVAL',
  'DRAFT',
  'MODIFIED',
];

const SYNCED_STATUSES: InvoiceStatus[] = ['DISPATCHED', 'DELIVERED', 'PAID'];

export async function getErpQueueData() {
  const clients = await prisma.client.findMany({
    orderBy: { clientCode: 'asc' },
    include: { _count: { select: { invoices: true, employees: true } } },
  });

  const clientStatuses = await Promise.all(
    clients.map(async (client) => {
      const [latestInvoice, pendingSync, syncedCount, failedDispatch] = await Promise.all([
        prisma.invoice.findFirst({
          where: { clientId: client.id },
          orderBy: { updatedAt: 'desc' },
          select: { status: true, updatedAt: true, invoiceNumber: true },
        }),
        prisma.invoice.count({
          where: { clientId: client.id, status: { in: PENDING_ERP_STATUSES } },
        }),
        prisma.invoice.count({
          where: { clientId: client.id, status: { in: SYNCED_STATUSES } },
        }),
        prisma.dispatchLog.count({
          where: {
            invoice: { clientId: client.id },
            status: { in: ['failed', 'FAILED'] },
          },
        }),
      ]);

      let syncStatus: 'connected' | 'syncing' | 'idle' | 'error' = 'idle';
      if (failedDispatch > 0) syncStatus = 'error';
      else if (pendingSync > 0) syncStatus = 'syncing';
      else if (syncedCount > 0) syncStatus = 'connected';

      return {
        clientCode: client.clientCode,
        name: client.name,
        erpTarget: ERP_TARGETS[client.clientCode] || 'SAP S/4HANA',
        syncStatus,
        pendingSync,
        syncedCount,
        invoiceCount: client._count.invoices,
        employeeCount: client._count.employees,
        isActive: client.isActive,
        lastInvoice: latestInvoice?.invoiceNumber ?? null,
        lastSyncAt: latestInvoice?.updatedAt?.toISOString() ?? null,
      };
    })
  );

  const invoices = await prisma.invoice.findMany({
    take: 15,
    orderBy: { createdAt: 'desc' },
    include: {
      client: { select: { name: true, clientCode: true } },
      timesheet: { select: { status: true, createdAt: true, processedAt: true } },
      dispatchLogs: { orderBy: { createdAt: 'desc' }, take: 1 },
    },
  });

  const pipelines = invoices.map((inv, index) => {
    const dispatchLog = inv.dispatchLogs[0];
    const status = pipelineStatus(inv.status, dispatchLog?.status);
    const created = inv.timesheet?.createdAt ?? inv.createdAt;
    const processed = inv.timesheet?.processedAt ?? inv.updatedAt;
    const elapsedMs = Math.max(1000, processed.getTime() - created.getTime());
    const idSuffix = inv.invoiceNumber.replace(/[^A-Z0-9]/gi, '').slice(-10) || String(index);

    return {
      id: `PL-${inv.client.clientCode}-${idSuffix}`,
      invoice: inv.invoiceNumber,
      client: inv.client.name,
      clientCode: inv.client.clientCode,
      target: ERP_TARGETS[inv.client.clientCode] || 'SAP S/4HANA',
      status,
      elapsed: formatElapsed(elapsedMs),
      stages: buildStages(inv.invoiceNumber, inv.timesheet?.status, inv.status, dispatchLog?.status),
    };
  });

  return { clientStatuses, pipelines };
}
