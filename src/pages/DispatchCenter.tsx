import { useCallback, useEffect, useState } from 'react';
import {
  Send,
  FileText,
  Search,
  Loader2,
  Package,
  Eye,
  LayoutTemplate,
  ExternalLink,
} from 'lucide-react';
import { api } from '@/lib/api';
import { loadClientTemplatePreview, loadClientTemplatePreviewByCode, loadPdfUrl } from '@/lib/invoicePdf';
import { PdfViewerModal } from '@/components/PdfViewerModal';
import type { Invoice } from '@/types/api';

interface ClientTemplateInfo {
  template: { id: string; label: string; description: string };
  clientCode: string;
  clientName: string;
}

function formatMoney(amount: number | string, currency: string) {
  const n = Number(amount);
  return `${currency} ${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function formatInvoiceStatus(status: string, tab: 'ready' | 'sent') {
  if (tab === 'ready') {
    if (status === 'PENDING_FINANCE_APPROVAL' || status === 'FINANCE_APPROVED') return 'Completed';
    return status.replace(/_/g, ' ');
  }
  if (status === 'DISPATCHED' || status === 'DELIVERED') return 'Dispatched';
  if (status === 'PAID') return 'Paid';
  return status.replace(/_/g, ' ');
}

export function DispatchCenter() {
  const [tab, setTab] = useState<'ready' | 'sent'>('ready');
  const [ready, setReady] = useState<Invoice[]>([]);
  const [sent, setSent] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [dispatchingId, setDispatchingId] = useState<string | null>(null);
  const [openingId, setOpeningId] = useState<string | null>(null);
  const [previewingClientId, setPreviewingClientId] = useState<string | null>(null);
  const [templateLabels, setTemplateLabels] = useState<Record<string, string>>({});
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [pdfModal, setPdfModal] = useState<{ url: string; title: string } | null>(null);

  const load = useCallback(async () => {
    setError('');
    try {
      const [readyList, sentList] = await Promise.all([
        api<Invoice[]>('/api/invoices?queue=ready'),
        api<Invoice[]>('/api/invoices?queue=dispatched'),
      ]);
      setReady(readyList);
      setSent(sentList);

      const all = [...readyList, ...sentList];
      const labels: Record<string, string> = {};
      await Promise.all(
        all.map(async (inv) => {
          if (!inv.client?.id || labels[inv.client.id]) return;
          try {
            const info = await api<ClientTemplateInfo>(`/api/invoices/${inv.id}/template`);
            labels[inv.client.id] = info.template.label;
          } catch {
            labels[inv.client.id] = 'Client template';
          }
        })
      );
      setTemplateLabels(labels);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load invoices');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const timer = setInterval(load, 15000);
    return () => clearInterval(timer);
  }, [load]);

  const dispatch = async (invoiceId: string) => {
    setDispatchingId(invoiceId);
    setError('');
    try {
      await api(`/api/invoices/${invoiceId}/dispatch`, { method: 'POST' });
      await load();
      setTab('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Dispatch failed');
    } finally {
      setDispatchingId(null);
    }
  };

  const viewInvoice = async (invoice: Invoice) => {
    setOpeningId(invoice.id);
    setError('');
    try {
      const url = await loadPdfUrl(`/api/invoices/${invoice.id}/pdf`);
      setPdfModal({ url, title: `${invoice.invoiceNumber} — ${invoice.client?.name || 'Invoice'}` });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not open invoice PDF');
    } finally {
      setOpeningId(null);
    }
  };

  const previewTemplate = async (invoice: Invoice) => {
    const clientId = invoice.client?.id;
    const clientCode = invoice.client?.clientCode;
    if (!clientId && !clientCode) return;

    setPreviewingClientId(clientId || clientCode || null);
    setError('');
    try {
      const url = clientId
        ? await loadClientTemplatePreview(clientId)
        : await loadClientTemplatePreviewByCode(clientCode!);
      const label = clientId ? templateLabels[clientId] : undefined;
      setPdfModal({
        url,
        title: `Template Preview — ${invoice.client?.name || clientCode}${label ? ` (${label})` : ''}`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not open template preview');
    } finally {
      setPreviewingClientId(null);
    }
  };

  const closePdfModal = () => {
    setPdfModal((prev) => {
      if (prev?.url) URL.revokeObjectURL(prev.url);
      return null;
    });
  };

  const list = tab === 'ready' ? ready : sent;
  const filtered = list.filter((inv) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      inv.invoiceNumber.toLowerCase().includes(q) ||
      inv.client?.name?.toLowerCase().includes(q) ||
      inv.timesheet?.employee?.name?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <PdfViewerModal url={pdfModal?.url ?? null} title={pdfModal?.title} onClose={closePdfModal} />
      <div className="pt-8 px-10 pb-6 shrink-0 border-b border-[#2A3442]/50 bg-[#0B0F14] z-10">
        <div className="flex justify-between items-end gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-1">Dispatch Center</h1>
            <p className="text-muted-foreground text-[15px]">
              Send completed invoices to client dashboards. Each client uses their own invoice template.
            </p>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Search invoices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-panel border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors shadow-sm"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={() => setTab('ready')}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
              tab === 'ready'
                ? 'bg-primary/15 text-primary border-primary/40'
                : 'bg-panel border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            Ready to Dispatch ({ready.length})
          </button>
          <button
            type="button"
            onClick={() => setTab('sent')}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
              tab === 'sent'
                ? 'bg-primary/15 text-primary border-primary/40'
                : 'bg-panel border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            Sent to Clients ({sent.length})
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 bg-[#0B0F14]">
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200 max-w-7xl mx-auto">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground justify-center py-20">
            <Loader2 className="animate-spin" size={20} />
            Loading invoices…
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground max-w-md mx-auto">
            <Package size={40} className="mx-auto mb-4 opacity-40" />
            <p className="font-medium text-foreground mb-1">
              {tab === 'ready' ? 'No invoices ready to dispatch' : 'No dispatched invoices yet'}
            </p>
            <p className="text-sm">
              {tab === 'ready'
                ? 'Completed timesheets with generated invoices will appear here.'
                : 'Dispatched invoices will show here after you send them to clients.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {filtered.map((invoice) => {
              const clientId = invoice.client?.id;
              const templateLabel = clientId ? templateLabels[clientId] : undefined;

              return (
                <div
                  key={invoice.id}
                  className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-sm flex flex-col hover:border-primary/40 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => viewInvoice(invoice)}
                    className="p-6 border-b border-border/50 bg-panel/30 text-left w-full hover:bg-panel/50 transition-colors group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">
                          {invoice.client?.name}
                        </h3>
                        <span className="text-muted-foreground font-mono text-xs bg-panel px-2 py-0.5 rounded border border-border/50">
                          {invoice.invoiceNumber}
                        </span>
                      </div>
                      <div className="text-right font-mono text-lg font-medium text-foreground">
                        {formatMoney(invoice.grandTotal, invoice.currency)}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      {invoice.timesheet?.employee?.name || 'Employee'} ·{' '}
                      {invoice.timesheet?.documents?.[0]?.fileName || invoice.payrollPeriod || 'Timesheet'}
                    </p>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${
                          tab === 'ready' || invoice.status === 'FINANCE_APPROVED'
                            ? 'bg-success/10 text-success border-success/20'
                            : invoice.status === 'DISPATCHED' || invoice.status === 'DELIVERED'
                              ? 'bg-success/10 text-success border-success/20'
                              : invoice.status === 'PAID'
                                ? 'bg-primary/10 text-primary border-primary/20'
                                : 'bg-warning/10 text-warning border-warning/20'
                        }`}
                      >
                        {formatInvoiceStatus(invoice.status, tab)}
                      </span>
                      {templateLabel && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border bg-primary/10 text-primary border-primary/20">
                          <LayoutTemplate size={12} />
                          {templateLabel}
                        </span>
                      )}
                      {invoice.invoiceNumber.startsWith('DEMO-') && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30">
                          Demo
                        </span>
                      )}
                      <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 ml-auto">
                        <ExternalLink size={12} /> Open invoice
                      </span>
                    </div>
                  </button>

                  <div className="p-6 flex-1 bg-black/10">
                    <div className="relative border-l-2 border-border/50 ml-3 space-y-4">
                      {(invoice.timeline || []).slice(-4).map((event, i) => (
                        <div key={event.id || i} className="relative pl-6">
                          <div className="absolute -left-[11px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center bg-card border-2 border-primary text-primary">
                            <FileText size={10} strokeWidth={3} />
                          </div>
                          <p className="text-sm font-medium text-foreground">{event.event.replace(/_/g, ' ')}</p>
                          <p className="text-xs text-muted-foreground">{event.description}</p>
                          <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{formatDate(event.createdAt)}</p>
                        </div>
                      ))}
                      {invoice.dispatchLogs?.[0]?.sentAt && (
                        <div className="relative pl-6">
                          <div className="absolute -left-[11px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center bg-card border-2 border-success text-success">
                            <Send size={10} strokeWidth={3} />
                          </div>
                          <p className="text-sm font-medium text-success">Dispatched to client portal</p>
                          <p className="text-xs font-mono text-muted-foreground">{formatDate(invoice.dispatchLogs[0].sentAt!)}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 border-t border-border/50 bg-panel/20 flex flex-col sm:flex-row gap-2">
                    <button
                      type="button"
                      disabled={openingId === invoice.id}
                      onClick={() => viewInvoice(invoice)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-panel border border-border text-foreground rounded-lg text-sm font-medium hover:bg-card disabled:opacity-50"
                    >
                      {openingId === invoice.id ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Eye size={16} />
                      )}
                      View Invoice
                    </button>
                    {(clientId || invoice.client?.clientCode) && (
                      <button
                        type="button"
                        disabled={previewingClientId === (clientId || invoice.client?.clientCode)}
                        onClick={() => previewTemplate(invoice)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-panel border border-primary/30 text-primary rounded-lg text-sm font-medium hover:bg-primary/10 disabled:opacity-50"
                      >
                        {previewingClientId === (clientId || invoice.client?.clientCode) ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <LayoutTemplate size={16} />
                        )}
                        Preview Template
                      </button>
                    )}
                    {tab === 'ready' && (
                      <button
                        type="button"
                        disabled={dispatchingId === invoice.id}
                        onClick={() => dispatch(invoice.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
                      >
                        {dispatchingId === invoice.id ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Send size={16} />
                        )}
                        Dispatch
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
