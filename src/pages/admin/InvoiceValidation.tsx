import { useState, useEffect } from 'react'
import { Shield, CheckCircle, XCircle } from 'lucide-react'
import { Header } from '../../components/layout/Header'
import { DataTable, type Column } from '../../components/ui/DataTable'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { HITLActionBar } from '../../components/ui/HITLActionBar'
import { AnomalyPanel } from '../../components/ui/AnomalyPanel'
import { useData } from '../../context/DataContext'
import { api } from '../../api/client'
import { formatCurrency, formatDate, cn } from '../../lib/utils'
import type { Invoice, ValidationRuleResult } from '../../types'

export function InvoiceValidation() {
  const { invoices, refresh } = useData()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [rules, setRules] = useState<ValidationRuleResult[]>([])
  const [validating, setValidating] = useState(false)

  const selected = invoices.find((i) => i.id === selectedId)

  const runValidation = async (invoiceId: string) => {
    setValidating(true)
    try {
      await api.validateInvoice(invoiceId)
      const r = await api.getValidationRules(invoiceId)
      setRules(r as unknown as ValidationRuleResult[])
      await refresh()
    } finally {
      setValidating(false)
    }
  }

  useEffect(() => {
    if (selectedId) runValidation(selectedId)
  }, [selectedId])

  const columns: Column<Invoice>[] = [
    { key: 'invoiceNumber', header: 'Invoice #', sortable: true },
    { key: 'clientName', header: 'Client', sortable: true },
    { key: 'grandTotal', header: 'Amount', sortable: true, render: (r) => formatCurrency(r.grandTotal) },
    { key: 'generatedDate', header: 'Generated', render: (r) => formatDate(r.generatedDate) },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'action',
      header: 'Validate',
      render: (r) => (
        <button
          onClick={(e) => { e.stopPropagation(); setSelectedId(r.id) }}
          className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
        >
          Run Rules
        </button>
      ),
    },
  ]

  return (
    <>
      <Header title="Invoice Validation" subtitle="BTP-style configurable rule engine with human-in-the-loop" />
      <div className="p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
          <div className="xl:col-span-3">
            <DataTable
              columns={columns}
              data={invoices}
              searchKeys={['invoiceNumber', 'clientName']}
              onRowClick={(row) => setSelectedId(row.id)}
            />
          </div>

          <div className="xl:col-span-2 space-y-4">
            {selected ? (
              <>
                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800">
                  <div className="mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-slate-900 dark:text-white">Validation Rules</h3>
                  </div>
                  {validating ? (
                    <div className="skeleton h-32 rounded-xl" />
                  ) : (
                    <div className="space-y-2">
                      {rules.map((rule, i) => (
                        <div key={i} className={cn(
                          'flex items-start gap-2 rounded-lg px-3 py-2 text-sm',
                          rule.passed ? 'bg-emerald-50 dark:bg-emerald-950/20' : rule.severity === 'critical' ? 'bg-red-50 dark:bg-red-950/20' : 'bg-amber-50 dark:bg-amber-950/20'
                        )}>
                          {rule.passed ? <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" /> : <XCircle className="h-4 w-4 text-red-500 mt-0.5" />}
                          <div>
                            <p className="font-medium">{rule.ruleName}</p>
                            <p className="text-xs text-slate-500">{rule.message}</p>
                          </div>
                        </div>
                      ))}
                      {rules.length === 0 && (
                        <button onClick={() => runValidation(selected.id)} className="text-sm text-blue-600">Run validation →</button>
                      )}
                    </div>
                  )}
                </div>
                <AnomalyPanel entityId={selected.id} entityType="invoice" autoDetect={false} />
                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800">
                  <h3 className="mb-3 text-sm font-semibold">FinOps Decision</h3>
                  <HITLActionBar
                    entityType="invoice"
                    entityId={selected.id}
                    hasAnomalies={rules.some((r) => !r.passed)}
                    currentStatus={selected.status}
                    onComplete={() => refresh()}
                    showReturn={false}
                  />
                </div>
              </>
            ) : (
              <div className="rounded-2xl bg-slate-50 p-8 text-center text-sm text-slate-500 dark:bg-slate-900">
                Select an invoice to run BTP-style validation rules
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export function InvoiceValidationDetail() {
  return <InvoiceValidation />
}
