export type UserRole = 'client' | 'admin'

export type StatusType =
  | 'approved'
  | 'rejected'
  | 'pending'
  | 'critical'
  | 'processing'
  | 'returned'
  | 'dispatched'
  | 'queued'
  | 'sent'
  | 'delivered'
  | 'viewed'

export interface Client {
  id: string
  companyName: string
  contactPerson: string
  email: string
  billingEntity: string
  currency: string
  dispatchRule: string
  validationProfile: string
  status: 'active' | 'inactive' | 'onboarding'
  billingRate: number
}

export interface Timesheet {
  id: string
  clientId: string
  clientName: string
  employees: number
  employeeNames: string[]
  uploadDate: string
  source: 'PDF' | 'Excel' | 'Image' | 'Email' | 'ZIP'
  ocrAccuracy: number
  aiConfidence: number
  riskScore: number
  status: StatusType
  fileName: string
}

export interface VerificationReport {
  id: string
  timesheetId: string
  clientName: string
  employeeValidation: { status: 'pass' | 'warn' | 'fail'; detail: string }
  workingHoursValidation: { status: 'pass' | 'warn' | 'fail'; detail: string }
  projectValidation: { status: 'pass' | 'warn' | 'fail'; detail: string }
  duplicateDetection: { status: 'pass' | 'warn' | 'fail'; detail: string }
  missingFields: { status: 'pass' | 'warn' | 'fail'; detail: string }
  ocrAccuracy: number
  documentQuality: number
  riskScore: number
  aiConfidence: number
  recommendation: string
  aiExplanation: string[]
  evidenceTimeline: EvidenceItem[]
}

export interface EvidenceItem {
  id: string
  label: string
  status: 'pass' | 'warn' | 'fail'
  timestamp: string
}

export interface Invoice {
  id: string
  invoiceNumber: string
  clientId: string
  clientName: string
  timesheetId: string
  amount: number
  gst: number
  grandTotal: number
  generatedDate: string
  billingPeriod: string
  employees: string[]
  totalHours: number
  billingRate: number
  status: StatusType
  dispatchStatus: 'created' | 'queued' | 'sent' | 'delivered' | 'viewed' | 'approved'
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'invoice' | 'upload' | 'review' | 'return' | 'approval'
  timestamp: string
  read: boolean
  link?: string
}

export interface AuditLog {
  id: string
  timestamp: string
  user: string
  action: string
  aiDecision: string
  invoiceId?: string
}

export interface ActivityItem {
  id: string
  title: string
  description: string
  timestamp: string
  type: 'upload' | 'ocr' | 'invoice' | 'dispatch' | 'review' | 'approval'
}

export interface ExceptionItem {
  id: string
  type: string
  count: number
  severity: 'critical' | 'warning' | 'info'
  description: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface Anomaly {
  id: number
  entityType: 'timesheet' | 'invoice'
  entityId: string
  clientId?: string
  anomalyType: string
  severity: 'critical' | 'warning' | 'info'
  description: string
  status: 'open' | 'approved' | 'rejected' | 'waived'
  detectedAt: string
  resolvedBy?: string
  resolutionNote?: string
}

export interface ValidationRuleResult {
  ruleName: string
  passed: boolean
  message: string
  severity: 'critical' | 'warning' | 'info'
}

export interface ReviewDecision {
  id: number
  entityType: string
  entityId: string
  decision: string
  decidedBy: string
  reason: string
  createdAt: string
}
