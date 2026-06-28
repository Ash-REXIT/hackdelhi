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
  client?: { id: string; name: string; clientCode: string; email?: string; industry?: string };
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

export interface ClientRecord {
  id: string;
  clientCode: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  industry?: string | null;
  status?: string | null;
  currency: string;
  taxRate: number | string;
  isActive: boolean;
  pendingReviews?: number;
  revenueYtd?: number;
  _count?: { employees: number; timesheets: number; invoices: number };
}

export interface EmployeeRecord {
  id: string;
  employeeId: string;
  name: string;
  email?: string | null;
  designation?: string | null;
  department?: string | null;
  nationality?: string | null;
  hourlyRate?: number | string | null;
  isActive: boolean;
  client?: { name: string; clientCode: string; currency?: string };
  payroll?: Array<{
    period: string;
    baseSalary: number | string;
    gross?: number | string | null;
    netPay?: number | string | null;
    hourlyRate?: number | string | null;
    overtimeRate?: number | string | null;
    currency: string;
    workingDays?: number | null;
  }>;
}

export interface PayrollRateRow {
  employeeId: string;
  name: string;
  designation?: string | null;
  clientName: string;
  clientCode: string;
  hourlyRate: string;
  overtimeRate: string;
  currency: string;
  period: string;
}

export interface ErpClientStatus {
  clientCode: string;
  name: string;
  erpTarget: string;
  syncStatus: 'connected' | 'syncing' | 'idle' | 'error';
  pendingSync: number;
  syncedCount: number;
  invoiceCount: number;
  employeeCount: number;
  isActive: boolean;
  lastInvoice: string | null;
  lastSyncAt: string | null;
}

export interface ErpPipeline {
  id: string;
  invoice: string;
  client: string;
  clientCode: string;
  target: string;
  status: 'completed' | 'processing' | 'failed' | 'queued';
  elapsed: string;
  stages: Array<{ name: string; status: 'done' | 'processing' | 'failed' | 'pending'; time: string }>;
}

export interface ErpQueueData {
  clientStatuses: ErpClientStatus[];
  pipelines: ErpPipeline[];
}

export interface AnalyticsInsights {
  kpis: {
    totalProcessedValue: number;
    straightThroughRate: number;
    avgProcessingMinutes: number;
    exceptionsFlagged: number;
    timesheetsInRange: number;
  };
  volumeOverTime: Array<{ date: string; count: number }>;
  maxVolume: number;
  confidenceBreakdown: { high: number; medium: number; low: number };
  topExceptions: Array<{ rule: string; count: number }>;
  topClients: Array<{ clientCode: string; name: string; total: number }>;
}
