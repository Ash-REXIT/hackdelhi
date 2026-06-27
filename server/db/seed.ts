import type { Pool } from 'pg'
import type mysql from 'mysql2/promise'

export async function seedPostgres(pool: Pool) {
  const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM clients')
  if (rows[0].count > 0) {
    console.log('  PostgreSQL already seeded')
    return
  }

  const clients = [
    ['cli-001', 'Infosys Pvt Ltd', 'Rajesh Kumar', 'rajesh.kumar@infosys.com', 'Infosys Technologies Ltd', 'INR', 'Auto-dispatch on approval', 'Enterprise Standard v2.1', 'active', 4500],
    ['cli-002', 'TCS Digital', 'Priya Sharma', 'priya.sharma@tcs.com', 'Tata Consultancy Services', 'INR', 'Manual approval required', 'Enterprise Standard v2.1', 'active', 5200],
    ['cli-003', 'Wipro Technologies', 'Anil Mehta', 'anil.mehta@wipro.com', 'Wipro Ltd', 'USD', 'Auto-dispatch on approval', 'Global Compliance v3.0', 'active', 85],
    ['cli-004', 'HCL Tech Solutions', 'Sneha Reddy', 'sneha.reddy@hcl.com', 'HCL Technologies', 'INR', 'Weekly batch dispatch', 'Enterprise Standard v2.1', 'active', 4800],
    ['cli-005', 'Accenture India', 'Michael Chen', 'michael.chen@accenture.com', 'Accenture Solutions Pvt Ltd', 'USD', 'Auto-dispatch on approval', 'Global Compliance v3.0', 'onboarding', 95],
    ['cli-006', 'Capgemini Services', 'Lisa Anderson', 'lisa.anderson@capgemini.com', 'Capgemini India Pvt Ltd', 'EUR', 'Manual approval required', 'EU GDPR Compliant v1.5', 'inactive', 72],
  ]

  for (const c of clients) {
    await pool.query(
      `INSERT INTO clients (id, company_name, contact_person, email, billing_entity, currency, dispatch_rule, validation_profile, status, billing_rate)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) ON CONFLICT DO NOTHING`,
      c
    )
  }

  const timesheets = [
    ['TS-2024-0891', 'cli-001', 'Infosys Pvt Ltd', 12, '["Amit Singh","Priya Nair","Rahul Verma","Sneha Patel"]', '2024-06-27T09:15:00', 'PDF', 'Infosys_June2024_Timesheet.pdf', 96.8, 94.2, 12, 'approved'],
    ['TS-2024-0892', 'cli-002', 'TCS Digital', 8, '["Vikram Joshi","Meera Krishnan"]', '2024-06-27T10:30:00', 'Excel', 'TCS_May2024_Timesheet.xlsx', 99.1, 97.5, 8, 'approved'],
    ['TS-2024-0893', 'cli-001', 'Infosys Pvt Ltd', 15, '["Deepak Rao","Kavita Menon","Arjun Pillai"]', '2024-06-27T11:45:00', 'Image', 'Infosys_Handwritten_TS.jpg', 87.3, 72.1, 45, 'pending'],
    ['TS-2024-0894', 'cli-003', 'Wipro Technologies', 6, '["James Wilson","Sarah Connor"]', '2024-06-26T14:20:00', 'Email', 'Wipro_Email_Attachment.pdf', 94.5, 91.8, 18, 'processing'],
    ['TS-2024-0895', 'cli-004', 'HCL Tech Solutions', 20, '["Ravi Shankar","Divya Iyer"]', '2024-06-26T16:00:00', 'ZIP', 'HCL_Batch_June2024.zip', 92.0, 88.4, 28, 'returned'],
    ['TS-2024-0896', 'cli-002', 'TCS Digital', 10, '["Nisha Gupta","Rohan Desai"]', '2024-06-25T08:30:00', 'PDF', 'TCS_Damaged_Scan.pdf', 78.2, 58.6, 72, 'critical'],
    ['TS-2024-0897', 'cli-001', 'Infosys Pvt Ltd', 9, '["Suresh Babu","Lakshmi Devi"]', '2024-06-27T13:00:00', 'Excel', 'Infosys_Week26.xlsx', 98.7, 96.3, 10, 'processing'],
  ]

  for (const t of timesheets) {
    await pool.query(
      `INSERT INTO timesheets (id, client_id, client_name, employees, employee_names, upload_date, source, file_name, ocr_accuracy, ai_confidence, risk_score, status)
       VALUES ($1,$2,$3,$4,$5::jsonb,$6,$7,$8,$9,$10,$11,$12) ON CONFLICT DO NOTHING`,
      t
    )
  }

  const reports = [
    ['VR-001', 'TS-2024-0891', 'Infosys Pvt Ltd', '{"status":"pass","detail":"All 12 employees verified"}', '{"status":"warn","detail":"Overtime exceeds policy for 2 employees"}', '{"status":"pass","detail":"All project codes validated"}', '{"status":"pass","detail":"No duplicates detected"}', '{"status":"pass","detail":"All mandatory fields present"}', 96.8, 94.5, 12, 94.2, 'Auto Approve'],
    ['VR-002', 'TS-2024-0893', 'Infosys Pvt Ltd', '{"status":"pass","detail":"14 of 15 employees verified"}', '{"status":"fail","detail":"Daily hours exceeded"}', '{"status":"fail","detail":"Project code missing"}', '{"status":"pass","detail":"No duplicates"}', '{"status":"warn","detail":"Manager signature missing"}', 87.3, 72.1, 45, 72.1, 'Manual Review Required'],
    ['VR-003', 'TS-2024-0896', 'TCS Digital', '{"status":"fail","detail":"3 invalid employee IDs"}', '{"status":"fail","detail":"Weekend work anomalies"}', '{"status":"fail","detail":"2 project codes invalid"}', '{"status":"fail","detail":"Duplicate detected"}', '{"status":"fail","detail":"Mandatory fields missing"}', 78.2, 45.8, 72, 58.6, 'Reject — Critical Issues'],
  ]

  for (const r of reports) {
    await pool.query(
      `INSERT INTO verification_reports (id, timesheet_id, client_name, employee_validation, working_hours_validation, project_validation, duplicate_detection, missing_fields, ocr_accuracy, document_quality, risk_score, ai_confidence, recommendation)
       VALUES ($1,$2,$3,$4::jsonb,$5::jsonb,$6::jsonb,$7::jsonb,$8::jsonb,$9,$10,$11,$12,$13) ON CONFLICT DO NOTHING`,
      r
    )
  }

  const invoices = [
    ['inv-001', 'TASC-INV-2024-4521', 'cli-001', 'Infosys Pvt Ltd', 'TS-2024-0891', 2430000, 437400, 2867400, '2024-06-27', 'June 1–30, 2024', '["Amit Singh","Priya Nair","Rahul Verma"]', 540, 4500, 'approved', 'delivered'],
    ['inv-002', 'TASC-INV-2024-4522', 'cli-002', 'TCS Digital', 'TS-2024-0892', 1664000, 299520, 1963520, '2024-06-27', 'May 1–31, 2024', '["Vikram Joshi","Meera Krishnan"]', 320, 5200, 'approved', 'approved'],
    ['inv-003', 'TASC-INV-2024-4523', 'cli-003', 'Wipro Technologies', 'TS-2024-0894', 25500, 4590, 30090, '2024-06-26', 'June 1–15, 2024', '["James Wilson","Sarah Connor"]', 300, 85, 'pending', 'queued'],
    ['inv-004', 'TASC-INV-2024-4524', 'cli-001', 'Infosys Pvt Ltd', 'TS-2024-0897', 1822500, 328050, 2150550, '2024-06-27', 'Week 26, 2024', '["Suresh Babu","Lakshmi Devi"]', 405, 4500, 'processing', 'created'],
  ]

  for (const inv of invoices) {
    await pool.query(
      `INSERT INTO invoices (id, invoice_number, client_id, client_name, timesheet_id, amount, gst, grand_total, generated_date, billing_period, employees, total_hours, billing_rate, status, dispatch_status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11::jsonb,$12,$13,$14,$15) ON CONFLICT DO NOTHING`,
      inv
    )
  }

  const notifications = [
    ['n1', 'client', 'Invoice Generated', 'Invoice TASC-INV-2024-4521 generated for June 2024.', 'invoice', '2024-06-27T10:30:00', false, '/client/invoices'],
    ['n2', 'client', 'Verification Complete', 'TS-2024-0891 passed with 94.2% confidence.', 'approval', '2024-06-27T09:20:00', false, '/client/reports/TS-2024-0891'],
    ['an1', 'admin', 'Client Uploaded Timesheet', 'Infosys uploaded TS-2024-0897.', 'upload', '2024-06-27T13:00:00', false, '/admin/timesheets'],
    ['an2', 'admin', 'Manual Review Assigned', 'TS-2024-0893 flagged — risk score 45.', 'review', '2024-06-27T11:50:00', false, '/admin/review'],
  ]

  for (const n of notifications) {
    await pool.query(
      `INSERT INTO notifications (id, role, title, message, type, timestamp, read, link) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT DO NOTHING`,
      n
    )
  }

  console.log('  PostgreSQL seeded with demo data')
}

export async function seedMySQL(pool: mysql.Pool) {
  const [rows] = await pool.query('SELECT COUNT(*) AS count FROM audit_logs')
  const count = (rows as { count: number }[])[0].count
  if (count > 0) {
    console.log('  MySQL already seeded')
    return
  }

  const auditLogs = [
    ['al1', '2024-06-27 13:05:00', 'System (AI)', 'OCR Processing Started', 'Processing', null],
    ['al2', '2024-06-27 11:50:00', 'TIA Engine', 'Manual Review Triggered', 'Needs Manual Review', null],
    ['al3', '2024-06-27 10:30:00', 'TIA Engine', 'Invoice Generated', 'Auto Approved', 'TASC-INV-2024-4521'],
    ['al4', '2024-06-27 09:20:00', 'TIA Engine', 'Verification Completed', 'Auto Approved', null],
    ['al5', '2024-06-27 09:15:00', 'Rajesh Kumar', 'Timesheet Uploaded', '—', null],
    ['al6', '2024-06-26 17:00:00', 'Admin (Sarah Mitchell)', 'Returned to Client', 'Manual Return', null],
    ['al7', '2024-06-26 14:30:00', 'TIA Engine', 'Invoice Dispatched', 'Auto Dispatched', 'TASC-INV-2024-4520'],
    ['al8', '2024-06-25 08:35:00', 'TIA Engine', 'Critical Exception Raised', 'Reject Recommended', null],
  ]

  for (const log of auditLogs) {
    await pool.query(
      'INSERT INTO audit_logs (id, timestamp, user_name, action, ai_decision, invoice_id) VALUES (?,?,?,?,?,?)',
      log
    )
  }

  const exceptions = [
    ['ex1', 'Duplicate Timesheets', 3, 'critical', 'Potential duplicate submissions detected', null],
    ['ex2', 'Missing Signatures', 7, 'warning', 'Manager signatures not detected', null],
    ['ex3', 'Poor Image Quality', 4, 'warning', 'OCR accuracy below 85%', null],
    ['ex4', 'Project Code Missing', 12, 'critical', 'Project codes not in ERP', 'TS-2024-0893'],
    ['ex5', 'Invalid Employee', 5, 'critical', 'Employee IDs not in master DB', 'TS-2024-0896'],
  ]

  for (const ex of exceptions) {
    await pool.query(
      'INSERT INTO exception_logs (id, exception_type, count, severity, description, timesheet_id) VALUES (?,?,?,?,?,?)',
      ex
    )
  }

  const analytics = [
    ['monthly_uploads', 248, 'Jun'], ['approval_rate', 89, 'Jun'], ['avg_confidence', 92.4, 'Jun'],
    ['processing_time', 2.6, 'Jun'], ['invoice_volume_cr', 6.8, 'Jun'],
  ]

  for (const a of analytics) {
    await pool.query(
      'INSERT INTO analytics_snapshots (metric_name, metric_value, period_month) VALUES (?,?,?)',
      a
    )
  }

  await pool.query(
    `INSERT INTO db_sync_log (source_db, event_type, payload) VALUES ('postgres', 'initial_seed', '{"status":"synced"}')`
  )

  console.log('  MySQL seeded with audit & analytics data')
}
