import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Building2, Mail, Globe, Shield, Save, ArrowLeft } from 'lucide-react'
import { Header } from '../../components/layout/Header'
import { useData } from '../../context/DataContext'
import { api } from '../../api/client'

export function ClientConfigure() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { clients, refresh } = useData()
  const client = clients.find((c) => c.id === id) ?? clients[0]

  const [form, setForm] = useState({
    companyName: client?.companyName ?? '',
    contactPerson: client?.contactPerson ?? '',
    email: client?.email ?? '',
    billingEntity: client?.billingEntity ?? '',
    currency: client?.currency ?? 'AED',
    dispatchRule: client?.dispatchRule ?? 'Auto-dispatch on approval',
    validationProfile: client?.validationProfile ?? 'TASC UAE Payroll v1.0',
    billingRate: client?.billingRate ?? 50,
    inputChannels: ['Portal Upload', 'Email Mailbox'],
    status: client?.status ?? 'active',
  })
  const [saved, setSaved] = useState(false)

  const toggleChannel = (ch: string) => {
    setForm((f) => ({
      ...f,
      inputChannels: f.inputChannels.includes(ch)
        ? f.inputChannels.filter((c) => c !== ch)
        : [...f.inputChannels, ch],
    }))
  }

  const save = async () => {
    if (client) {
      await api.updateClient(client.id, form).catch(() => {})
      setSaved(true)
      await refresh()
      setTimeout(() => setSaved(false), 3000)
    }
  }

  const channels = ['Portal Upload', 'Email Mailbox', 'Online Timesheet App', 'API Integration', 'Handwritten Image OCR']

  return (
    <>
      <Header title="Client Configuration" subtitle="Onboard client — input channels, dispatch rules, validation profile (§4.1)" />
      <div className="p-6 lg:p-8">
        <button onClick={() => navigate('/admin/clients')} className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <ArrowLeft className="h-4 w-4" /> Back to Clients
        </button>

        <div className="mx-auto max-w-2xl space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-accent">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold">{client?.companyName}</h2>
                <p className="text-sm text-slate-500">{client?.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                { label: 'Company Name', key: 'companyName', icon: Building2 },
                { label: 'Contact Person', key: 'contactPerson', icon: Mail },
                { label: 'Email', key: 'email', icon: Mail },
                { label: 'Billing Entity', key: 'billingEntity', icon: Globe },
              ].map((f) => (
                <div key={f.key}>
                  <label className="text-xs font-medium text-slate-500">{f.label}</label>
                  <input
                    value={form[f.key as keyof typeof form] as string}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="mt-1 w-full rounded-xl bg-slate-50 px-3 py-2.5 text-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-slate-500">Currency</label>
                <select value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })}
                  className="mt-1 w-full rounded-xl bg-slate-50 px-3 py-2.5 text-sm ring-1 ring-slate-200 dark:bg-slate-800">
                  {['AED', 'INR', 'USD', 'EUR'].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Billing Rate (/hr)</label>
                <input type="number" value={form.billingRate} onChange={(e) => setForm({ ...form, billingRate: Number(e.target.value) })}
                  className="mt-1 w-full rounded-xl bg-slate-50 px-3 py-2.5 text-sm ring-1 ring-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800">
            <h3 className="mb-4 flex items-center gap-2 font-semibold"><Shield className="h-4 w-4" /> Input Channels (§4.2)</h3>
            <div className="flex flex-wrap gap-2">
              {channels.map((ch) => (
                <button key={ch} onClick={() => toggleChannel(ch)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium ring-1 ${form.inputChannels.includes(ch) ? 'bg-blue-50 text-blue-700 ring-blue-200' : 'bg-slate-50 text-slate-500 ring-slate-200'}`}>
                  {ch}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800">
            <h3 className="mb-4 font-semibold">Dispatch & Validation Rules (§4.6)</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-500">Dispatch Rule</label>
                <select value={form.dispatchRule} onChange={(e) => setForm({ ...form, dispatchRule: e.target.value })}
                  className="mt-1 w-full rounded-xl bg-slate-50 px-3 py-2.5 text-sm ring-1 ring-slate-200 dark:bg-slate-800">
                  <option>Auto-dispatch on approval</option>
                  <option>Manual approval required</option>
                  <option>Order bills ascending by spend amount</option>
                  <option>Order bills ascending by salary</option>
                  <option>Weekly batch dispatch</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500">Validation Profile</label>
                <select value={form.validationProfile} onChange={(e) => setForm({ ...form, validationProfile: e.target.value })}
                  className="mt-1 w-full rounded-xl bg-slate-50 px-3 py-2.5 text-sm ring-1 ring-slate-200 dark:bg-slate-800">
                  <option>TASC UAE Payroll v1.0</option>
                  <option>Enterprise Standard v2.1</option>
                  <option>Global Compliance v3.0</option>
                  <option>EU GDPR Compliant v1.5</option>
                </select>
              </div>
            </div>
          </div>

          <button onClick={save} className="flex w-full items-center justify-center gap-2 rounded-xl gradient-accent py-3 text-sm font-semibold text-white">
            <Save className="h-4 w-4" /> {saved ? 'Saved!' : 'Save Configuration'}
          </button>
        </div>
      </div>
    </>
  )
}
