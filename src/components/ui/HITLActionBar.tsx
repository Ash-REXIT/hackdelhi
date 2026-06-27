import { useState } from 'react'
import { CheckCircle, XCircle, RotateCcw, Loader2, AlertTriangle } from 'lucide-react'
import { api } from '../../api/client'
import { cn } from '../../lib/utils'

interface HITLActionBarProps {
  entityType: 'timesheet' | 'invoice'
  entityId: string
  hasAnomalies?: boolean
  currentStatus?: string
  onComplete?: () => void
  showReturn?: boolean
  showErp?: boolean
  className?: string
}

export function HITLActionBar({
  entityType,
  entityId,
  hasAnomalies = false,
  currentStatus,
  onComplete,
  showReturn = entityType === 'timesheet',
  showErp = false,
  className,
}: HITLActionBarProps) {
  const [loading, setLoading] = useState<string | null>(null)
  const [reason, setReason] = useState('')
  const [showReason, setShowReason] = useState<'reject' | 'return' | null>(null)
  const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const isFinal = currentStatus === 'approved' || currentStatus === 'rejected'

  const act = async (action: 'approve' | 'reject' | 'return') => {
    if ((action === 'reject' || action === 'return') && !reason.trim() && showReason !== action) {
      setShowReason(action)
      return
    }
    setLoading(action)
    setResult(null)
    try {
      if (entityType === 'timesheet') {
        await api.reviewTimesheet(entityId, action, reason || undefined)
      } else {
        await api.reviewInvoice(entityId, action as 'approve' | 'reject', reason || undefined)
      }
      setResult({
        type: 'success',
        message: action === 'approve' ? 'Approved successfully' : action === 'reject' ? 'Rejected — anomalies recorded' : 'Returned to client',
      })
      setShowReason(null)
      setReason('')
      onComplete?.()
    } catch (err) {
      setResult({ type: 'error', message: err instanceof Error ? err.message : 'Action failed' })
    } finally {
      setLoading(null)
    }
  }

  const runErp = async () => {
    setLoading('erp')
    try {
      const res = await api.runErpProcess(entityId)
      setResult({ type: 'success', message: `ERP job completed — ${res.outputFile}` })
      onComplete?.()
    } catch (err) {
      setResult({ type: 'error', message: err instanceof Error ? err.message : 'ERP failed' })
    } finally {
      setLoading(null)
    }
  }

  if (isFinal) {
    return (
      <div className={cn('rounded-xl px-4 py-3 text-sm font-semibold', currentStatus === 'approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700', className)}>
        {currentStatus === 'approved' ? '✓ Approved' : '✗ Rejected'}
      </div>
    )
  }

  return (
    <div className={cn('space-y-3', className)}>
      {hasAnomalies && (
        <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
          <AlertTriangle className="h-4 w-4 flex-shrink-0" />
          Anomalies detected — human review required before release
        </div>
      )}

      {showReason && (
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder={showReason === 'reject' ? 'Reason for rejection (required)...' : 'Return notes for client...'}
          className="w-full rounded-xl border-0 bg-slate-50 p-3 text-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:ring-slate-700"
          rows={2}
        />
      )}

      <div className="grid grid-cols-2 gap-2">
        <button
          disabled={!!loading}
          onClick={() => act('approve')}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading === 'approve' ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle className="h-3.5 w-3.5" />}
          Approve
        </button>
        <button
          disabled={!!loading}
          onClick={() => act('reject')}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-red-600 px-3 py-2.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
        >
          {loading === 'reject' ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <XCircle className="h-3.5 w-3.5" />}
          Reject
        </button>
        {showReturn && (
          <button
            disabled={!!loading}
            onClick={() => act('return')}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 px-3 py-2.5 text-xs font-semibold text-white hover:bg-amber-600 disabled:opacity-50"
          >
            {loading === 'return' ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RotateCcw className="h-3.5 w-3.5" />}
            Return to Client
          </button>
        )}
        {showErp && (
          <button
            disabled={!!loading}
            onClick={runErp}
            className="flex items-center justify-center gap-1.5 rounded-xl gradient-accent px-3 py-2.5 text-xs font-semibold text-white disabled:opacity-50"
          >
            {loading === 'erp' ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
            Run ERP Bot
          </button>
        )}
      </div>

      {result && (
        <p className={cn('text-xs font-medium', result.type === 'success' ? 'text-emerald-600' : 'text-red-600')}>
          {result.message}
        </p>
      )}
    </div>
  )
}
