import { useState } from 'react'
import { Mail, Paperclip, FileSpreadsheet, Image, CheckCircle, Clock } from 'lucide-react'
import { Header } from '../../components/layout/Header'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { useData } from '../../context/DataContext'
import { formatDateTime } from '../../lib/utils'

const emailInbox = [
  { id: 'em-1', from: 'billing@test.com', subject: 'Payroll June 2026 — Emirates Steel', attachment: 'Payroll_June2026.xlsx', type: 'Excel', client: 'CL001', received: '2026-06-27T08:30:00', status: 'processing' as const },
  { id: 'em-2', from: 'carlos.smith@test.com', subject: 'Timesheet Week 26', attachment: 'timesheet_scan.jpg', type: 'Image', client: 'CL001', received: '2026-06-27T09:15:00', status: 'pending' as const },
  { id: 'em-3', from: 'billing@test.com', subject: 'Emaar Properties — May Payroll', attachment: 'Emaar_May.pdf', type: 'PDF', client: 'CL002', received: '2026-06-26T14:20:00', status: 'approved' as const },
  { id: 'em-4', from: 'anil.mehta@wipro.com', subject: 'Handwritten timesheet photo', attachment: 'handwritten_ts.png', type: 'Handwritten', client: 'CL003', received: '2026-06-26T16:45:00', status: 'critical' as const },
]

export function EmailIngestion() {
  const { timesheets } = useData()
  const [filter, setFilter] = useState<'all' | 'pending'>('all')
  const items = filter === 'pending' ? emailInbox.filter((e) => e.status === 'pending' || e.status === 'critical') : emailInbox

  const typeIcon = { Excel: FileSpreadsheet, PDF: Paperclip, Image: Image, Handwritten: Image }

  return (
    <>
      <Header title="Email Ingestion Channel" subtitle="Multi-channel timesheet intake — mailbox + portal (§4.2)" />
      <div className="p-6 lg:p-8">
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: 'Inbox Total', value: emailInbox.length, icon: Mail },
            { label: 'Pending OCR', value: emailInbox.filter((e) => e.status === 'pending').length, icon: Clock },
            { label: 'Processed', value: emailInbox.filter((e) => e.status === 'approved').length, icon: CheckCircle },
            { label: 'Portal Uploads', value: timesheets.filter((t) => t.source !== 'Email').length, icon: FileSpreadsheet },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900">
              <s.icon className="mb-2 h-5 w-5 text-blue-600" />
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-4 flex gap-2">
          {(['all', 'pending'] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium ${filter === f ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {f === 'all' ? 'All Messages' : 'Needs Review'}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {items.map((email) => {
            const Icon = typeIcon[email.type as keyof typeof typeIcon] ?? Paperclip
            return (
              <div key={email.id} className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 dark:text-white">{email.subject}</p>
                  <p className="text-sm text-slate-500">{email.from} · {email.client}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                    <Icon className="h-3.5 w-3.5" /> {email.attachment} · {formatDateTime(email.received)}
                  </div>
                </div>
                <StatusBadge status={email.status} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
