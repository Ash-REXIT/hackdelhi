import {
  Upload, Receipt, CheckCircle, Eye, AlertTriangle, Brain, Clock, Users,
} from 'lucide-react'
import { Header } from '../../components/layout/Header'
import { KPICard } from '../../components/ui/KPICard'
import { ActivityTimeline } from '../../components/ui/Timeline'
import { useData } from '../../context/DataContext'
import { adminKPIs, adminActivities } from '../../data/mockData'
import { formatDateTime } from '../../lib/utils'

export function AdminDashboard() {
  const { adminNotifications } = useData()
  const unread = adminNotifications.filter((n) => !n.read).length

  return (
    <>
      <Header title="Operations Dashboard" subtitle="TASC Admin Control Center" notificationPath="/admin/notifications" unreadCount={unread} />
      <div className="p-6 lg:p-8">
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard title="Today's Uploads" value={adminKPIs.todayUploads} icon={Upload} trend="+18% vs yesterday" trendUp gradient />
          <KPICard title="Invoices Generated" value={adminKPIs.invoicesGenerated} icon={Receipt} trend="₹6.8Cr this month" trendUp />
          <KPICard title="Auto Approved" value={adminKPIs.autoApproved} icon={CheckCircle} trend="83% rate" trendUp />
          <KPICard title="Manual Reviews" value={adminKPIs.manualReviews} icon={Eye} trend="4 pending" />
        </div>

        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard title="Critical Exceptions" value={adminKPIs.criticalExceptions} icon={AlertTriangle} trend="Needs attention" trendUp={false} />
          <KPICard title="Avg AI Confidence" value={adminKPIs.avgAiConfidence} icon={Brain} suffix="%" trend="+1.2% MoM" trendUp />
          <KPICard title="Processing Time" value={adminKPIs.processingTime} icon={Clock} suffix=" min" trend="-12% faster" trendUp />
          <KPICard title="Active Clients" value={adminKPIs.totalActiveClients} icon={Users} trend="1 onboarding" trendUp />
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800">
          <h3 className="mb-6 text-base font-semibold text-slate-900 dark:text-white">Recent Activity</h3>
          <ActivityTimeline
            items={adminActivities.map((a) => ({
              id: a.id,
              title: a.title,
              description: a.description,
              timestamp: formatDateTime(a.timestamp),
              status: 'completed' as const,
            }))}
          />
        </div>
      </div>
    </>
  )
}
