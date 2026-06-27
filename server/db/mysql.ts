import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const config = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT) || 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'flowinvoice',
  database: process.env.MYSQL_DB || 'flowinvoice_audit',
  waitForConnections: true,
  connectionLimit: 10,
}

let pool: mysql.Pool | null = null
let connected = false

export async function initMySQL(): Promise<boolean> {
  if (process.env.MYSQL_ENABLED === 'false') {
    console.log('⚠ MySQL disabled (MYSQL_ENABLED=false)')
    return false
  }

  try {
    // Connect without database first to create it
    const adminConn = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
    })

    await adminConn.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\``)
    await adminConn.end()

    pool = mysql.createPool({ ...config, multipleStatements: true })
    await pool.query('SELECT 1')

    const schema = await fs.readFile(path.join(__dirname, 'schema-mysql.sql'), 'utf-8')
    await pool.query(schema)

    connected = true
    console.log(`✓ MySQL connected on port ${config.port} → ${config.database}`)
    return true
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.log(`⚠ MySQL not available: ${message}`)
    console.log('  Run: npm run db:install-mysql  OR  scripts/install-mysql.ps1')
    connected = false
    return false
  }
}

export function getMySQL() {
  return pool
}

export function isMySQLConnected() {
  return connected
}

export async function stopMySQL() {
  await pool?.end()
}
