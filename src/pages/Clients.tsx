import { useEffect, useMemo, useState } from 'react';
import {
  Building2,
  Briefcase,
  Users,
  FileText,
  AlertTriangle,
  DollarSign,
  Loader2,
  LayoutTemplate,
} from 'lucide-react';
import { api } from '@/lib/api';
import { loadClientTemplatePreview } from '@/lib/invoicePdf';
import { PdfViewerModal } from '@/components/PdfViewerModal';
import type { ClientRecord } from '@/types/api';

function formatRevenue(amount: number, currency = 'AED'): string {
  if (amount >= 1_000_000) return `${currency} ${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `${currency} ${(amount / 1_000).toFixed(0)}K`;
  if (amount > 0) return `${currency} ${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  return `${currency} 0`;
}

export function Clients() {
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [previewingId, setPreviewingId] = useState<string | null>(null);
  const [pdfModal, setPdfModal] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    api<ClientRecord[]>('/api/clients')
      .then(setClients)
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load clients'))
      .finally(() => setLoading(false));
  }, []);

  const activeCount = useMemo(() => clients.filter((c) => c.isActive).length, [clients]);

  const previewTemplate = async (client: ClientRecord) => {
    setPreviewingId(client.id);
    try {
      const url = await loadClientTemplatePreview(client.id);
      setPdfModal({ url, title: `Invoice Template — ${client.name} (${client.clientCode})` });
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Preview failed');
    } finally {
      setPreviewingId(null);
    }
  };

  const closePdfModal = () => {
    setPdfModal((prev) => {
      if (prev?.url) URL.revokeObjectURL(prev.url);
      return null;
    });
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground gap-2">
        <Loader2 size={18} className="animate-spin" /> Loading clients…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center text-danger px-6 text-center">{error}</div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <PdfViewerModal url={pdfModal?.url ?? null} title={pdfModal?.title} onClose={closePdfModal} />
      <div className="h-16 border-b border-border/50 flex items-center justify-between px-10 bg-card shrink-0 shadow-sm relative z-10">
        <div>
          <h1 className="text-xl font-medium text-foreground">Client Directory</h1>
          <p className="text-[11px] text-muted-foreground font-mono mt-1 tracking-wide uppercase">
            {clients.length} ERP Clients · {activeCount} Active
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 bg-background">
        {!clients.length ? (
          <p className="text-center text-muted-foreground py-16">No clients found. Run `npm run setup:db` to seed ERP data.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
            {clients.map((client) => (
              <div
                key={client.id}
                className="bg-card border border-border/60 rounded-2xl p-7 hover:border-primary/50 transition-all group flex flex-col shadow-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-panel border border-border/50 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors shadow-sm">
                      <Building2 size={22} strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground text-lg mb-0.5">{client.name}</h3>
                      <p className="text-[10px] font-mono text-muted-foreground mb-1">{client.clientCode}</p>
                      <span
                        className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded ${
                          client.isActive
                            ? 'bg-success/10 text-success'
                            : 'bg-muted border border-border text-muted-foreground'
                        }`}
                      >
                        {client.isActive ? 'active' : 'inactive'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-sm relative z-10 mb-2">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[11px] font-mono uppercase tracking-wide flex items-center mb-1.5">
                      <Briefcase size={12} className="mr-1.5" /> Industry
                    </span>
                    <span className="font-medium text-foreground truncate">{client.industry || '—'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[11px] font-mono uppercase tracking-wide flex items-center mb-1.5">
                      <Users size={12} className="mr-1.5" /> Employees
                    </span>
                    <span className="font-medium text-foreground font-mono">
                      {client._count?.employees ?? 0}{' '}
                      <span className="font-sans font-normal text-muted-foreground ml-1">on payroll</span>
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[11px] font-mono uppercase tracking-wide flex items-center mb-1.5">
                      <FileText size={12} className="mr-1.5" /> Invoices
                    </span>
                    <span className="font-medium text-foreground font-mono">
                      {client._count?.invoices ?? 0}{' '}
                      <span className="font-sans font-normal text-muted-foreground ml-1">total</span>
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[11px] font-mono uppercase tracking-wide flex items-center mb-1.5">
                      <DollarSign size={12} className="mr-1.5" /> Revenue
                    </span>
                    <span className="font-medium text-success font-mono">
                      {formatRevenue(client.revenueYtd || 0, client.currency)}
                    </span>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-border/50 flex items-center justify-between relative z-10 gap-3">
                  <div className="flex items-center space-x-2 min-w-0">
                    <AlertTriangle
                      size={14}
                      className={(client.pendingReviews || 0) > 0 ? 'text-warning' : 'text-muted-foreground'}
                    />
                    <span
                      className={`text-sm font-medium truncate ${
                        (client.pendingReviews || 0) > 0 ? 'text-warning' : 'text-muted-foreground'
                      }`}
                    >
                      {client.pendingReviews || 0} Pending Reviews
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => previewTemplate(client)}
                    disabled={previewingId === client.id}
                    className="shrink-0 flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 disabled:opacity-50"
                  >
                    {previewingId === client.id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <LayoutTemplate size={14} />
                    )}
                    Preview Invoice
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
