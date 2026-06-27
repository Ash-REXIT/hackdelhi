import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Users, Clock, FolderKanban, Copy, AlertCircle, Scan, FileCheck,
  ShieldAlert, Brain, Download, MessageSquare, ArrowLeft,
} from 'lucide-react'
import { Header } from '../../components/layout/Header'
import { ValidationBadge } from '../../components/ui/StatusBadge'
import { getVerificationReport, verificationReports } from '../../data/mockData'
import { cn } from '../../lib/utils'

const validationIcons = {
  employeeValidation: Users,
  workingHoursValidation: Clock,
  projectValidation: FolderKanban,
  duplicateDetection: Copy,
  missingFields: AlertCircle,
}

export function VerificationReportPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const report = getVerificationReport(id ?? '') ?? verificationReports[0]

  const scoreCards = [
    { label: 'OCR Accuracy', value: `${report.ocrAccuracy}%`, icon: Scan, color: 'text-blue-600' },
    { label: 'Document Quality', value: `${report.documentQuality}%`, icon: FileCheck, color: 'text-emerald-600' },
    { label: 'Risk Score', value: report.riskScore, icon: ShieldAlert, color: report.riskScore > 50 ? 'text-red-600' : 'text-amber-600' },
    { label: 'AI Confidence', value: `${report.aiConfidence}%`, icon: Brain, color: 'text-indigo-600' },
  ]

  return (
    <>
      <Header title="Verification Report" subtitle={`${report.timesheetId} · ${report.clientName}`} />
      <div className="p-6 lg:p-8">
        <button
          onClick={() => navigate('/client/reports')}
          className="mb-6 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Reports
        </button>

        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {scoreCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800"
            >
              <div className="flex items-center gap-3">
                <card.icon className={cn('h-5 w-5', card.color)} />
                <div>
                  <p className="text-xs font-medium text-slate-500">{card.label}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{card.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(validationIcons).map(([key, Icon], i) => {
            const val = report[key as keyof typeof validationIcons] as { status: 'pass' | 'warn' | 'fail'; detail: string }
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-slate-400" />
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
                    </span>
                  </div>
                  <ValidationBadge status={val.status} />
                </div>
                <p className="text-sm text-slate-500">{val.detail}</p>
              </motion.div>
            )
          })}
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800">
            <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">AI Explanation</h3>
            <ul className="space-y-3">
              {report.aiExplanation.map((line, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card rounded-2xl p-6 shadow-lg">
            <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-white">Recommendation</h3>
            <p className={cn(
              'text-lg font-bold',
              report.recommendation.includes('Manual') ? 'text-amber-600' :
              report.recommendation.includes('Reject') ? 'text-red-600' : 'text-emerald-600'
            )}>
              {report.recommendation}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <button className="flex items-center justify-center gap-2 rounded-xl gradient-accent px-4 py-2.5 text-sm font-semibold text-white">
                <Download className="h-4 w-4" /> Download Report
              </button>
              <button className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
                <MessageSquare className="h-4 w-4" /> Raise Query
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function VerificationReportsList() {
  const navigate = useNavigate()

  return (
    <>
      <Header title="Verification Reports" subtitle="AI-generated verification reports for your timesheets" />
      <div className="p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {verificationReports.map((report, i) => (
            <motion.button
              key={report.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => navigate(`/client/reports/${report.timesheetId}`)}
              className="rounded-2xl bg-white p-6 text-left shadow-sm ring-1 ring-slate-200/60 transition-all hover:shadow-md hover:ring-blue-200 dark:bg-slate-900 dark:ring-slate-800 dark:hover:ring-blue-800"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900 dark:text-white">{report.timesheetId}</span>
                <span className={cn(
                  'rounded-full px-2.5 py-0.5 text-xs font-medium',
                  report.recommendation.includes('Manual') ? 'bg-amber-50 text-amber-700' :
                  report.recommendation.includes('Reject') ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'
                )}>
                  {report.recommendation}
                </span>
              </div>
              <p className="text-sm text-slate-500">{report.clientName}</p>
              <div className="mt-4 flex gap-4 text-xs text-slate-400">
                <span>Confidence: {report.aiConfidence}%</span>
                <span>Risk: {report.riskScore}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </>
  )
}
