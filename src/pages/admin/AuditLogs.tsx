import { Download } from 'lucide-react'
import { Header } from '../../components/layout/Header'
import { ActivityTimeline } from '../../components/ui/Timeline'
import { useData } from '../../context/DataContext'
import { formatDateTime } from '../../lib/utils'

export function AuditLogs() {
  const { auditLogs } = useData()
  return (
    <>
      <Header title="Audit Logs" subtitle="Complete audit trail of system and user actions" />
      <div className="p-6 lg:p-8">
        <div className="mb-6 flex justify-end">
          <button className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
            <Download className="h-4 w-4" /> Export Logs
          </button>
        </div>

        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Timestamp', 'User', 'Action', 'AI Decision', 'Invoice ID'].map((h) => (
                    <th key={h} className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/80">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{formatDateTime(log.timestamp)}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{log.user}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{log.action}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        log.aiDecision.includes('Approved') ? 'bg-emerald-50 text-emerald-700' :
                        log.aiDecision.includes('Reject') || log.aiDecision.includes('Manual') ? 'bg-amber-50 text-amber-700' :
                        log.aiDecision === 'Processing' ? 'bg-blue-50 text-blue-700' :
                        'bg-slate-50 text-slate-600'
                      }`}>
                        {log.aiDecision}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-600">{log.invoiceId ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800">
          <h3 className="mb-6 text-base font-semibold text-slate-900 dark:text-white">Activity Timeline</h3>
          <ActivityTimeline
            items={auditLogs.slice(0, 5).map((log) => ({
              id: log.id,
              title: log.action,
              description: `${log.user} — ${log.aiDecision}`,
              timestamp: formatDateTime(log.timestamp),
              status: 'completed' as const,
            }))}
          />
        </div>
      </div>
    </>
  )
}
