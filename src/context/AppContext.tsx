import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { UserRole } from '../types'

interface AppContextType {
  role: UserRole | null
  setRole: (role: UserRole | null) => void
  darkMode: boolean
  toggleDarkMode: () => void
  searchQuery: string
  setSearchQuery: (q: string) => void
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  chatOpen: boolean
  setChatOpen: (open: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null)
  const [darkMode, setDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode((d) => !d)
  const toggleSidebar = () => setSidebarCollapsed((s) => !s)

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        darkMode,
        toggleDarkMode,
        searchQuery,
        setSearchQuery,
        sidebarCollapsed,
        toggleSidebar,
        chatOpen,
        setChatOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
