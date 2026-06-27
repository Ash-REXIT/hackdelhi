import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { useApp } from '../../context/AppContext'
import { cn } from '../../lib/utils'
import { AIChat } from '../ui/AIChat'

interface DashboardLayoutProps {
  variant: 'client' | 'admin'
  showFloatingChat?: boolean
  chatSuggestions?: string[]
  chatTitle?: string
}

export function DashboardLayout({
  variant,
  showFloatingChat = true,
  chatSuggestions = [],
  chatTitle = 'AI Assistant',
}: DashboardLayoutProps) {
  const { sidebarCollapsed } = useApp()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar variant={variant} />
      <main
        className={cn(
          'min-h-screen transition-all duration-300',
          sidebarCollapsed ? 'ml-[72px]' : 'ml-[260px]'
        )}
      >
        <Outlet />
      </main>
      {showFloatingChat && variant === 'client' && (
        <AIChat suggestions={chatSuggestions} title={chatTitle} />
      )}
      {showFloatingChat && variant === 'admin' && (
        <AIChat suggestions={chatSuggestions} title="AI Copilot" />
      )}
    </div>
  )
}
