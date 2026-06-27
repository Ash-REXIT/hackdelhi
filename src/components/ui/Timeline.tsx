import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Loader2 } from 'lucide-react'
import { cn } from '../../lib/utils'

interface TimelineItem {
  id: string
  title: string
  description?: string
  timestamp: string
  status?: 'completed' | 'active' | 'pending'
}

interface ActivityTimelineProps {
  items: TimelineItem[]
  className?: string
}

export function ActivityTimeline({ items, className }: ActivityTimelineProps) {
  return (
    <div className={cn('space-y-0', className)}>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.08 }}
          className="relative flex gap-4 pb-8 last:pb-0"
        >
          {index < items.length - 1 && (
            <div className="absolute left-[15px] top-8 h-full w-px bg-slate-200 dark:bg-slate-700" />
          )}
          <div className="relative z-10 flex-shrink-0">
            {item.status === 'completed' ? (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
            ) : item.status === 'active' ? (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
              </div>
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                <Circle className="h-4 w-4 text-slate-400" />
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-slate-900 dark:text-white">{item.title}</p>
            {item.description && (
              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
            )}
            <p className="mt-1 text-xs text-slate-400">{item.timestamp}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

interface EvidenceTimelineProps {
  items: { id: string; label: string; status: 'pass' | 'warn' | 'fail'; timestamp: string }[]
}

export function EvidenceTimeline({ items }: EvidenceTimelineProps) {
  const statusColor = {
    pass: 'bg-emerald-500',
    warn: 'bg-amber-500',
    fail: 'bg-red-500',
  }

  return (
    <div className="relative">
      <div className="absolute left-3 top-2 bottom-2 w-px bg-slate-200 dark:bg-slate-700" />
      <div className="space-y-4">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="relative flex items-center gap-4 pl-8"
          >
            <div className={cn('absolute left-1.5 h-3 w-3 rounded-full ring-4 ring-white dark:ring-slate-900', statusColor[item.status])} />
            <div className="flex flex-1 items-center justify-between rounded-xl bg-slate-50 px-4 py-2.5 dark:bg-slate-800/50">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
              <span className="text-xs text-slate-400">{item.timestamp}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
