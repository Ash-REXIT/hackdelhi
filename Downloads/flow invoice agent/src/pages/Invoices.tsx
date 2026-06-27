import { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  Send, 
  AlertTriangle,
  FileText,
  MoreHorizontal
} from 'lucide-react';

export function Invoices() {
  const [activeTab, setActiveTab] = useState('ready');

  const tabs = [
    { id: 'ready', label: 'Ready', icon: CheckCircle, count: 24, color: 'text-success' },
    { id: 'pending', label: 'Pending Review', icon: Clock, count: 7, color: 'text-warning' },
    { id: 'sent', label: 'Sent to ERP', icon: Send, count: 142, color: 'text-muted-foreground' },
    { id: 'exceptions', label: 'Exceptions', icon: AlertTriangle, count: 3, color: 'text-danger' },
  ];

  const mockInvoices = [
    { id: 'INV-2026-001', client: 'Acme Corp', project: 'Project Phoenix', amount: '$4,500.00', date: 'Oct 14, 2026', status: 'ready' },
    { id: 'INV-2026-002', client: 'Globex Inc', project: 'Q4 Marketing', amount: '$12,200.00', date: 'Oct 13, 2026', status: 'ready' },
    { id: 'INV-2026-003', client: 'Initech', project: 'Software Upgrade', amount: '$8,950.00', date: 'Oct 14, 2026', status: 'ready' },
    { id: 'INV-2026-004', client: 'Stark Industries', project: 'Arc Reactor UI', amount: '$24,000.00', date: 'Oct 12, 2026', status: 'pending' },
    { id: 'INV-2026-005', client: 'Wayne Enterprises', project: 'Security Audit', amount: '$15,000.00', date: 'Oct 14, 2026', status: 'exceptions' },
  ];

  const filteredInvoices = mockInvoices.filter(inv => inv.status === activeTab);

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <div className="h-16 border-b border-border/50 flex items-end px-10 pb-0 bg-card shrink-0 space-x-8 shadow-sm relative z-10">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2.5 pb-4 px-1 border-b-2 transition-colors ${
                isActive 
                  ? 'border-primary text-foreground' 
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border/80'
              }`}
            >
              <tab.icon size={16} className={isActive ? tab.color : ''} />
              <span className="font-medium text-sm">{tab.label}</span>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${isActive ? 'bg-primary/10 text-primary' : 'bg-panel border border-border/50'}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
      
      <div className="flex-1 overflow-y-auto p-10 bg-background">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl">
          {filteredInvoices.map((invoice) => (
            <div key={invoice.id} className="bg-card border border-border/60 rounded-xl p-6 hover:border-primary/50 transition-all cursor-pointer group flex flex-col shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
              
              <div className="flex justify-between items-start mb-5 relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-panel rounded-lg border border-border/50 text-muted-foreground group-hover:text-primary transition-colors">
                    <FileText size={16} />
                  </div>
                  <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wide bg-background px-2 py-1 rounded border border-border/50">{invoice.id}</span>
                </div>
                <button className="text-muted-foreground hover:text-foreground p-1 transition-colors opacity-0 group-hover:opacity-100">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              
              <div className="relative z-10">
                <h3 className="font-medium text-foreground text-lg mb-1">{invoice.client}</h3>
                <p className="text-sm text-muted-foreground mb-6">{invoice.project}</p>
              </div>
              
              <div className="mt-auto pt-5 border-t border-border/50 flex justify-between items-end relative z-10">
                <div className="text-xs text-muted-foreground font-medium">
                  {invoice.date}
                </div>
                <div className="font-mono font-medium text-foreground text-lg tracking-tight">
                  {invoice.amount}
                </div>
              </div>
            </div>
          ))}
          
          {filteredInvoices.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-border/50 rounded-xl bg-card">
              <FileText size={40} className="mb-4 opacity-20" />
              <p className="text-sm font-medium">No invoices found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
