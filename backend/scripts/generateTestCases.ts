/**
 * Generates the 7 AI Invoicing Challenge test-case inputs from seeded ERP data.
 * Run after db:seed — npm run generate:test-cases
 *
 * Outputs to data/test-cases/case-{1..7}/
 */
import path from 'path';
import fs from 'fs';
import * as XLSX from 'xlsx';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const prisma = new PrismaClient();
const OUT_DIR = path.resolve(__dirname, '../../data/test-cases');

// Ambiguity examples from hackathon brief
const AMBIGUOUS = {
  aisha: { name: 'Aisha Al Zaabi', ids: ['EMP10058', 'EMP10072', 'EMP10077'] },
  fatima: { name: 'Fatima Khan', ids: ['EMP10083', 'EMP10093'] },
  ravi: { name: 'Ravi Menon', ids: ['EMP10070', 'EMP10136', 'EMP10157'] },
  control: { name: 'Carlos Smith', ids: ['EMP10001'] },
};

async function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeText(caseDir: string, filename: string, content: string) {
  fs.writeFileSync(path.join(caseDir, filename), content, 'utf8');
}

async function getEmployee(employeeId: string) {
  return prisma.employee.findFirst({
    where: { employeeId },
    include: { client: true, payroll: { where: { period: 'June2026' } } },
  });
}

async function getClientEmployees(clientCode: string, limit = 5) {
  return prisma.employee.findMany({
    where: { client: { clientCode } },
    include: { client: true },
    take: limit,
  });
}

/** Case 1: Email payout request — name + client, NO Emp ID */
async function case1(dir: string) {
  const emp = await getEmployee('EMP10001') || await prisma.employee.findFirst({ include: { client: true } });
  if (!emp) return;

  const workingDays = 22;
  const total = Number(emp.payroll?.[0]?.netPay || emp.totalCtc || 12000);

  writeText(dir, 'case1-email-payout.txt', `From: accounts@${emp.client.name.toLowerCase().replace(/\s+/g, '')}.com
To: billing@tasc.com
Subject: Payout Request — June 2026

Dear TASC Finance,

Please process the June 2026 payout for:

Employee Name: ${emp.name}
Client: ${emp.client.name}
Period: June 2026
Working Days: ${workingDays}
Total Amount: AED ${total.toFixed(2)}

Regards,
${emp.client.name} Accounts
`);

  // Ambiguous variant (no client code, duplicate name)
  writeText(dir, 'case1-ambiguous-aisha.txt', `From: billing@client.com
Subject: Timesheet payout June 2026

Please invoice for Aisha Al Zaabi, 24 days worked in June 2026.
Client: mixed assignment — please match to correct placement.
Total estimated: AED 14,500.00
`);
}

/** Case 2: Email from employee — Emp ID + days, NO client */
async function case2(dir: string) {
  const emp = await getEmployee('EMP10002') || await prisma.employee.findFirst({ include: { client: true } });
  if (!emp) return;

  const num = emp.employeeId.replace(/\D/g, '');
  const sender = `emp${num}@test.com`;

  writeText(dir, 'case2-email-employee.txt', `From: ${sender}
To: timesheets@tasc.com
Subject: My June timesheet

Hi,

This is my timesheet submission for June 2026.
Employee ID: ${emp.employeeId}
Days worked: 23

Thanks,
${emp.name}
`);
}

/** Case 3: Email from client — list of names + days, NO Emp IDs */
async function case3(dir: string) {
  const staff = await getClientEmployees('CL001', 6);
  if (!staff.length) return;
  const client = staff[0].client;

  const lines = staff.map((e, i) => `  ${i + 1}. ${e.name} — ${20 + (i % 5)} days`).join('\n');

  writeText(dir, 'case3-email-client-list.txt', `From: hr@${client.clientCode.toLowerCase()}.ae
To: invoicing@tasc.com
Subject: June 2026 timesheets — ${client.name}

Client: ${client.name} (${client.clientCode})
Period: June 2026

Staff timesheet summary:
${lines}

Please generate invoices accordingly.
`);
}

/** Case 4: Handwritten-style plain text (simulate scan OCR input) */
async function case4(dir: string) {
  const emp = await getEmployee('EMP10001');
  if (!emp) return;

  writeText(dir, 'case4-handwritten-scan.txt', `
    ╔══════════════════════════════════╗
    ║   TIMESHEET — JUNE 2026          ║
    ║   ${emp.client.name.slice(0, 20).padEnd(20)}  ║
    ╚══════════════════════════════════╝

    Name: ${emp.name}     (handwritten)
    Days: 2${2 + Math.floor(Math.random() * 3)}    Hrs: 8/day
    OT:   4 hrs

    [illegible stamp]
    Signature: _________

    Notes: scanned document — variable legibility
`);
}

/** Case 5: Excel punch in/out with mixed leave codes */
async function case5(dir: string) {
  const emp = await getEmployee('EMP10003') || await prisma.employee.findFirst({ include: { client: true } });
  if (!emp) return;

  const rows = [
    { Date: '2026-06-01', 'Punch In': '08:02', 'Punch Out': '17:15', Comments: '' },
    { Date: '2026-06-02', 'Punch In': '08:00', 'Punch Out': '17:00', Comments: '' },
    { Date: '2026-06-03', 'Punch In': '', 'Punch Out': '', Comments: 'AL — annual leave' },
    { Date: '2026-06-04', 'Punch In': '', 'Punch Out': '', Comments: 'A/L' },
    { Date: '2026-06-05', 'Punch In': '08:10', 'Punch Out': '18:30', Comments: 'OT 1.5h' },
    { Date: '2026-06-06', 'Punch In': '', 'Punch Out': '', Comments: 'Annual leave' },
    { Date: '2026-06-07', 'Punch In': '08:00', 'Punch Out': '17:00', Comments: '' },
    { Date: '2026-06-08', 'Punch In': '', 'Punch Out': '', Comments: 'sick' },
  ];

  const header = {
    Client: emp.client.name,
    'Client Code': emp.client.clientCode,
    'Emp ID': emp.employeeId,
    Name: emp.name,
  };

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(wb, ws, 'PunchLog');
  XLSX.writeFile(wb, path.join(dir, 'case5-punch-timesheet.xlsx'));

  writeText(dir, 'case5-readme.txt', `Case 5: Excel with punch times and mixed leave codes (AL, A/L, Annual, sick).\nEmployee: ${emp.employeeId} — ${emp.name}\n${JSON.stringify(header, null, 2)}`);
}

/** Case 6: Structured email with leave + reimbursements */
async function case6(dir: string) {
  const emp = await getEmployee('EMP10004') || await prisma.employee.findFirst({ include: { client: true } });
  if (!emp) return;

  writeText(dir, 'case6-email-structured.txt', `From: ${emp.email || `emp${emp.employeeId.replace(/\D/g, '')}@test.com`}
To: timesheets@tasc.com
Subject: June 2026 timesheet — ${emp.employeeId}

Employee ID: ${emp.employeeId}
Month: June 2026
Working Days: 22
Leave Taken: 2 days (Annual Leave)

Reimbursements:
  - Client visit travel: AED 450.00
  - Mobile allowance top-up: AED 120.00
  - Parking receipts: AED 85.50

Total reimbursement: AED 655.50

Regards,
${emp.name}
`);
}

/** Case 7: Excel complete — exact ERP match */
async function case7(dir: string) {
  const employees = await prisma.employee.findMany({
    where: { client: { clientCode: 'CL001' } },
    include: { client: true, payroll: { where: { period: 'June2026' } } },
    take: 20,
  });

  const rows = employees.map((e) => {
    const p = e.payroll[0];
    return {
      'Emp ID': e.employeeId,
      Name: e.name,
      'Client Code': e.client.clientCode,
      'Client Name': e.client.name,
      'Working Days': p?.workingDays ?? 22,
      Currency: p?.currency ?? 'AED',
      'Net Pay': p?.netPay ? Number(p.netPay) : null,
      OT: p?.overtimeAmount ? Number(p.overtimeAmount) : 0,
    };
  });

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows), 'June2026');
  XLSX.writeFile(wb, path.join(dir, 'case7-complete-timesheet.xlsx'));

  writeText(dir, 'case7-readme.txt', 'Case 7: Clean Excel — all fields match ERP. Should auto-process at high confidence.');
}

async function writeManifest(dir: string) {
  writeText(dir, 'README.md', `# FlowInvoice AI Test Cases (AI Invoicing Challenge)

Generated from TASC_Sample_Database_v2_1.xlsx seed data.

| Case | Folder | Format | Challenge |
|------|--------|--------|-----------|
| 1 | case-1 | Email | Payout request, no Emp ID |
| 2 | case-2 | Email | Employee email, Emp ID only |
| 3 | case-3 | Email | Client list, names only |
| 4 | case-4 | Text/scan | Handwritten simulation |
| 5 | case-5 | Excel | Punch in/out + leave codes |
| 6 | case-6 | Email | Structured + reimbursements |
| 7 | case-7 | Excel | Complete ERP match |

## Ambiguity test names (from brief)
- **Aisha Al Zaabi** — EMP10058, EMP10072, EMP10077
- **Fatima Khan** — EMP10083, EMP10093 (same client)
- **Ravi Menon** — EMP10070, EMP10136, EMP10157 (across clients)
- **Carlos Smith** — EMP10001 (clean control)

Upload these via Client Portal → Upload Timesheet.
`);
}

async function main() {
  ensureDir(OUT_DIR);

  const clientCount = await prisma.client.count();
  if (clientCount === 0) {
    console.error('Database not seeded. Run: npm run db:seed');
    process.exit(1);
  }

  const cases: Array<[number, (d: string) => Promise<void>]> = [
    [1, case1],
    [2, case2],
    [3, case3],
    [4, case4],
    [5, case5],
    [6, case6],
    [7, case7],
  ];

  for (const [n, fn] of cases) {
    const dir = path.join(OUT_DIR, `case-${n}`);
    ensureDir(dir);
    await fn(dir);
    console.log(`✓ Case ${n} → ${dir}`);
  }

  await writeManifest(OUT_DIR);
  console.log(`\n✅ Test cases written to ${OUT_DIR}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
