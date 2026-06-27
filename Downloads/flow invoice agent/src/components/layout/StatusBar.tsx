import { Activity, CheckCircle2, Wifi } from 'lucide-react';

export function StatusBar() {
  return (
    <header className="h-10 w-full bg-panel border-b border-border flex items-center justify-between px-4 select-none shrink-0 text-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
          <Activity size={14} />
          <span className="font-mono text-xs font-medium uppercase tracking-wider">FlowInvoice Workspace</span>
        </div>
        <div className="h-4 w-px bg-border"></div>
        <div className="flex items-center space-x-2 text-success text-xs font-mono">
          <CheckCircle2 size={12} />
          <span>Systems Online</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 text-muted-foreground text-xs font-mono">
        <div className="flex items-center space-x-1 hover:text-foreground cursor-pointer transition-colors">
          <span>AI Engine: Claude 3.5 Sonnet</span>
        </div>
        <div className="h-4 w-px bg-border"></div>
        <div className="flex items-center space-x-1 hover:text-foreground cursor-pointer transition-colors">
          <Wifi size={12} />
          <span>Connected</span>
        </div>
      </div>
    </header>
  );
}
