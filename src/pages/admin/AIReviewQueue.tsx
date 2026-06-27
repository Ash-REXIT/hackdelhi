import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, ShieldAlert, Brain, ChevronRight, XCircle, CheckCircle, Clock } from 'lucide-react'
import { Header } from '../../components/layout/Header'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { useData, getVerificationReport as findReport } from '../../context/DataContext'
import { cn } from '../../lib/utils'

export function AIReviewQueue() {
  const navigate = useNavigate()
  const { timesheets, verificationReports } = useData()
  const queue = timesheets.filter((t) => ['pending', 'critical', 'returned'].includes(t.status))
  const rejected = timesheets.filter((t) => t.status === 'rejected')
  const approved = timesheets.filter((t) => t.status === 'approved')

  return (
    <>
      <Header title="AI Review Queue" subtitle="Human-in-the-loop — approve, reject, or return when anomalies occur (§4.8)" />
      <div className="p-6 lg:p-8">
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: 'Pending Review', value: queue.length, icon: Clock, color: 'text-amber-600' },
            { label: 'Rejected', value: rejected.length, icon: XCircle, color: 'text-red-600' },
            { label: 'Approved', value: approved.length, icon: CheckCircle, color: 'text-emerald-600' },
            { label: 'Avg Confidence', value: `${Math.round(timesheets.reduce((s, t) => s + t.aiConfidence, 0) / Math.max(timesheets.length, 1))}%`, icon: Brain, color: 'text-indigo-600' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900">
              <s.icon className={cn('mb-2 h-5 w-5', s.color)} />
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>

        {rejected.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-red-700">
              <XCircle className="h-4 w-4" /> Recently Rejected ({rejected.length})
            </h3>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {rejected.slice(0, 4).map((ts) => (
                <button key={ts.id} onClick={() => navigate(`/admin/evidence/${ts.id}`)}
                  className="flex items-center justify-between rounded-xl bg-red-50 px-4 py-3 text-left ring-1 ring-red-200 dark:bg-red-950/20">
                  <div>
                    <p className="text-sm font-medium">{ts.id}</p>
                    <p className="text-xs text-slate-500">{ts.clientName}</p>
                  </div>
                  <StatusBadge status="rejected" />
                </button>
              ))}
            </div>
          </div>
        )}

        <h3 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Awaiting Review</h3>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {queue.length === 0 && (
            <p className="col-span-2 text-sm text-slate-500">No items pending review — all caught up!</p>
          )}
          {queue.map((ts, i) => {
            const report = findReport(ts.id, verificationReports)
            return (
              <motion.button
                key={ts.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => navigate(`/admin/evidence/${ts.id}`)}
                className="group rounded-2xl bg-white p-6 text-left shadow-sm ring-1 ring-slate-200/60 transition-all hover:shadow-lg hover:ring-blue-200 dark:bg-slate-900 dark:ring-slate-800 dark:hover:ring-blue-800"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{ts.id}</p>
                    <p className="text-sm text-slate-500">{ts.clientName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={ts.status} />
                    <ChevronRight className="h-5 w-5 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-blue-500" />
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
                    <Users className="mb-1 h-4 w-4 text-slate-400" />
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{ts.employees}</p>
                    <p className="text-[10px] uppercase text-slate-400">Employees</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
                    <ShieldAlert className={cn('mb-1 h-4 w-4', ts.riskScore > 50 ? 'text-red-500' : 'text-amber-500')} />
                    <p className={cn('text-lg font-bold', ts.riskScore > 50 ? 'text-red-600' : 'text-amber-600')}>{ts.riskScore}</p>
                    <p className="text-[10px] uppercase text-slate-400">Risk</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
                    <Brain className="mb-1 h-4 w-4 text-indigo-500" />
                    <p className="text-lg font-bold text-indigo-600">{ts.aiConfidence}%</p>
                    <p className="text-[10px] uppercase text-slate-400">Confidence</p>
                  </div>
                </div>

                <div className={cn(
                  'rounded-xl px-4 py-2.5 text-sm font-semibold',
                  report?.recommendation.includes('Reject') ? 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400' :
                  report?.recommendation.includes('Manual') ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400' :
                  'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
                )}>
                  {report?.recommendation ?? 'Pending Analysis'}
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </>
  )
}
