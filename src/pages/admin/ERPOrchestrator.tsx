import { useEffect, useState } from 'react'
import { Bot, CheckCircle, Loader2, FileSpreadsheet, ArrowRight } from 'lucide-react'
import { Header } from '../../components/layout/Header'
import { api } from '../../api/client'
import { useData } from '../../context/DataContext'

export function ERPOrchestrator() {
  const { timesheets, refresh } = useData()
  const [jobs, setJobs] = useState<Record<string, unknown>[]>([])
  const [running, setRunning] = useState<string | null>(null)

  const loadJobs = () => api.getErpJobs().then(setJobs).catch(() => setJobs([]))
  useEffect(() => { loadJobs() }, [])

  const process = async (tsId: string) => {
    setRunning(tsId)
    try {
      await api.runErpProcess(tsId)
      await loadJobs()
      await refresh()
    } finally {
      setRunning(null)
    }
  }

  const approvedSheets = timesheets.filter((t) => t.status === 'approved' || t.status === 'processing')

  return (
    <>
      <Header title="ERP Orchestration" subtitle="Mock SAP bot — payroll processing & SAP-ready export (§4.4)" />
      <div className="p-6 lg:p-8">
        <div className="mb-8 rounded-2xl glass-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-accent">
              <Bot className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">TIA ERP Bot (Mock SAP)</h2>
              <p className="text-sm text-slate-500">Consolidates timesheets → payroll simulation → SAP Excel export → invoice draft</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900">
            <h3 className="mb-4 font-semibold">Ready for ERP Processing</h3>
            <div className="space-y-3">
              {approvedSheets.slice(0, 8).map((ts) => (
                <div key={ts.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/50">
                  <div>
                    <p className="text-sm font-medium">{ts.id}</p>
                    <p className="text-xs text-slate-500">{ts.clientName} · {ts.employees} employees</p>
                  </div>
                  <button
                    onClick={() => process(ts.id)}
                    disabled={running === ts.id || ts.status === 'rejected'}
                    className="flex items-center gap-1 rounded-lg gradient-accent px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
                  >
                    {running === ts.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ArrowRight className="h-3.5 w-3.5" />}
                    Process
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900">
            <h3 className="mb-4 font-semibold">Recent ERP Jobs</h3>
            <div className="space-y-3">
              {jobs.length === 0 && <p className="text-sm text-slate-500">No jobs yet — process a timesheet to start</p>}
              {jobs.map((job) => {
                const outputFile = job.output_file ? String(job.output_file) : null
                return (
                  <div key={String(job.id)} className="rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/50">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{String(job.timesheet_id)}</p>
                      <span className="flex items-center gap-1 text-xs text-emerald-600">
                        <CheckCircle className="h-3.5 w-3.5" /> {String(job.status)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{String(job.step)}</p>
                    {outputFile && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-blue-600">
                        <FileSpreadsheet className="h-3 w-3" /> {outputFile}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
