import { prisma } from '../lib/prisma';
import { config } from '../lib/config';
import * as aiClient from './aiClient';
import * as local from './localProcessing';
import { generateInvoice } from './invoiceService';
import * as validationService from './validationService';
import * as explanationService from './explanationService';
import type { FieldConfidence } from '../types';
import { Prisma } from '@prisma/client';
import crypto from 'crypto';
import { isHackathonTestCase } from '../lib/testCase';
import fs from 'fs/promises';

function mergeExceptionReasons(...groups: Array<string | string[] | undefined | null>): string {
  const parts = groups
    .flatMap((g) => (Array.isArray(g) ? g : g ? [g] : []))
    .map((s) => s.trim())
    .filter(Boolean);
  return [...new Set(parts)].join('; ');
}

async function collectAmbiguityContext(
  ocrText: string,
  extracted: import('../types').ExtractedTimesheetData,
  matchResult: import('../types').EmployeeMatchResult
) {
  const detected = await local.detectAmbiguities(ocrText, extracted);
  const reasons = [
    ...detected.reasons,
    ...(matchResult.warnings?.filter((w) => /ambiguous/i.test(w)) ?? []),
  ];
  const candidates = matchResult.candidates?.length
    ? matchResult.candidates
    : detected.candidates;
  return {
    reasons: [...new Set(reasons)],
    candidates: candidates ?? [],
  };
}

function withAmbiguityMetadata(
  extracted: import('../types').ExtractedTimesheetData,
  reasons: string[],
  candidates: import('../types').EmployeeMatchResult['candidates']
) {
  if (!reasons.length && !candidates?.length) return extracted as object;
  return {
    ...extracted,
    _ambiguityReasons: reasons,
    _matchCandidates: candidates ?? [],
  } as object;
}

async function applyReviewExplanations(
  params: Parameters<typeof explanationService.generateReviewExplanations>[0] & {
    extracted: import('../types').ExtractedTimesheetData;
    ambiguityReasons?: string[];
    candidates?: import('../types').EmployeeMatchResult['candidates'];
  }
) {
  const explanations = await explanationService.generateReviewExplanations(params);
  const extractedData = explanationService.withExplanationMetadata(
    params.extracted,
    explanations,
    {
      ...(params.ambiguityReasons?.length ? { _ambiguityReasons: params.ambiguityReasons } : {}),
      ...(params.candidates?.length ? { _matchCandidates: params.candidates } : {}),
    }
  );
  return { explanations, extractedData };
}

export async function computeFileHash(filePath: string): Promise<string> {
  const buffer = await fs.readFile(filePath);
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

export async function processTimesheet(timesheetId: string): Promise<void> {
  const timesheet = await prisma.timesheet.findUnique({
    where: { id: timesheetId },
    include: { documents: true, client: true },
  });

  if (!timesheet || timesheet.documents.length === 0) {
    throw new Error('Timesheet or documents not found');
  }

  const doc = timesheet.documents[0];

  try {
    // Step 1: OCR
    await prisma.timesheet.update({
      where: { id: timesheetId },
      data: { status: 'OCR_PROCESSING', exceptionReason: null },
    });

    let ocrResult: { text: string; confidence: number };
    try {
      ocrResult = await aiClient.runOcr(doc.filePath, doc.mimeType || doc.fileType);
    } catch (err) {
      console.warn('AI OCR unavailable, using local fallback:', err);
      ocrResult = await local.localOcr(doc.filePath, doc.fileType);
    }

    await prisma.timesheetDocument.update({
      where: { id: doc.id },
      data: { ocrText: ocrResult.text, ocrConfidence: ocrResult.confidence },
    });

    await prisma.timesheet.update({
      where: { id: timesheetId },
      data: { status: 'OCR_COMPLETED' },
    });

    // Step 2: Extraction
    await prisma.timesheet.update({ where: { id: timesheetId }, data: { status: 'EXTRACTING' } });

    let extracted: import('../types').ExtractedTimesheetData;
    let fieldConfidence: FieldConfidence;
    try {
      const result = await aiClient.extractTimesheetData(ocrResult.text, doc.fileType);
      extracted = result.data;
      fieldConfidence = result.confidence;
    } catch (err) {
      console.warn('AI extraction unavailable, using local fallback:', err);
      const result = local.localExtract(ocrResult.text);
      extracted = result.data;
      fieldConfidence = result.confidence;
    }

    const merged = local.mergeExtractionWithOcr(ocrResult.text, extracted, fieldConfidence);
    extracted = merged.data;
    fieldConfidence = merged.confidence;

    await prisma.timesheet.update({
      where: { id: timesheetId },
      data: {
        status: 'EXTRACTED',
        extractedData: extracted as object,
        fieldConfidence: fieldConfidence as object,
        payrollPeriod: extracted.payrollPeriod,
        workingDays: extracted.workingDays,
        overtime: extracted.overtime,
        reimbursements: extracted.reimbursements,
      },
    });

    // Step 3: Employee Matching
    await prisma.timesheet.update({ where: { id: timesheetId }, data: { status: 'MATCHING' } });

    let matchResult: import('../types').EmployeeMatchResult;
    try {
      matchResult = await aiClient.matchEmployee(extracted, timesheet.clientId);
    } catch {
      matchResult = await local.localMatchEmployee(extracted, timesheet.clientId);
    }

    const ambiguity = await collectAmbiguityContext(ocrResult.text, extracted, matchResult);
    const hasAmbiguity = ambiguity.reasons.length > 0;

    if (hasAmbiguity || matchResult.warnings?.some((w) => w.includes('Ambiguous'))) {
      const { explanations, extractedData } = await applyReviewExplanations({
        extracted,
        fieldConfidence,
        ambiguityReasons: ambiguity.reasons,
        candidates: ambiguity.candidates,
        reviewType: 'ambiguity',
      });
      await prisma.timesheet.update({
        where: { id: timesheetId },
        data: {
          status: 'PENDING_REVIEW',
          exceptionReason: mergeExceptionReasons(explanations.summary, ambiguity.reasons, matchResult.warnings),
          extractedData: extractedData as object,
          fieldConfidence: fieldConfidence as object,
          workingDays: extracted.workingDays,
        },
      });
      return;
    }

    let employeeId: string | undefined;
    if (matchResult.matched && matchResult.employeeId) {
      const employee = await prisma.employee.findFirst({
        where: {
          clientId: timesheet.clientId,
          employeeId: matchResult.employeeId,
        },
      });
      employeeId = employee?.id;
    }

    const overallConfidence = computeOverallConfidence(fieldConfidence, matchResult.confidence);

    await prisma.timesheet.update({
      where: { id: timesheetId },
      data: {
        status: 'MATCHED',
        employeeId,
        overallConfidence,
      },
    });

    // Step 4: Validation (skipped for hackathon test-case files)
    await prisma.timesheet.update({ where: { id: timesheetId }, data: { status: 'VALIDATING' } });

    const validation = await validationService.runValidation(
      timesheetId,
      extracted,
      timesheet.clientId,
      employeeId,
      doc.fileName,
      ocrResult.text
    );

    if (validation.requiresClientApproval) {
      const { explanations, extractedData } = await applyReviewExplanations({
        extracted,
        fieldConfidence,
        failedValidation: validation.results,
        ambiguityReasons: ambiguity.reasons,
        candidates: ambiguity.candidates,
        reviewType: 'client_overtime',
      });
      await prisma.timesheet.update({
        where: { id: timesheetId },
        data: {
          status: 'PENDING_CLIENT_APPROVAL',
          validationResults: validation.results as unknown as Prisma.InputJsonValue,
          exceptionReason: mergeExceptionReasons(
            'Overtime exceeds policy — sent to client for approval',
            explanations.summary,
            validation.results.filter((r) => !r.passed).map((r) => r.message)
          ),
          extractedData: extractedData as object,
        },
      });
      await prisma.auditLog.create({
        data: {
          action: 'TIMESHEET_PENDING_CLIENT_APPROVAL',
          entity: 'timesheet',
          entityId: timesheetId,
          details: { reason: 'max_overtime_hours', overtime: extracted.overtime } as object,
        },
      });
      return;
    }

    const validationFailed = !validation.passed;
    let reviewExplanations: Awaited<ReturnType<typeof applyReviewExplanations>> | null = null;
    if (validationFailed) {
      reviewExplanations = await applyReviewExplanations({
        extracted,
        fieldConfidence,
        failedValidation: validation.results,
        ambiguityReasons: ambiguity.reasons,
        candidates: ambiguity.candidates,
        reviewType: 'validation_failed',
      });
    }

    await prisma.timesheet.update({
      where: { id: timesheetId },
      data: {
        status: validation.passed ? 'VALIDATED' : 'EXCEPTION',
        validationResults: validation.results as unknown as Prisma.InputJsonValue,
        exceptionReason: validation.passed
          ? null
          : mergeExceptionReasons(
              reviewExplanations?.explanations.summary,
              ambiguity.reasons,
              validation.results.filter((r) => !r.passed).map((r) => r.message)
            ),
        extractedData: (reviewExplanations?.extractedData ??
          withAmbiguityMetadata(extracted, ambiguity.reasons, ambiguity.candidates)) as object,
      },
    });

    if (!validation.passed) {
      await prisma.auditLog.create({
        data: {
          action: 'TIMESHEET_VALIDATION_FAILED',
          entity: 'timesheet',
          entityId: timesheetId,
          details: { results: validation.results } as unknown as Prisma.InputJsonValue,
        },
      });
      return;
    }

    // Step 5: Fraud Detection (skipped for hackathon test-case files)
    await prisma.timesheet.update({ where: { id: timesheetId }, data: { status: 'FRAUD_CHECKING' } });

    const fraud = await validationService.runFraudDetection(
      timesheetId,
      extracted,
      doc.fileHash || undefined,
      doc.fileName
    );

    for (const reason of fraud.reasons) {
      await prisma.fraudLog.create({
        data: {
          timesheetId,
          checkType: reason.checkType,
          score: reason.score,
          riskLevel: fraud.riskLevel,
          reason: reason.reason,
          evidence: reason.evidence as object,
        },
      });
    }

    await prisma.timesheet.update({
      where: { id: timesheetId },
      data: {
        status: 'FRAUD_CHECKED',
        fraudScore: fraud.fraudScore,
        fraudRiskLevel: fraud.riskLevel,
        fraudReasons: fraud.reasons as object,
      },
    });

    if (fraud.riskLevel === 'HIGH' || fraud.riskLevel === 'CRITICAL') {
      const { explanations, extractedData } = await applyReviewExplanations({
        extracted,
        fieldConfidence,
        fraud,
        failedValidation: validation.results,
        ambiguityReasons: ambiguity.reasons,
        reviewType: 'fraud',
      });
      await prisma.timesheet.update({
        where: { id: timesheetId },
        data: {
          status: 'PENDING_REVIEW',
          exceptionReason: explanations.summary,
          extractedData: extractedData as object,
        },
      });
      return;
    }

    // Step 6: Auto-invoice or human review
    const confidenceThreshold = isHackathonTestCase(doc.fileName)
      ? 70
      : config.autoInvoiceConfidenceThreshold;

    if (Number(overallConfidence) >= confidenceThreshold) {
      await generateInvoiceFromTimesheet(timesheetId);
    } else {
      const { explanations, extractedData } = await applyReviewExplanations({
        extracted,
        fieldConfidence,
        overallConfidence: Number(overallConfidence),
        confidenceThreshold,
        fraud,
        ambiguityReasons: ambiguity.reasons,
        reviewType: 'low_confidence',
      });
      await prisma.timesheet.update({
        where: { id: timesheetId },
        data: {
          status: 'PENDING_REVIEW',
          exceptionReason: explanations.summary,
          extractedData: extractedData as object,
        },
      });
    }
  } catch (error) {
    await prisma.timesheet.update({
      where: { id: timesheetId },
      data: {
        status: 'EXCEPTION',
        exceptionReason: error instanceof Error ? error.message : 'Processing failed',
      },
    });
    throw error;
  }
}

function computeOverallConfidence(
  fieldConfidence: FieldConfidence,
  matchConfidence: number
): number {
  const values = Object.values(fieldConfidence) as number[];
  const avgField = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  return Math.round((avgField * 0.7 + matchConfidence * 0.3) * 100) / 100;
}

export async function generateInvoiceFromTimesheet(timesheetId: string) {
  const invoice = await generateInvoice(timesheetId);
  await prisma.timesheet.update({
    where: { id: timesheetId },
    data: { status: 'INVOICE_GENERATED', processedAt: new Date() },
  });
  return invoice;
}

export async function approveTimesheetReview(timesheetId: string, reviewerId: string) {
  await prisma.timesheet.update({
    where: { id: timesheetId },
    data: { status: 'APPROVED', reviewedBy: reviewerId, reviewedAt: new Date() },
  });
  return generateInvoiceFromTimesheet(timesheetId);
}

export async function rejectTimesheetReview(timesheetId: string, reviewerId: string, reason: string) {
  return prisma.timesheet.update({
    where: { id: timesheetId },
    data: {
      status: 'REJECTED',
      reviewedBy: reviewerId,
      reviewedAt: new Date(),
      exceptionReason: reason,
    },
  });
}
