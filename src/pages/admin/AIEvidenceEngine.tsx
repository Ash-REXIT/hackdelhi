import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Scan, FileCheck, Users, FolderKanban, Copy, Shield, AlertCircle,
  PenLine, Calendar, Clock, ShieldAlert, Brain, Receipt, ArrowLeft,
} from 'lucide-react'
import { Header } from '../../components/layout/Header'
import { ValidationBadge } from '../../components/ui/StatusBadge'
import { EvidenceTimeline } from '../../components/ui/Timeline'
import { useData, getVerificationReport as findReport, getTimesheet as findTimesheet } from '../../context/DataContext'
import { AnomalyPanel } from '../../components/ui/AnomalyPanel'
import { HITLActionBar } from '../../components/ui/HITLActionBar'
import { cn } from '../../lib/utils'

const evidenceSections = [
  { key: 'documentQuality', label: 'Document Quality', icon: FileCheck, type: 'score' },
  { key: 'ocrAccuracy', label: 'OCR Accuracy', icon: Scan, type: 'score' },
  { key: 'employeeValidation', label: 'Employee Validation', icon: Users, type: 'validation' },
  { key: 'projectValidation', label: 'Project Validation', icon: FolderKanban, type: 'validation' },
  { key: 'duplicateDetection', label: 'Duplicate Detection', icon: Copy, type: 'validation' },
  { key: 'workingHoursValidation', label: 'Business Rule Validation', icon: Shield, type: 'validation' },
  { key: 'missingFields', label: 'Missing Fields', icon: AlertCircle, type: 'validation' },
  { key: 'signature', label: 'Signature Verification', icon: PenLine, type: 'static' },
  { key: 'weekend', label: 'Weekend Work Detection', icon: Calendar, type: 'static' },
  { key: 'overtime', label: 'Overtime Analysis', icon: Clock, type: 'static' },
]

export function AIEvidenceEngine() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { timesheets, verificationReports, refresh } = useData()
  const timesheet = findTimesheet(id ?? '', timesheets) ?? findTimesheet('TS-2024-0893', timesheets)
  const report = findReport(id ?? '', verificationReports) ?? verificationReports[1]

  const staticResults: Record<string, { status: 'pass' | 'warn' | 'fail'; detail: string }> = {
    signature: report.missingFields.status === 'pass'
      ? { status: 'pass', detail: 'All signatures verified' }
      : { status: 'fail', detail: 'Manager signature missing on page 3' },
    weekend: report.workingHoursValidation.status === 'fail'
      ? { status: 'fail', detail: 'Weekend work without approval detected' }
      : { status: 'pass', detail: 'No weekend anomalies' },
    overtime: report.workingHoursValidation.status === 'warn'
      ? { status: 'warn', detail: 'Overtime exceeds policy for 2 employees' }
      : report.workingHoursValidation.status === 'fail'
      ? { status: 'fail', detail: 'Overtime exceeds daily limit' }
      : { status: 'pass', detail: 'All hours within policy' },
  }

  return (
    <>
      <Header title="AI Evidence Engine" subtitle={`${timesheet?.id} · ${timesheet?.clientName}`} />
      <div className="p-6 lg:p-8">
        <button
          onClick={() => navigate('/admin/review')}
          className="mb-6 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Review Queue
        </button>

        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: 'Risk Score', value: report.riskScore, icon: ShieldAlert, color: report.riskScore > 50 ? 'text-red-600' : 'text-amber-600' },
            { label: 'AI Confidence', value: `${report.aiConfidence}%`, icon: Brain, color: 'text-indigo-600' },
            { label: 'OCR Accuracy', value: `${report.ocrAccuracy}%`, icon: Scan, color: 'text-blue-600' },
            { label: 'Document Quality', value: `${report.documentQuality}%`, icon: FileCheck, color: 'text-emerald-600' },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              className="glass-card rounded-2xl p-5 shadow-lg"
            >
              <card.icon className={cn('mb-2 h-5 w-5', card.color)} />
              <p className="text-xs font-medium text-slate-500">{card.label}</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{card.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {evidenceSections.map((section, i) => {
            let content: React.ReactNode
            if (section.type === 'score') {
              const val = report[section.key as 'ocrAccuracy' | 'documentQuality']
              content = <p className="text-2xl font-bold text-slate-900 dark:text-white">{val}%</p>
            } else if (section.type === 'validation') {
              const val = report[section.key as 'employeeValidation']
              content = (
                <>
                  <ValidationBadge status={val.status} />
                  <p className="mt-2 text-sm text-slate-500">{val.detail}</p>
                </>
              )
            } else {
              const val = staticResults[section.key]
              content = (
                <>
                  <ValidationBadge status={val.status} />
                  <p className="mt-2 text-sm text-slate-500">{val.detail}</p>
                </>
              )
            }

            return (
              <motion.div
                key={section.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.04 }}
                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800"
              >
                <div className="mb-3 flex items-center gap-2">
                  <section.icon className="h-4 w-4 text-slate-400" />
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{section.label}</span>
                </div>
                {content}
              </motion.div>
            )
          })}
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800">
              <h3 className="mb-6 text-base font-semibold text-slate-900 dark:text-white">Evidence Timeline</h3>
              <EvidenceTimeline items={report.evidenceTimeline} />
            </div>
            {timesheet && <AnomalyPanel entityId={timesheet.id} entityType="timesheet" />}
          </div>

          <div className="glass-card rounded-2xl p-6 shadow-lg">
            <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-white">Human-in-the-Loop Review</h3>
            <p className={cn(
              'text-lg font-bold',
              report.recommendation.includes('Reject') ? 'text-red-600' :
              report.recommendation.includes('Manual') ? 'text-amber-600' : 'text-emerald-600'
            )}>
              {report.recommendation}
            </p>
            <p className="mt-1 text-xs text-slate-500">AI Confidence: {report.aiConfidence}% · Risk: {report.riskScore}</p>
            <div className="mt-6">
              {timesheet && (
                <HITLActionBar
                  entityType="timesheet"
                  entityId={timesheet.id}
                  hasAnomalies={report.riskScore > 25 || report.recommendation.includes('Manual') || report.recommendation.includes('Reject')}
                  currentStatus={timesheet.status}
                  onComplete={() => refresh()}
                  showErp
                />
              )}
            </div>
            <button
              onClick={() => navigate(`/admin/invoice-generator/${timesheet?.id}`)}
              className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
            >
              <Receipt className="h-3.5 w-3.5" /> Open Invoice Generator
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
