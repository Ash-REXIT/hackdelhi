export enum UserRole {
  CLIENT = 'CLIENT',
  FINOPS = 'FINOPS',
  FINANCE = 'FINANCE',
}

export enum TimesheetStatus {
  UPLOADED = 'UPLOADED',
  OCR_PROCESSING = 'OCR_PROCESSING',
  OCR_COMPLETED = 'OCR_COMPLETED',
  EXTRACTING = 'EXTRACTING',
  EXTRACTED = 'EXTRACTED',
  MATCHING = 'MATCHING',
  MATCHED = 'MATCHED',
  VALIDATING = 'VALIDATING',
  VALIDATED = 'VALIDATED',
  FRAUD_CHECKING = 'FRAUD_CHECKING',
  FRAUD_CHECKED = 'FRAUD_CHECKED',
  PENDING_REVIEW = 'PENDING_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  INVOICE_GENERATED = 'INVOICE_GENERATED',
  PENDING_FINANCE_APPROVAL = 'PENDING_FINANCE_APPROVAL',
  FINANCE_APPROVED = 'FINANCE_APPROVED',
  DISPATCHED = 'DISPATCHED',
  DELIVERED = 'DELIVERED',
  PAID = 'PAID',
  EXCEPTION = 'EXCEPTION',
}

export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  PENDING_CLIENT_APPROVAL = 'PENDING_CLIENT_APPROVAL',
  CLIENT_APPROVED = 'CLIENT_APPROVED',
  CLIENT_REJECTED = 'CLIENT_REJECTED',
  PENDING_FINANCE_APPROVAL = 'PENDING_FINANCE_APPROVAL',
  FINANCE_APPROVED = 'FINANCE_APPROVED',
  FINANCE_REJECTED = 'FINANCE_REJECTED',
  MODIFIED = 'MODIFIED',
  DISPATCHED = 'DISPATCHED',
  DELIVERED = 'DELIVERED',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

export enum QueryStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export interface ExtractedTimesheetData {
  employeeId?: string;
  employeeName?: string;
  clientCode?: string;
  workingDays?: number;
  overtime?: number;
  reimbursements?: number;
  payrollPeriod?: string;
  entries?: Array<{
    date?: string;
    hours?: number;
    overtime?: number;
    description?: string;
  }>;
}

export interface FieldConfidence {
  [field: string]: number;
}

export interface ValidationResult {
  passed: boolean;
  ruleKey: string;
  ruleName: string;
  severity: 'error' | 'warning';
  message: string;
  evidence?: Record<string, unknown>;
  suggestedFix?: string;
}

export interface FraudDetectionResult {
  fraudScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  reasons: Array<{
    checkType: string;
    score: number;
    reason: string;
    evidence?: Record<string, unknown>;
  }>;
}

export interface EmployeeMatchResult {
  matched: boolean;
  employeeId?: string;
  employeeName?: string;
  confidence: number;
  matchType: 'exact_id' | 'name_match' | 'fuzzy_match' | 'no_match';
  warnings?: string[];
}

export interface OcrResult {
  text: string;
  confidence: number;
  pages?: Array<{ page: number; text: string; confidence: number }>;
}

export interface InvoiceTimelineEventType {
  event: string;
  description?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export const TIMELINE_EVENTS = [
  'UPLOADED',
  'OCR_COMPLETED',
  'VALIDATED',
  'INVOICE_GENERATED',
  'APPROVED',
  'DISPATCHED',
  'DELIVERED',
  'PAID',
] as const;

export const DEFAULT_VALIDATION_RULES = [
  { ruleKey: 'max_working_days', ruleValue: { value: 31 }, severity: 'error' as const },
  { ruleKey: 'max_overtime_hours', ruleValue: { value: 80 }, severity: 'warning' as const },
  { ruleKey: 'required_fields', ruleValue: { fields: ['employeeId', 'workingDays', 'payrollPeriod'] }, severity: 'error' as const },
  { ruleKey: 'currency', ruleValue: { value: 'AED' }, severity: 'error' as const },
];

export const AUTO_INVOICE_CONFIDENCE_THRESHOLD = 95;
