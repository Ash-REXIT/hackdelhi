import { Database, CheckCircle2, AlertCircle } from 'lucide-react'
import { useData } from '../../context/DataContext'
import { cn } from '../../lib/utils'

export function DbStatusBadge() {
  const { dbHealth, loading } = useData()

  if (loading) {
    return (
      <span className="hidden items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs text-slate-500 lg:flex dark:bg-slate-800">
        <Database className="h-3.5 w-3.5 animate-pulse" /> Connecting...
      </span>
    )
  }

  if (!dbHealth) return null

  const pg = dbHealth.databases.postgres
  const my = dbHealth.databases.mysql

  return (
    <span
      title={dbHealth.message}
      className={cn(
        'hidden items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium ring-1 lg:flex',
        pg ? 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:ring-emerald-800' :
        'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/30 dark:text-amber-400'
      )}
    >
      {pg ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
      <span>PG{pg ? ' ✓' : ' ✗'}</span>
      <span className="text-slate-300 dark:text-slate-600">|</span>
      <span>MySQL{my ? ' ✓' : ' ✗'}</span>
    </span>
  )
}
