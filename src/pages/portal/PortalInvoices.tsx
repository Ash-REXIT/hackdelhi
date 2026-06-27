import { useCallback, useEffect, useState } from 'react';
import { Download, FileText, Loader2, Sparkles } from 'lucide-react';
import { api } from '@/lib/api';
import type { Invoice } from '@/types/api';

function formatMoney(amount: number | string, currency: string) {
  const n = Number(amount);
  return `${currency} ${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export function PortalInvoices() {
  const [activeTab, setActiveTab] = useState('ready');
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const data = await api<Invoice[]>('/api/invoices');
      setInvoices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const timer = setInterval(load, 12000);
    return () => clearInterval(timer);
  }, [load]);

  const tabs = [
    { id: 'ready', label: 'Ready', statuses: ['DISPATCHED', 'DELIVERED', 'CLIENT_APPROVED'] },
    { id: 'paid', label: 'Paid', statuses: ['PAID'] },
  ];

  const filtered = invoices.filter((inv) => {
    const tab = tabs.find((t) => t.id === activeTab);
    return tab?.statuses.includes(inv.status);
  });

  const downloadPdf = async (invoice: Invoice) => {
    const token = localStorage.getItem('flowinvoice_token');
    const res = await fetch(`/api/invoices/${invoice.id}/pdf`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${invoice.invoiceNumber}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-12 w-full max-w-5xl mx-auto h-full overflow-y-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">My Invoices</h1>
        <p className="text-muted-foreground">Invoices dispatched from FinOps appear here for download and review.</p>
      </div>

      {invoices.some((i) => i.status === 'DISPATCHED') && activeTab === 'ready' && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3">
          <Sparkles size={18} className="text-primary shrink-0" />
          <p className="text-sm text-foreground">
            You have new invoice{invoices.filter((i) => i.status === 'DISPATCHED').length !== 1 ? 's' : ''} from FinOps — ready to download.
          </p>
        </div>
      )}

      <div className="border-b border-[#2A3442]/60 mb-8 flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
            <span className="ml-2 text-xs font-mono text-muted-foreground">
              ({invoices.filter((i) => tab.statuses.includes(i.status)).length})
            </span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground py-12">
          <Loader2 className="animate-spin" size={18} />
          Loading invoices…
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((invoice) => (
            <div
              key={invoice.id}
              className="bg-[#1D2430] border border-[#2A3442]/60 rounded-xl p-5 flex items-center justify-between hover:border-primary/50 transition-colors shadow-sm group"
            >
              <div className="flex items-center space-x-6">
                <div className="p-3 bg-[#151A21] rounded-lg border border-[#2A3442]/50 text-muted-foreground group-hover:text-primary transition-colors">
                  <FileText size={20} />
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="font-mono text-sm text-foreground">{invoice.invoiceNumber}</span>
                    {invoice.status === 'DISPATCHED' && (
                      <span className="bg-primary/15 text-primary px-2 py-0.5 rounded text-[10px] font-mono uppercase border border-primary/30">
                        New
                      </span>
                    )}
                    <span className="bg-[#151A21] px-2 py-0.5 rounded text-[11px] font-mono text-muted-foreground border border-[#2A3442]/50">
                      {formatDate(invoice.createdAt)}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {invoice.timesheet?.employee?.name || 'Employee'} · {invoice.payrollPeriod || 'Payroll'}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                <div className="text-right">
                  <div className="font-mono text-lg font-medium text-foreground">
                    {formatMoney(invoice.grandTotal, invoice.currency)}
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase">{invoice.status.replace(/_/g, ' ')}</div>
                </div>
                <button
                  type="button"
                  onClick={() => downloadPdf(invoice)}
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  title="Download PDF"
                >
                  <Download size={18} />
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="py-20 flex flex-col items-center justify-center text-center bg-[#151A21]/50 border-2 border-dashed border-[#2A3442]/60 rounded-xl">
              <FileText size={32} className="text-muted-foreground/30 mb-4" />
              <div className="text-sm font-medium text-foreground">No invoices in this tab</div>
              <div className="text-xs text-muted-foreground mt-1 max-w-sm">
                {activeTab === 'ready'
                  ? 'Invoices appear here after FinOps dispatches them from the Dispatch Center.'
                  : 'Paid invoices will show here once finance marks them as paid.'}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
