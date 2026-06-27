import { FileText, Receipt, Clock, RotateCcw } from 'lucide-react'
import { Header } from '../../components/layout/Header'
import { KPICard } from '../../components/ui/KPICard'
import { ActivityTimeline } from '../../components/ui/Timeline'
import { clientKPIs, clientActivities } from '../../data/mockData'
import { useData } from '../../context/DataContext'
import { formatDateTime } from '../../lib/utils'

export function ClientDashboard() {
  const { currentClient, clientNotifications } = useData()
  const unread = clientNotifications.filter((n) => !n.read).length

  return (
    <>
      <Header title="Dashboard" notificationPath="/client/notifications" unreadCount={unread} />
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Welcome Back,
          </h2>
          <p className="mt-1 text-xl font-semibold gradient-text">{currentClient.companyName}</p>
          <p className="mt-1 text-sm text-slate-500">Track your timesheets, verifications, and invoices in one place.</p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <KPICard title="Timesheets Submitted" value={clientKPIs.timesheetsSubmitted} icon={FileText} trend="+12% this month" trendUp />
          <KPICard title="Invoices Generated" value={clientKPIs.invoicesGenerated} icon={Receipt} trend="+8% this month" trendUp />
          <KPICard title="Pending Verification" value={clientKPIs.pendingVerification} icon={Clock} trend="2 in queue" />
          <KPICard title="Returned for Correction" value={clientKPIs.returnedForCorrection} icon={RotateCcw} trend="Action needed" trendUp={false} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800">
            <h3 className="mb-6 text-base font-semibold text-slate-900 dark:text-white">Recent Activity</h3>
            <ActivityTimeline
              items={clientActivities.map((a) => ({
                id: a.id,
                title: a.title,
                description: a.description,
                timestamp: formatDateTime(a.timestamp),
                status: 'completed' as const,
              }))}
            />
          </div>

          <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800">
            <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">Quick Actions</h3>
            <div className="space-y-3">
              {[
                { label: 'Upload New Timesheet', path: '/client/upload', color: 'from-blue-500 to-indigo-600' },
                { label: 'View Pending Reports', path: '/client/reports', color: 'from-amber-500 to-orange-600' },
                { label: 'Download Latest Invoice', path: '/client/invoices', color: 'from-emerald-500 to-teal-600' },
              ].map((action) => (
                <a
                  key={action.label}
                  href={action.path}
                  className={`flex items-center justify-between rounded-xl bg-gradient-to-r ${action.color} px-4 py-3.5 text-sm font-medium text-white shadow-md transition-transform hover:scale-[1.02]`}
                >
                  {action.label}
                  <span className="text-white/70">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
