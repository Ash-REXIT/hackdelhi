import { Search, Moon, Sun, Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { DbStatusBadge } from '../ui/DbStatus'
import { cn } from '../../lib/utils'

interface HeaderProps {
  title: string
  subtitle?: string
  notificationPath?: string
  unreadCount?: number
}

export function Header({ title, subtitle, notificationPath, unreadCount = 0 }: HeaderProps) {
  const { darkMode, toggleDarkMode, searchQuery, setSearchQuery, sidebarCollapsed } = useApp()
  const navigate = useNavigate()

  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/60 bg-white/80 px-6 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80',
        sidebarCollapsed ? 'ml-[72px]' : 'ml-[260px]'
      )}
    >
      <div>
        <h1 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <DbStatusBadge />
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Global search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 rounded-xl border-0 bg-slate-100 py-2 pl-10 pr-4 text-sm text-slate-900 ring-1 ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white dark:ring-slate-700 lg:w-80"
          />
        </div>

        <button
          onClick={toggleDarkMode}
          className="rounded-xl p-2.5 text-slate-500 ring-1 ring-slate-200 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:ring-slate-700 dark:hover:bg-slate-800"
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <button
          onClick={() => notificationPath && navigate(notificationPath)}
          className="relative rounded-xl p-2.5 text-slate-500 ring-1 ring-slate-200 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:ring-slate-700 dark:hover:bg-slate-800"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
