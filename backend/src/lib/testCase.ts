/** Hackathon demo files under data/test-cases — relaxed validation/fraud */
export function isHackathonTestCase(fileName?: string | null): boolean {
  if (!fileName) return false;
  return /case[1-7]-/i.test(fileName);
}

export function isOvertimeValidationFailure(results: Array<{ passed: boolean; ruleKey: string }>): boolean {
  const failed = results.filter((r) => !r.passed);
  return failed.length > 0 && failed.every((r) => r.ruleKey === 'max_overtime_hours');
}
