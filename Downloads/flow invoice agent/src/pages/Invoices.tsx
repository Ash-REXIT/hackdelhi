import { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  Send, 
  AlertTriangle,
  FileText
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
      <div className="h-16 border-b border-border flex items-end px-8 pb-0 bg-background shrink-0 space-x-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 pb-3 px-1 border-b-2 transition-colors ${
                isActive 
                  ? 'border-primary text-foreground' 
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              <tab.icon size={16} className={isActive ? tab.color : ''} />
              <span className="font-medium text-sm">{tab.label}</span>
              <span className={`text-xs font-mono px-1.5 py-0.5 rounded-full ${isActive ? 'bg-primary/10 text-primary' : 'bg-panel'}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
      
      <div className="flex-1 overflow-y-auto p-8 bg-[#090b0e]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredInvoices.map((invoice) => (
            <div key={invoice.id} className="bg-panel border border-border rounded-lg p-5 hover:border-primary/50 transition-colors cursor-pointer group flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-card rounded border border-border text-muted-foreground group-hover:text-primary transition-colors">
                    <FileText size={16} />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-wide">{invoice.id}</span>
                </div>
              </div>
              <h3 className="font-medium text-foreground text-lg mb-1">{invoice.client}</h3>
              <p className="text-sm text-muted-foreground mb-4">{invoice.project}</p>
              
              <div className="mt-auto pt-4 border-t border-border flex justify-between items-end">
                <div className="text-xs text-muted-foreground font-mono">
                  {invoice.date}
                </div>
                <div className="font-mono font-medium text-foreground">
                  {invoice.amount}
                </div>
              </div>
            </div>
          ))}
          
          {filteredInvoices.length === 0 && (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-muted-foreground">
              <FileText size={48} className="mb-4 opacity-20" />
              <p className="text-sm font-medium">No invoices found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
