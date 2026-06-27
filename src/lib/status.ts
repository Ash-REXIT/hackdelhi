export function formatStatus(status: string): string {
  const map: Record<string, string> = {
    UPLOADED: 'Processing',
    OCR_PROCESSING: 'Processing',
    OCR_COMPLETED: 'Processing',
    EXTRACTING: 'Processing',
    EXTRACTED: 'Processing',
    MATCHING: 'Processing',
    MATCHED: 'Processing',
    VALIDATING: 'Processing',
    VALIDATED: 'Processing',
    FRAUD_CHECKING: 'Processing',
    PENDING_CLIENT_APPROVAL: 'Awaiting Your Approval',
    PENDING_REVIEW: 'Pending Review',
    EXCEPTION: 'Exception',
    APPROVED: 'Completed',
    INVOICE_GENERATED: 'Completed',
    DISPATCHED: 'Completed',
    REJECTED: 'Failed',
  };
  return map[status] || status.replace(/_/g, ' ');
}

export function statusTone(status: string): 'primary' | 'success' | 'danger' | 'warning' {
  if (['INVOICE_GENERATED', 'APPROVED', 'DISPATCHED', 'VALIDATED'].includes(status)) return 'success';
  if (['EXCEPTION', 'REJECTED'].includes(status)) return 'danger';
  if (['PENDING_REVIEW', 'PENDING_CLIENT_APPROVAL'].includes(status)) return 'warning';
  return 'primary';
}

export const PIPELINE_STAGES = [
  { key: 'received', label: 'Document Received', after: ['UPLOADED'] },
  { key: 'ocr', label: 'OCR Complete', after: ['OCR_COMPLETED', 'EXTRACTING', 'EXTRACTED', 'MATCHING', 'MATCHED', 'VALIDATING', 'VALIDATED', 'FRAUD_CHECKING', 'PENDING_CLIENT_APPROVAL', 'PENDING_REVIEW', 'EXCEPTION', 'INVOICE_GENERATED', 'APPROVED'] },
  { key: 'employee', label: 'Employee Validation', after: ['EXTRACTED', 'MATCHING', 'MATCHED', 'VALIDATING', 'VALIDATED', 'FRAUD_CHECKING', 'PENDING_CLIENT_APPROVAL', 'PENDING_REVIEW', 'EXCEPTION', 'INVOICE_GENERATED', 'APPROVED'] },
  { key: 'business', label: 'Business Validation', after: ['VALIDATED', 'FRAUD_CHECKING', 'PENDING_CLIENT_APPROVAL', 'PENDING_REVIEW', 'EXCEPTION', 'INVOICE_GENERATED', 'APPROVED'] },
  { key: 'client', label: 'Client Overtime Approval', after: ['INVOICE_GENERATED', 'APPROVED', 'DISPATCHED'] },
  { key: 'invoice', label: 'Invoice Generated', after: ['INVOICE_GENERATED', 'APPROVED', 'DISPATCHED'] },
] as const;

export function pipelineStageStatus(timesheetStatus: string, stageIndex: number): 'pending' | 'active' | 'completed' {
  const stage = PIPELINE_STAGES[stageIndex];
  const terminal = ['INVOICE_GENERATED', 'APPROVED', 'DISPATCHED'];
  const failed = timesheetStatus === 'EXCEPTION' || timesheetStatus === 'REJECTED';

  if (timesheetStatus === 'PENDING_CLIENT_APPROVAL') {
    if (stage.key === 'client') return 'active';
    if (stage.after.includes('PENDING_CLIENT_APPROVAL' as never)) return 'completed';
    return 'pending';
  }

  if (timesheetStatus === 'PENDING_REVIEW') {
    if (stage.key === 'client') return 'completed';
  }

  if (stage.after.includes(timesheetStatus as never) || terminal.includes(timesheetStatus)) {
    if (failed && stageIndex === PIPELINE_STAGES.length - 1) return 'pending';
    return 'completed';
  }

  const nextStage = PIPELINE_STAGES[stageIndex + 1];
  if (nextStage?.after.includes(timesheetStatus as never)) return 'completed';
  if (stageIndex === 0 || PIPELINE_STAGES[stageIndex - 1]?.after.some((s) => timesheetStatus === s || PIPELINE_STAGES.some((st, i) => i < stageIndex && st.after.includes(timesheetStatus as never)))) {
    return 'active';
  }

  for (let i = 0; i < PIPELINE_STAGES.length; i++) {
    if (PIPELINE_STAGES[i].after.includes(timesheetStatus as never)) {
      if (i === stageIndex) return 'active';
      if (i > stageIndex) return 'pending';
      return 'completed';
    }
  }

  if (timesheetStatus === 'UPLOADED' && stageIndex === 0) return 'active';
  return 'pending';
}
