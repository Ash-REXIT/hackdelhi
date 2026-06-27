export interface ExtractedTimesheetData {
  employeeId?: string;
  employeeName?: string;
  clientCode?: string;
  workingDays?: number;
  overtime?: number;
  reimbursements?: number;
  payrollPeriod?: string;
}

export interface FieldConfidence {
  [field: string]: number;
}

export interface ValidationResult {
  passed: boolean;
  ruleKey: string;
  ruleName: string;
  severity: 'error' | 'warning' | 'info';
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
  candidates?: Array<{
    employeeId: string;
    name: string;
    clientCode: string;
    clientName: string;
  }>;
}

export interface OcrResult {
  text: string;
  confidence: number;
}
