type PayrollLike = {
  gross?: unknown;
  baseSalary?: unknown;
  netPay?: unknown;
  hourlyRate?: unknown;
  overtimeRate?: unknown;
  workingDays?: number | null;
};

export function computeHourlyRate(
  payroll: PayrollLike | null | undefined,
  employeeHourlyRate?: unknown,
  employeeCtc?: unknown
): number | null {
  if (payroll?.hourlyRate != null && Number(payroll.hourlyRate) > 0) {
    return Number(payroll.hourlyRate);
  }
  if (employeeHourlyRate != null && Number(employeeHourlyRate) > 0) {
    return Number(employeeHourlyRate);
  }

  const workingDays = payroll?.workingDays && payroll.workingDays > 0 ? payroll.workingDays : 22;
  const gross = Number(payroll?.gross ?? payroll?.baseSalary ?? payroll?.netPay ?? employeeCtc ?? 0);
  if (gross > 0 && workingDays > 0) {
    return gross / (workingDays * 8);
  }
  return null;
}

export function computeOvertimeRate(
  payroll: PayrollLike | null | undefined,
  hourlyRate: number | null
): number | null {
  if (payroll?.overtimeRate != null && Number(payroll.overtimeRate) > 0) {
    return Number(payroll.overtimeRate);
  }
  if (hourlyRate && hourlyRate > 0) {
    return hourlyRate * 1.5;
  }
  return null;
}

export function enrichPayrollRecord<T extends PayrollLike>(payroll: T): T & { hourlyRate: number | null; overtimeRate: number | null } {
  const hourlyRate = computeHourlyRate(payroll);
  const overtimeRate = computeOvertimeRate(payroll, hourlyRate);
  return { ...payroll, hourlyRate, overtimeRate };
}
