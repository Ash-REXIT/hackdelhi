import { useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Upload, FileText, FileSpreadsheet, Image, Mail, Archive, CheckCircle2, Download, AlertCircle } from 'lucide-react'
import { Header } from '../../components/layout/Header'
import { api } from '../../api/client'
import { useData } from '../../context/DataContext'
import { cn } from '../../lib/utils'

const formats = [
  { icon: FileText, label: 'PDF', color: 'text-red-500 bg-red-50' },
  { icon: FileSpreadsheet, label: 'Excel', color: 'text-emerald-500 bg-emerald-50' },
  { icon: Image, label: 'Images', color: 'text-blue-500 bg-blue-50' },
  { icon: Image, label: 'Handwritten', color: 'text-purple-500 bg-purple-50' },
  { icon: Mail, label: 'Email Attachments', color: 'text-amber-500 bg-amber-50' },
  { icon: Archive, label: 'ZIP', color: 'text-slate-500 bg-slate-50' },
]

const EXCEL_EXT = ['.xlsx', '.xls', '.csv']

function isExcelFile(name: string) {
  return EXCEL_EXT.some((ext) => name.toLowerCase().endsWith(ext))
}

export function UploadTimesheet() {
  const navigate = useNavigate()
  const { currentClient, refresh } = useData()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [fileName, setFileName] = useState('')
  const [error, setError] = useState('')

  const processFile = useCallback(async (file: File) => {
    setError('')
    setUploading(true)
    setFileName(file.name)
    setProgress(10)

    try {
      if (isExcelFile(file.name)) {
        setProgress(40)
        const result = await api.importExcel(file, currentClient.id)
        setProgress(100)
        await refresh()
        setTimeout(() => navigate(`/client/processing/${result.timesheetId}`), 800)
        return
      }

      // Non-Excel: create timesheet record and proceed to AI pipeline
      setProgress(30)
      const tsId = `TS-${Date.now()}`
      await api.createTimesheet({
        id: tsId,
        clientId: currentClient.id,
        clientName: currentClient.companyName,
        employees: 1,
        source: file.name.split('.').pop()?.toUpperCase() || 'PDF',
        fileName: file.name,
      })
      let p = 30
      const interval = setInterval(() => {
        p += Math.random() * 12 + 5
        if (p >= 100) {
          p = 100
          clearInterval(interval)
          refresh()
          setTimeout(() => navigate(`/client/processing/${tsId}`), 600)
        }
        setProgress(Math.min(p, 100))
      }, 200)
    } catch (err) {
      setUploading(false)
      setProgress(0)
      setError(err instanceof Error ? err.message : 'Upload failed')
    }
  }, [navigate, currentClient, refresh])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }, [processFile])

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  return (
    <>
      <Header title="Upload Timesheet" subtitle="Submit your timesheet for AI-powered processing" />
      <div className="p-6 lg:p-8">
        <div className="mx-auto max-w-3xl">
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv,.pdf,.jpg,.jpeg,.png,.zip"
            className="hidden"
            onChange={onFileSelect}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={cn(
              'relative rounded-3xl border-2 border-dashed p-12 text-center transition-all duration-300',
              dragging
                ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20'
                : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900',
              uploading && 'pointer-events-none'
            )}
          >
            {!uploading ? (
              <>
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl shadow-blue-500/25">
                  <Upload className="h-9 w-9 text-white" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Drag & drop your timesheet here
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Excel files are parsed and saved directly to the database
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-6 rounded-xl gradient-accent px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-transform hover:scale-105"
                >
                  Select File
                </button>
              </>
            ) : (
              <div className="py-4">
                <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-blue-500" />
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  {isExcelFile(fileName) ? 'Importing Excel' : 'Uploading'} {fileName}
                </p>
                <div className="mx-auto mt-4 h-2 max-w-md overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <motion.div
                    className="h-full rounded-full gradient-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: 'easeOut' }}
                  />
                </div>
                <p className="mt-2 text-sm text-slate-500">{Math.round(progress)}% complete</p>
              </div>
            )}
          </motion.div>

          {error && (
            <div className="mt-4 flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-400">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <div>
                <p className="font-semibold">Import failed</p>
                <p className="mt-1">{error}</p>
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href={api.downloadTemplate()}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400"
            >
              <Download className="h-4 w-4" /> Download Excel Template
            </a>
            <p className="text-xs text-slate-500">
              Or place your file in <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">data/import/</code> and run{' '}
              <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">npm run import:excel</code>
            </p>
          </div>

          <div className="mt-8">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">Supported Formats</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {formats.map((f) => (
                <div key={f.label} className="flex flex-col items-center gap-2 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800">
                  <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', f.color)}>
                    <f.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
