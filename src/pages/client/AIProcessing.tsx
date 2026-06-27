import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Loader2, Circle, Sparkles } from 'lucide-react'
import { Header } from '../../components/layout/Header'
import { cn } from '../../lib/utils'

const steps = [
  { id: 1, label: 'Receiving File', duration: 800 },
  { id: 2, label: 'OCR Processing', duration: 1200 },
  { id: 3, label: 'Extract Employee Details', duration: 1000 },
  { id: 4, label: 'Validate Company Rules', duration: 1100 },
  { id: 5, label: 'Duplicate Detection', duration: 900 },
  { id: 6, label: 'Generate AI Confidence Score', duration: 1000 },
  { id: 7, label: 'Verification Report Ready', duration: 800 },
]

export function AIProcessing() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  useEffect(() => {
    if (currentStep >= steps.length) {
      const timer = setTimeout(() => navigate(`/client/reports/${id ?? 'TS-2024-0898'}`), 1500)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      setCompletedSteps((prev) => [...prev, currentStep])
      setCurrentStep((s) => s + 1)
    }, steps[currentStep].duration)

    return () => clearTimeout(timer)
  }, [currentStep, navigate, id])

  const progress = Math.min(((completedSteps.length) / steps.length) * 100, 100)

  return (
    <>
      <Header title="AI Processing" subtitle={`Processing timesheet ${id ?? 'TS-2024-0898'}`} />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-3xl p-8 shadow-xl md:p-12"
          >
            <div className="mb-8 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl gradient-accent shadow-lg shadow-blue-500/30"
              >
                <Sparkles className="h-8 w-8 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">AI Processing Pipeline</h2>
              <p className="mt-2 text-sm text-slate-500">Touchless Invoice Agent is analyzing your submission</p>
            </div>

            <div className="mb-8">
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-slate-700 dark:text-slate-300">Overall Progress</span>
                <span className="font-bold text-blue-600">{Math.round(progress)}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <motion.div
                  className="h-full rounded-full gradient-accent"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>

            <div className="space-y-3">
              {steps.map((step, index) => {
                const isCompleted = completedSteps.includes(index)
                const isActive = currentStep === index && !isCompleted
                const isPending = index > currentStep

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      'flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-300',
                      isActive && 'bg-blue-50 ring-1 ring-blue-200 dark:bg-blue-950/30 dark:ring-blue-800',
                      isCompleted && 'bg-emerald-50/50 dark:bg-emerald-950/20',
                      isPending && 'opacity-50'
                    )}
                  >
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </motion.div>
                      ) : isActive ? (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                          <Loader2 className="h-4 w-4 animate-spin text-white" />
                        </div>
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700">
                          <Circle className="h-4 w-4 text-slate-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={cn('text-sm font-medium', isCompleted ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300')}>
                        Step {step.id}: {step.label}
                      </p>
                    </div>
                    {isCompleted && (
                      <span className="text-xs font-semibold text-emerald-600">Completed</span>
                    )}
                    {isActive && (
                      <span className="text-xs font-semibold text-blue-600">Processing...</span>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
