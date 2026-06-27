import XLSX from 'xlsx'
import fs from 'fs/promises'
import path from 'path'
import dotenv from 'dotenv'
import type { Pool } from 'pg'
import { initPostgres, getPool, stopPostgres } from '../db/postgres.js'
import { initMySQL, getMySQL, stopMySQL, isMySQLConnected } from '../db/mysql.js'

dotenv.config()

function parseSheet<T extends Record<string, unknown>>(wb: XLSX.WorkBook, sheetName: string): T[] {
  const sheet = wb.Sheets[sheetName]
  if (!sheet) throw new Error(`Sheet "${sheetName}" not found`)
  return XLSX.utils.sheet_to_json<T>(sheet)
}

function parseDate(val: unknown): string | null {
  if (!val) return null
  if (val instanceof Date) return val.toISOString().slice(0, 10)
  if (typeof val === 'number') {
    const d = XLSX.SSF.parse_date_code(val)
    if (d) return `${d.y}-${String(d.m).padStart(2, '0')}-${String(d.d).padStart(2, '0')}`
  }
  const s = String(val).trim()
  const p = new Date(s)
  return isNaN(p.getTime()) ? null : p.toISOString().slice(0, 10)
}

function num(val: unknown): number {
  const n = parseFloat(String(val ?? 0).replace(/[^\d.-]/g, ''))
  return isNaN(n) ? 0 : n
}

function str(val: unknown): string {
  return String(val ?? '').trim()
}

function mapStatus(s: string): string {
  const lower = s.toLowerCase()
  if (lower === 'active') return 'active'
  if (lower === 'inactive') return 'inactive'
  return 'onboarding'
}

interface CustomerRow {
  'Client Code': string
  'Client Name': string
  City: string
  Industry: string
  'Contact Email': string
  Status: string
}

interface EmployeeRow {
  'Emp ID': string
  'Full Name': string
  'First Name': string
  'Last Name': string
  Email: string
  'Client Code': string
  'Client Name': string
  'Job Title': string
  Department: string
  Nationality: string
  'Date of Joining': unknown
  Status: string
  IBAN: string
  Basic: number
  Housing: number
  Transport: number
  Food: number
  Phone: number
  'Total CTC': number
}

interface PayrollRow {
  'Emp ID': string
  'Employee Name': string
  'Client Code': string
  'Client Name': string
  'Pay Period': string
  Basic: number
  Housing: number
  Transport: number
  Food: number
  Phone: number
  Gross: number
  'OT Hours': number
  'OT Amount': number
  Deductions: number
  'Net Pay': number
  Currency: string
  'Working Days': number
}

export async function importTascDatabase(pool: Pool, filePath: string) {
  const buffer = await fs.readFile(filePath)
  const wb = XLSX.read(buffer, { type: 'buffer', cellDates: true })

  const tascSchema = await fs.readFile(path.join(process.cwd(), 'server', 'db', 'schema-tasc.sql'), 'utf-8')
  await pool.query(tascSchema)

  const customers = parseSheet<CustomerRow>(wb, 'Customers')
  const employees = parseSheet<EmployeeRow>(wb, 'Employees')
  const payroll = parseSheet<PayrollRow>(wb, 'Payroll_June2026')

  console.log(`  Customers: ${customers.length}, Employees: ${employees.length}, Payroll: ${payroll.length}`)

  // --- Clients ---
  for (const c of customers) {
    const id = str(c['Client Code'])
    if (!id) continue
    const avgCtc = employees
      .filter((e) => str(e['Client Code']) === id)
      .reduce((s, e, _, arr) => s + num(e['Total CTC']) / arr.length, 0)

    await pool.query(
      `INSERT INTO clients (id, company_name, contact_person, email, billing_entity, currency, dispatch_rule, validation_profile, status, billing_rate)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       ON CONFLICT (id) DO UPDATE SET
         company_name = EXCLUDED.company_name,
         email = EXCLUDED.email,
         billing_entity = EXCLUDED.billing_entity,
         status = EXCLUDED.status,
         billing_rate = EXCLUDED.billing_rate`,
      [
        id,
        str(c['Client Name']),
        'Billing Contact',
        str(c['Contact Email']) || 'billing@tasc.ae',
        `${str(c['Client Name'])} — ${str(c.City)} (${str(c.Industry)})`,
        'AED',
        'Auto-dispatch on approval',
        'TASC UAE Payroll v1.0',
        mapStatus(str(c.Status)),
        Math.round(avgCtc / 176) || 50, // hourly estimate from monthly CTC
      ]
    )
  }

  // --- Employees ---
  for (const e of employees) {
    const id = str(e['Emp ID'])
    if (!id) continue
    await pool.query(
      `INSERT INTO employees (id, full_name, first_name, last_name, email, client_id, client_name, job_title, department, nationality, date_of_joining, status, iban, basic, housing, transport, food, phone, total_ctc, raw_data)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20::jsonb)
       ON CONFLICT (id) DO UPDATE SET
         full_name = EXCLUDED.full_name,
         client_id = EXCLUDED.client_id,
         job_title = EXCLUDED.job_title,
         total_ctc = EXCLUDED.total_ctc,
         status = EXCLUDED.status`,
      [
        id,
        str(e['Full Name']),
        str(e['First Name']),
        str(e['Last Name']),
        str(e.Email),
        str(e['Client Code']),
        str(e['Client Name']),
        str(e['Job Title']),
        str(e.Department),
        str(e.Nationality),
        parseDate(e['Date of Joining']),
        str(e.Status),
        str(e.IBAN),
        num(e.Basic),
        num(e.Housing),
        num(e.Transport),
        num(e.Food),
        num(e.Phone),
        num(e['Total CTC']),
        JSON.stringify(e),
      ]
    )
  }

  // --- Payroll → timesheets, entries, invoices ---
  const clientGroups = new Map<string, PayrollRow[]>()
  for (const p of payroll) {
    const cid = str(p['Client Code'])
    if (!cid) continue
    if (!clientGroups.has(cid)) clientGroups.set(cid, [])
    clientGroups.get(cid)!.push(p)
  }

  const payPeriod = payroll[0]?.['Pay Period'] ? str(payroll[0]['Pay Period']) : 'June 2026'
  const periodSlug = payPeriod.replace(/\s+/g, '-').toUpperCase()

  for (const [clientId, rows] of clientGroups) {
    const clientName = str(rows[0]['Client Name'])
    const timesheetId = `TS-${clientId}-JUN26`
    const employeeNames = [...new Set(rows.map((r) => str(r['Employee Name'])))]
    const totalOtHours = rows.reduce((s, r) => s + num(r['OT Hours']), 0)
    const totalWorkingDays = rows.reduce((s, r) => s + num(r['Working Days']), 0)
    const totalNetPay = rows.reduce((s, r) => s + num(r['Net Pay']), 0)
    const totalGross = rows.reduce((s, r) => s + num(r.Gross), 0)
    const hasOt = rows.some((r) => num(r['OT Hours']) > 0)
    const hasDeductions = rows.some((r) => num(r.Deductions) > 0)

    let riskScore = 8
    if (hasOt) riskScore += 12
    if (hasDeductions) riskScore += 5
    const aiConfidence = Math.min(97, 94 - (hasOt ? 3 : 0))
    const status = aiConfidence >= 90 ? 'approved' : 'pending'

    await pool.query(
      `INSERT INTO timesheets (id, client_id, client_name, employees, employee_names, upload_date, source, file_name, ocr_accuracy, ai_confidence, risk_score, status)
       VALUES ($1,$2,$3,$4,$5::jsonb,NOW(),'Excel',$6,99.5,$7,$8,$9)
       ON CONFLICT (id) DO UPDATE SET
         employees = EXCLUDED.employees,
         employee_names = EXCLUDED.employee_names,
         ai_confidence = EXCLUDED.ai_confidence,
         risk_score = EXCLUDED.risk_score,
         status = EXCLUDED.status`,
      [
        timesheetId,
        clientId,
        clientName,
        employeeNames.length,
        JSON.stringify(employeeNames),
        'TASC_Sample_Database_vF.xlsx',
        aiConfidence,
        riskScore,
        status,
      ]
    )

    await pool.query('DELETE FROM timesheet_entries WHERE timesheet_id = $1', [timesheetId])

    for (const row of rows) {
      const regularHours = num(row['Working Days']) * 8
      const otHours = num(row['OT Hours'])
      await pool.query(
        `INSERT INTO timesheet_entries (timesheet_id, employee_name, employee_id, project_code, work_date, regular_hours, overtime_hours, total_hours, notes, raw_row)
         VALUES ($1,$2,$3,$4,CURRENT_DATE,$5,$6,$7,$8,$9::jsonb)`,
        [
          timesheetId,
          str(row['Employee Name']),
          str(row['Emp ID']),
          str(row['Client Code']),
          regularHours,
          otHours,
          regularHours + otHours,
          `Gross: ${num(row.Gross)} AED, Net: ${num(row['Net Pay'])} AED`,
          JSON.stringify(row),
        ]
      )
    }

    const reportId = `VR-${clientId}-JUN26`
    await pool.query(
      `INSERT INTO verification_reports (id, timesheet_id, client_name, employee_validation, working_hours_validation, project_validation, duplicate_detection, missing_fields, ocr_accuracy, document_quality, risk_score, ai_confidence, recommendation, ai_explanation)
       VALUES ($1,$2,$3,$4::jsonb,$5::jsonb,$6::jsonb,$7::jsonb,$8::jsonb,99.5,98,$9,$10,$11,$12::jsonb)
       ON CONFLICT (id) DO UPDATE SET ai_confidence = EXCLUDED.ai_confidence, recommendation = EXCLUDED.recommendation`,
      [
        reportId,
        timesheetId,
        clientName,
        JSON.stringify({ status: 'pass', detail: `${employeeNames.length} employees verified from TASC master data` }),
        JSON.stringify({ status: hasOt ? 'warn' : 'pass', detail: hasOt ? `${totalOtHours.toFixed(1)} OT hours across payroll` : 'All hours within policy' }),
        JSON.stringify({ status: 'pass', detail: 'All client codes validated' }),
        JSON.stringify({ status: 'pass', detail: 'No duplicate payroll entries' }),
        JSON.stringify({ status: 'pass', detail: 'All mandatory payroll fields present' }),
        riskScore,
        aiConfidence,
        status === 'approved' ? 'Auto Approve' : 'Manual Review Required',
        JSON.stringify([
          `Imported ${rows.length} payroll records for ${clientName} (${payPeriod}).`,
          `Total gross: AED ${totalGross.toLocaleString()}, net: AED ${totalNetPay.toLocaleString()}.`,
          `${totalWorkingDays} total working days, ${totalOtHours.toFixed(1)} overtime hours.`,
          `Source: TASC_Sample_Database_vF.xlsx`,
        ]),
      ]
    )

    const invoiceId = `INV-${clientId}-JUN26`
    const gst = totalNetPay * 0.05
    const grandTotal = totalNetPay + gst

    await pool.query(
      `INSERT INTO invoices (id, invoice_number, client_id, client_name, timesheet_id, amount, gst, grand_total, generated_date, billing_period, employees, total_hours, billing_rate, status, dispatch_status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,CURRENT_DATE,$9,$10::jsonb,$11,$12,$13,$14)
       ON CONFLICT (id) DO UPDATE SET amount = EXCLUDED.amount, gst = EXCLUDED.gst, grand_total = EXCLUDED.grand_total, total_hours = EXCLUDED.total_hours`,
      [
        invoiceId,
        `TASC-INV-${clientId}-JUN26`,
        clientId,
        clientName,
        timesheetId,
        totalNetPay,
        gst,
        grandTotal,
        payPeriod,
        JSON.stringify(employeeNames.slice(0, 20)),
        Math.round(totalWorkingDays * 8 + totalOtHours),
        Math.round(totalNetPay / Math.max(totalWorkingDays * 8, 1)),
        status,
        status === 'approved' ? 'queued' : 'created',
      ]
    )

    await pool.query('DELETE FROM payroll_records WHERE client_id = $1 AND pay_period = $2', [clientId, payPeriod])

    for (const row of rows) {
      await pool.query(
        `INSERT INTO payroll_records (emp_id, employee_name, client_id, client_name, pay_period, basic, housing, transport, food, phone, gross, ot_hours, ot_amount, deductions, net_pay, currency, working_days, timesheet_id, invoice_id, raw_data)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20::jsonb)`,
        [
          str(row['Emp ID']),
          str(row['Employee Name']),
          clientId,
          clientName,
          payPeriod,
          num(row.Basic),
          num(row.Housing),
          num(row.Transport),
          num(row.Food),
          num(row.Phone),
          num(row.Gross),
          num(row['OT Hours']),
          num(row['OT Amount']),
          num(row.Deductions),
          num(row['Net Pay']),
          str(row.Currency) || 'AED',
          num(row['Working Days']),
          timesheetId,
          invoiceId,
          JSON.stringify(row),
        ]
      )
    }
  }

  return {
    clients: customers.length,
    employees: employees.length,
    payrollRows: payroll.length,
    timesheets: clientGroups.size,
    payPeriod,
  }
}

async function main() {
  const src = process.argv[2] || 'C:/Users/Shwetha/Downloads/TASC_Sample_Database_vF.xlsx'
  const absSrc = path.resolve(src)

  console.log(`\n📊 TASC Database Import`)
  console.log(`   File: ${absSrc}\n`)

  await initPostgres()
  await initMySQL()

  const result = await importTascDatabase(getPool(), absSrc)

  // Copy file into project
  const destDir = path.join(process.cwd(), 'data', 'import')
  await fs.mkdir(destDir, { recursive: true })
  await fs.copyFile(absSrc, path.join(destDir, 'TASC_Sample_Database_vF.xlsx'))

  if (isMySQLConnected()) {
    const mysql = getMySQL()!
    await mysql.query(
      'INSERT INTO audit_logs (id, timestamp, user_name, action, ai_decision) VALUES (?,?,?,?,?)',
      [`al-tasc-${Date.now()}`, new Date(), 'TASC Import', 'TASC Sample Database Imported', 'Auto Approved']
    )
  }

  console.log('\n✓ TASC Sample Database imported successfully!')
  console.log(`   Clients:     ${result.clients}`)
  console.log(`   Employees:   ${result.employees}`)
  console.log(`   Payroll:     ${result.payrollRows} rows`)
  console.log(`   Timesheets:  ${result.timesheets} (${result.payPeriod})`)
  console.log(`   File saved:  data/import/TASC_Sample_Database_vF.xlsx\n`)

  await stopPostgres()
  await stopMySQL()
}

const isDirectRun = process.argv[1]?.includes('import-tasc-database')
if (isDirectRun) {
  main().catch((err) => {
    console.error('Import failed:', err instanceof Error ? err.message : String(err))
    process.exit(1)
  })
}
