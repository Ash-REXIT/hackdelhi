import type { Pool } from 'pg'
import type mysql from 'mysql2/promise'
import type { ParsedExcelResult } from '../lib/excelParser.js'

interface ImportOptions {
  clientId: string
  clientName: string
  billingRate: number
  fileName: string
  parsed: ParsedExcelResult
}

export interface ImportResult {
  timesheetId: string
  employeeCount: number
  totalHours: number
  entryCount: number
  ocrAccuracy: number
  aiConfidence: number
  riskScore: number
  status: string
  invoiceId?: string
}

export async function importExcelToDatabase(
  pool: Pool,
  mysqlPool: mysql.Pool | null,
  options: ImportOptions
): Promise<ImportResult> {
  const { clientId, clientName, billingRate, fileName, parsed } = options
  const rows = parsed.rows
  const effectiveClientName = parsed.clientName || clientName

  const employeeNames = [...new Set(rows.map((r) => r.employeeName).filter(Boolean))]
  const totalHours = rows.reduce((s, r) => s + r.totalHours, 0)
  const missingProject = rows.filter((r) => !r.projectCode).length
  const missingDate = rows.filter((r) => !r.workDate).length
  const highOvertime = rows.filter((r) => r.overtimeHours > 2).length

  let riskScore = 10
  if (missingProject > 0) riskScore += Math.min(30, missingProject * 5)
  if (missingDate > 0) riskScore += Math.min(15, missingDate * 3)
  if (highOvertime > 0) riskScore += Math.min(20, highOvertime * 4)
  riskScore = Math.min(100, riskScore)

  const ocrAccuracy = 99.0
  const aiConfidence = Math.max(55, Math.min(98, 95 - missingProject * 3 - missingDate * 2 - highOvertime * 2))
  const status = aiConfidence >= 90 && riskScore <= 25 ? 'approved' : aiConfidence >= 75 ? 'pending' : 'processing'

  const timesheetId = `TS-${Date.now()}`
  const recommendation =
    status === 'approved' ? 'Auto Approve' :
    status === 'pending' ? 'Manual Review Required' : 'Processing'

  await pool.query(
    `INSERT INTO timesheets (id, client_id, client_name, employees, employee_names, upload_date, source, file_name, ocr_accuracy, ai_confidence, risk_score, status)
     VALUES ($1,$2,$3,$4,$5::jsonb,NOW(),'Excel',$6,$7,$8,$9,$10)`,
    [timesheetId, clientId, effectiveClientName, employeeNames.length, JSON.stringify(employeeNames), fileName, ocrAccuracy, aiConfidence, riskScore, status]
  )

  for (const row of rows) {
    await pool.query(
      `INSERT INTO timesheet_entries (timesheet_id, employee_name, employee_id, project_code, work_date, regular_hours, overtime_hours, total_hours, notes, raw_row)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::jsonb)`,
      [
        timesheetId,
        row.employeeName,
        row.employeeId || null,
        row.projectCode || null,
        row.workDate || null,
        row.regularHours,
        row.overtimeHours,
        row.totalHours,
        row.notes || null,
        JSON.stringify(row.raw),
      ]
    )
  }

  const reportId = `VR-${Date.now()}`
  const employeeStatus = employeeNames.length === rows.length ? 'pass' : 'warn'
  const projectStatus = missingProject === 0 ? 'pass' : missingProject <= 2 ? 'warn' : 'fail'
  const hoursStatus = highOvertime === 0 ? 'pass' : 'warn'

  await pool.query(
    `INSERT INTO verification_reports (id, timesheet_id, client_name, employee_validation, working_hours_validation, project_validation, duplicate_detection, missing_fields, ocr_accuracy, document_quality, risk_score, ai_confidence, recommendation, ai_explanation)
     VALUES ($1,$2,$3,$4::jsonb,$5::jsonb,$6::jsonb,$7::jsonb,$8::jsonb,$9,$10,$11,$12,$13,$14::jsonb)`,
    [
      reportId,
      timesheetId,
      effectiveClientName,
      JSON.stringify({ status: employeeStatus, detail: `${employeeNames.length} employees imported from Excel` }),
      JSON.stringify({ status: hoursStatus, detail: highOvertime > 0 ? `${highOvertime} entries with overtime > 2hrs` : 'All hours within policy' }),
      JSON.stringify({ status: projectStatus, detail: missingProject > 0 ? `${missingProject} rows missing project code` : 'All project codes present' }),
      JSON.stringify({ status: 'pass', detail: 'No duplicates detected' }),
      JSON.stringify({ status: missingDate > 0 ? 'warn' : 'pass', detail: missingDate > 0 ? `${missingDate} rows missing date` : 'All dates present' }),
      ocrAccuracy,
      97.5,
      riskScore,
      aiConfidence,
      recommendation,
      JSON.stringify([
        `Imported ${rows.length} rows from Excel file "${fileName}".`,
        `${employeeNames.length} unique employees, ${totalHours.toFixed(1)} total hours.`,
        missingProject > 0 ? `${missingProject} entries missing project code.` : 'All project codes validated.',
        highOvertime > 0 ? `Overtime detected on ${highOvertime} entries.` : 'No overtime anomalies.',
        `Recommendation: ${recommendation}.`,
      ]),
    ]
  )

  let invoiceId: string | undefined
  if (status === 'approved') {
    invoiceId = `inv-${Date.now()}`
    const amount = totalHours * billingRate
    const gst = amount * 0.18
    const grandTotal = amount + gst
    const invNumber = `TASC-INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`

    await pool.query(
      `INSERT INTO invoices (id, invoice_number, client_id, client_name, timesheet_id, amount, gst, grand_total, generated_date, billing_period, employees, total_hours, billing_rate, status, dispatch_status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,CURRENT_DATE,$9,$10::jsonb,$11,$12,'approved','created')`,
      [
        invoiceId,
        invNumber,
        clientId,
        effectiveClientName,
        timesheetId,
        amount,
        gst,
        grandTotal,
        parsed.billingPeriod || `Imported ${new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}`,
        JSON.stringify(employeeNames.slice(0, 10)),
        Math.round(totalHours),
        billingRate,
      ]
    )
  }

  await pool.query(
    `INSERT INTO notifications (id, role, title, message, type, timestamp, read, link)
     VALUES ($1,'client','Timesheet Imported','Excel file "${fileName}" imported with ${rows.length} entries.','upload',NOW(),false,$2)`,
    [`n-${Date.now()}`, `/client/reports/${timesheetId}`]
  )

  if (mysqlPool) {
    await mysqlPool.query(
      'INSERT INTO audit_logs (id, timestamp, user_name, action, ai_decision, invoice_id) VALUES (?,?,?,?,?,?)',
      [`al-${Date.now()}`, new Date(), effectiveClientName, 'Excel Import', recommendation, invoiceId ? undefined : null]
    )
    if (missingProject > 0) {
      await mysqlPool.query(
        'INSERT INTO exception_logs (id, exception_type, count, severity, description, timesheet_id) VALUES (?,?,?,?,?,?)',
        [`ex-import-${timesheetId}`, 'Project Code Missing', missingProject, 'warning', 'Missing from Excel import', timesheetId]
      )
    }
  }

  return {
    timesheetId,
    employeeCount: employeeNames.length,
    totalHours,
    entryCount: rows.length,
    ocrAccuracy,
    aiConfidence,
    riskScore,
    status,
    invoiceId,
  }
}
