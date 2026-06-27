import { useNavigate } from 'react-router-dom'
import { Header } from '../../components/layout/Header'
import { DataTable, type Column } from '../../components/ui/DataTable'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { useData } from '../../context/DataContext'
import { formatDateTime } from '../../lib/utils'
import type { Timesheet } from '../../types'

export function IncomingTimesheets() {
  const navigate = useNavigate()
  const { timesheets } = useData()

  const columns: Column<Timesheet>[] = [
    { key: 'id', header: 'Timesheet ID', sortable: true },
    { key: 'clientName', header: 'Client', sortable: true },
    { key: 'employees', header: 'Employees', sortable: true },
    { key: 'uploadDate', header: 'Upload Date', sortable: true, render: (r) => formatDateTime(r.uploadDate) },
    { key: 'source', header: 'Source', sortable: true },
    { key: 'ocrAccuracy', header: 'OCR Accuracy', sortable: true, render: (r) => `${r.ocrAccuracy}%` },
    { key: 'aiConfidence', header: 'AI Confidence', sortable: true, render: (r) => `${r.aiConfidence}%` },
    {
      key: 'riskScore',
      header: 'Risk Score',
      sortable: true,
      render: (r) => (
        <span className={r.riskScore > 50 ? 'font-semibold text-red-600' : r.riskScore > 25 ? 'font-semibold text-amber-600' : 'text-emerald-600'}>
          {r.riskScore}
        </span>
      ),
    },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'action',
      header: 'Action',
      render: (r) => (
        <button
          onClick={(e) => {
            e.stopPropagation()
            navigate(r.status === 'pending' || r.status === 'critical' ? `/admin/evidence/${r.id}` : `/admin/review`)
          }}
          className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-400"
        >
          Review
        </button>
      ),
    },
  ]

  return (
    <>
      <Header title="Incoming Timesheets" subtitle="All client timesheet submissions" />
      <div className="p-6 lg:p-8">
        <DataTable
          columns={columns}
          data={timesheets}
          searchKeys={['id', 'clientName', 'source', 'fileName']}
          onRowClick={(row) => navigate(`/admin/evidence/${row.id}`)}
        />
      </div>
    </>
  )
}
