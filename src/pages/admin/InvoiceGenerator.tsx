import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Download, FileSpreadsheet, Send, Receipt, ArrowLeft } from 'lucide-react'
import { Header } from '../../components/layout/Header'
import { useData, getTimesheet as findTimesheet } from '../../context/DataContext'
import { formatCurrency } from '../../lib/utils'

export function InvoiceGenerator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { timesheets, invoices, clients } = useData()
  const timesheet = findTimesheet(id ?? '', timesheets) ?? findTimesheet('TS-2024-0891', timesheets)
  const invoice = invoices.find((i) => i.timesheetId === timesheet?.id) ?? invoices[0]
  const client = clients.find((c) => c.id === timesheet?.clientId) ?? clients[0]

  const gstRate = 0.18
  const subtotal = invoice.amount
  const gst = invoice.gst
  const grandTotal = invoice.grandTotal

  return (
    <>
      <Header title="Invoice Generator" subtitle="Generate and dispatch ERP-ready invoices" />
      <div className="p-6 lg:p-8">
        <button
          onClick={() => navigate('/admin/invoice-validation')}
          className="mb-6 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Validation
        </button>

        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white shadow-lg ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800"
          >
            <div className="border-b border-slate-100 px-8 py-6 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Invoice Preview</p>
                  <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{invoice.invoiceNumber}</h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-accent">
                  <Receipt className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            <div className="px-8 py-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-medium text-slate-400">Client</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{client.companyName}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">Billing Period</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{invoice.billingPeriod}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">Employees</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{timesheet?.employees ?? invoice.employees.length}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">Total Hours</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{invoice.totalHours} hrs</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">Billing Rate</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{formatCurrency(client.billingRate)}/hr</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">Timesheet ID</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{timesheet?.id}</p>
                </div>
              </div>

              <div className="mt-8 rounded-xl bg-slate-50 p-5 dark:bg-slate-800/50">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-medium text-slate-900 dark:text-white">{formatCurrency(subtotal)}</span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-slate-500">GST ({(gstRate * 100).toFixed(0)}%)</span>
                  <span className="font-medium text-slate-900 dark:text-white">{formatCurrency(gst)}</span>
                </div>
                <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 dark:border-slate-700">
                  <span className="text-base font-bold text-slate-900 dark:text-white">Grand Total</span>
                  <span className="text-xl font-bold gradient-text">{formatCurrency(grandTotal)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 border-t border-slate-100 px-8 py-5 dark:border-slate-800">
              <button className="flex items-center gap-2 rounded-xl gradient-accent px-5 py-2.5 text-sm font-semibold text-white">
                <Download className="h-4 w-4" /> Generate PDF
              </button>
              <button className="flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
                <Download className="h-4 w-4" /> Download Invoice
              </button>
              <button className="flex items-center gap-2 rounded-xl bg-emerald-50 px-5 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-400">
                <FileSpreadsheet className="h-4 w-4" /> Export SAP Excel
              </button>
              <button
                onClick={() => navigate('/admin/dispatch')}
                className="flex items-center gap-2 rounded-xl bg-indigo-50 px-5 py-2.5 text-sm font-semibold text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-400"
              >
                <Send className="h-4 w-4" /> Dispatch Invoice
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
