import path from 'path';
import fs from 'fs';
import * as XLSX from 'xlsx';
import { PrismaClient, Prisma } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const prisma = new PrismaClient();

const PROJECT_ROOT = path.resolve(__dirname, '../..');

const EXCEL_CANDIDATES = [
  process.env.SEED_EXCEL_PATH,
  path.join(PROJECT_ROOT, 'data/TASC_Sample_Database_vF_payroll.xlsx'),
  path.join(PROJECT_ROOT, 'data/TASC_Sample_Database_v2_1.xlsx'),
  path.join(PROJECT_ROOT, 'data/TASC_Sample_Database.xlsx'),
].filter(Boolean) as string[];

function resolveExcelPath(): string {
  for (const p of EXCEL_CANDIDATES) {
    const resolved = path.isAbsolute(p) ? p : path.join(PROJECT_ROOT, p.replace(/^\.\//, ''));
    if (fs.existsSync(resolved)) return resolved;
  }
  // Auto-detect any .xlsx in data/ with Customers sheet
  const dataDir = path.join(PROJECT_ROOT, 'data');
  if (fs.existsSync(dataDir)) {
    for (const file of fs.readdirSync(dataDir).filter((f) => f.endsWith('.xlsx'))) {
      const full = path.join(dataDir, file);
      try {
        const wb = XLSX.readFile(full);
        if (wb.Sheets['Customers'] && wb.Sheets['Employees']) return full;
      } catch { /* skip */ }
    }
  }
  return path.join(PROJECT_ROOT, 'data/TASC_Sample_Database_vF_payroll.xlsx');
}

function normalizeKey(key: string): string {
  return key.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_');
}

function rowToObject(row: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(row)) {
    result[normalizeKey(key)] = value;
  }
  return result;
}

function toString(val: unknown): string {
  if (val === null || val === undefined) return '';
  return String(val).trim();
}

function toNumber(val: unknown): number | null {
  if (val === null || val === undefined || val === '') return null;
  const n = Number(String(val).replace(/,/g, ''));
  return isNaN(n) ? null : n;
}

function toDate(val: unknown): Date | null {
  const s = toString(val);
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

function pick(row: Record<string, unknown>, ...keys: string[]): unknown {
  for (const k of keys) {
    if (row[k] !== undefined && row[k] !== null && row[k] !== '') return row[k];
  }
  return undefined;
}

async function seedClients(sheet: XLSX.WorkSheet): Promise<Map<string, string>> {
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);
  const codeToId = new Map<string, string>();

  for (const raw of rows) {
    const row = rowToObject(raw);
    const clientCode = toString(
      pick(row, 'client_code', 'customer_code', 'code', 'cl_code')
    );
    const name = toString(pick(row, 'client_name', 'customer_name', 'name'));
    if (!clientCode || !name) continue;

    const status = toString(pick(row, 'status', 'client_status'));
    const isActive = !status || /^active$/i.test(status);

    const client = await prisma.client.upsert({
      where: { clientCode },
      update: {
        name,
        email: toString(pick(row, 'contact_email', 'email', 'contact')) || null,
        city: toString(pick(row, 'city')) || null,
        industry: toString(pick(row, 'industry')) || null,
        status: status || null,
        currency: toString(pick(row, 'currency')) || 'AED',
        isActive,
      },
      create: {
        clientCode,
        name,
        email: toString(pick(row, 'contact_email', 'email', 'contact')) || null,
        city: toString(pick(row, 'city')) || null,
        industry: toString(pick(row, 'industry')) || null,
        status: status || null,
        currency: toString(pick(row, 'currency')) || 'AED',
        isActive,
      },
    });
    codeToId.set(clientCode, client.id);
  }

  console.log(`✓ Seeded ${codeToId.size} clients`);
  return codeToId;
}

async function seedEmployees(
  sheet: XLSX.WorkSheet,
  clientCodeMap: Map<string, string>
): Promise<void> {
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);
  let count = 0;

  for (const raw of rows) {
    const row = rowToObject(raw);
    const employeeId = toString(
      pick(row, 'emp_id', 'employee_id', 'empid', 'id')
    );
    const name = toString(pick(row, 'full_name', 'name', 'employee_name'));
    const clientCode = toString(pick(row, 'client_code', 'customer_code', 'cl_code'));
    if (!employeeId || !name) continue;

    const clientId = clientCodeMap.get(clientCode);
    if (!clientId) {
      console.warn(`  Skipping ${employeeId}: unknown client ${clientCode}`);
      continue;
    }

    const salaryComponents = {
      basic: toNumber(pick(row, 'basic', 'basic_salary')),
      housing: toNumber(pick(row, 'housing', 'housing_allowance')),
      transport: toNumber(pick(row, 'transport', 'transport_allowance')),
      food: toNumber(pick(row, 'food', 'food_allowance')),
      phone: toNumber(pick(row, 'phone', 'phone_allowance')),
    };

    const totalCtc = toNumber(pick(row, 'total_ctc', 'totalctc', 'ctc'));

    await prisma.employee.upsert({
      where: { clientId_employeeId: { clientId, employeeId } },
      update: {
        name,
        email: toString(pick(row, 'email')) || null,
        designation: toString(pick(row, 'job_title', 'designation', 'title')) || null,
        department: toString(pick(row, 'department')) || null,
        nationality: toString(pick(row, 'nationality')) || null,
        dateOfJoining: toDate(pick(row, 'date_of_joining', 'joining_date', 'doj')),
        iban: toString(pick(row, 'iban')) || null,
        totalCtc,
        salaryComponents: salaryComponents as Prisma.InputJsonValue,
      },
      create: {
        employeeId,
        name,
        clientId,
        email: toString(pick(row, 'email')) || null,
        designation: toString(pick(row, 'job_title', 'designation', 'title')) || null,
        department: toString(pick(row, 'department')) || null,
        nationality: toString(pick(row, 'nationality')) || null,
        dateOfJoining: toDate(pick(row, 'date_of_joining', 'joining_date', 'doj')),
        iban: toString(pick(row, 'iban')) || null,
        totalCtc,
        salaryComponents: salaryComponents as Prisma.InputJsonValue,
      },
    });
    count++;
  }

  console.log(`✓ Seeded ${count} employees`);
}

async function seedPayroll(sheet: XLSX.WorkSheet): Promise<void> {
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);
  let count = 0;
  const period = 'June2026';

  for (const raw of rows) {
    const row = rowToObject(raw);
    const employeeIdStr = toString(pick(row, 'emp_id', 'employee_id', 'empid'));
    const clientCode = toString(pick(row, 'client_code', 'customer_code'));

    let employee = null;
    if (employeeIdStr) {
      employee = await prisma.employee.findFirst({
        where: {
          employeeId: employeeIdStr,
          ...(clientCode ? { client: { clientCode } } : {}),
        },
      });
    }

    if (!employee) {
      console.warn(`  Skipping payroll row: employee not found (${employeeIdStr})`);
      continue;
    }

    const gross = toNumber(pick(row, 'gross', 'gross_pay', 'gross_salary'));
    const netPay = toNumber(pick(row, 'net_pay', 'netpay', 'net'));
    const ot = toNumber(pick(row, 'ot', 'overtime', 'overtime_amount'));
    const deductions = toNumber(pick(row, 'deductions', 'deduction'));
    const baseSalary = gross ?? netPay ?? toNumber(pick(row, 'basic', 'total_ctc')) ?? 0;

    await prisma.payroll.upsert({
      where: { employeeId_period: { employeeId: employee.id, period } },
      update: {
        baseSalary,
        gross,
        overtimeAmount: ot,
        deductions,
        netPay,
        currency: toString(pick(row, 'currency')) || 'AED',
        workingDays: toNumber(pick(row, 'working_days', 'days', 'working_days_june')),
      },
      create: {
        employeeId: employee.id,
        period,
        baseSalary,
        gross,
        overtimeAmount: ot,
        deductions,
        netPay,
        currency: toString(pick(row, 'currency')) || 'AED',
        workingDays: toNumber(pick(row, 'working_days', 'days', 'working_days_june')),
      },
    });
    count++;
  }

  console.log(`✓ Seeded ${count} payroll records`);
}

async function seedDefaultRules(): Promise<void> {
  const existing = await prisma.validationRule.count();

  const defaults = [
    { name: 'Maximum Working Days', ruleKey: 'max_working_days', ruleValue: { value: 26 }, severity: 'error' },
    { name: 'Maximum Overtime Hours', ruleKey: 'max_overtime_hours', ruleValue: { value: 20 }, severity: 'error' },
    { name: 'Required Fields', ruleKey: 'required_fields', ruleValue: { fields: ['employeeId', 'workingDays', 'payrollPeriod'] }, severity: 'error' },
    { name: 'Default Currency', ruleKey: 'currency', ruleValue: { value: 'AED' }, severity: 'error' },
    { name: 'Duplicate Timesheet Check', ruleKey: 'duplicate_timesheet', ruleValue: { enabled: true }, severity: 'error' },
    { name: 'Duplicate Invoice Check', ruleKey: 'duplicate_invoice', ruleValue: { enabled: true }, severity: 'error' },
  ];

  if (existing > 0) {
    await prisma.validationRule.updateMany({
      where: { ruleKey: 'max_overtime_hours' },
      data: { ruleValue: { value: 20 }, severity: 'error', name: 'Maximum Overtime Hours' },
    });
    console.log('✓ Updated overtime validation rule (max 20h, client approval flow)');
    return;
  }

  for (const rule of defaults) {
    await prisma.validationRule.create({ data: rule });
  }

  await prisma.invoiceRule.create({
    data: {
      name: 'Default Dispatch Order',
      ruleType: 'dispatch_order',
      config: { method: 'email', priority: ['email'] },
      priority: 0,
    },
  });

  console.log('✓ Seeded default validation and invoice rules (AED, max 26 days)');
}

async function seedDemoUsers(clientCodeMap: Map<string, string>): Promise<void> {
  const cl001Id = clientCodeMap.get('CL001') || clientCodeMap.values().next().value;

  const users = [
    { email: 'admin@flowinvoice.ai', name: 'FinOps Admin', role: 'FINOPS' as const, clientId: null },
    { email: 'manager@flowinvoice.ai', name: 'Finance Manager', role: 'FINANCE' as const, clientId: null },
    { email: 'user@client.com', name: 'Client User (CL001)', role: 'CLIENT' as const, clientId: cl001Id || null },
    { email: 'finops@tia.local', name: 'FinOps Admin (legacy)', role: 'FINOPS' as const, clientId: null },
    { email: 'finance@tia.local', name: 'Finance Manager (legacy)', role: 'FINANCE' as const, clientId: null },
    { email: 'client@tia.local', name: 'Client User (legacy)', role: 'CLIENT' as const, clientId: cl001Id || null },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: { name: u.name, role: u.role, clientId: u.clientId },
      create: { email: u.email, name: u.name, role: u.role, clientId: u.clientId },
    });
  }

  console.log('✓ Seeded demo users (user@client.com → CL001, admin@flowinvoice.ai → FinOps)');
}

async function clearMasterData(): Promise<void> {
  console.log('==> Clearing existing master data for re-seed...');
  await prisma.auditLog.deleteMany();
  await prisma.fraudLog.deleteMany();
  await prisma.timesheetEntry.deleteMany();
  await prisma.timesheetDocument.deleteMany();
  await prisma.invoiceTimelineEvent.deleteMany().catch(() => {});
  await prisma.invoiceItem.deleteMany().catch(() => {});
  await prisma.dispatchLog.deleteMany().catch(() => {});
  await prisma.invoice.deleteMany();
  await prisma.timesheet.deleteMany();
  await prisma.payroll.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.client.deleteMany();
  await prisma.seedMetadata.deleteMany();
}

async function main(): Promise<void> {
  const reseed = process.argv.includes('--reseed') || process.env.SEED_RESEED === '1';
  const existing = await prisma.seedMetadata.findUnique({ where: { id: 'seed' } });
  if (existing && !reseed) {
    console.log('Database already seeded on', existing.seededAt.toISOString());
    console.log('Source:', existing.source);
    console.log('To re-seed with a new Excel file: npm run db:reseed');
    return;
  }

  if (reseed) {
    await clearMasterData();
  }

  const EXCEL_PATH = resolveExcelPath();
  if (!fs.existsSync(EXCEL_PATH)) {
    console.error(`Excel file not found. Tried:\n  ${EXCEL_CANDIDATES.join('\n  ')}`);
    console.error('\nPlace TASC_Sample_Database_v2_1.xlsx in ./data/');
    process.exit(1);
  }

  console.log('Reading ERP master data from:', EXCEL_PATH);
  const workbook = XLSX.readFile(EXCEL_PATH);

  const customersSheet =
    workbook.Sheets['Customers'] || workbook.Sheets['customers'];
  const employeesSheet =
    workbook.Sheets['Employees'] || workbook.Sheets['employees'];
  const payrollSheet =
    workbook.Sheets['Payroll_June2026'] || workbook.Sheets['payroll_june2026'];

  if (!customersSheet) throw new Error('Customers sheet not found');
  if (!employeesSheet) throw new Error('Employees sheet not found');
  if (!payrollSheet) throw new Error('Payroll_June2026 sheet not found');

  const clientCodeMap = await seedClients(customersSheet);
  await seedEmployees(employeesSheet, clientCodeMap);
  await seedPayroll(payrollSheet);
  await seedDefaultRules();
  await seedDemoUsers(clientCodeMap);

  await prisma.seedMetadata.upsert({
    where: { id: 'seed' },
    update: { source: EXCEL_PATH, version: '2.1', seededAt: new Date() },
    create: { id: 'seed', source: EXCEL_PATH, version: '2.1' },
  });

  console.log('\n✅ Database seed completed (TASC v2.1 schema)');
  console.log('   Run: npm run generate:test-cases  — to create the 7 hackathon test inputs');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
