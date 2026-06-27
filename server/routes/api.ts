import { Router } from 'express'
import { getPool } from '../db/postgres.js'
import { getMySQL, isMySQLConnected } from '../db/mysql.js'

const router = Router()

router.get('/health', async (_req, res) => {
  let postgres = false
  let mysql = false
  try {
    await getPool().query('SELECT 1')
    postgres = true
  } catch { /* empty */ }
  mysql = isMySQLConnected()
  res.json({
    status: postgres ? 'ok' : 'degraded',
    databases: { postgres, mysql },
    message: postgres && mysql
      ? 'PostgreSQL + MySQL connected'
      : postgres
      ? 'PostgreSQL connected (MySQL optional — run npm run db:install-mysql)'
      : 'Database unavailable',
  })
})

router.get('/clients', async (_req, res) => {
  const { rows } = await getPool().query('SELECT * FROM clients ORDER BY company_name')
  res.json(rows.map(mapClient))
})

router.get('/clients/:id', async (req, res) => {
  const { rows } = await getPool().query('SELECT * FROM clients WHERE id = $1', [req.params.id])
  if (!rows[0]) return res.status(404).json({ error: 'Not found' })
  res.json(mapClient(rows[0]))
})

router.get('/timesheets', async (req, res) => {
  const clientId = req.query.clientId as string | undefined
  let query = 'SELECT * FROM timesheets ORDER BY upload_date DESC'
  const params: string[] = []
  if (clientId) {
    query = 'SELECT * FROM timesheets WHERE client_id = $1 ORDER BY upload_date DESC'
    params.push(clientId)
  }
  const { rows } = await getPool().query(query, params)
  res.json(rows.map(mapTimesheet))
})

router.get('/timesheets/:id', async (req, res) => {
  const { rows } = await getPool().query('SELECT * FROM timesheets WHERE id = $1', [req.params.id])
  if (!rows[0]) return res.status(404).json({ error: 'Not found' })
  res.json(mapTimesheet(rows[0]))
})

router.post('/timesheets', async (req, res) => {
  const { id, clientId, clientName, employees, source, fileName } = req.body
  const tsId = id || `TS-${Date.now()}`
  await getPool().query(
    `INSERT INTO timesheets (id, client_id, client_name, employees, employee_names, upload_date, source, file_name, ocr_accuracy, ai_confidence, risk_score, status)
     VALUES ($1,$2,$3,$4,'[]',NOW(),$5,$6,0,0,0,'processing')`,
    [tsId, clientId, clientName, employees || 0, source || 'PDF', fileName || 'upload.pdf']
  )

  if (isMySQLConnected()) {
    const mysql = getMySQL()!
    await mysql.query(
      'INSERT INTO audit_logs (id, timestamp, user_name, action, ai_decision) VALUES (?,?,?,?,?)',
      [`al-${Date.now()}`, new Date(), clientName, 'Timesheet Uploaded', 'Processing']
    )
  }

  res.status(201).json({ id: tsId })
})

router.get('/verification-reports', async (_req, res) => {
  const { rows } = await getPool().query('SELECT * FROM verification_reports')
  res.json(rows.map(mapReport))
})

router.get('/verification-reports/:timesheetId', async (req, res) => {
  const { rows } = await getPool().query(
    'SELECT * FROM verification_reports WHERE timesheet_id = $1',
    [req.params.timesheetId]
  )
  if (!rows[0]) return res.status(404).json({ error: 'Not found' })
  res.json(mapReport(rows[0]))
})

router.get('/invoices', async (req, res) => {
  const clientId = req.query.clientId as string | undefined
  let query = 'SELECT * FROM invoices ORDER BY generated_date DESC'
  const params: string[] = []
  if (clientId) {
    query = 'SELECT * FROM invoices WHERE client_id = $1 ORDER BY generated_date DESC'
    params.push(clientId)
  }
  const { rows } = await getPool().query(query, params)
  res.json(rows.map(mapInvoice))
})

router.get('/notifications/:role', async (req, res) => {
  const { rows } = await getPool().query(
    'SELECT * FROM notifications WHERE role = $1 ORDER BY timestamp DESC',
    [req.params.role]
  )
  res.json(rows.map(mapNotification))
})

router.get('/audit-logs', async (_req, res) => {
  if (!isMySQLConnected()) {
    return res.status(503).json({ error: 'MySQL not connected', fallback: true })
  }
  const [rows] = await getMySQL()!.query('SELECT * FROM audit_logs ORDER BY timestamp DESC')
  res.json((rows as Record<string, unknown>[]).map(mapAuditLog))
})

router.get('/exceptions', async (_req, res) => {
  if (!isMySQLConnected()) {
    const { rows } = await getPool().query(
      `SELECT status, COUNT(*)::int AS count FROM timesheets GROUP BY status`
    )
    return res.json(rows)
  }
  const [rows] = await getMySQL()!.query('SELECT * FROM exception_logs ORDER BY count DESC')
  res.json(rows)
})

router.get('/analytics', async (_req, res) => {
  if (!isMySQLConnected()) {
    return res.json({ source: 'postgres', message: 'MySQL analytics unavailable' })
  }
  const [rows] = await getMySQL()!.query('SELECT * FROM analytics_snapshots ORDER BY period_month, metric_name')
  res.json({ source: 'mysql', data: rows })
})

router.get('/kpis', async (_req, res) => {
  const pool = getPool()
  const [uploads, invoices, pending, critical, empCount, payrollSum] = await Promise.all([
    pool.query(`SELECT COUNT(*)::int AS c FROM timesheets WHERE upload_date::date = CURRENT_DATE`),
    pool.query(`SELECT COUNT(*)::int AS c FROM invoices`),
    pool.query(`SELECT COUNT(*)::int AS c FROM timesheets WHERE status = 'pending'`),
    pool.query(`SELECT COUNT(*)::int AS c FROM timesheets WHERE status = 'critical'`),
    pool.query(`SELECT COUNT(*)::int AS c FROM employees`).catch(() => ({ rows: [{ c: 0 }] })),
    pool.query(`SELECT COALESCE(SUM(net_pay),0)::float AS total FROM payroll_records`).catch(() => ({ rows: [{ total: 0 }] })),
  ])
  res.json({
    todayUploads: uploads.rows[0].c,
    invoicesGenerated: invoices.rows[0].c,
    pendingVerification: pending.rows[0].c,
    criticalExceptions: critical.rows[0].c,
    totalEmployees: empCount.rows[0].c,
    totalPayrollAed: payrollSum.rows[0].total,
  })
})

router.get('/employees', async (req, res) => {
  const clientId = req.query.clientId as string | undefined
  let query = 'SELECT * FROM employees ORDER BY full_name'
  const params: string[] = []
  if (clientId) {
    query = 'SELECT * FROM employees WHERE client_id = $1 ORDER BY full_name'
    params.push(clientId)
  }
  try {
    const { rows } = await getPool().query(query, params)
    res.json(rows.map(mapEmployee))
  } catch {
    res.json([])
  }
})

router.get('/payroll', async (req, res) => {
  const clientId = req.query.clientId as string | undefined
  let query = 'SELECT * FROM payroll_records ORDER BY client_name, employee_name'
  const params: string[] = []
  if (clientId) {
    query = 'SELECT * FROM payroll_records WHERE client_id = $1 ORDER BY employee_name'
    params.push(clientId)
  }
  try {
    const { rows } = await getPool().query(query, params)
    res.json(rows.map(mapPayroll))
  } catch {
    res.json([])
  }
})

function mapClient(r: Record<string, unknown>) {
  return {
    id: r.id,
    companyName: r.company_name,
    contactPerson: r.contact_person,
    email: r.email,
    billingEntity: r.billing_entity,
    currency: r.currency,
    dispatchRule: r.dispatch_rule,
    validationProfile: r.validation_profile,
    status: r.status,
    billingRate: Number(r.billing_rate),
  }
}

function mapTimesheet(r: Record<string, unknown>) {
  return {
    id: r.id,
    clientId: r.client_id,
    clientName: r.client_name,
    employees: r.employees,
    employeeNames: r.employee_names,
    uploadDate: r.upload_date,
    source: r.source,
    fileName: r.file_name,
    ocrAccuracy: Number(r.ocr_accuracy),
    aiConfidence: Number(r.ai_confidence),
    riskScore: r.risk_score,
    status: r.status,
  }
}

function mapReport(r: Record<string, unknown>) {
  return {
    id: r.id,
    timesheetId: r.timesheet_id,
    clientName: r.client_name,
    employeeValidation: r.employee_validation,
    workingHoursValidation: r.working_hours_validation,
    projectValidation: r.project_validation,
    duplicateDetection: r.duplicate_detection,
    missingFields: r.missing_fields,
    ocrAccuracy: Number(r.ocr_accuracy),
    documentQuality: Number(r.document_quality),
    riskScore: r.risk_score,
    aiConfidence: Number(r.ai_confidence),
    recommendation: r.recommendation,
    aiExplanation: r.ai_explanation || [],
    evidenceTimeline: r.evidence_timeline || [],
  }
}

function mapInvoice(r: Record<string, unknown>) {
  return {
    id: r.id,
    invoiceNumber: r.invoice_number,
    clientId: r.client_id,
    clientName: r.client_name,
    timesheetId: r.timesheet_id,
    amount: Number(r.amount),
    gst: Number(r.gst),
    grandTotal: Number(r.grand_total),
    generatedDate: r.generated_date,
    billingPeriod: r.billing_period,
    employees: r.employees,
    totalHours: r.total_hours,
    billingRate: Number(r.billing_rate),
    status: r.status,
    dispatchStatus: r.dispatch_status,
  }
}

function mapNotification(r: Record<string, unknown>) {
  return {
    id: r.id,
    title: r.title,
    message: r.message,
    type: r.type,
    timestamp: r.timestamp,
    read: r.read,
    link: r.link,
  }
}

function mapAuditLog(r: Record<string, unknown>) {
  return {
    id: r.id,
    timestamp: r.timestamp,
    user: r.user_name,
    action: r.action,
    aiDecision: r.ai_decision,
    invoiceId: r.invoice_id,
  }
}

function mapEmployee(r: Record<string, unknown>) {
  return {
    id: r.id,
    fullName: r.full_name,
    email: r.email,
    clientId: r.client_id,
    clientName: r.client_name,
    jobTitle: r.job_title,
    department: r.department,
    nationality: r.nationality,
    status: r.status,
    totalCtc: Number(r.total_ctc),
  }
}

function mapPayroll(r: Record<string, unknown>) {
  return {
    id: r.id,
    empId: r.emp_id,
    employeeName: r.employee_name,
    clientId: r.client_id,
    clientName: r.client_name,
    payPeriod: r.pay_period,
    gross: Number(r.gross),
    otHours: Number(r.ot_hours),
    otAmount: Number(r.ot_amount),
    deductions: Number(r.deductions),
    netPay: Number(r.net_pay),
    currency: r.currency,
    workingDays: r.working_days,
    timesheetId: r.timesheet_id,
    invoiceId: r.invoice_id,
  }
}

export default router
