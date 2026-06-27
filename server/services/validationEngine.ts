import type { Pool } from 'pg'

export interface ValidationRule {
  name: string
  severity: 'critical' | 'warning' | 'info'
  check: (ctx: InvoiceContext) => { passed: boolean; message: string }
}

export interface InvoiceContext {
  invoiceId: string
  amount: number
  grandTotal: number
  totalHours: number
  employeeCount: number
  billingRate: number
  gst: number
  aiConfidence?: number
  riskScore?: number
  currency?: string
}

export const BTP_VALIDATION_RULES: ValidationRule[] = [
  {
    name: 'Required Fields Complete',
    severity: 'critical',
    check: (ctx) => ({
      passed: ctx.amount > 0 && ctx.totalHours > 0 && ctx.employeeCount > 0,
      message: ctx.amount > 0 ? 'All mandatory invoice fields present' : 'Missing amount, hours, or employee count',
    }),
  },
  {
    name: 'Total Amount Within Threshold',
    severity: 'critical',
    check: (ctx) => ({
      passed: ctx.grandTotal > 0 && ctx.grandTotal < 50000000,
      message: ctx.grandTotal < 50000000 ? 'Grand total within configured limit' : 'Grand total exceeds AED 50M threshold',
    }),
  },
  {
    name: 'GST/VAT Calculation',
    severity: 'warning',
    check: (ctx) => {
      const expectedGst = ctx.amount * 0.05
      const diff = Math.abs(ctx.gst - expectedGst)
      return {
        passed: diff < ctx.amount * 0.01,
        message: diff < ctx.amount * 0.01 ? 'Tax calculation verified (5%)' : `Tax mismatch: expected ~${expectedGst.toFixed(2)}, got ${ctx.gst}`,
      }
    },
  },
  {
    name: 'Billing Rate Consistency',
    severity: 'warning',
    check: (ctx) => {
      if (ctx.totalHours === 0) return { passed: false, message: 'Zero billable hours' }
      const impliedRate = ctx.amount / ctx.totalHours
      const diff = Math.abs(impliedRate - ctx.billingRate) / Math.max(ctx.billingRate, 1)
      return {
        passed: diff < 0.25,
        message: diff < 0.25 ? 'Billing rate consistent with line items' : `Rate variance: implied ${impliedRate.toFixed(0)} vs configured ${ctx.billingRate}`,
      }
    },
  },
  {
    name: 'AI Confidence Threshold',
    severity: 'warning',
    check: (ctx) => ({
      passed: (ctx.aiConfidence ?? 100) >= 75,
      message: (ctx.aiConfidence ?? 100) >= 75
        ? `AI confidence ${ctx.aiConfidence}% meets minimum 75%`
        : `AI confidence ${ctx.aiConfidence}% below 75% — manual review required`,
    }),
  },
  {
    name: 'Risk Score Check',
    severity: 'critical',
    check: (ctx) => ({
      passed: (ctx.riskScore ?? 0) <= 50,
      message: (ctx.riskScore ?? 0) <= 50
        ? `Risk score ${ctx.riskScore} within tolerance`
        : `Risk score ${ctx.riskScore} exceeds limit — anomaly flagged`,
    }),
  },
  {
    name: 'Overtime Policy',
    severity: 'info',
    check: (ctx) => ({
      passed: ctx.totalHours <= ctx.employeeCount * 200,
      message: ctx.totalHours <= ctx.employeeCount * 200
        ? 'Total hours within per-employee cap'
        : 'Aggregate hours exceed policy cap per employee',
    }),
  },
]

export async function runInvoiceValidation(pool: Pool, invoiceId: string) {
  const { rows } = await pool.query(
    `SELECT i.*, t.ai_confidence, t.risk_score, t.employees
     FROM invoices i LEFT JOIN timesheets t ON i.timesheet_id = t.id WHERE i.id = $1 OR i.invoice_number = $1`,
    [invoiceId]
  )
  if (!rows[0]) throw new Error('Invoice not found')

  const inv = rows[0]
  const ctx: InvoiceContext = {
    invoiceId: inv.id,
    amount: Number(inv.amount),
    grandTotal: Number(inv.grand_total),
    totalHours: Number(inv.total_hours),
    employeeCount: Number(inv.employees?.length ?? inv.total_hours / 8) || 1,
    billingRate: Number(inv.billing_rate),
    gst: Number(inv.gst),
    aiConfidence: Number(inv.ai_confidence),
    riskScore: Number(inv.risk_score),
    currency: inv.currency,
  }

  await pool.query('DELETE FROM validation_rule_results WHERE invoice_id = $1', [inv.id])

  const results = []
  for (const rule of BTP_VALIDATION_RULES) {
    const result = rule.check(ctx)
    await pool.query(
      `INSERT INTO validation_rule_results (invoice_id, rule_name, passed, message, severity) VALUES ($1,$2,$3,$4,$5)`,
      [inv.id, rule.name, result.passed, result.message, rule.severity]
    )
    results.push({ ruleName: rule.name, passed: result.passed, message: result.message, severity: rule.severity })
  }

  const failures = results.filter((r) => !r.passed)
  const criticalFailures = failures.filter((r) => r.severity === 'critical')

  if (criticalFailures.length > 0) {
    await pool.query(`UPDATE invoices SET status = 'critical' WHERE id = $1`, [inv.id])
    for (const f of criticalFailures) {
      await insertAnomaly(pool, 'invoice', inv.id, inv.client_id, f.ruleName, 'critical', f.message)
    }
  } else if (failures.length > 0) {
    await pool.query(`UPDATE invoices SET status = 'pending' WHERE id = $1`, [inv.id])
    for (const f of failures) {
      await insertAnomaly(pool, 'invoice', inv.id, inv.client_id, f.ruleName, 'warning', f.message)
    }
  }

  return { invoiceId: inv.id, results, passed: failures.length === 0, failureCount: failures.length }
}

export async function detectTimesheetAnomalies(pool: Pool, timesheetId: string) {
  const { rows } = await pool.query('SELECT * FROM timesheets WHERE id = $1', [timesheetId])
  if (!rows[0]) return []
  const ts = rows[0]
  const anomalies: { type: string; severity: string; description: string }[] = []

  if (Number(ts.ocr_accuracy) < 85) {
    anomalies.push({ type: 'Poor OCR Accuracy', severity: 'warning', description: `OCR accuracy ${ts.ocr_accuracy}% below 85% threshold` })
  }
  if (Number(ts.ai_confidence) < 80) {
    anomalies.push({ type: 'Low AI Confidence', severity: 'warning', description: `AI confidence ${ts.ai_confidence}% requires human review` })
  }
  if (Number(ts.risk_score) > 50) {
    anomalies.push({ type: 'High Risk Score', severity: 'critical', description: `Risk score ${ts.risk_score} exceeds policy limit of 50` })
  }
  if (Number(ts.risk_score) > 25 && Number(ts.risk_score) <= 50) {
    anomalies.push({ type: 'Elevated Risk', severity: 'warning', description: `Risk score ${ts.risk_score} in elevated range` })
  }

  const { rows: entries } = await pool.query(
    'SELECT * FROM timesheet_entries WHERE timesheet_id = $1',
    [timesheetId]
  )
  const missingProject = entries.filter((e: Record<string, unknown>) => !e.project_code).length
  if (missingProject > 0) {
    anomalies.push({ type: 'Project Code Missing', severity: 'critical', description: `${missingProject} entries missing project code` })
  }
  const highOt = entries.filter((e: Record<string, unknown>) => Number(e.overtime_hours) > 4).length
  if (highOt > 0) {
    anomalies.push({ type: 'High Overtime', severity: 'warning', description: `${highOt} employees exceed 4hr overtime limit` })
  }

  for (const a of anomalies) {
    await insertAnomaly(pool, 'timesheet', timesheetId, ts.client_id, a.type, a.severity, a.description)
  }

  if (anomalies.some((a) => a.severity === 'critical')) {
    await pool.query(`UPDATE timesheets SET status = 'critical' WHERE id = $1`, [timesheetId])
  } else if (anomalies.length > 0) {
    await pool.query(`UPDATE timesheets SET status = 'pending' WHERE id = $1 AND status NOT IN ('approved','rejected')`, [timesheetId])
  }

  return anomalies
}

async function insertAnomaly(
  pool: Pool,
  entityType: string,
  entityId: string,
  clientId: string,
  type: string,
  severity: string,
  description: string
) {
  const { rows } = await pool.query(
    `SELECT id FROM anomalies WHERE entity_type = $1 AND entity_id = $2 AND anomaly_type = $3 AND status = 'open'`,
    [entityType, entityId, type]
  )
  if (rows.length > 0) return
  await pool.query(
    `INSERT INTO anomalies (entity_type, entity_id, client_id, anomaly_type, severity, description, status)
     VALUES ($1,$2,$3,$4,$5,$6,'open')`,
    [entityType, entityId, clientId, type, severity, description]
  )
}

export async function resolveAnomalies(pool: Pool, entityType: string, entityId: string, status: 'approved' | 'rejected' | 'waived', by: string, note: string) {
  await pool.query(
    `UPDATE anomalies SET status = $1, resolved_at = NOW(), resolved_by = $2, resolution_note = $3
     WHERE entity_type = $4 AND entity_id = $5 AND status = 'open'`,
    [status === 'approved' ? 'waived' : status, by, note, entityType, entityId]
  )
}
