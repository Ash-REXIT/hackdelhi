import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Copy, PenLine, Image, FolderX, UserX, Shield, Clock, CalendarDays,
} from 'lucide-react'
import { Header } from '../../components/layout/Header'
import { DataTable, type Column } from '../../components/ui/DataTable'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { exceptions, timesheets } from '../../data/mockData'
import { formatDateTime, cn } from '../../lib/utils'
import type { Timesheet } from '../../types'

const exceptionIcons: Record<string, typeof Copy> = {
  'Duplicate Timesheets': Copy,
  'Missing Signatures': PenLine,
  'Poor Image Quality': Image,
  'Project Code Missing': FolderX,
  'Invalid Employee': UserX,
  'Business Rule Violation': Shield,
  'High Overtime': Clock,
  'Weekend Anomalies': CalendarDays,
}

export function ExceptionCenter() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<string | null>(null)

  const filteredTimesheets = filter
    ? timesheets.filter((t) => {
        if (filter === 'Duplicate Timesheets') return t.riskScore > 60
        if (filter === 'Poor Image Quality') return t.ocrAccuracy < 85
        if (filter === 'Project Code Missing') return t.status === 'pending'
        if (filter === 'Invalid Employee') return t.status === 'critical'
        if (filter === 'High Overtime') return t.riskScore > 40
        return t.status !== 'approved'
      })
    : timesheets.filter((t) => t.status !== 'approved')

  const columns: Column<Timesheet>[] = [
    { key: 'id', header: 'Timesheet ID', sortable: true },
    { key: 'clientName', header: 'Client', sortable: true },
    { key: 'employees', header: 'Employees', sortable: true },
    { key: 'uploadDate', header: 'Upload Date', render: (r) => formatDateTime(r.uploadDate) },
    { key: 'riskScore', header: 'Risk', sortable: true, render: (r) => (
      <span className={cn('font-semibold', r.riskScore > 50 ? 'text-red-600' : 'text-amber-600')}>{r.riskScore}</span>
    )},
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'action',
      header: 'Action',
      render: (r) => (
        <button
          onClick={(e) => { e.stopPropagation(); navigate(`/admin/evidence/${r.id}`) }}
          className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
        >
          Investigate
        </button>
      ),
    },
  ]

  return (
    <>
      <Header title="Exception Center" subtitle="Monitor and resolve billing exceptions" />
      <div className="p-6 lg:p-8">
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {exceptions.map((ex, i) => {
            const Icon = exceptionIcons[ex.type] ?? Shield
            const isActive = filter === ex.type
            return (
              <motion.button
                key={ex.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setFilter(isActive ? null : ex.type)}
                className={cn(
                  'rounded-2xl p-5 text-left shadow-sm ring-1 transition-all',
                  isActive
                    ? 'bg-blue-50 ring-blue-300 dark:bg-blue-950/30 dark:ring-blue-700'
                    : 'bg-white ring-slate-200/60 hover:shadow-md dark:bg-slate-900 dark:ring-slate-800'
                )}
              >
                <div className="mb-3 flex items-center justify-between">
                  <Icon className={cn('h-5 w-5', ex.severity === 'critical' ? 'text-red-500' : ex.severity === 'warning' ? 'text-amber-500' : 'text-blue-500')} />
                  <span className={cn(
                    'rounded-full px-2 py-0.5 text-xs font-bold',
                    ex.severity === 'critical' ? 'bg-red-100 text-red-700' : ex.severity === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                  )}>
                    {ex.count}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{ex.type}</p>
                <p className="mt-1 text-xs text-slate-500">{ex.description}</p>
              </motion.button>
            )
          })}
        </div>

        {filter && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm text-slate-500">Filtered by:</span>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">{filter}</span>
            <button onClick={() => setFilter(null)} className="text-xs text-slate-400 hover:text-slate-600">Clear</button>
          </div>
        )}

        <DataTable
          columns={columns}
          data={filteredTimesheets}
          searchKeys={['id', 'clientName']}
          onRowClick={(row) => navigate(`/admin/evidence/${row.id}`)}
        />
      </div>
    </>
  )
}
