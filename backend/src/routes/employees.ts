import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { routeParams } from '../lib/request';
import { authenticate, authorize } from '../middleware/auth';
import { computeHourlyRate, computeOvertimeRate } from '../services/payrollRates';

const router = Router();

function mapEmployeeWithRates(employee: {
  id: string;
  employeeId: string;
  name: string;
  hourlyRate: unknown;
  totalCtc: unknown;
  payroll: Array<{
    period: string;
    baseSalary: unknown;
    gross: unknown;
    netPay: unknown;
    hourlyRate: unknown;
    overtimeRate: unknown;
    workingDays: number | null;
    currency: string;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}) {
  const payroll = employee.payroll.map((pay) => {
    const hourlyRate = computeHourlyRate(pay, employee.hourlyRate, employee.totalCtc);
    const overtimeRate = computeOvertimeRate(pay, hourlyRate);
    return { ...pay, hourlyRate, overtimeRate };
  });
  return { ...employee, payroll };
}

router.get('/', authenticate, async (req, res, next) => {
  try {
    const { clientId, search, limit } = req.query;
    const where: Record<string, unknown> = {};

    if (clientId) where.clientId = String(clientId);
    if (search) {
      where.OR = [
        { name: { contains: String(search), mode: 'insensitive' } },
        { employeeId: { contains: String(search), mode: 'insensitive' } },
        { designation: { contains: String(search), mode: 'insensitive' } },
        { department: { contains: String(search), mode: 'insensitive' } },
      ];
    }

    const take = Math.min(parseInt(String(limit || '300'), 10) || 300, 500);

    const employees = await prisma.employee.findMany({
      where,
      include: {
        client: { select: { name: true, clientCode: true, currency: true } },
        payroll: { take: 1, orderBy: { createdAt: 'desc' } },
      },
      orderBy: [{ client: { clientCode: 'asc' } }, { name: 'asc' }],
      take,
    });
    res.json({ success: true, data: employees.map(mapEmployeeWithRates) });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: routeParams(req).id },
      include: { client: true, payroll: true, timesheets: { take: 5, orderBy: { createdAt: 'desc' } } },
    });
    if (!employee) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: employee });
  } catch (err) {
    next(err);
  }
});

export default router;
