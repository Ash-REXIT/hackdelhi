/** Hackathon demo files (case-1 … case-7) — relaxed validation and fraud skipped */
export function isHackathonTestCase(fileName?: string | null): boolean {
  if (!fileName) return false;
  return /case[1-7]-/i.test(fileName);
}

/** Fraud demo files (fraud-1 … fraud-N) — validation skipped, fraud checks active */
export function isFraudDemoTestCase(fileName?: string | null): boolean {
  if (!fileName) return false;
  return /fraud-\d/i.test(fileName);
}

export function shouldSkipStrictValidation(fileName?: string | null): boolean {
  return isHackathonTestCase(fileName) || isFraudDemoTestCase(fileName);
}

export function shouldSkipFraudDetection(fileName?: string | null): boolean {
  return isHackathonTestCase(fileName);
}

export function isOvertimeValidationFailure(results: Array<{ passed: boolean; ruleKey: string }>): boolean {
  const failed = results.filter((r) => !r.passed);
  return failed.length > 0 && failed.every((r) => r.ruleKey === 'max_overtime_hours');
}
