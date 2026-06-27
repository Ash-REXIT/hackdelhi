import { config } from '../lib/config';
import type {
  ExtractedTimesheetData,
  FieldConfidence,
  ValidationResult,
  FraudDetectionResult,
  EmployeeMatchResult,
  OcrResult,
} from '../types';

async function aiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${config.aiServiceUrl}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`AI service error (${res.status}): ${text}`);
  }

  return res.json() as Promise<T>;
}

export async function runOcr(filePath: string, mimeType: string): Promise<OcrResult> {
  const formData = new FormData();
  const fileBuffer = await import('fs').then((fs) => fs.promises.readFile(filePath));
  const blob = new Blob([fileBuffer], { type: mimeType });
  formData.append('file', blob, filePath.split(/[/\\]/).pop() || 'document');

  const res = await fetch(`${config.aiServiceUrl}/api/ocr`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OCR failed (${res.status}): ${text}`);
  }

  return res.json() as Promise<OcrResult>;
}

export async function extractTimesheetData(
  ocrText: string,
  fileType: string
): Promise<{ data: ExtractedTimesheetData; confidence: FieldConfidence }> {
  return aiFetch('/api/extract', {
    method: 'POST',
    body: JSON.stringify({ text: ocrText, fileType }),
  });
}

export async function matchEmployee(
  extracted: ExtractedTimesheetData,
  clientId: string
): Promise<EmployeeMatchResult> {
  return aiFetch('/api/match-employee', {
    method: 'POST',
    body: JSON.stringify({ extracted, clientId }),
  });
}

export async function validateTimesheet(
  timesheetId: string,
  extracted: ExtractedTimesheetData,
  clientId: string,
  employeeId?: string
): Promise<{ results: ValidationResult[]; passed: boolean }> {
  return aiFetch('/api/validate', {
    method: 'POST',
    body: JSON.stringify({ timesheetId, extracted, clientId, employeeId }),
  });
}

export async function detectFraud(
  timesheetId: string,
  extracted: ExtractedTimesheetData,
  fileHash?: string
): Promise<FraudDetectionResult> {
  return aiFetch('/api/fraud-detect', {
    method: 'POST',
    body: JSON.stringify({ timesheetId, extracted, fileHash }),
  });
}

export async function explainFlag(
  ruleKey: string,
  context: Record<string, unknown>
): Promise<{ explanation: string; evidence: string; suggestedFix: string }> {
  return aiFetch('/api/explain', {
    method: 'POST',
    body: JSON.stringify({ ruleKey, context }),
  });
}

export async function chatAssistant(
  message: string,
  userId: string,
  role: string,
  clientId?: string | null,
  history?: Array<{ role: string; content: string }>
): Promise<{ reply: string }> {
  return aiFetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ message, userId, role, clientId, history }),
  });
}
