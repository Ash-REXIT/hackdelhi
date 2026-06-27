import React from 'react';
import { Activity, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function OperationsShell({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background font-sans text-foreground">
      {/* Minimal Sidebar for Ops */}
      <aside className="w-[60px] bg-panel flex flex-col items-center py-4 shrink-0 border-r border-[#2A3442]/50 justify-between">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
          <Activity size={20} />
        </div>
        <button 
          onClick={handleLogout}
          className="w-10 h-10 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-card hover:text-foreground transition-colors group relative"
        >
          <LogOut size={20} />
          <div className="absolute left-14 bg-card border border-border px-2 py-1 rounded text-xs font-medium text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
            Sign Out
          </div>
        </button>
      </aside>

      <div className="flex-1 flex flex-col h-full bg-[#0B0F14]">
        <header className="h-14 border-b border-[#2A3442]/50 flex items-center px-8 bg-[#0B0F14] shrink-0">
          <span className="font-medium text-sm text-muted-foreground tracking-wide uppercase">Operations Center</span>
        </header>
        <main className="flex-1 overflow-y-auto w-full p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
