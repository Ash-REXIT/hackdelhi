import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Receipt, CheckCircle, XCircle, MessageSquare } from 'lucide-react'
import { Header } from '../../components/layout/Header'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { useData, getClientInvoices } from '../../context/DataContext'
import { api } from '../../api/client'
import { formatCurrency, formatDate } from '../../lib/utils'

export function ClientInvoices() {
  const { currentClient, invoices, refresh } = useData()
  const clientInvoices = getClientInvoices(currentClient.id, invoices)
  const [queryId, setQueryId] = useState<string | null>(null)
  const [queryText, setQueryText] = useState('')
  const [actionMsg, setActionMsg] = useState('')

  const handleClientAction = async (id: string, action: 'approve' | 'reject') => {
    try {
      await api.clientReviewInvoice(id, action, action === 'reject' ? queryText : undefined)
      setActionMsg(action === 'approve' ? 'Invoice approved' : 'Invoice rejected — FinOps notified')
      setQueryId(null)
      setQueryText('')
      await refresh()
    } catch (err) {
      setActionMsg(err instanceof Error ? err.message : 'Action failed')
    }
  }

  return (
    <>
      <Header title="Invoices" subtitle="Review, approve, or reject invoices — raise queries for FinOps" />
      <div className="p-6 lg:p-8">
        {actionMsg && (
          <div className="mb-4 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-700">{actionMsg}</div>
        )}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {clientInvoices.map((inv, i) => (
            <motion.div
              key={inv.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
                  <Receipt className="h-5 w-5 text-white" />
                </div>
                <StatusBadge status={inv.status} />
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{inv.invoiceNumber}</p>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                {formatCurrency(inv.grandTotal, currentClient.currency)}
              </p>
              <div className="mt-4 space-y-1.5 text-sm text-slate-500">
                <p>Period: {inv.billingPeriod}</p>
                <p>Generated: {formatDate(inv.generatedDate)}</p>
                <p>{inv.totalHours} hours · {Array.isArray(inv.employees) ? inv.employees.length : 0} employees</p>
              </div>

              {inv.status !== 'approved' && inv.status !== 'rejected' && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleClientAction(inv.id, 'approve')}
                    className="flex items-center justify-center gap-1 rounded-xl bg-emerald-600 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
                  >
                    <CheckCircle className="h-3.5 w-3.5" /> Approve
                  </button>
                  <button
                    onClick={() => setQueryId(queryId === inv.id ? null : inv.id)}
                    className="flex items-center justify-center gap-1 rounded-xl bg-red-600 py-2 text-xs font-semibold text-white hover:bg-red-700"
                  >
                    <XCircle className="h-3.5 w-3.5" /> Reject
                  </button>
                </div>
              )}

              {queryId === inv.id && (
                <div className="mt-3 space-y-2">
                  <textarea
                    value={queryText}
                    onChange={(e) => setQueryText(e.target.value)}
                    placeholder="Reason for rejection or query for FinOps..."
                    className="w-full rounded-lg bg-slate-50 p-2 text-xs ring-1 ring-slate-200 dark:bg-slate-800"
                    rows={2}
                  />
                  <button
                    onClick={() => handleClientAction(inv.id, 'reject')}
                    className="w-full rounded-lg bg-red-100 py-1.5 text-xs font-semibold text-red-700"
                  >
                    Confirm Rejection
                  </button>
                </div>
              )}

              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
                <Download className="h-4 w-4" /> Download
              </button>
              <button
                onClick={() => setQueryId(inv.id)}
                className="mt-2 flex w-full items-center justify-center gap-1 text-xs text-blue-600"
              >
                <MessageSquare className="h-3 w-3" /> Raise Query to FinOps
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}
