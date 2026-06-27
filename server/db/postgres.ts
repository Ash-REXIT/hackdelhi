import pg from 'pg'
import EmbeddedPostgres from 'embedded-postgres'
import dotenv from 'dotenv'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { existsSync } from 'fs'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const config = {
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DB || 'flowinvoice',
}

let pool: pg.Pool | null = null
let embedded: EmbeddedPostgres | null = null

export async function initPostgres() {
  const useEmbedded = process.env.USE_EMBEDDED_POSTGRES !== 'false'

  // Try connecting to an already-running PostgreSQL first (e.g. server already up)
  try {
    const testPool = new pg.Pool({ ...config, max: 1 })
    await testPool.query('SELECT 1')
    await testPool.end()
    pool = new pg.Pool(config)
    const schema = await fs.readFile(path.join(__dirname, 'schema-postgres.sql'), 'utf-8')
    await pool.query(schema)
    console.log(`✓ PostgreSQL connected on port ${config.port}`)
    return pool
  } catch {
    // Not running yet — start embedded instance below
  }

  if (useEmbedded) {
    const dataDir = path.join(process.cwd(), 'data', 'postgres')
    embedded = new EmbeddedPostgres({
      databaseDir: dataDir,
      user: config.user,
      password: config.password,
      port: config.port,
      persistent: true,
      onLog: () => {},
      onError: (msg) => console.error('[PostgreSQL]', msg),
    })

    const pgVersion = path.join(dataDir, 'PG_VERSION')
    if (!existsSync(pgVersion)) {
      await embedded.initialise()
    }
    await embedded.start()

    try {
      await embedded.createDatabase(config.database)
    } catch {
      // database may already exist
    }
    console.log(`✓ PostgreSQL running (embedded) on port ${config.port}`)
  }

  pool = new pg.Pool(config)
  await pool.query('SELECT 1')

  const schema = await fs.readFile(path.join(__dirname, 'schema-postgres.sql'), 'utf-8')
  await pool.query(schema)

  return pool
}

export function getPool() {
  if (!pool) throw new Error('PostgreSQL not initialized')
  return pool
}

export async function stopPostgres() {
  await pool?.end()
  if (embedded) await embedded.stop()
}

export type PgPool = pg.Pool
