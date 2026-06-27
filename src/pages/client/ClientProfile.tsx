import { User, Mail, Building2, Globe, Shield } from 'lucide-react'
import { Header } from '../../components/layout/Header'
import { AIChat } from '../../components/ui/AIChat'
import { useData } from '../../context/DataContext'
import { StatusBadge } from '../../components/ui/StatusBadge'

export function ClientProfile() {
  const { currentClient } = useData()
  const fields = [
    { icon: User, label: 'Contact Person', value: currentClient.contactPerson },
    { icon: Mail, label: 'Email', value: currentClient.email },
    { icon: Building2, label: 'Billing Entity', value: currentClient.billingEntity },
    { icon: Globe, label: 'Currency', value: currentClient.currency },
    { icon: Shield, label: 'Validation Profile', value: currentClient.validationProfile },
  ]

  return (
    <>
      <Header title="Profile" subtitle="Your account and billing configuration" />
      <div className="p-6 lg:p-8">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800">
            <div className="mb-8 flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-accent text-2xl font-bold text-white">
                {currentClient.companyName.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{currentClient.companyName}</h2>
                <div className="mt-1 flex items-center gap-2">
                  <StatusBadge status="approved" label="Active Client" />
                  <span className="text-sm text-slate-500">{currentClient.dispatchRule}</span>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {fields.map((f) => (
                <div key={f.label} className="flex items-center gap-4 rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/50">
                  <f.icon className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-xs font-medium text-slate-400">{f.label}</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{f.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-5 dark:from-blue-950/30 dark:to-indigo-950/30">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Billing Rate</p>
              <p className="mt-1 text-2xl font-bold gradient-text">₹{currentClient.billingRate.toLocaleString('en-IN')} / hour</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function ClientAssistant() {
  return (
    <>
      <Header title="AI Assistant" subtitle="Your intelligent billing companion" />
      <div className="p-6 lg:p-8">
        <div className="mx-auto h-[calc(100vh-12rem)] max-w-3xl">
          <div className="flex h-full flex-col rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800">
            <AIChat
              floating={false}
              title="FlowInvoice AI Assistant"
              suggestions={[
                'Explain this verification',
                'Why was my timesheet flagged?',
                'Show invoice summary',
              ]}
            />
          </div>
        </div>
      </div>
    </>
  )
}
