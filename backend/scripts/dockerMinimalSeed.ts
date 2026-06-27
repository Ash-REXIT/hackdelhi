/**
 * Minimal seed for Docker when TASC Excel is not in data/.
 * Creates demo logins, one client, sample employees, and validation rules.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedDefaultRules(): Promise<void> {
  const existing = await prisma.validationRule.count();
  if (existing > 0) {
    console.log('✓ Validation rules already present');
    return;
  }

  const defaults = [
    { name: 'Maximum Working Days', ruleKey: 'max_working_days', ruleValue: { value: 26 }, severity: 'error' },
    { name: 'Maximum Overtime Hours', ruleKey: 'max_overtime_hours', ruleValue: { value: 20 }, severity: 'error' },
    {
      name: 'Required Fields',
      ruleKey: 'required_fields',
      ruleValue: { fields: ['employeeId', 'workingDays', 'payrollPeriod'] },
      severity: 'error',
    },
    { name: 'Default Currency', ruleKey: 'currency', ruleValue: { value: 'AED' }, severity: 'error' },
    { name: 'Duplicate Timesheet Check', ruleKey: 'duplicate_timesheet', ruleValue: { enabled: true }, severity: 'error' },
    { name: 'Duplicate Invoice Check', ruleKey: 'duplicate_invoice', ruleValue: { enabled: true }, severity: 'error' },
  ];

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

  console.log('✓ Seeded default validation and invoice rules');
}

async function main(): Promise<void> {
  const existing = await prisma.seedMetadata.findUnique({ where: { id: 'seed' } });
  if (existing) {
    console.log('Database already seeded on', existing.seededAt.toISOString());
    return;
  }

  const client = await prisma.client.upsert({
    where: { clientCode: 'CL001' },
    update: {},
    create: {
      clientCode: 'CL001',
      name: 'Emirates Steel Industries LLC',
      industry: 'Manufacturing',
      email: 'accounts@emiratessteelindustriesllc.com',
      status: 'ACTIVE',
    },
  });

  const employees = [
    { employeeId: 'EMP-CL001-001', name: 'Carlos Smith', email: 'carlos.smith@emiratessteel.ae' },
    { employeeId: 'EMP-CL001-002', name: 'Aisha Rahman', email: 'aisha.rahman@emiratessteel.ae' },
  ];

  for (const e of employees) {
    await prisma.employee.upsert({
      where: { clientId_employeeId: { clientId: client.id, employeeId: e.employeeId } },
      update: { name: e.name, email: e.email },
      create: {
        employeeId: e.employeeId,
        name: e.name,
        email: e.email,
        clientId: client.id,
        isActive: true,
        department: 'Operations',
      },
    });
  }

  const carlos = await prisma.employee.findUnique({
    where: { clientId_employeeId: { clientId: client.id, employeeId: 'EMP-CL001-001' } },
  });
  if (carlos) {
    await prisma.payroll.upsert({
      where: { employeeId_period: { employeeId: carlos.id, period: 'June 2026' } },
      update: {},
      create: {
        employeeId: carlos.id,
        period: 'June 2026',
        baseSalary: 8500,
        gross: 9834.13,
        netPay: 9834.13,
        currency: 'AED',
        workingDays: 22,
      },
    });
  }

  await seedDefaultRules();

  const users = [
    { email: 'admin@flowinvoice.ai', name: 'FinOps Admin', role: 'FINOPS' as const, clientId: null },
    { email: 'manager@flowinvoice.ai', name: 'Finance Manager', role: 'FINANCE' as const, clientId: null },
    { email: 'user@client.com', name: 'Client User (CL001)', role: 'CLIENT' as const, clientId: client.id },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: { name: u.name, role: u.role, clientId: u.clientId },
      create: { email: u.email, name: u.name, role: u.role, clientId: u.clientId },
    });
  }

  await prisma.seedMetadata.create({
    data: { id: 'seed', source: 'docker-minimal', version: 'minimal' },
  });

  console.log('\n✅ Minimal Docker seed completed');
  console.log('   Logins: admin@flowinvoice.ai, user@client.com, manager@flowinvoice.ai');
  console.log('   Add data/TASC_Sample_Database_vF_payroll.xlsx and run: docker compose restart backend');
}

main()
  .catch((e) => {
    console.error('Minimal seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
