import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Clock, Send, Mail, Eye, ThumbsUp } from 'lucide-react'
import { Header } from '../../components/layout/Header'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { useData } from '../../context/DataContext'
import { formatCurrency, formatDate } from '../../lib/utils'

const dispatchSteps = [
  { key: 'created', label: 'Invoice Created', icon: CheckCircle2 },
  { key: 'queued', label: 'Queued', icon: Clock },
  { key: 'sent', label: 'Sent', icon: Send },
  { key: 'delivered', label: 'Delivered', icon: Mail },
  { key: 'viewed', label: 'Client Viewed', icon: Eye },
  { key: 'approved', label: 'Client Approved', icon: ThumbsUp },
]

const stepOrder = ['created', 'queued', 'sent', 'delivered', 'viewed', 'approved']

function getStepIndex(status: string) {
  return stepOrder.indexOf(status)
}

export function DispatchCenter() {
  const navigate = useNavigate()
  const { invoices } = useData()

  return (
    <>
      <Header title="Dispatch Center" subtitle="Track invoice delivery and client approval" />
      <div className="p-6 lg:p-8 space-y-6">
        {invoices.map((inv, i) => {
          const currentStep = getStepIndex(inv.dispatchStatus)
          return (
            <motion.div
              key={inv.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800"
            >
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{inv.invoiceNumber}</p>
                  <p className="text-sm text-slate-500">{inv.clientName} · {formatCurrency(inv.grandTotal)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={inv.status} />
                  <span className="text-xs text-slate-400">{formatDate(inv.generatedDate)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between overflow-x-auto pb-2">
                {dispatchSteps.map((step, idx) => {
                  const isCompleted = idx <= currentStep
                  const isCurrent = idx === currentStep
                  return (
                    <div key={step.key} className="flex flex-1 flex-col items-center min-w-[80px]">
                      <div className="relative flex w-full items-center">
                        {idx > 0 && (
                          <div className={`absolute right-1/2 h-0.5 w-full ${isCompleted ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}`} style={{ top: '50%', transform: 'translateY(-50%)' }} />
                        )}
                        <div className={`relative z-10 mx-auto flex h-10 w-10 items-center justify-center rounded-full ${
                          isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'
                        } ${isCurrent ? 'ring-4 ring-emerald-200 dark:ring-emerald-900' : ''}`}>
                          {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                        </div>
                      </div>
                      <p className={`mt-2 text-center text-[10px] font-medium ${isCompleted ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {step.label}
                      </p>
                    </div>
                  )
                })}
              </div>

              <button
                onClick={() => navigate(`/admin/invoice-generator/${inv.timesheetId}`)}
                className="mt-4 text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                View Invoice Details →
              </button>
            </motion.div>
          )
        })}
      </div>
    </>
  )
}
