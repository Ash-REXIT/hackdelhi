import { Router } from 'express'
import { getPool } from '../db/postgres.js'
import { getMySQL, isMySQLConnected } from '../db/mysql.js'
import {
  runInvoiceValidation,
  detectTimesheetAnomalies,
  resolveAnomalies,
} from '../services/validationEngine.js'

const router = Router()

async function ensureHitlSchema() {
  const fs = await import('fs/promises')
  const path = await import('path')
  const sql = await fs.readFile(path.join(process.cwd(), 'server', 'db', 'schema-hitl.sql'), 'utf-8')
  await getPool().query(sql)
}

router.use(async (_req, _res, next) => {
  try {
    await ensureHitlSchema()
  } catch { /* schema may exist */ }
  next()
})

// Detect anomalies for a timesheet
router.post('/timesheet/:id/detect-anomalies', async (req, res) => {
  try {
    const anomalies = await detectTimesheetAnomalies(getPool(), req.params.id)
    res.json({ anomalies, count: anomalies.length })
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : 'Detection failed' })
  }
})

// Admin HITL: approve / reject / return timesheet
router.post('/timesheet/:id', async (req, res) => {
  const { action, reason, reviewer = 'TASC Admin' } = req.body as {
    action: 'approve' | 'reject' | 'return'
    reason?: string
    reviewer?: string
  }
  if (!['approve', 'reject', 'return'].includes(action)) {
    return res.status(400).json({ error: 'Invalid action' })
  }

  const pool = getPool()
  const id = req.params.id
  const { rows } = await pool.query('SELECT * FROM timesheets WHERE id = $1', [id])
  if (!rows[0]) return res.status(404).json({ error: 'Timesheet not found' })

  const statusMap = { approve: 'approved', reject: 'rejected', return: 'returned' } as const
  const newStatus = statusMap[action as keyof typeof statusMap]
  const anomalyStatus = action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'waived'

  await pool.query('UPDATE timesheets SET status = $1 WHERE id = $2', [newStatus, id])
  await pool.query(
    `UPDATE verification_reports SET recommendation = $1 WHERE timesheet_id = $2`,
    [
      action === 'approve' ? 'Approved by Reviewer' :
      action === 'reject' ? 'Rejected — Anomalies Confirmed' : 'Returned to Client for Correction',
      id,
    ]
  )
  await resolveAnomalies(pool, 'timesheet', id, anomalyStatus, reviewer, reason || '')
  await pool.query(
    `INSERT INTO review_decisions (entity_type, entity_id, decision, decided_by, reason, ai_confidence)
     VALUES ('timesheet',$1,$2,$3,$4,$5)`,
    [id, newStatus, reviewer, reason || '', rows[0].ai_confidence]
  )

  if (action === 'approve') {
    await pool.query(
      `INSERT INTO notifications (id, role, title, message, type, timestamp, read, link)
       VALUES ($1,'client','Timesheet Approved',$2,'approval',NOW(),false,$3)`,
      [`n-${Date.now()}`, `Timesheet ${id} approved after human review.`, `/client/reports/${id}`]
    )
  } else if (action === 'reject') {
    await pool.query(
      `INSERT INTO notifications (id, role, title, message, type, timestamp, read, link)
       VALUES ($1,'client','Timesheet Rejected',$2,'return',NOW(),false,$3)`,
      [`n-${Date.now()}`, reason || `Timesheet ${id} rejected due to unresolved anomalies.`, `/client/timesheets`]
    )
  }

  if (isMySQLConnected()) {
    await getMySQL()!.query(
      'INSERT INTO audit_logs (id, timestamp, user_name, action, ai_decision) VALUES (?,?,?,?,?)',
      [`al-${Date.now()}`, new Date(), reviewer, `Timesheet ${action}`, newStatus]
    )
  }

  res.json({ success: true, timesheetId: id, status: newStatus, action })
})

// Invoice validation rules (BTP-style)
router.post('/invoice/:id/validate', async (req, res) => {
  try {
    const result = await runInvoiceValidation(getPool(), req.params.id)
    res.json(result)
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : 'Validation failed' })
  }
})

router.get('/invoice/:id/validation-rules', async (req, res) => {
  const { rows } = await getPool().query(
    'SELECT * FROM validation_rule_results WHERE invoice_id = $1 ORDER BY id',
    [req.params.id]
  )
  res.json(rows.map((r: Record<string, unknown>) => ({
    ruleName: r.rule_name,
    passed: r.passed,
    message: r.message,
    severity: r.severity,
  })))
})

// Admin HITL: approve / reject invoice
router.post('/invoice/:id', async (req, res) => {
  const { action, reason, reviewer = 'TASC Admin' } = req.body as {
    action: 'approve' | 'reject'
    reason?: string
    reviewer?: string
  }
  const pool = getPool()
  const id = req.params.id
  const { rows } = await pool.query('SELECT * FROM invoices WHERE id = $1 OR invoice_number = $1', [id])
  if (!rows[0]) return res.status(404).json({ error: 'Invoice not found' })

  const inv = rows[0]
  const newStatus = action === 'approve' ? 'approved' : 'rejected'

  await pool.query('UPDATE invoices SET status = $1 WHERE id = $2', [newStatus, inv.id])
  if (action === 'approve') {
    await pool.query(`UPDATE invoices SET dispatch_status = 'queued' WHERE id = $1`, [inv.id])
  }
  await resolveAnomalies(pool, 'invoice', inv.id, action === 'approve' ? 'approved' : 'rejected', reviewer, reason || '')
  await pool.query(
    `INSERT INTO review_decisions (entity_type, entity_id, decision, decided_by, reason)
     VALUES ('invoice',$1,$2,$3,$4)`,
    [inv.id, newStatus, reviewer, reason || '']
  )

  await pool.query(
    `INSERT INTO notifications (id, role, title, message, type, timestamp, read, link)
     VALUES ($1,'client',$2,$3,$4,NOW(),false,$5)`,
    [
      `n-${Date.now()}`,
      action === 'approve' ? 'Invoice Approved' : 'Invoice Rejected',
      action === 'approve'
        ? `Invoice ${inv.invoice_number} approved and queued for dispatch.`
        : reason || `Invoice ${inv.invoice_number} rejected — ${reason || 'validation failed'}`,
      action === 'approve' ? 'approval' : 'return',
      '/client/invoices',
    ]
  )

  res.json({ success: true, invoiceId: inv.id, status: newStatus })
})

// Client approve / reject invoice
router.post('/client/invoice/:id', async (req, res) => {
  const { action, reason, reviewer = 'Client' } = req.body as { action: 'approve' | 'reject'; reason?: string; reviewer?: string }
  const pool = getPool()
  const { rows } = await pool.query('SELECT * FROM invoices WHERE id = $1 OR invoice_number = $1', [req.params.id])
  if (!rows[0]) return res.status(404).json({ error: 'Invoice not found' })
  const inv = rows[0]

  if (action === 'approve') {
    await pool.query(`UPDATE invoices SET status = 'approved', dispatch_status = 'approved' WHERE id = $1`, [inv.id])
  } else {
    await pool.query(`UPDATE invoices SET status = 'returned', dispatch_status = 'created' WHERE id = $1`, [inv.id])
    await pool.query(
      `INSERT INTO notifications (id, role, title, message, type, timestamp, read, link)
       VALUES ($1,'admin','Client Rejected Invoice',$2,'review',NOW(),false,'/admin/invoice-validation')`,
      [`an-${Date.now()}`, reason || `Client rejected ${inv.invoice_number}`]
    )
  }

  await pool.query(
    `INSERT INTO review_decisions (entity_type, entity_id, decision, decided_by, reason) VALUES ('invoice',$1,$2,$3,$4)`,
    [inv.id, action === 'approve' ? 'client_approved' : 'client_rejected', reviewer, reason || '']
  )

  res.json({ success: true, status: action === 'approve' ? 'approved' : 'returned' })
})

// Get anomalies
router.get('/anomalies', async (req, res) => {
  const entityId = req.query.entityId as string | undefined
  const status = req.query.status as string | undefined
  let query = 'SELECT * FROM anomalies ORDER BY detected_at DESC LIMIT 100'
  const params: string[] = []
  const conditions: string[] = []
  if (entityId) { conditions.push(`entity_id = $${params.length + 1}`); params.push(entityId) }
  if (status) { conditions.push(`status = $${params.length + 1}`); params.push(status) }
  if (conditions.length) query = `SELECT * FROM anomalies WHERE ${conditions.join(' AND ')} ORDER BY detected_at DESC`

  const { rows } = await getPool().query(query, params)
  res.json(rows.map(mapAnomaly))
})

// Mock ERP orchestration (4.4)
router.post('/erp/process/:timesheetId', async (req, res) => {
  const pool = getPool()
  const tsId = req.params.timesheetId
  const { rows: tsRows } = await pool.query('SELECT * FROM timesheets WHERE id = $1', [tsId])
  if (!tsRows[0]) return res.status(404).json({ error: 'Timesheet not found' })
  if (tsRows[0].status === 'rejected') {
    return res.status(400).json({ error: 'Cannot process rejected timesheet' })
  }

  const steps = [
    'Consolidating ERP-ready data',
    'Running payroll simulation',
    'Applying client billing rules',
    'Generating SAP-style export',
    'Creating invoice draft',
  ]

  const { rows: jobRows } = await pool.query(
    `INSERT INTO erp_jobs (timesheet_id, status, step) VALUES ($1,'processing',$2) RETURNING id`,
    [tsId, steps[0]]
  )
  const jobId = jobRows[0].id

  // Simulate completion
  const { rows: invRows } = await pool.query(
    'SELECT id FROM invoices WHERE timesheet_id = $1 LIMIT 1',
    [tsId]
  )
  const invoiceId = invRows[0]?.id

  await pool.query(
    `UPDATE erp_jobs SET status = 'completed', step = $1, completed_at = NOW(), output_file = $2, invoice_id = $3 WHERE id = $4`,
    [steps[steps.length - 1], `SAP_Export_${tsId}.xlsx`, invoiceId, jobId]
  )

  if (!invoiceId) {
    await runInvoiceValidation(pool, tsId).catch(() => {})
  }

  res.json({
    jobId,
    timesheetId: tsId,
    status: 'completed',
    steps: steps.map((s, i) => ({ step: i + 1, label: s, status: 'completed' })),
    outputFile: `SAP_Export_${tsId}.xlsx`,
    invoiceId,
  })
})

router.get('/erp/jobs', async (_req, res) => {
  const { rows } = await getPool().query('SELECT * FROM erp_jobs ORDER BY started_at DESC LIMIT 20')
  res.json(rows)
})

router.get('/decisions/:entityType/:entityId', async (req, res) => {
  const { rows } = await getPool().query(
    'SELECT * FROM review_decisions WHERE entity_type = $1 AND entity_id = $2 ORDER BY created_at DESC',
    [req.params.entityType, req.params.entityId]
  )
  res.json(rows)
})

function mapAnomaly(r: Record<string, unknown>) {
  return {
    id: r.id,
    entityType: r.entity_type,
    entityId: r.entity_id,
    clientId: r.client_id,
    anomalyType: r.anomaly_type,
    severity: r.severity,
    description: r.description,
    status: r.status,
    detectedAt: r.detected_at,
    resolvedBy: r.resolved_by,
    resolutionNote: r.resolution_note,
  }
}

export default router
