import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Upload, FileText, FileSpreadsheet, Image, Mail, Archive, CheckCircle2 } from 'lucide-react'
import { Header } from '../../components/layout/Header'
import { cn } from '../../lib/utils'

const formats = [
  { icon: FileText, label: 'PDF', color: 'text-red-500 bg-red-50' },
  { icon: FileSpreadsheet, label: 'Excel', color: 'text-emerald-500 bg-emerald-50' },
  { icon: Image, label: 'Images', color: 'text-blue-500 bg-blue-50' },
  { icon: Image, label: 'Handwritten', color: 'text-purple-500 bg-purple-50' },
  { icon: Mail, label: 'Email Attachments', color: 'text-amber-500 bg-amber-50' },
  { icon: Archive, label: 'ZIP', color: 'text-slate-500 bg-slate-50' },
]

export function UploadTimesheet() {
  const navigate = useNavigate()
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [fileName, setFileName] = useState('')

  const handleUpload = useCallback(() => {
    setUploading(true)
    setFileName('Infosys_June2024_Timesheet.pdf')
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 15 + 5
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(() => navigate('/client/processing/TS-2024-0898'), 600)
      }
      setProgress(Math.min(p, 100))
    }, 200)
  }, [navigate])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    handleUpload()
  }, [handleUpload])

  return (
    <>
      <Header title="Upload Timesheet" subtitle="Submit your timesheet for AI-powered processing" />
      <div className="p-6 lg:p-8">
        <div className="mx-auto max-w-3xl">
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
                <p className="mt-2 text-sm text-slate-500">or click to browse files from your computer</p>
                <button
                  onClick={handleUpload}
                  className="mt-6 rounded-xl gradient-accent px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-transform hover:scale-105"
                >
                  Select File
                </button>
              </>
            ) : (
              <div className="py-4">
                <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-blue-500" />
                <p className="text-lg font-semibold text-slate-900 dark:text-white">Uploading {fileName}</p>
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
