import { useNavigate } from 'react-router-dom'
import { Header } from '../../components/layout/Header'
import { DataTable, type Column } from '../../components/ui/DataTable'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { useData } from '../../context/DataContext'
import { formatCurrency, formatDate } from '../../lib/utils'
import type { Invoice } from '../../types'

export function InvoiceValidation() {
  const navigate = useNavigate()
  const { invoices } = useData()

  const columns: Column<Invoice>[] = [
    { key: 'invoiceNumber', header: 'Invoice #', sortable: true },
    { key: 'clientName', header: 'Client', sortable: true },
    { key: 'billingPeriod', header: 'Billing Period' },
    { key: 'totalHours', header: 'Hours', sortable: true },
    { key: 'grandTotal', header: 'Amount', sortable: true, render: (r) => formatCurrency(r.grandTotal) },
    { key: 'generatedDate', header: 'Generated', sortable: true, render: (r) => formatDate(r.generatedDate) },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'action',
      header: 'Action',
      render: (r) => (
        <button
          onClick={(e) => { e.stopPropagation(); navigate(`/admin/invoice-generator/${r.timesheetId}`) }}
          className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
        >
          Validate
        </button>
      ),
    },
  ]

  return (
    <>
      <Header title="Invoice Validation" subtitle="Review and validate generated invoices" />
      <div className="p-6 lg:p-8">
        <DataTable
          columns={columns}
          data={invoices}
          searchKeys={['invoiceNumber', 'clientName']}
          onRowClick={(row) => navigate(`/admin/invoice-generator/${row.timesheetId}`)}
        />
      </div>
    </>
  )
}
