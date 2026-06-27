import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';
import type { Timesheet } from '@/types/api';

export function ReviewSession() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [timesheet, setTimesheet] = useState<Timesheet | null>(null);
  const [edited, setEdited] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    api<Timesheet>(`/api/timesheets/${id}`).then(setTimesheet).catch(console.error);
  }, [id]);

  const extracted = { ...(timesheet?.extractedData as Record<string, unknown> || {}), ...edited };
  const doc = timesheet?.documents?.[0];
  const amb = (timesheet?.extractedData as Record<string, unknown> | undefined)?._ambiguityReasons as string[] | undefined;
  const candidates = (timesheet?.extractedData as Record<string, unknown> | undefined)?._matchCandidates as Array<{ employeeId: string; name: string; clientCode: string; clientName: string }> | undefined;

  const approve = async () => {
    if (!id) return;
    setLoading(true);
    try {
      await api(`/api/timesheets/${id}/review`, {
        method: 'PATCH',
        body: JSON.stringify({ action: 'approve', extractedData: extracted }),
      });
      navigate('/workspace/review');
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Failed');
    } finally {
      setLoading(false);
    }
  };

  const reject = async () => {
    if (!id) return;
    setLoading(true);
    try {
      await api(`/api/timesheets/${id}/review`, {
        method: 'PATCH',
        body: JSON.stringify({ action: 'reject', reason: 'Manual rejection' }),
      });
      navigate('/workspace/review');
    } finally {
      setLoading(false);
    }
  };

  if (!timesheet) return <div className="p-10 text-muted-foreground">Loading review…</div>;

  return (
    <div className="flex h-full w-full bg-background overflow-hidden flex-col">
      <div className="p-6 border-b border-border flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">{doc?.fileName}</h1>
          <p className="text-sm text-muted-foreground">{timesheet.client?.name} · {timesheet.status.replace(/_/g, ' ')}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={approve} disabled={loading} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm">Approve</button>
          <button onClick={reject} disabled={loading} className="px-4 py-2 bg-danger/20 text-danger rounded-lg text-sm">Reject</button>
        </div>
      </div>

      {(timesheet.exceptionReason || amb?.length) && (
        <div className="mx-6 mt-4 p-4 bg-danger/10 border border-danger/30 rounded-lg text-sm">
          <p className="font-medium text-danger mb-1">Exception / Ambiguity</p>
          <p>{timesheet.exceptionReason}</p>
          {amb?.map((r, i) => <p key={i} className="text-muted-foreground mt-1">{r}</p>)}
          {candidates?.length ? (
            <ul className="mt-2 text-xs font-mono space-y-1">
              {candidates.map((c) => (
                <li key={c.employeeId}>{c.employeeId} · {c.name} · {c.clientCode}</li>
              ))}
            </ul>
          ) : null}
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 border-r border-border p-6 overflow-auto">
          <h2 className="text-xs font-mono uppercase text-muted-foreground mb-4">Original Document</h2>
          <pre className="text-xs whitespace-pre-wrap font-mono bg-panel p-4 rounded-lg min-h-[300px]">
            {doc?.ocrText || 'No OCR text'}
          </pre>
          <p className="text-xs text-muted-foreground mt-2">OCR: {doc?.ocrConfidence ?? '—'}%</p>
        </div>

        <div className="w-1/2 p-6 overflow-auto space-y-4">
          <h2 className="text-xs font-mono uppercase text-muted-foreground">Extracted Data</h2>
          {['employeeId', 'employeeName', 'clientCode', 'workingDays', 'overtime', 'reimbursements', 'payrollPeriod'].map((field) => (
            <div key={field}>
              <label className="text-xs text-muted-foreground capitalize">{field}</label>
              <input
                className="w-full mt-1 bg-panel border border-border rounded-md p-2 text-sm"
                value={String(extracted[field] ?? '')}
                onChange={(e) => setEdited((d) => ({
                  ...d,
                  [field]: ['workingDays', 'overtime', 'reimbursements'].includes(field) ? Number(e.target.value) : e.target.value,
                }))}
              />
            </div>
          ))}

          {timesheet.validationResults?.length ? (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Validation</h3>
              {timesheet.validationResults.map((r, i) => (
                <div key={i} className="flex items-center gap-2 text-sm mb-2">
                  {r.passed ? <CheckCircle size={14} className="text-success" /> : <AlertTriangle size={14} className="text-danger" />}
                  {r.message}
                </div>
              ))}
            </div>
          ) : null}

          {timesheet.fraudReasons?.length ? (
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Fraud Detection</h3>
              {timesheet.fraudReasons.map((r, i) => (
                <p key={i} className="text-sm text-muted-foreground">{r.reason} (score: {r.score})</p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
