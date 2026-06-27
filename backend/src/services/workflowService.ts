import { prisma } from '../lib/prisma';
import { config } from '../lib/config';
import * as aiClient from './aiClient';
import * as local from './localProcessing';
import { generateInvoice } from './invoiceService';
import type { FieldConfidence } from '../types';
import { Prisma } from '@prisma/client';
import crypto from 'crypto';
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
      await prisma.timesheet.update({
        where: { id: timesheetId },
        data: {
          status: 'PENDING_REVIEW',
          exceptionReason: mergeExceptionReasons(ambiguity.reasons, matchResult.warnings),
          extractedData: withAmbiguityMetadata(extracted, ambiguity.reasons, ambiguity.candidates),
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

    // Step 4: Validation
    await prisma.timesheet.update({ where: { id: timesheetId }, data: { status: 'VALIDATING' } });

    let validation: { results: import('../types').ValidationResult[]; passed: boolean };
    try {
      validation = await aiClient.validateTimesheet(
        timesheetId,
        extracted,
        timesheet.clientId,
        employeeId
      );
    } catch {
      validation = await local.localValidate(extracted, timesheet.clientId);
    }

    await prisma.timesheet.update({
      where: { id: timesheetId },
      data: {
        status: validation.passed ? 'VALIDATED' : 'EXCEPTION',
        validationResults: validation.results as unknown as Prisma.InputJsonValue,
        exceptionReason: validation.passed
          ? null
          : mergeExceptionReasons(
              ambiguity.reasons,
              validation.results.filter((r) => !r.passed).map((r) => r.message)
            ),
        extractedData: withAmbiguityMetadata(extracted, ambiguity.reasons, ambiguity.candidates),
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

    // Step 5: Fraud Detection
    await prisma.timesheet.update({ where: { id: timesheetId }, data: { status: 'FRAUD_CHECKING' } });

    let fraud: import('../types').FraudDetectionResult;
    try {
      fraud = await aiClient.detectFraud(timesheetId, extracted, doc.fileHash || undefined);
    } catch {
      fraud = { fraudScore: 0, riskLevel: 'LOW', reasons: [{ checkType: 'clean', score: 0, reason: 'Fraud check skipped (AI offline)' }] };
    }

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
      await prisma.timesheet.update({
        where: { id: timesheetId },
        data: {
          status: 'PENDING_REVIEW',
          exceptionReason: `Fraud risk: ${fraud.riskLevel} (score: ${fraud.fraudScore})`,
        },
      });
      return;
    }

    // Step 6: Auto-invoice or human review
    if (Number(overallConfidence) >= config.autoInvoiceConfidenceThreshold) {
      await generateInvoiceFromTimesheet(timesheetId);
    } else {
      await prisma.timesheet.update({
        where: { id: timesheetId },
        data: {
          status: 'PENDING_REVIEW',
          exceptionReason: `Confidence ${overallConfidence}% below threshold ${config.autoInvoiceConfidenceThreshold}%`,
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
