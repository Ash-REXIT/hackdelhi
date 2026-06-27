import { useNavigate } from 'react-router-dom'
import { Header } from '../../components/layout/Header'
import { DataTable, type Column } from '../../components/ui/DataTable'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { useData, getClientTimesheets } from '../../context/DataContext'
import { formatDateTime } from '../../lib/utils'
import type { Timesheet } from '../../types'

export function MyTimesheets() {
  const navigate = useNavigate()
  const { currentClient, timesheets } = useData()
  const data = getClientTimesheets(currentClient.id, timesheets)

  const columns: Column<Timesheet>[] = [
    { key: 'id', header: 'Timesheet ID', sortable: true },
    { key: 'fileName', header: 'File Name', sortable: true },
    { key: 'employees', header: 'Employees', sortable: true },
    { key: 'uploadDate', header: 'Upload Date', sortable: true, render: (r) => formatDateTime(r.uploadDate) },
    { key: 'source', header: 'Source', sortable: true },
    { key: 'aiConfidence', header: 'AI Confidence', sortable: true, render: (r) => `${r.aiConfidence}%` },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'action',
      header: 'Action',
      render: (r) => (
        <button
          onClick={(e) => { e.stopPropagation(); navigate(`/client/reports/${r.id}`) }}
          className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-400"
        >
          View Report
        </button>
      ),
    },
  ]

  return (
    <>
      <Header title="My Timesheets" subtitle="All submitted timesheets and their status" />
      <div className="p-6 lg:p-8">
        <DataTable
          columns={columns}
          data={data}
          searchKeys={['id', 'fileName', 'source']}
          onRowClick={(row) => navigate(`/client/reports/${row.id}`)}
        />
      </div>
    </>
  )
}
