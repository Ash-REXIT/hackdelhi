import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, ShieldAlert, Brain, ChevronRight } from 'lucide-react'
import { Header } from '../../components/layout/Header'
import { timesheets, getVerificationReport } from '../../data/mockData'
import { cn } from '../../lib/utils'

export function AIReviewQueue() {
  const navigate = useNavigate()
  const queue = timesheets.filter((t) => ['pending', 'critical', 'returned'].includes(t.status))

  return (
    <>
      <Header title="AI Review Queue" subtitle="Submissions requiring human review" />
      <div className="p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {queue.map((ts, i) => {
            const report = getVerificationReport(ts.id)
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
                  <ChevronRight className="h-5 w-5 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-blue-500" />
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
