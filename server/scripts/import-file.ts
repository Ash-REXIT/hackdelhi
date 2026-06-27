/**
 * Import Excel from command line:
 *   npm run import:excel -- data/import/your-file.xlsx
 *   npm run import:excel -- data/import/your-file.xlsx cli-002
 */
import fs from 'fs/promises'
import path from 'path'
import dotenv from 'dotenv'
import { initPostgres, getPool, stopPostgres } from '../db/postgres.js'
import { initMySQL, getMySQL, stopMySQL } from '../db/mysql.js'
import { parseExcelBuffer } from '../lib/excelParser.js'
import { importExcelToDatabase } from '../services/importExcel.js'

dotenv.config()

async function main() {
  const filePath = process.argv[2]
  const clientId = process.argv[3] || 'cli-001'

  if (!filePath) {
    console.error('Usage: npm run import:excel -- <path-to-file.xlsx> [clientId]')
    console.error('Example: npm run import:excel -- data/import/timesheet-template.xlsx cli-001')
    process.exit(1)
  }

  const absPath = path.resolve(filePath)
  const buffer = await fs.readFile(absPath)
  const fileName = path.basename(absPath)

  console.log(`\n📂 Importing: ${fileName}`)
  console.log(`   Client ID: ${clientId}\n`)

  await initPostgres()
  const mysqlOk = await initMySQL()

  const pool = getPool()
  const { rows: clientRows } = await pool.query('SELECT * FROM clients WHERE id = $1', [clientId])
  if (!clientRows[0]) {
    console.error(`Client ${clientId} not found`)
    process.exit(1)
  }

  const parsed = parseExcelBuffer(buffer, fileName)
  console.log(`   Found ${parsed.rows.length} rows, sheet: "${parsed.sheetName}"`)

  const result = await importExcelToDatabase(
    pool,
    mysqlOk ? getMySQL()! : null,
    {
      clientId,
      clientName: clientRows[0].company_name,
      billingRate: Number(clientRows[0].billing_rate),
      fileName,
      parsed,
    }
  )

  console.log('\n✓ Import complete!')
  console.log(`   Timesheet ID:  ${result.timesheetId}`)
  console.log(`   Employees:     ${result.employeeCount}`)
  console.log(`   Total hours:   ${result.totalHours.toFixed(1)}`)
  console.log(`   AI Confidence: ${result.aiConfidence}%`)
  console.log(`   Status:        ${result.status}`)
  if (result.invoiceId) console.log(`   Invoice:       ${result.invoiceId}`)

  await stopPostgres()
  await stopMySQL()
}

main().catch((err) => {
  console.error('Import failed:', err instanceof Error ? err.message : String(err))
  process.exit(1)
})
