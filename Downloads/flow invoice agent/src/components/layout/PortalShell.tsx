import React from 'react';
import { PortalSidebar } from './PortalSidebar';
import { Bell, Search } from 'lucide-react';

export function PortalShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background font-sans text-foreground">
      <PortalSidebar />
      <div className="flex-1 flex flex-col h-full bg-[#0B0F14] relative z-0">
        <header className="h-16 border-b border-[#2A3442]/50 flex items-center justify-between px-10 bg-[#0B0F14] shrink-0 sticky top-0 z-20">
          <div className="flex items-center space-x-4">
            {/* Top Navigation breadcrumb/title can go here if needed */}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
              <input 
                type="text" 
                placeholder="Search invoices..." 
                className="w-64 bg-[#151A21] border border-[#2A3442] rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors shadow-sm"
              />
            </div>
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto w-full flex flex-col items-center">
          <div className="w-full max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
