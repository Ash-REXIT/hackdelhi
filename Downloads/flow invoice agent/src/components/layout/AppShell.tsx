import { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { StatusBar } from './StatusBar';
import { Sparkles, Command } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground font-sans">
      <StatusBar />
      <div className="flex flex-1 overflow-hidden border-t border-border relative">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden bg-background border-l border-border relative">
          {children}
        </main>
        
        {/* Global AI Teammate Command Bar */}
        <div className={`absolute right-6 bottom-6 w-80 bg-panel border border-ai-accent/30 rounded-xl shadow-2xl shadow-ai-accent/10 transition-transform duration-300 ease-in-out ${isAiPanelOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}>
          <div className="p-3 border-b border-border flex items-center space-x-2">
            <Sparkles size={16} className="text-ai-accent" />
            <span className="text-sm font-semibold">FlowInvoice AI</span>
          </div>
          <div className="p-4 h-48 overflow-y-auto">
            <div className="text-xs text-muted-foreground mb-3 text-center">AI is analyzing current context...</div>
          </div>
          <div className="p-3 border-t border-border relative">
            <input 
              type="text" 
              placeholder="Ask anything..." 
              className="w-full bg-background border border-border rounded text-sm px-3 py-1.5 focus:outline-none focus:border-ai-accent transition-colors"
            />
          </div>
        </div>

        {/* AI Toggle Button */}
        <button 
          onClick={() => setIsAiPanelOpen(!isAiPanelOpen)}
          className="absolute right-6 bottom-6 w-12 h-12 bg-ai-accent hover:bg-ai-accent/90 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
        >
          {isAiPanelOpen ? <Command size={20} /> : <Sparkles size={20} />}
        </button>

      </div>
    </div>
  );
}
