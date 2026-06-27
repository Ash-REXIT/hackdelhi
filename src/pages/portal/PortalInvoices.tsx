import { useState } from 'react';
import { Download, FileText, ChevronRight } from 'lucide-react';

export function PortalInvoices() {
  const [activeTab, setActiveTab] = useState('ready');

  const tabs = [
    { id: 'ready', label: 'Ready' },
    { id: 'processing', label: 'Processing' },
    { id: 'approvals', label: 'Awaiting Approval' },
    { id: 'paid', label: 'Paid' },
  ];

  const invoices = [
    { id: 'INV-8921', project: 'Project Phoenix', amount: '$4,500.00', date: 'Oct 14, 2026', status: 'ready' },
    { id: 'INV-8922', project: 'Q4 Marketing', amount: '$12,200.00', date: 'Oct 13, 2026', status: 'ready' },
    { id: 'INV-8923', project: 'Software Upgrade', amount: '$8,950.00', date: 'Oct 14, 2026', status: 'ready' },
    { id: 'INV-8924', project: 'Arc Reactor UI', amount: '$24,000.00', date: 'Oct 12, 2026', status: 'processing' },
    { id: 'INV-8925', project: 'Security Audit', amount: '$15,000.00', date: 'Oct 14, 2026', status: 'approvals' },
  ];

  const filtered = invoices.filter(inv => inv.status === activeTab);

  return (
    <div className="p-12 w-full max-w-5xl mx-auto h-full overflow-y-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">My Invoices</h1>
        <p className="text-muted-foreground">Track, download, and manage your generated invoices.</p>
      </div>

      <div className="border-b border-[#2A3442]/60 mb-8 flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((invoice) => (
          <div key={invoice.id} className="bg-[#1D2430] border border-[#2A3442]/60 rounded-xl p-5 flex items-center justify-between hover:border-primary/50 transition-colors shadow-sm group">
            <div className="flex items-center space-x-6">
              <div className="p-3 bg-[#151A21] rounded-lg border border-[#2A3442]/50 text-muted-foreground group-hover:text-primary transition-colors">
                <FileText size={20} />
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <span className="font-mono text-sm text-foreground">{invoice.id}</span>
                  <span className="bg-[#151A21] px-2 py-0.5 rounded text-[11px] font-mono text-muted-foreground border border-[#2A3442]/50">
                    {invoice.date}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">{invoice.project}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="text-right">
                <div className="font-mono text-lg font-medium text-foreground">{invoice.amount}</div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                  <Download size={18} />
                </button>
                <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-[#151A21] rounded-lg transition-colors flex items-center">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center bg-[#151A21]/50 border-2 border-dashed border-[#2A3442]/60 rounded-xl">
            <FileText size={32} className="text-muted-foreground/30 mb-4" />
            <div className="text-sm font-medium text-foreground">No invoices found</div>
            <div className="text-xs text-muted-foreground mt-1">There are no invoices currently in this state.</div>
          </div>
        )}
      </div>
    </div>
  );
}
