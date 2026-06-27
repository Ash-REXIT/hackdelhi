import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import apiRoutes from './routes/api.js'
import importRoutes from './routes/import.js'
import { initPostgres, stopPostgres } from './db/postgres.js'
import { initMySQL, stopMySQL } from './db/mysql.js'
import { seedPostgres, seedMySQL } from './db/seed.js'

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT) || 3001

app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }))
app.use(express.json())
app.use('/api', apiRoutes)
app.use('/api/import', importRoutes)

async function start() {
  console.log('\n🚀 FlowInvoice AI — Starting database connections...\n')

  await initPostgres()
  await seedPostgres((await import('./db/postgres.js')).getPool())

  const mysqlOk = await initMySQL()
  if (mysqlOk) {
    const { getMySQL } = await import('./db/mysql.js')
    await seedMySQL(getMySQL()!)
  }

  app.listen(PORT, () => {
    console.log(`\n✓ API server running at http://localhost:${PORT}`)
    console.log(`  Health check: http://localhost:${PORT}/api/health\n`)
  })
}

process.on('SIGINT', async () => {
  await stopPostgres()
  await stopMySQL()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  await stopPostgres()
  await stopMySQL()
  process.exit(0)
})

start().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
