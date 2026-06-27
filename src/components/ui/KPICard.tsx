import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

interface KPICardProps {
  title: string
  value: number | string
  icon: LucideIcon
  trend?: string
  trendUp?: boolean
  suffix?: string
  prefix?: string
  animate?: boolean
  gradient?: boolean
  className?: string
}

export function KPICard({ title, value, icon: Icon, trend, trendUp, suffix, prefix, animate = true, gradient, className }: KPICardProps) {
  const numValue = typeof value === 'number' ? value : parseFloat(value)
  const [display, setDisplay] = useState(animate && typeof value === 'number' ? 0 : value)

  useEffect(() => {
    if (!animate || typeof value !== 'number') {
      setDisplay(value)
      return
    }
    const duration = 1200
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * numValue * 10) / 10)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [value, animate, numValue])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800',
        className
      )}
    >
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5" />
      )}
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {prefix}{typeof display === 'number' ? (Number.isInteger(numValue) ? Math.round(display) : display.toFixed(1)) : display}{suffix}
          </p>
          {trend && (
            <p className={cn('mt-1 text-xs font-medium', trendUp ? 'text-emerald-600' : 'text-red-500')}>
              {trend}
            </p>
          )}
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </motion.div>
  )
}
