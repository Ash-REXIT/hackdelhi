export type BackendRole = 'FINOPS' | 'CLIENT' | 'FINANCE';

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: BackendRole;
  clientId: string | null;
  client?: { id: string; name: string; clientCode: string };
}

export interface TimesheetDocument {
  id: string;
  fileName: string;
  fileType: string;
  ocrConfidence?: number;
  ocrText?: string;
}

export interface ValidationResult {
  passed: boolean;
  ruleKey: string;
  ruleName: string;
  severity: string;
  message: string;
  suggestedFix?: string;
}

export interface Timesheet {
  id: string;
  status: string;
  payrollPeriod?: string;
  workingDays?: number;
  overtime?: number;
  overallConfidence?: number;
  fieldConfidence?: Record<string, number>;
  extractedData?: Record<string, unknown>;
  validationResults?: ValidationResult[];
  fraudScore?: number;
  fraudRiskLevel?: string;
  fraudReasons?: Array<{ checkType?: string; score?: number; reason?: string }>;
  exceptionReason?: string;
  createdAt: string;
  client?: { id: string; name: string; clientCode: string };
  employee?: { id: string; name: string; employeeId: string };
  documents?: TimesheetDocument[];
  invoices?: Array<{ id: string; invoiceNumber: string; status: string }>;
}

export interface InvoiceTimelineEvent {
  id: string;
  event: string;
  description?: string;
  createdAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  status: string;
  subtotal: number | string;
  taxAmount?: number | string;
  grandTotal: number | string;
  currency: string;
  payrollPeriod?: string;
  pdfPath?: string;
  dueDate?: string;
  paidAt?: string;
  createdAt: string;
  client?: { id: string; name: string; clientCode: string; email?: string };
  timesheet?: {
    id: string;
    status: string;
    documents?: Array<{ fileName: string }>;
    employee?: { name: string; employeeId: string };
  };
  items?: Array<{ description: string; quantity: number; unitPrice: number; amount: number }>;
  timeline?: InvoiceTimelineEvent[];
  dispatchLogs?: Array<{ id: string; method: string; status: string; sentAt?: string; deliveredAt?: string }>;
}

export interface DashboardData {
  kpis: {
    submittedTimesheets: number;
    pendingProcessing: number;
    approvedInvoices: number;
    pendingPayments: number;
    todayUploads: number;
    processing: number;
    completed: number;
    exceptions: number;
    invoicesGenerated: number;
    averageConfidence: number;
    revenue: number;
  };
  recentActivity: Array<{
    id: string;
    action: string;
    entity: string;
    entityId: string;
    createdAt: string;
    user?: { name: string | null; email: string };
  }>;
}
