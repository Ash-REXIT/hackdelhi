import { motion } from 'framer-motion'
import { Building2, Shield, Sparkles, ArrowRight, FileSpreadsheet, Brain, Receipt } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export function RoleSelector() {
  const { setRole } = useApp()
  const navigate = useNavigate()

  const selectRole = (role: 'client' | 'admin') => {
    setRole(role)
    navigate(role === 'client' ? '/client' : '/admin')
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40" />
      <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl gradient-accent shadow-xl shadow-blue-500/25">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            FlowInvoice <span className="gradient-text">AI</span>
          </h1>
          <p className="mt-2 text-lg text-slate-500">Touchless Invoice Agent · Powered by TASC</p>
          <p className="mx-auto mt-4 max-w-xl text-sm text-slate-400">
            Convert timesheets to ERP-ready invoices with AI-powered validation, 
            intelligent OCR, and end-to-end billing automation.
          </p>
        </motion.div>

        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { icon: FileSpreadsheet, label: 'Smart OCR', desc: 'PDF, Excel, Images & more' },
            { icon: Brain, label: 'AI Validation', desc: 'Rules, duplicates & risk scoring' },
            { icon: Receipt, label: 'Auto Invoicing', desc: 'SAP-ready export & dispatch' },
          ].map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-3 rounded-2xl bg-white/80 px-5 py-4 shadow-sm ring-1 ring-slate-200/60 backdrop-blur-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                <f.icon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{f.label}</p>
                <p className="text-xs text-slate-500">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            onClick={() => selectRole('client')}
            className="group relative overflow-hidden rounded-2xl bg-white p-8 text-left shadow-lg ring-1 ring-slate-200/60 transition-shadow hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-indigo-500/0 transition-all group-hover:from-blue-500/5 group-hover:to-indigo-500/5" />
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Client Portal</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Upload timesheets, track AI verification, view invoices, and manage your billing workflow.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600">
                Enter as Client <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            onClick={() => selectRole('admin')}
            className="group relative overflow-hidden rounded-2xl bg-[#0F172A] p-8 text-left shadow-lg transition-shadow hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">TASC Admin</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Operational control center — review queue, invoice generation, dispatch, analytics & audit.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-400">
                Enter as Admin <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </motion.button>
        </div>

        <p className="mt-12 text-xs text-slate-400">© 2024 TASC · FlowInvoice AI v2.1 · Enterprise Demo</p>
      </div>
    </div>
  )
}
