import { useNavigate } from 'react-router-dom'
import { Header } from '../../components/layout/Header'
import { DataTable, type Column } from '../../components/ui/DataTable'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { useData } from '../../context/DataContext'
import type { Client } from '../../types'

export function ClientManagement() {
  const navigate = useNavigate()
  const { clients } = useData()

  const columns: Column<Client>[] = [
    { key: 'companyName', header: 'Company Name', sortable: true },
    { key: 'contactPerson', header: 'Contact Person', sortable: true },
    { key: 'billingEntity', header: 'Billing Entity' },
    { key: 'currency', header: 'Currency', sortable: true },
    { key: 'dispatchRule', header: 'Dispatch Rule' },
    { key: 'validationProfile', header: 'Validation Profile' },
    {
      key: 'status',
      header: 'Status',
      render: (r) => (
        <StatusBadge
          status={r.status === 'active' ? 'approved' : r.status === 'onboarding' ? 'processing' : 'pending'}
          label={r.status.charAt(0).toUpperCase() + r.status.slice(1)}
        />
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex gap-2">
          <button className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400">View</button>
          <button className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-400">Edit</button>
          <button
            onClick={(e) => { e.stopPropagation(); navigate('/admin/settings') }}
            className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-400"
          >
            Configure
          </button>
        </div>
      ),
    },
  ]

  return (
    <>
      <Header title="Client Management" subtitle="Manage client accounts and billing configurations" />
      <div className="p-6 lg:p-8">
        <DataTable
          columns={columns}
          data={clients}
          searchKeys={['companyName', 'contactPerson', 'billingEntity']}
        />
      </div>
    </>
  )
}
