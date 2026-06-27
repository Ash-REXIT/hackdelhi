import { useCallback, useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle, Loader2, XCircle } from 'lucide-react';
import { api } from '@/lib/api';
import type { Timesheet } from '@/types/api';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function overtimeSummary(timesheet: Timesheet): string {
  const failed = (timesheet.validationResults || []).filter((r) => !r.passed);
  if (failed.length) return failed.map((r) => r.message).join(' ');
  return timesheet.exceptionReason || 'Overtime exceeds client policy and requires your approval.';
}

export function PortalApprovals() {
  const [approvals, setApprovals] = useState<Timesheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actingId, setActingId] = useState<string | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);

  const [successMsg, setSuccessMsg] = useState('');

  const load = useCallback(async () => {
    setError('');
    try {
      const data = await api<Timesheet[]>('/api/timesheets?queue=client-approval');
      setApprovals(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load approvals');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const approve = async (id: string) => {
    setActingId(id);
    setSuccessMsg('');
    try {
      const result = await api<{ timesheetId: string; invoice: { invoiceNumber: string; grandTotal?: number } }>(
        `/api/timesheets/${id}/client-approve`,
        { method: 'PATCH' }
      );
      setSuccessMsg(`Invoice ${result.invoice.invoiceNumber} generated — sent to FinOps for processing.`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Approval failed');
    } finally {
      setActingId(null);
    }
  };

  const reject = async (id: string) => {
    const reason = window.prompt('Reason for rejection (optional):') || 'Client rejected overtime exception';
    setActingId(id);
    try {
      await api(`/api/timesheets/${id}/client-reject`, {
        method: 'PATCH',
        body: JSON.stringify({ reason }),
      });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Rejection failed');
    } finally {
      setActingId(null);
    }
  };

  const viewDocument = (timesheet: Timesheet) => {
    setViewingId((current) => (current === timesheet.id ? null : timesheet.id));
  };

  return (
    <div className="p-12 w-full max-w-5xl mx-auto h-full overflow-y-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Approval Center</h1>
        <p className="text-muted-foreground">
          Overtime and policy exceptions that need your sign-off before FinOps can invoice.
        </p>
      </div>

      {!loading && approvals.length > 0 && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-[#F59E0B]/40 bg-[#F59E0B]/10 px-4 py-3">
          <AlertTriangle size={18} className="text-[#F59E0B] shrink-0" />
          <p className="text-sm text-foreground">
            <span className="font-medium">{approvals.length} overtime exception{approvals.length !== 1 ? 's' : ''}</span>
            {' '}awaiting your approval — review and approve to generate invoices.
          </p>
        </div>
      )}

      {successMsg && (
        <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-200">
          {successMsg}
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="animate-spin" size={18} />
          Loading pending approvals…
        </div>
      ) : approvals.length === 0 ? (
        <div className="rounded-2xl border border-[#2A3442]/60 bg-[#1D2430] p-10 text-center text-muted-foreground">
          No overtime exceptions awaiting your approval.
        </div>
      ) : (
        <div className="space-y-6">
          {approvals.map((approval) => {
            const extracted = approval.extractedData as Record<string, unknown> | undefined;
            const overtime = Number(extracted?.overtime ?? approval.overtime ?? 0);
            const workingDays = Number(extracted?.workingDays ?? approval.workingDays ?? 0);
            const employeeName =
              (extracted?.employeeName as string) || approval.employee?.name || 'Unknown employee';
            const docName = approval.documents?.[0]?.fileName || approval.id.slice(0, 8);

            return (
              <div
                key={approval.id}
                className="bg-[#1D2430] border border-[#F59E0B]/30 rounded-2xl p-8 shadow-sm relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 relative z-10">
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="font-mono text-lg font-medium text-foreground">{docName}</span>
                      <span className="bg-[#F59E0B]/10 text-[#F59E0B] px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest border border-[#F59E0B]/20">
                        Overtime Exception
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {approval.client?.name} • {employeeName}
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <div className="font-mono text-2xl font-medium text-foreground tracking-tight">
                      {overtime}h OT
                    </div>
                    <div className="text-xs text-muted-foreground">{workingDays} working days</div>
                  </div>
                </div>

                <div className="bg-[#151A21] border border-[#2A3442]/60 rounded-xl p-5 mb-8 relative z-10">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle size={18} className="text-[#F59E0B] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-foreground mb-1">Validation Exception</div>
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        {overtimeSummary(approval)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 relative z-10">
                  <button
                    type="button"
                    disabled={actingId === approval.id}
                    onClick={() => approve(approval.id)}
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center justify-center"
                  >
                    {actingId === approval.id ? (
                      <Loader2 size={16} className="mr-2 animate-spin" />
                    ) : (
                      <CheckCircle size={16} className="mr-2" />
                    )}
                    Approve &amp; Send to FinOps
                  </button>
                  <button
                    type="button"
                    disabled={actingId === approval.id}
                    onClick={() => reject(approval.id)}
                    className="w-full sm:w-auto bg-[#151A21] hover:bg-[#0B0F14] border border-[#2A3442] text-foreground px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center justify-center"
                  >
                    <XCircle size={16} className="mr-2" /> Reject
                  </button>
                  <div className="flex-1" />
                  <button
                    type="button"
                    onClick={() => viewDocument(approval)}
                    className="text-sm text-muted-foreground hover:text-foreground font-medium transition-colors"
                  >
                    {viewingId === approval.id ? 'Hide Document' : 'View Original Document →'}
                  </button>
                  <span className="text-xs text-muted-foreground">{formatDate(approval.createdAt)}</span>
                </div>

                {viewingId === approval.id && (
                  <pre className="mt-6 relative z-10 rounded-xl border border-[#2A3442]/60 bg-[#0B0F14] p-4 text-xs text-muted-foreground whitespace-pre-wrap max-h-64 overflow-y-auto">
                    {approval.documents?.[0]?.ocrText || 'Document text not available yet.'}
                  </pre>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
