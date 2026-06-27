import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs/promises'
import { getPool } from '../db/postgres.js'
import { getMySQL, isMySQLConnected } from '../db/mysql.js'
import { parseExcelBuffer } from '../lib/excelParser.js'
import { importExcelToDatabase } from '../services/importExcel.js'

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    if (['.xlsx', '.xls', '.csv'].includes(ext)) cb(null, true)
    else cb(new Error('Only .xlsx, .xls, and .csv files are supported'))
  },
})

const router = Router()

router.post('/excel', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' })

    const clientId = (req.body.clientId as string) || 'cli-001'
    const pool = getPool()

    const { rows: clientRows } = await pool.query('SELECT * FROM clients WHERE id = $1', [clientId])
    const client = clientRows[0]
    if (!client) return res.status(400).json({ error: `Client ${clientId} not found` })

    const parsed = parseExcelBuffer(req.file.buffer, req.file.originalname)
    const result = await importExcelToDatabase(
      pool,
      isMySQLConnected() ? getMySQL()! : null,
      {
        clientId,
        clientName: client.company_name,
        billingRate: Number(client.billing_rate),
        fileName: req.file.originalname,
        parsed,
      }
    )

    // Save copy to data/import for reference
    const importDir = path.join(process.cwd(), 'data', 'import')
    await fs.mkdir(importDir, { recursive: true })
    await fs.writeFile(path.join(importDir, req.file.originalname), req.file.buffer)

    res.status(201).json({
      success: true,
      message: `Imported ${result.entryCount} rows for ${result.employeeCount} employees`,
      ...result,
      preview: parsed.rows.slice(0, 5),
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Import failed'
    res.status(400).json({ error: message })
  }
})

router.get('/template', async (_req, res) => {
  const templatePath = path.join(process.cwd(), 'data', 'import', 'timesheet-template.xlsx')
  try {
    await fs.access(templatePath)
    res.download(templatePath)
  } catch {
    res.status(404).json({ error: 'Template not found. Run: npm run excel:template' })
  }
})

router.get('/timesheets/:id/entries', async (req, res) => {
  const { rows } = await getPool().query(
    'SELECT * FROM timesheet_entries WHERE timesheet_id = $1 ORDER BY work_date, employee_name',
    [req.params.id]
  )
  res.json(rows.map((r: Record<string, unknown>) => ({
    id: r.id,
    timesheetId: r.timesheet_id,
    employeeName: r.employee_name,
    employeeId: r.employee_id,
    projectCode: r.project_code,
    workDate: r.work_date,
    regularHours: Number(r.regular_hours),
    overtimeHours: Number(r.overtime_hours),
    totalHours: Number(r.total_hours),
    notes: r.notes,
  })))
})

export default router
