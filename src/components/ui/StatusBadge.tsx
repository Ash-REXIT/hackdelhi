import { cn } from '../../lib/utils'
import type { StatusType } from '../../types'

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  approved: { label: 'Approved', className: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-950/50 dark:text-emerald-400' },
  rejected: { label: 'Rejected', className: 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-950/50 dark:text-red-400' },
  pending: { label: 'Pending Review', className: 'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-950/50 dark:text-amber-400' },
  critical: { label: 'Critical', className: 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-950/50 dark:text-red-400' },
  processing: { label: 'Processing', className: 'bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-950/50 dark:text-blue-400' },
  returned: { label: 'Returned', className: 'bg-orange-50 text-orange-700 ring-orange-600/20 dark:bg-orange-950/50 dark:text-orange-400' },
  dispatched: { label: 'Dispatched', className: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20 dark:bg-indigo-950/50 dark:text-indigo-400' },
  queued: { label: 'Queued', className: 'bg-slate-50 text-slate-700 ring-slate-600/20 dark:bg-slate-800 dark:text-slate-300' },
  sent: { label: 'Sent', className: 'bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-950/50 dark:text-blue-400' },
  delivered: { label: 'Delivered', className: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-950/50 dark:text-emerald-400' },
  viewed: { label: 'Viewed', className: 'bg-violet-50 text-violet-700 ring-violet-600/20 dark:bg-violet-950/50 dark:text-violet-400' },
}

interface StatusBadgeProps {
  status: StatusType
  label?: string
  className?: string
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset', config.className, className)}>
      {label ?? config.label}
    </span>
  )
}

export function ValidationBadge({ status }: { status: 'pass' | 'warn' | 'fail' }) {
  const map = {
    pass: { label: 'Pass', className: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' },
    warn: { label: 'Warning', className: 'bg-amber-50 text-amber-700 ring-amber-600/20' },
    fail: { label: 'Fail', className: 'bg-red-50 text-red-700 ring-red-600/20' },
  }
  const c = map[status]
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset', c.className)}>
      {c.label}
    </span>
  )
}
