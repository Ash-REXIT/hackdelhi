import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, CheckCircle, XCircle, AlertTriangle, Search } from 'lucide-react';
import { api } from '@/lib/api';
import type { Timesheet } from '@/types/api';

export function ValidationCenter() {
  const navigate = useNavigate();
  const [exceptions, setExceptions] = useState<Timesheet[]>([]);

  useEffect(() => {
    const load = () =>
      api<Timesheet[]>('/api/timesheets?queue=exceptions').then(setExceptions).catch(console.error);
    load();
    const t = setInterval(load, 8000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="pt-8 px-10 pb-6 shrink-0 border-b border-[#2A3442]/50 bg-[#0B0F14] z-10">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-1">Validation Center</h1>
          <p className="text-muted-foreground text-[15px]">Business rule and fraud exceptions from the processing pipeline.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 bg-[#0B0F14]">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {exceptions.map((ts) => {
            const failed = ts.validationResults?.filter((r) => !r.passed) || [];
            const fraud = ts.fraudReasons?.filter((r) => (r.score ?? 0) > 0) || [];
            return (
              <div key={ts.id} className="bg-card border border-border/60 rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium">{ts.documents?.[0]?.fileName}</h3>
                    <p className="text-sm text-muted-foreground">{ts.client?.name}</p>
                  </div>
                  <span className="text-xs font-mono px-2 py-1 rounded bg-warning/10 text-warning border border-warning/20">
                    {ts.status.replace(/_/g, ' ')}
                  </span>
                </div>

                {failed.map((r, i) => (
                  <div key={i} className="mb-3 p-3 bg-panel rounded-lg border-l-2 border-l-danger">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <ShieldAlert size={14} className="text-danger" />
                      {r.ruleName}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{r.message}</p>
                    {r.suggestedFix && <p className="text-xs text-primary mt-1">Fix: {r.suggestedFix}</p>}
                  </div>
                ))}

                {(ts.extractedData as Record<string, unknown> | undefined)?._aiReviewSummary ? (
                  <div className="mb-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-xs font-medium text-primary mb-1">AI Summary</p>
                    <p className="text-xs text-muted-foreground">
                      {String((ts.extractedData as Record<string, unknown>)._aiReviewSummary)}
                    </p>
                  </div>
                ) : null}

                {fraud.map((r, i) => (
                  <div key={`f-${i}`} className="mb-3 p-3 bg-panel rounded-lg border-l-2 border-l-warning">
                    <div className="text-sm font-medium flex items-center gap-2">
                      <AlertTriangle size={14} className="text-warning" />
                      Fraud: {r.checkType}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{r.reason}</p>
                  </div>
                ))}

                {ts.exceptionReason && !failed.length && (
                  <p className="text-sm text-muted-foreground">{ts.exceptionReason}</p>
                )}

                <button
                  type="button"
                  onClick={() => navigate(`/workspace/review/${ts.id}`)}
                  className="mt-4 text-sm text-primary font-medium"
                >
                  Open review session →
                </button>
              </div>
            );
          })}
          {!exceptions.length && (
            <p className="col-span-2 text-center text-muted-foreground py-12">No validation exceptions</p>
          )}
        </div>
      </div>
    </div>
  );
}
