import { prisma } from '../lib/prisma';
import type { ExtractedTimesheetData, FraudDetectionResult } from '../types';
import { normalizePayrollPeriod, parseTotalAmountFromText, cleanEmployeeName } from './localProcessing';

async function resolveEmployeeDbId(
  clientId: string,
  employeeDbId: string | undefined,
  extracted: ExtractedTimesheetData
): Promise<string | undefined> {
  if (employeeDbId) return employeeDbId;
  if (!extracted.employeeId) return undefined;
  const emp = await prisma.employee.findFirst({
    where: { clientId, employeeId: extracted.employeeId },
    select: { id: true },
  });
  return emp?.id;
}

async function lookupPayrollNet(
  employeeDbId: string,
  payrollPeriod: string
): Promise<{ netPay: number; period: string } | null> {
  const normalized = normalizePayrollPeriod(payrollPeriod);
  const candidates = [...new Set([normalized, payrollPeriod, 'June2026', 'June 2026'])];

  for (const period of candidates) {
    const payroll = await prisma.payroll.findFirst({
      where: { employeeId: employeeDbId, period },
    });
    if (payroll?.netPay) {
      return { netPay: Number(payroll.netPay), period };
    }
  }

  const fallback = await prisma.payroll.findFirst({
    where: { employeeId: employeeDbId },
    orderBy: { createdAt: 'desc' },
  });
  if (fallback?.netPay) {
    return { netPay: Number(fallback.netPay), period: fallback.period };
  }
  return null;
}

function riskLevelFromScore(score: number): FraudDetectionResult['riskLevel'] {
  if (score >= 70) return 'CRITICAL';
  if (score >= 50) return 'HIGH';
  if (score >= 25) return 'MEDIUM';
  return 'LOW';
}

export function mergeFraudResults(
  local: FraudDetectionResult,
  remote: FraudDetectionResult
): FraudDetectionResult {
  const reasonMap = new Map<string, FraudDetectionResult['reasons'][0]>();
  for (const r of [...local.reasons, ...remote.reasons]) {
    if (r.checkType === 'clean') continue;
    const existing = reasonMap.get(r.checkType);
    if (!existing || r.score > existing.score) {
      reasonMap.set(r.checkType, r);
    }
  }
  const reasons = Array.from(reasonMap.values());
  const fraudScore = Math.min(100, reasons.reduce((sum, r) => sum + r.score, 0));
  return {
    fraudScore,
    riskLevel: riskLevelFromScore(fraudScore),
    reasons: reasons.length
      ? reasons
      : [{ checkType: 'clean', score: 0, reason: 'No fraud indicators detected' }],
  };
}

export async function detectFraudLocal(
  timesheetId: string,
  extracted: ExtractedTimesheetData,
  fileHash: string | undefined,
  clientId: string,
  employeeDbId: string | undefined,
  ocrText?: string
): Promise<FraudDetectionResult> {
  const reasons: FraudDetectionResult['reasons'] = [];
  let totalScore = 0;

  const overtime = Number(extracted.overtime || 0);
  const workingDays = Number(extracted.workingDays || 0);
  const reimbursements = Number(extracted.reimbursements || 0);
  const payrollPeriod = normalizePayrollPeriod(extracted.payrollPeriod);
  const parsedTotal = parseTotalAmountFromText(ocrText || '');
  const totalAmount = parsedTotal > 0 ? parsedTotal : Number(extracted.totalAmount || 0);
  const resolvedEmployeeId = await resolveEmployeeDbId(clientId, employeeDbId, extracted);
  const documentName = cleanEmployeeName(extracted.employeeName || '');

  if (overtime > 60) {
    const score = Math.min(35, Math.round(overtime - 40));
    reasons.push({
      checkType: 'extreme_overtime',
      score,
      reason: `Extreme overtime detected: ${overtime} hours`,
      evidence: { overtime },
    });
    totalScore += score;
  } else if (overtime > 45) {
    reasons.push({
      checkType: 'elevated_overtime',
      score: 18,
      reason: `Suspicious overtime band: ${overtime} hours`,
      evidence: { overtime },
    });
    totalScore += 18;
  }

  if (workingDays > 31) {
    reasons.push({
      checkType: 'excessive_days',
      score: 40,
      reason: `Impossible day count for June: ${workingDays} working days`,
      evidence: { workingDays },
    });
    totalScore += 40;
  } else if (workingDays > 28) {
    reasons.push({
      checkType: 'excessive_days',
      score: 22,
      reason: `Unusually high working days: ${workingDays}`,
      evidence: { workingDays },
    });
    totalScore += 22;
  } else if (workingDays > 26) {
    reasons.push({
      checkType: 'high_working_days',
      score: 12,
      reason: `Unusually high working days: ${workingDays}`,
      evidence: { workingDays },
    });
    totalScore += 12;
  }

  if (fileHash) {
    const dup = await prisma.timesheetDocument.findFirst({
      where: { fileHash, timesheetId: { not: timesheetId } },
      select: { timesheetId: true, fileName: true },
    });
    if (dup) {
      reasons.push({
        checkType: 'duplicate_document',
        score: 45,
        reason: 'Duplicate document — identical file uploaded previously',
        evidence: { existingTimesheetId: dup.timesheetId, fileName: dup.fileName },
      });
      totalScore += 45;
    }
  }

  const recentCount = await prisma.timesheet.count({
    where: {
      clientId,
      createdAt: { gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    },
  });
  if (recentCount > 5) {
    reasons.push({
      checkType: 'repeated_submissions',
      score: 22,
      reason: `High submission frequency: ${recentCount} uploads in 24 hours`,
      evidence: { count: recentCount },
    });
    totalScore += 22;
  }

  if (resolvedEmployeeId) {
    const prior = await prisma.timesheet.findFirst({
      where: {
        id: { not: timesheetId },
        clientId,
        employeeId: resolvedEmployeeId,
        payrollPeriod: { in: [payrollPeriod, extracted.payrollPeriod || payrollPeriod] },
        status: {
          in: [
            'FRAUD_CHECKED',
            'VALIDATED',
            'INVOICE_GENERATED',
            'DISPATCHED',
            'PAID',
            'PENDING_REVIEW',
          ],
        },
      },
      select: { id: true, status: true },
    });
    if (prior) {
      reasons.push({
        checkType: 'duplicate_period',
        score: 38,
        reason: `Employee already has a timesheet for ${payrollPeriod}`,
        evidence: { existingTimesheetId: prior.id, status: prior.status },
      });
      totalScore += 38;
    }
  }

  if (resolvedEmployeeId && totalAmount > 0) {
    const payroll = await lookupPayrollNet(resolvedEmployeeId, payrollPeriod);
    if (payroll) {
      const netPay = payroll.netPay;
      const diffPct = Math.abs(totalAmount - netPay) / netPay;
      if (diffPct > 0.5) {
        const score = Math.min(40, Math.round(diffPct * 35));
        reasons.push({
          checkType: 'amount_inflation',
          score,
          reason: `Claimed AED ${totalAmount.toLocaleString()} vs payroll net AED ${netPay.toFixed(2)} (${Math.round(diffPct * 100)}% variance)`,
          evidence: {
            claimed: totalAmount,
            payrollNet: netPay,
            payrollPeriod: payroll.period,
            variancePct: Math.round(diffPct * 100),
          },
        });
        totalScore += score;
      } else if (diffPct > 0.25) {
        reasons.push({
          checkType: 'amount_variance',
          score: 15,
          reason: `Payout amount differs from payroll by ${Math.round(diffPct * 100)}%`,
          evidence: { claimed: totalAmount, payrollNet: netPay, payrollPeriod: payroll.period },
        });
        totalScore += 15;
      }
    }
  }

  if (reimbursements > 10000) {
    reasons.push({
      checkType: 'reimbursement_spike',
      score: 30,
      reason: `Unusually large reimbursement claim: AED ${reimbursements.toFixed(2)}`,
      evidence: { reimbursements },
    });
    totalScore += 30;
  } else if (reimbursements > 5000) {
    reasons.push({
      checkType: 'reimbursement_spike',
      score: 18,
      reason: `High reimbursement claim: AED ${reimbursements.toFixed(2)}`,
      evidence: { reimbursements },
    });
    totalScore += 18;
  }

  if (totalAmount >= 5000 && totalAmount % 1000 === 0) {
    reasons.push({
      checkType: 'suspicious_round_amount',
      score: 12,
      reason: `Round-number payout request: AED ${totalAmount.toLocaleString()}`,
      evidence: { totalAmount },
    });
    totalScore += 12;
  }

  if (resolvedEmployeeId && extracted.employeeId && documentName) {
    const emp = await prisma.employee.findUnique({ where: { id: resolvedEmployeeId } });
    if (emp && documentName.toLowerCase() !== emp.name.toLowerCase()) {
      reasons.push({
        checkType: 'identity_mismatch',
        score: 35,
        reason: `Document name "${documentName}" does not match ERP "${emp.name}" for ${extracted.employeeId}`,
        evidence: { documentName, erpName: emp.name },
      });
      totalScore += 35;
    }
  }

  const fraudScore = Math.min(100, totalScore);
  return {
    fraudScore,
    riskLevel: riskLevelFromScore(fraudScore),
    reasons: reasons.length
      ? reasons
      : [{ checkType: 'clean', score: 0, reason: 'No fraud indicators detected' }],
  };
}
