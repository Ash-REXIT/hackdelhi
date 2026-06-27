import { useNavigate } from 'react-router-dom'
import { FileText, Receipt, AlertTriangle, CheckCircle } from 'lucide-react'
import { Header } from '../../components/layout/Header'
import { clientNotifications } from '../../data/mockData'
import { formatDateTime, cn } from '../../lib/utils'

const typeIcons = {
  invoice: Receipt,
  upload: FileText,
  review: AlertTriangle,
  return: AlertTriangle,
  approval: CheckCircle,
}

export function ClientNotifications() {
  const navigate = useNavigate()

  return (
    <>
      <Header title="Notifications" subtitle="Stay updated on your billing workflow" />
      <div className="p-6 lg:p-8">
        <div className="mx-auto max-w-3xl space-y-3">
          {clientNotifications.map((n) => {
            const Icon = typeIcons[n.type]
            return (
              <button
                key={n.id}
                onClick={() => n.link && navigate(n.link)}
                className={cn(
                  'flex w-full items-start gap-4 rounded-2xl p-5 text-left shadow-sm ring-1 transition-all hover:shadow-md',
                  n.read
                    ? 'bg-white ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800'
                    : 'bg-blue-50/50 ring-blue-200/60 dark:bg-blue-950/20 dark:ring-blue-800/40'
                )}
              >
                <div className={cn(
                  'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl',
                  n.read ? 'bg-slate-100 dark:bg-slate-800' : 'bg-blue-100 dark:bg-blue-900'
                )}>
                  <Icon className={cn('h-5 w-5', n.read ? 'text-slate-400' : 'text-blue-600')} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{n.title}</p>
                    {!n.read && <span className="h-2 w-2 rounded-full bg-blue-500" />}
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{n.message}</p>
                  <p className="mt-2 text-xs text-slate-400">{formatDateTime(n.timestamp)}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
