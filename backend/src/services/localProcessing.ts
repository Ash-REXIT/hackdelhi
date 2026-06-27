import fs from 'fs/promises';
import path from 'path';
import * as XLSX from 'xlsx';
import { prisma } from '../lib/prisma';
import type {
  ExtractedTimesheetData,
  FieldConfidence,
  EmployeeMatchResult,
  OcrResult,
  ValidationResult,
} from '../types';

export async function localOcr(filePath: string, fileType: string): Promise<OcrResult> {
  const ext = (fileType || path.extname(filePath)).replace('.', '').toLowerCase();

  if (ext === 'txt' || ext === 'eml') {
    const text = await fs.readFile(filePath, 'utf8');
    return { text, confidence: 99 };
  }

  if (ext === 'xlsx' || ext === 'xls') {
    const wb = XLSX.readFile(filePath);
    const lines: string[] = [];
    for (const name of wb.SheetNames) {
      lines.push(`--- ${name} ---`);
      const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(wb.Sheets[name]);
      for (const row of rows) {
        lines.push(Object.entries(row).map(([k, v]) => `${k}: ${v}`).join(' | '));
      }
    }
    return { text: lines.join('\n'), confidence: 98 };
  }

  return { text: await fs.readFile(filePath, 'utf8').catch(() => ''), confidence: 50 };
}

export function localExtract(ocrText: string): { data: ExtractedTimesheetData; confidence: FieldConfidence } {
  const data: ExtractedTimesheetData = {
    employeeId: '',
    employeeName: '',
    clientCode: '',
    workingDays: 0,
    overtime: 0,
    reimbursements: 0,
    payrollPeriod: 'June2026',
  };
  const confidence: FieldConfidence = {};

  const empId = ocrText.match(/(?:employee\s*id|emp\s*id|empid)[:\s]+([A-Z0-9]+)/i);
  if (empId) {
    data.employeeId = empId[1];
    confidence.employeeId = 90;
  }

  const name =
    ocrText.match(/(?:employee\s*name|name)[:\s]+([A-Za-z\s.'-]+)/i) ||
    ocrText.match(/Please invoice for\s+([A-Za-z\s.'-]+),/i) ||
    ocrText.match(/Employee Name:\s*([A-Za-z\s.'-]+)/i);
  if (name) {
    data.employeeName = name[1].trim().split('\n')[0].trim();
    confidence.employeeName = 85;
  }

  const daysWorked = ocrText.match(/(\d+)\s*days?\s*worked/i);
  if (daysWorked) {
    data.workingDays = parseInt(daysWorked[1], 10);
    confidence.workingDays = 88;
  } else {
    const days = ocrText.match(/(?:working\s*days|days\s*worked|days)[:\s]+(\d+)/i);
    if (days) {
      data.workingDays = parseInt(days[1], 10);
      confidence.workingDays = 88;
    }
  }

  if (/mixed\s+assignment|correct\s+placement|ambiguous/i.test(ocrText)) {
    data.clientCode = '';
  } else {
    const client =
      ocrText.match(/(?:client\s*code)[:\s]+(CL\d+)/i) ||
      ocrText.match(/Client:\s*([A-Za-z\s]+(?:LLC|Ltd)?)/i);
    if (client) {
      data.clientCode = client[1].trim().length <= 6 ? client[1].trim() : '';
      if (!data.clientCode) confidence.clientName = 80;
      else confidence.clientCode = 88;
    }
  }

  const ot = ocrText.match(/(?:overtime|ot)[:\s]+(\d+\.?\d*)/i);
  if (ot) {
    data.overtime = parseFloat(ot[1]);
    confidence.overtime = 85;
  }

  const reimb = [...ocrText.matchAll(/AED\s*([\d,.]+)/gi)];
  if (reimb.length > 1) {
    data.reimbursements = parseFloat(reimb[reimb.length - 1][1].replace(/,/g, ''));
    confidence.reimbursements = 75;
  }

  const period = ocrText.match(/(?:period|month|june)[:\s]*(June\s*2026|June2026)/i);
  if (period) {
    data.payrollPeriod = 'June2026';
    confidence.payrollPeriod = 92;
  }

  for (const key of Object.keys(data)) {
    if (!(key in confidence)) confidence[key] = 40;
  }

  return { data, confidence };
}

export async function getAmbiguousCandidates(employeeName?: string) {
  if (!employeeName) return [];

  return prisma.employee.findMany({
    where: { name: { equals: employeeName, mode: 'insensitive' } },
    include: { client: { select: { name: true, clientCode: true } } },
    orderBy: { employeeId: 'asc' },
  });
}

export async function detectAmbiguities(
  ocrText: string,
  extracted: ExtractedTimesheetData
): Promise<{ reasons: string[]; candidates: EmployeeMatchResult['candidates'] }> {
  const reasons: string[] = [];

  if (/mixed\s+assignment|correct\s+placement|ambiguous\s+placement/i.test(ocrText)) {
    reasons.push(
      'Ambiguous client placement: document asks to match the correct placement (mixed assignment)'
    );
  }

  const matches = await getAmbiguousCandidates(extracted.employeeName);
  const candidates =
    matches.length > 1
      ? matches.map((e) => ({
          employeeId: e.employeeId,
          name: e.name,
          clientCode: e.client.clientCode,
          clientName: e.client.name,
        }))
      : [];

  if (candidates.length > 1) {
    const summary = candidates
      .map((c) => `${c.employeeId} @ ${c.clientCode} (${c.clientName})`)
      .join('; ');
    reasons.push(
      `Ambiguous employee name "${extracted.employeeName}": ${candidates.length} matches in ERP — ${summary}`
    );
  }

  return { reasons, candidates };
}

export async function localMatchEmployee(
  extracted: ExtractedTimesheetData,
  clientId: string
): Promise<EmployeeMatchResult> {
  if (extracted.employeeId) {
    const emp = await prisma.employee.findFirst({
      where: { clientId, employeeId: extracted.employeeId },
    });
    if (emp) {
      return {
        matched: true,
        employeeId: emp.employeeId,
        employeeName: emp.name,
        confidence: 99,
        matchType: 'exact_id',
      };
    }
  }

  if (extracted.employeeName) {
    const globalMatches = await getAmbiguousCandidates(extracted.employeeName);
    const globalCandidates = globalMatches.map((e) => ({
      employeeId: e.employeeId,
      name: e.name,
      clientCode: e.client.clientCode,
      clientName: e.client.name,
    }));

    if (globalCandidates.length > 1) {
      return {
        matched: false,
        confidence: 42,
        matchType: 'no_match',
        warnings: [
          `Ambiguous name: ${extracted.employeeName} — ${globalCandidates.length} employees with this name across clients`,
        ],
        candidates: globalCandidates,
      };
    }

    const candidates = await prisma.employee.findMany({
      where: {
        clientId,
        name: { contains: extracted.employeeName.split(' ')[0], mode: 'insensitive' },
      },
      include: { client: { select: { name: true, clientCode: true } } },
    });

    const exact = candidates.filter(
      (e) => e.name.toLowerCase() === extracted.employeeName!.toLowerCase()
    );
    if (exact.length === 1) {
      return {
        matched: true,
        employeeId: exact[0].employeeId,
        employeeName: exact[0].name,
        confidence: 92,
        matchType: 'name_match',
      };
    }
    if (exact.length > 1 || candidates.length > 1) {
      const scoped = exact.length > 1 ? exact : candidates;
      return {
        matched: false,
        confidence: 45,
        matchType: 'no_match',
        warnings: [`Ambiguous name: ${extracted.employeeName} (${scoped.length} candidates at this client)`],
        candidates: scoped.map((e) => ({
          employeeId: e.employeeId,
          name: e.name,
          clientCode: e.client?.clientCode ?? '',
          clientName: e.client?.name ?? '',
        })),
      };
    }
    if (candidates.length === 1) {
      return {
        matched: true,
        employeeId: candidates[0].employeeId,
        employeeName: candidates[0].name,
        confidence: 78,
        matchType: 'fuzzy_match',
        warnings: ['Fuzzy name match'],
      };
    }
  }

  return {
    matched: false,
    confidence: 20,
    matchType: 'no_match',
    warnings: ['No matching employee found'],
  };
}

export async function localValidate(
  extracted: ExtractedTimesheetData,
  clientId: string
): Promise<{ results: ValidationResult[]; passed: boolean }> {
  const results: ValidationResult[] = [];
  let passed = true;

  if (!extracted.workingDays || extracted.workingDays <= 0) {
    results.push({
      passed: false,
      ruleKey: 'required_fields',
      ruleName: 'Working Days',
      severity: 'error',
      message: 'Working days missing or zero',
      suggestedFix: 'Enter working days from the document',
    });
    passed = false;
  }

  if (!extracted.employeeId && !extracted.employeeName) {
    results.push({
      passed: false,
      ruleKey: 'required_fields',
      ruleName: 'Employee',
      severity: 'error',
      message: 'No employee identifier extracted',
      suggestedFix: 'Provide employee name or ID',
    });
    passed = false;
  }

  const client = await prisma.client.findUnique({ where: { id: clientId } });
  if (client && extracted.workingDays && extracted.workingDays > 26) {
    results.push({
      passed: false,
      ruleKey: 'max_working_days',
      ruleName: 'Maximum Working Days',
      severity: 'error',
      message: `Working days ${extracted.workingDays} exceeds June maximum (26)`,
      suggestedFix: 'Verify day count',
    });
    passed = false;
  }

  if (passed) {
    results.push({
      passed: true,
      ruleKey: 'all_checks',
      ruleName: 'Validation',
      severity: 'info',
      message: 'Local validation passed',
    });
  }

  return { results, passed };
}
