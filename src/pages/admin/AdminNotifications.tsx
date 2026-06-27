import { useNavigate } from 'react-router-dom'
import { FileText, Receipt, AlertTriangle, Upload } from 'lucide-react'
import { Header } from '../../components/layout/Header'
import { AIChat } from '../../components/ui/AIChat'
import { adminNotifications } from '../../data/mockData'
import { formatDateTime, cn } from '../../lib/utils'

const typeIcons = {
  invoice: Receipt,
  upload: Upload,
  review: AlertTriangle,
  return: AlertTriangle,
  approval: FileText,
}

export function AdminNotifications() {
  const navigate = useNavigate()

  return (
    <>
      <Header title="Notifications" subtitle="System alerts and workflow updates" />
      <div className="p-6 lg:p-8">
        <div className="mx-auto max-w-3xl space-y-3">
          {adminNotifications.map((n) => {
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

export function AdminSettings() {
  return (
    <>
      <Header title="Settings" subtitle="Platform configuration and validation rules" />
      <div className="p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-6">
          {[
            { title: 'Validation Profiles', desc: 'Enterprise Standard v2.1, Global Compliance v3.0, EU GDPR v1.5', active: true },
            { title: 'OCR Engine', desc: 'TIA OCR v4.2 — Multi-format, Handwriting Support', active: true },
            { title: 'Auto-Approval Threshold', desc: 'AI Confidence ≥ 90%, Risk Score ≤ 25', active: true },
            { title: 'Dispatch Rules', desc: 'Auto-dispatch on approval, Weekly batch, Manual approval', active: true },
            { title: 'GST Configuration', desc: 'Default 18% — Configurable per client entity', active: true },
            { title: 'Duplicate Detection Window', desc: '90 days rolling window, 85% similarity threshold', active: true },
          ].map((setting) => (
            <div key={setting.title} className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{setting.title}</p>
                <p className="mt-1 text-sm text-slate-500">{setting.desc}</p>
              </div>
              <div className={`h-6 w-11 rounded-full p-0.5 transition-colors ${setting.active ? 'bg-blue-600' : 'bg-slate-200'}`}>
                <div className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${setting.active ? 'translate-x-5' : ''}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export function AdminCopilot() {
  return (
    <>
      <Header title="AI Copilot" subtitle="Intelligent operations assistant for TASC admins" />
      <div className="p-6 lg:p-8">
        <div className="mx-auto h-[calc(100vh-12rem)] max-w-3xl">
          <AdminCopilotChat />
        </div>
      </div>
    </>
  )
}

function AdminCopilotChat() {
  return (
    <AIChat
      floating={false}
      title="TASC AI Copilot"
      suggestions={[
        "Summarize today's uploads",
        'Explain anomaly',
        'Generate finance summary',
        'Show clients with highest overtime',
        'Compare with previous month',
      ]}
    />
  )
}
