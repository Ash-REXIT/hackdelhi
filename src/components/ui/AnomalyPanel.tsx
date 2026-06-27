import { useEffect, useState } from 'react'
import { AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react'
import { api } from '../../api/client'
import type { Anomaly } from '../../types'
import { cn } from '../../lib/utils'

interface AnomalyPanelProps {
  entityId: string
  entityType?: 'timesheet' | 'invoice'
  autoDetect?: boolean
  className?: string
}

export function AnomalyPanel({ entityId, entityType = 'timesheet', autoDetect = true, className }: AnomalyPanelProps) {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      if (autoDetect && entityType === 'timesheet') {
        await api.detectAnomalies(entityId).catch(() => {})
      }
      const data = await api.getAnomalies(entityId)
      setAnomalies(data as unknown as Anomaly[])
    } catch {
      setAnomalies([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [entityId])

  if (loading) {
    return <div className="skeleton h-24 rounded-xl" />
  }

  if (anomalies.length === 0) {
    return (
      <div className={cn('flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-950/30', className)}>
        <CheckCircle className="h-4 w-4" />
        No anomalies detected
      </div>
    )
  }

  const open = anomalies.filter((a) => a.status === 'open')
  const resolved = anomalies.filter((a) => a.status !== 'open')

  return (
    <div className={cn('rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800', className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Anomaly Report</h3>
        <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700">
          {open.length} open
        </span>
      </div>
      <div className="space-y-2">
        {anomalies.map((a) => (
          <div
            key={a.id}
            className={cn(
              'flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm',
              a.status === 'open'
                ? a.severity === 'critical' ? 'bg-red-50 dark:bg-red-950/20' : 'bg-amber-50 dark:bg-amber-950/20'
                : 'bg-slate-50 opacity-70 dark:bg-slate-800/50'
            )}
          >
            {a.status === 'open' ? (
              <AlertTriangle className={cn('mt-0.5 h-4 w-4 flex-shrink-0', a.severity === 'critical' ? 'text-red-500' : 'text-amber-500')} />
            ) : a.status === 'waived' || a.status === 'approved' ? (
              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
            ) : (
              <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-800 dark:text-slate-200">{a.anomalyType}</p>
              <p className="text-xs text-slate-500">{a.description}</p>
              {a.resolutionNote && (
                <p className="mt-1 text-xs text-slate-400">Resolution: {a.resolutionNote}</p>
              )}
            </div>
            <span className={cn(
              'flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase',
              a.status === 'open' ? 'bg-amber-200 text-amber-800' : 'bg-slate-200 text-slate-600'
            )}>
              {a.status}
            </span>
          </div>
        ))}
      </div>
      {resolved.length > 0 && (
        <p className="mt-3 flex items-center gap-1 text-xs text-slate-400">
          <Clock className="h-3 w-3" /> {resolved.length} resolved anomaly(ies)
        </p>
      )}
    </div>
  )
}
