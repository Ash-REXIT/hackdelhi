import * as aiClient from './aiClient';
import type { ExtractedTimesheetData, FieldConfidence, ValidationResult, FraudDetectionResult } from '../types';

export interface FlaggedField {
  field: string;
  confidence: number;
  issue: string;
}

export interface ReviewExplanations {
  summary: string;
  validationExplanation: string;
  fraudExplanation: string;
  confidenceExplanation: string;
  flaggedFields: FlaggedField[];
  enhanced?: boolean;
  provider?: string;
}

export interface ReviewContextParams {
  extracted: ExtractedTimesheetData;
  fieldConfidence: FieldConfidence;
  overallConfidence?: number;
  confidenceThreshold?: number;
  failedValidation?: ValidationResult[];
  fraud?: FraudDetectionResult;
  ambiguityReasons?: string[];
  matchCandidates?: Array<{ employeeId: string; name: string; clientCode: string; clientName?: string }>;
  reviewType: string;
}

export function resolveReviewType(input: {
  status: string;
  fraudRiskLevel?: string | null;
  validationResults?: ValidationResult[] | null;
  ambiguityReasons?: string[];
  overallConfidence?: number | null;
  confidenceThreshold: number;
}): string {
  if (input.status === 'PENDING_CLIENT_APPROVAL') return 'client_overtime';
  if (input.fraudRiskLevel === 'HIGH' || input.fraudRiskLevel === 'CRITICAL') return 'fraud';
  if (input.validationResults?.some((r) => !r.passed)) return 'validation_failed';
  if (input.ambiguityReasons?.length) return 'ambiguity';
  if (input.overallConfidence != null && input.overallConfidence < input.confidenceThreshold) return 'low_confidence';
  return 'review';
}

const FIELD_LABELS: Record<string, string> = {
  employeeId: 'Employee ID',
  employeeName: 'Employee Name',
  clientCode: 'Client Code',
  workingDays: 'Working Days',
  overtime: 'Overtime',
  reimbursements: 'Reimbursements',
  payrollPeriod: 'Payroll Period',
};

const CORE_FIELDS = ['employeeId', 'employeeName', 'clientCode', 'workingDays', 'payrollPeriod'] as const;

export function buildFlaggedFields(
  extracted: ExtractedTimesheetData,
  fieldConfidence: FieldConfidence
): FlaggedField[] {
  const flagged: FlaggedField[] = [];
  const seen = new Set<string>();

  for (const [field, conf] of Object.entries(fieldConfidence)) {
    if (conf < 85) {
      const val = extracted[field as keyof ExtractedTimesheetData];
      const empty = val === '' || val === 0 || val == null;
      flagged.push({
        field,
        confidence: conf,
        issue: empty
          ? `${FIELD_LABELS[field] || field} was not extracted from the document`
          : `${FIELD_LABELS[field] || field} has low extraction confidence (${conf}%)`,
      });
      seen.add(field);
    }
  }

  for (const field of CORE_FIELDS) {
    if (seen.has(field)) continue;
    const val = extracted[field];
    if (val === '' || val === 0 || val == null) {
      flagged.push({
        field,
        confidence: fieldConfidence[field] ?? 0,
        issue: `${FIELD_LABELS[field]} is missing — not found in the source document`,
      });
    }
  }

  return flagged;
}

export function buildLocalExplanations(params: {
  extracted: ExtractedTimesheetData;
  fieldConfidence: FieldConfidence;
  overallConfidence?: number;
  confidenceThreshold?: number;
  failedValidation?: ValidationResult[];
  fraud?: FraudDetectionResult;
  ambiguityReasons?: string[];
  reviewType: string;
}): ReviewExplanations {
  const flaggedFields = buildFlaggedFields(params.extracted, params.fieldConfidence);
  const failed = params.failedValidation?.filter((r) => !r.passed) ?? [];
  const fraudHits = params.fraud?.reasons?.filter((r) => (r.score ?? 0) > 0) ?? [];

  const validationExplanation = failed.length
    ? failed.map((r) => `${r.ruleName}: ${r.message}${r.suggestedFix ? ` — Fix: ${r.suggestedFix}` : ''}`).join(' ')
    : 'All configured business validation rules passed.';

  const fraudExplanation = fraudHits.length
    ? fraudHits
        .map((r) => `${r.checkType?.replace(/_/g, ' ')}: ${r.reason} (risk score +${r.score})`)
        .join(' ')
    : params.fraud?.riskLevel && params.fraud.riskLevel !== 'LOW'
      ? `Fraud risk level ${params.fraud.riskLevel} (aggregate score ${params.fraud.fraudScore}) but no individual high-risk signals.`
      : 'No fraud indicators detected — document appears clean.';

  const confidenceExplanation =
    flaggedFields.length > 0
      ? `Low confidence driven by: ${flaggedFields.map((f) => f.issue).join('; ')}.`
      : params.overallConfidence != null && params.confidenceThreshold != null
        ? `Overall confidence ${params.overallConfidence}% is below the ${params.confidenceThreshold}% auto-invoice threshold. Field extraction scores were acceptable but employee match confidence may have reduced the combined score.`
        : 'Confidence scores were within acceptable range.';

  let summary = '';
  switch (params.reviewType) {
    case 'low_confidence':
      summary = `This timesheet was routed to manual review because the AI extraction confidence (${params.overallConfidence}%) is below the ${params.confidenceThreshold}% threshold. ${confidenceExplanation}`;
      break;
    case 'validation_failed':
      summary = `Validation failed: ${validationExplanation}`;
      break;
    case 'fraud':
      summary = `Elevated fraud risk detected (${params.fraud?.riskLevel}, score ${params.fraud?.fraudScore}). ${fraudExplanation}`;
      break;
    case 'ambiguity':
      summary = `Employee or client assignment is ambiguous. ${(params.ambiguityReasons ?? []).join(' ')}`;
      break;
    case 'client_overtime':
      summary = `Overtime exceeds client policy and requires client approval before invoicing. ${validationExplanation}`;
      break;
    default:
      summary = `Manual review required. ${validationExplanation}`;
  }

  if (params.ambiguityReasons?.length && params.reviewType !== 'ambiguity') {
    summary += ` Ambiguity: ${params.ambiguityReasons.join('; ')}.`;
  }

  return { summary, validationExplanation, fraudExplanation, confidenceExplanation, flaggedFields };
}

export async function enhanceReviewExplanations(
  params: ReviewContextParams
): Promise<ReviewExplanations> {
  const local = buildLocalExplanations(params);

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 50000);
    const ai = await aiClient.enhanceReview(
      {
        reviewType: params.reviewType,
        extracted: params.extracted,
        fieldConfidence: params.fieldConfidence,
        overallConfidence: params.overallConfidence,
        confidenceThreshold: params.confidenceThreshold,
        failedValidation: params.failedValidation?.filter((r) => !r.passed),
        fraudReasons: params.fraud?.reasons,
        fraudRiskLevel: params.fraud?.riskLevel,
        fraudScore: params.fraud?.fraudScore,
        ambiguityReasons: params.ambiguityReasons,
        flaggedFields: local.flaggedFields,
        matchCandidates: params.matchCandidates,
      },
      controller.signal
    );
    clearTimeout(timer);

    return {
      summary: ai.summary || local.summary,
      validationExplanation: ai.validationExplanation || local.validationExplanation,
      fraudExplanation: ai.fraudExplanation || local.fraudExplanation,
      confidenceExplanation: ai.confidenceExplanation || local.confidenceExplanation,
      flaggedFields: local.flaggedFields,
      enhanced: true,
      provider: ai.provider || 'ollama',
    };
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : 'AI enhancement failed');
  }
}

export async function generateReviewExplanations(params: ReviewContextParams & { useAi?: boolean }): Promise<ReviewExplanations> {
  const local = buildLocalExplanations(params);

  if (!params.useAi) {
    return local;
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const ai = await aiClient.explainReview(
      {
        reviewType: params.reviewType,
        extracted: params.extracted,
        fieldConfidence: params.fieldConfidence,
        overallConfidence: params.overallConfidence,
        confidenceThreshold: params.confidenceThreshold,
        failedValidation: params.failedValidation?.filter((r) => !r.passed),
        fraudReasons: params.fraud?.reasons,
        fraudRiskLevel: params.fraud?.riskLevel,
        fraudScore: params.fraud?.fraudScore,
        ambiguityReasons: params.ambiguityReasons,
        flaggedFields: local.flaggedFields,
      },
      controller.signal
    );
    clearTimeout(timer);
    return {
      summary: ai.summary || local.summary,
      validationExplanation: ai.validationExplanation || local.validationExplanation,
      fraudExplanation: ai.fraudExplanation || local.fraudExplanation,
      confidenceExplanation: ai.confidenceExplanation || local.confidenceExplanation,
      flaggedFields: local.flaggedFields,
    };
  } catch {
    return local;
  }
}

export function withExplanationMetadata(
  extracted: ExtractedTimesheetData,
  explanations: ReviewExplanations,
  extra?: Record<string, unknown>
) {
  return {
    ...extracted,
    ...extra,
    _aiReviewSummary: explanations.summary,
    _aiValidationExplanation: explanations.validationExplanation,
    _aiFraudExplanation: explanations.fraudExplanation,
    _aiConfidenceExplanation: explanations.confidenceExplanation,
    _flaggedFields: explanations.flaggedFields,
    _aiEnhanced: explanations.enhanced ?? false,
    _aiEnhanceProvider: explanations.provider ?? null,
  };
}
