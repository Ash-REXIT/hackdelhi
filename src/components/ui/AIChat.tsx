import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, X, Sparkles } from 'lucide-react'
import { cn } from '../../lib/utils'

interface AIChatProps {
  suggestions: string[]
  onSend?: (message: string) => string
  title?: string
  floating?: boolean
}

const defaultResponses: Record<string, string> = {
  default: "I'm FlowInvoice AI, your intelligent billing assistant. I can help explain verification reports, invoice summaries, and billing anomalies. What would you like to know?",
}

export function AIChat({ suggestions, onSend, title = 'AI Assistant', floating = true }: AIChatProps) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: defaultResponses.default },
  ])
  const [input, setInput] = useState('')

  const send = (text: string) => {
    if (!text.trim()) return
    const response = onSend?.(text) ?? getDefaultResponse(text)
    setMessages((m) => [...m, { role: 'user', content: text }, { role: 'assistant', content: response }])
    setInput('')
  }

  if (floating) {
    return (
      <>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-24 right-6 z-50 flex h-[520px] w-[400px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700"
            >
              <ChatHeader title={title} onClose={() => setOpen(false)} />
              <ChatBody messages={messages} suggestions={suggestions} onSuggestion={send} />
              <ChatInput value={input} onChange={setInput} onSend={() => send(input)} />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(!open)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full gradient-accent shadow-lg shadow-blue-500/30"
        >
          {open ? <X className="h-6 w-6 text-white" /> : <Bot className="h-6 w-6 text-white" />}
        </motion.button>
      </>
    )
  }

  return (
    <div className="flex h-full flex-col rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800">
      <ChatHeader title={title} />
      <ChatBody messages={messages} suggestions={suggestions} onSuggestion={send} />
      <ChatInput value={input} onChange={setInput} onSend={() => send(input)} />
    </div>
  )
}

function ChatHeader({ title, onClose }: { title: string; onClose?: () => void }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-accent">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{title}</p>
          <p className="text-xs text-emerald-500">Online</p>
        </div>
      </div>
      {onClose && (
        <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

function ChatBody({
  messages,
  suggestions,
  onSuggestion,
}: {
  messages: { role: 'user' | 'assistant'; content: string }[]
  suggestions: string[]
  onSuggestion: (s: string) => void
}) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, i) => (
        <div key={i} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
          <div
            className={cn(
              'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
              msg.role === 'user'
                ? 'gradient-accent text-white'
                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
            )}
          >
            {msg.content}
          </div>
        </div>
      ))}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => onSuggestion(s)}
              className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:text-slate-400 dark:hover:border-blue-700 dark:hover:bg-blue-950/50"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ChatInput({ value, onChange, onSend }: { value: string; onChange: (v: string) => void; onSend: () => void }) {
  return (
    <div className="border-t border-slate-100 p-4 dark:border-slate-800">
      <div className="flex items-center gap-2 rounded-xl bg-slate-50 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSend()}
          placeholder="Ask anything..."
          className="flex-1 bg-transparent px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
        />
        <button onClick={onSend} className="mr-1.5 rounded-lg p-2 gradient-accent text-white">
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function getDefaultResponse(query: string): string {
  const q = query.toLowerCase()
  if (q.includes('verification') || q.includes('flagged')) {
    return 'Your timesheet TS-2024-0893 was flagged because project codes are missing on 4 entries and manager signature was not detected on page 3. OCR confidence is 87.3% due to handwritten format. I recommend correcting these fields and re-uploading.'
  }
  if (q.includes('invoice') || q.includes('summary')) {
    return 'Your latest invoice TASC-INV-2024-4521 totals ₹28,67,400 (including 18% GST) for June 2024. It covers 540 billable hours across 12 employees at ₹4,500/hr. Status: Approved and delivered.'
  }
  if (q.includes('upload') || q.includes('today')) {
    return "Today: 24 timesheets uploaded across 5 clients. 18 invoices generated, 15 auto-approved, 6 pending manual review, and 3 critical exceptions. Average AI confidence: 92.4%."
  }
  if (q.includes('anomaly') || q.includes('overtime')) {
    return 'Top overtime anomalies: Infosys (Deepak Rao — 4hrs), TCS (Nisha Gupta — 6hrs weekend work), HCL (batch submission with 3 missing signatures). Recommend reviewing TS-2024-0893 and TS-2024-0896.'
  }
  if (q.includes('finance') || q.includes('summary')) {
    return 'June 2024 Finance Summary: ₹6.8Cr total invoiced (+9.7% MoM). 248 timesheets processed, 89% auto-approval rate, 2.6 min avg processing time. Top client: Infosys (₹12.4L). 3 critical exceptions require attention.'
  }
  if (q.includes('compare') || q.includes('previous')) {
    return 'Compared to May: Uploads +5.5%, auto-approval -4%, manual reviews +4%, avg confidence -2%. Invoice volume up ₹6L. Primary driver: increased handwritten submissions from Infosys.'
  }
  if (q.includes('client') && q.includes('overtime')) {
    return 'Clients with highest overtime: 1) Infosys — 47 hrs across 8 employees, 2) TCS — 32 hrs (includes weekend anomalies), 3) HCL — 28 hrs. All exceed the 10hr/week tolerance threshold.'
  }
  return "I can help with verification explanations, invoice summaries, upload analytics, and anomaly detection. Try asking about a specific timesheet or invoice."
}

export { getDefaultResponse }
