import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { StatusBar } from './StatusBar';
import { AiAssistantWidget } from '../AiAssistantWidget';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground font-sans">
      <StatusBar />
      <div className="flex flex-1 overflow-hidden border-t border-border relative">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden bg-background border-l border-border relative">
          {children}
        </main>
        <AiAssistantWidget />
      </div>
    </div>
  );
}
