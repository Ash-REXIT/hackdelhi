import { motion } from 'framer-motion'
import { Download, Receipt } from 'lucide-react'
import { Header } from '../../components/layout/Header'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { useData, getClientInvoices } from '../../context/DataContext'
import { formatCurrency, formatDate } from '../../lib/utils'

export function ClientInvoices() {
  const { currentClient, invoices } = useData()
  const clientInvoices = getClientInvoices(currentClient.id, invoices)

  return (
    <>
      <Header title="Invoices" subtitle="View and download your generated invoices" />
      <div className="p-6 lg:p-8">
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
                <p>{inv.totalHours} hours · {inv.employees.length} employees</p>
              </div>
              <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                <Download className="h-4 w-4" /> Download Invoice
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}
