import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Upload, FileText, ClipboardCheck, Receipt,
  Bell, Bot, User, Users, Inbox, Brain, FileCheck, Send,
  AlertTriangle, BarChart3, ScrollText, Settings, ChevronLeft,
  Sparkles, LogOut, Mail, Cog,
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { useApp } from '../../context/AppContext'

const clientNav = [
  { to: '/client', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/client/upload', icon: Upload, label: 'Upload Timesheet' },
  { to: '/client/timesheets', icon: FileText, label: 'My Timesheets' },
  { to: '/client/reports', icon: ClipboardCheck, label: 'Verification Reports' },
  { to: '/client/invoices', icon: Receipt, label: 'Invoices' },
  { to: '/client/notifications', icon: Bell, label: 'Notifications' },
  { to: '/client/assistant', icon: Bot, label: 'AI Assistant' },
  { to: '/client/profile', icon: User, label: 'Profile' },
]

const adminNav = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/clients', icon: Users, label: 'Client Management' },
  { to: '/admin/ingestion', icon: Mail, label: 'Email Ingestion' },
  { to: '/admin/erp', icon: Cog, label: 'ERP Orchestrator' },
  { to: '/admin/timesheets', icon: Inbox, label: 'Incoming Timesheets' },
  { to: '/admin/review', icon: Brain, label: 'AI Review Queue' },
  { to: '/admin/invoice-validation', icon: FileCheck, label: 'Invoice Validation' },
  { to: '/admin/invoice-generator', icon: Receipt, label: 'Invoice Generator' },
  { to: '/admin/dispatch', icon: Send, label: 'Dispatch Center' },
  { to: '/admin/exceptions', icon: AlertTriangle, label: 'Exception Center' },
  { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/admin/audit', icon: ScrollText, label: 'Audit Logs' },
  { to: '/admin/notifications', icon: Bell, label: 'Notifications' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
  { to: '/admin/copilot', icon: Bot, label: 'AI Copilot' },
]

interface SidebarProps {
  variant: 'client' | 'admin'
}

export function Sidebar({ variant }: SidebarProps) {
  const { sidebarCollapsed, toggleSidebar, setRole } = useApp()
  const navigate = useNavigate()
  const nav = variant === 'client' ? clientNav : adminNav

  const handleLogout = () => {
    setRole(null)
    navigate('/')
  }

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 flex flex-col bg-[#0F172A] transition-all duration-300',
        sidebarCollapsed ? 'w-[72px]' : 'w-[260px]'
      )}
    >
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-4">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        {!sidebarCollapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-white">FlowInvoice AI</p>
            <p className="truncate text-[10px] font-medium uppercase tracking-wider text-blue-400">TIA · TASC</p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-blue-600/90 to-indigo-600/90 text-white shadow-lg shadow-blue-900/30'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              )
            }
          >
            <item.icon className="h-[18px] w-[18px] flex-shrink-0" />
            {!sidebarCollapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3 space-y-1">
        <button
          onClick={toggleSidebar}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ChevronLeft className={cn('h-[18px] w-[18px] transition-transform', sidebarCollapsed && 'rotate-180')} />
          {!sidebarCollapsed && <span>Collapse</span>}
        </button>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-[18px] w-[18px]" />
          {!sidebarCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  )
}
