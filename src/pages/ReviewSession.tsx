import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, AlertTriangle, Sparkles, Loader2, Wand2, Send } from 'lucide-react';
import { api } from '@/lib/api';
import type { Timesheet } from '@/types/api';

interface ReviewExplanations {
  summary: string;
  validationExplanation: string;
  fraudExplanation: string;
  confidenceExplanation: string;
  flaggedFields?: Array<{ field: string; confidence: number; issue: string }>;
  enhanced?: boolean;
  provider?: string;
}

const OVERTIME_POLICY_HOURS = 20;

function parseOvertimeFromOcr(ocrText?: string): number {
  if (!ocrText) return 0;
  const patterns = [
    /(?:overtime|ot)\s*(?:hours?)?\s*[:\-]\s*(\d+\.?\d*)/i,
    /(?:overtime|ot)\s*(?:hours?)?\s+(\d+\.?\d*)/i,
    /(\d+\.?\d*)\s*(?:hours?\s*)?(?:overtime|ot)\b/i,
  ];
  for (const p of patterns) {
    const m = ocrText.match(p);
    if (m) return parseFloat(m[1]);
  }
  return 0;
}

function resolveOvertimeHours(
  extracted: Record<string, unknown>,
  timesheet: Timesheet | null,
  ocrText?: string
): number {
  const fromForm = Number(extracted.overtime ?? timesheet?.overtime ?? 0);
  if (fromForm > 0) return fromForm;
  return parseOvertimeFromOcr(ocrText);
}

function buildClientExplanations(ts: Timesheet, threshold = 95): ReviewExplanations {
  const meta = (ts.extractedData || {}) as Record<string, unknown>;
  const fieldConfidence = (ts.fieldConfidence || {}) as Record<string, number>;
  const extracted = meta;
  const flaggedFields: Array<{ field: string; confidence: number; issue: string }> = [];

  const labels: Record<string, string> = {
    employeeId: 'Employee ID',
    employeeName: 'Employee Name',
    clientCode: 'Client Code',
    workingDays: 'Working Days',
    payrollPeriod: 'Payroll Period',
  };

  for (const [field, conf] of Object.entries(fieldConfidence)) {
    if (conf < 85) {
      const val = extracted[field];
      const empty = val === '' || val === 0 || val == null;
      flaggedFields.push({
        field,
        confidence: conf,
        issue: empty
          ? `${labels[field] || field} was not extracted from the document`
          : `${labels[field] || field} has low extraction confidence (${conf}%)`,
      });
    }
  }
  for (const field of ['employeeId', 'employeeName', 'clientCode', 'workingDays', 'payrollPeriod']) {
    if (flaggedFields.some((f) => f.field === field)) continue;
    const val = extracted[field];
    if (val === '' || val === 0 || val == null) {
      flaggedFields.push({
        field,
        confidence: fieldConfidence[field] ?? 0,
        issue: `${labels[field] || field} is missing — not found in the source document`,
      });
    }
  }

  const failed = ts.validationResults?.filter((r) => !r.passed) ?? [];
  const fraudHits = ts.fraudReasons?.filter((r) => (r.score ?? 0) > 0) ?? [];

  const validationExplanation = failed.length
    ? failed.map((r) => `${r.ruleName}: ${r.message}`).join(' ')
    : 'All configured business validation rules passed.';

  const fraudExplanation = fraudHits.length
    ? fraudHits.map((r) => `${r.checkType}: ${r.reason}`).join(' ')
    : 'No fraud indicators detected.';

  const confidenceExplanation = flaggedFields.length
    ? `Low confidence driven by: ${flaggedFields.map((f) => f.issue).join('; ')}.`
    : ts.overallConfidence != null
      ? `Overall confidence ${ts.overallConfidence}% is below the ${threshold}% auto-invoice threshold.`
      : 'Confidence within acceptable range.';

  const summary =
    (meta._aiReviewSummary as string) ||
    ts.exceptionReason ||
    `Manual review required. ${confidenceExplanation}`;

  return {
    summary,
    validationExplanation: (meta._aiValidationExplanation as string) || validationExplanation,
    fraudExplanation: (meta._aiFraudExplanation as string) || fraudExplanation,
    confidenceExplanation: (meta._aiConfidenceExplanation as string) || confidenceExplanation,
    flaggedFields: (meta._flaggedFields as typeof flaggedFields) || flaggedFields,
  };
}

export function ReviewSession() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [timesheet, setTimesheet] = useState<Timesheet | null>(null);
  const [explanations, setExplanations] = useState<ReviewExplanations | null>(null);
  const [edited, setEdited] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [enhanceError, setEnhanceError] = useState('');
  const [sendingApproval, setSendingApproval] = useState(false);
  const explainedRef = useRef(false);

  useEffect(() => {
    if (!id) return;
    explainedRef.current = false;

    api<Timesheet>(`/api/timesheets/${id}`)
      .then((ts) => {
        setTimesheet(ts);
        setExplanations(buildClientExplanations(ts));

        const meta = ts.extractedData as Record<string, unknown> | undefined;
        if (!meta?._aiReviewSummary && !explainedRef.current) {
          explainedRef.current = true;
          api<ReviewExplanations>(`/api/timesheets/${id}/explain-review`, { method: 'POST' })
            .then((saved) => {
              setExplanations(saved);
              setTimesheet((prev) =>
                prev
                  ? {
                      ...prev,
                      exceptionReason: saved.summary,
                      extractedData: {
                        ...(prev.extractedData as Record<string, unknown>),
                        _aiReviewSummary: saved.summary,
                        _aiValidationExplanation: saved.validationExplanation,
                        _aiFraudExplanation: saved.fraudExplanation,
                        _aiConfidenceExplanation: saved.confidenceExplanation,
                        _flaggedFields: saved.flaggedFields,
                      },
                    }
                  : prev
              );
            })
            .catch(() => {});
        }
      })
      .catch(console.error);
  }, [id]);

  const extracted = { ...(timesheet?.extractedData as Record<string, unknown> || {}), ...edited };
  const meta = timesheet?.extractedData as Record<string, unknown> | undefined;
  const isEnhanced = Boolean(meta?._aiEnhanced);
  const amb = meta?._ambiguityReasons as string[] | undefined;
  const candidates = meta?._matchCandidates as Array<{ employeeId: string; name: string; clientCode: string; clientName: string }> | undefined;
  const flaggedFields = explanations?.flaggedFields;
  const doc = timesheet?.documents?.[0];
  const overtimeHours = resolveOvertimeHours(extracted, timesheet, doc?.ocrText);
  const hasOvertimeValidationFailure = timesheet?.validationResults?.some(
    (r) => !r.passed && r.ruleKey === 'max_overtime_hours'
  );
  const isAwaitingClient = timesheet?.status === 'PENDING_CLIENT_APPROVAL';
  const showSendForApproval =
    !isAwaitingClient &&
    !['INVOICE_GENERATED', 'DISPATCHED'].includes(timesheet?.status || '') &&
    (overtimeHours > OVERTIME_POLICY_HOURS ||
      hasOvertimeValidationFailure ||
      Number(timesheet?.overtime || 0) > OVERTIME_POLICY_HOURS);

  const sendForClientApproval = async () => {
    if (!id) return;
    setSendingApproval(true);
    try {
      const payload = { ...extracted, overtime: overtimeHours };
      await api(`/api/timesheets/${id}/send-client-approval`, {
        method: 'PATCH',
        body: JSON.stringify({ extractedData: payload }),
      });
      navigate('/workspace/review');
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Failed to send for client approval');
    } finally {
      setSendingApproval(false);
    }
  };

  const enhanceWithAi = async () => {
    if (!id || enhancing) return;
    setEnhanceError('');
    setEnhancing(true);
    try {
      const enhanced = await api<ReviewExplanations>(`/api/timesheets/${id}/enhance-explanation`, {
        method: 'POST',
      });
      setExplanations(enhanced);
      setTimesheet((prev) =>
        prev
          ? {
              ...prev,
              exceptionReason: enhanced.summary,
              extractedData: {
                ...(prev.extractedData as Record<string, unknown>),
                _aiReviewSummary: enhanced.summary,
                _aiValidationExplanation: enhanced.validationExplanation,
                _aiFraudExplanation: enhanced.fraudExplanation,
                _aiConfidenceExplanation: enhanced.confidenceExplanation,
                _flaggedFields: enhanced.flaggedFields,
                _aiEnhanced: true,
                _aiEnhanceProvider: enhanced.provider,
              },
            }
          : prev
      );
    } catch (e) {
      setEnhanceError(e instanceof Error ? e.message : 'AI enhancement unavailable. Ensure Ollama is running.');
    } finally {
      setEnhancing(false);
    }
  };

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

  if (!timesheet || !explanations) return <div className="p-10 text-muted-foreground">Loading review…</div>;

  return (
    <div className="flex h-full w-full bg-background overflow-hidden flex-col">
      <div className="p-6 border-b border-border flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">{doc?.fileName}</h1>
          <p className="text-sm text-muted-foreground">{timesheet.client?.name} · {timesheet.status.replace(/_/g, ' ')}</p>
        </div>
        <div className="flex gap-3 items-center">
          {isAwaitingClient && (
            <span className="px-4 py-2 bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40 rounded-lg text-sm flex items-center gap-2">
              <Send size={14} />
              Awaiting client approval
            </span>
          )}
          {showSendForApproval && (
            <button
              type="button"
              onClick={sendForClientApproval}
              disabled={sendingApproval || loading}
              className="px-4 py-2 bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40 rounded-lg text-sm flex items-center gap-2 hover:bg-[#F59E0B]/30 disabled:opacity-50"
            >
              {sendingApproval ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              Send for Approval
            </button>
          )}
          {!isAwaitingClient && (
            <>
              <button onClick={approve} disabled={loading || showSendForApproval} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm disabled:opacity-50" title={showSendForApproval ? 'Send to client first for overtime exceptions' : undefined}>Approve</button>
              <button onClick={reject} disabled={loading} className="px-4 py-2 bg-danger/20 text-danger rounded-lg text-sm">Reject</button>
            </>
          )}
        </div>
      </div>

      <div className="mx-6 mt-4 mb-2 shrink-0 bg-danger/10 border border-danger/30 rounded-lg text-sm overflow-hidden">
        <div className="px-4 py-2.5 border-b border-danger/20 flex items-center justify-between gap-3">
          <p className="font-medium text-danger flex items-center gap-2 text-sm">
            <Sparkles size={14} />
            AI Review Summary
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wide text-muted-foreground">
              {isEnhanced
                ? `Enhanced · ${String(meta?._aiEnhanceProvider || 'AI').replace('ollama:', 'Ollama ')}`
                : 'Rule-based analysis'}
            </span>
            <button
              type="button"
              onClick={enhanceWithAi}
              disabled={enhancing}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25 disabled:opacity-50 transition-colors"
            >
              {enhancing ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
              {enhancing ? 'Enhancing…' : isEnhanced ? 'Re-enhance' : 'Enhance with AI'}
            </button>
          </div>
        </div>

        {enhanceError && (
          <p className="px-4 py-2 text-[11px] text-warning border-b border-danger/15">{enhanceError}</p>
        )}

        <div className="max-h-44 overflow-y-auto px-4 py-3 space-y-3 text-xs leading-relaxed">
          <p>{explanations.summary}</p>

          {explanations.confidenceExplanation && (
            <div className="pt-2 border-t border-danger/15">
              <p className="font-medium text-foreground mb-0.5">Why confidence is low</p>
              <p className="text-muted-foreground">{explanations.confidenceExplanation}</p>
              {flaggedFields?.length ? (
                <ul className="mt-1.5 space-y-0.5 font-mono text-[11px]">
                  {flaggedFields.map((f) => (
                    <li key={f.field} className="text-warning">
                      {f.field} ({f.confidence}%) — {f.issue}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          )}

          <div className="pt-2 border-t border-danger/15">
            <p className="font-medium text-foreground mb-0.5">Validation</p>
            <p className="text-muted-foreground">{explanations.validationExplanation}</p>
          </div>

          <div className="pt-2 border-t border-danger/15">
            <p className="font-medium text-foreground mb-0.5">Fraud detection</p>
            <p className="text-muted-foreground">{explanations.fraudExplanation}</p>
            {timesheet.fraudRiskLevel && (
              <p className="text-[11px] mt-0.5 font-mono text-warning">
                Risk: {timesheet.fraudRiskLevel} · Score: {timesheet.fraudScore ?? 0}
              </p>
            )}
          </div>

          {amb?.map((r, i) => (
            <p key={i} className="text-muted-foreground">{r}</p>
          ))}
          {candidates?.length ? (
            <ul className="font-mono text-[11px] space-y-0.5">
              {candidates.map((c) => (
                <li key={c.employeeId}>{c.employeeId} · {c.name} · {c.clientCode}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

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
          {['employeeId', 'employeeName', 'clientCode', 'workingDays', 'overtime', 'reimbursements', 'payrollPeriod'].map((field) => {
            const flagged = flaggedFields?.find((f) => f.field === field);
            return (
              <div key={field}>
                <label className="text-xs text-muted-foreground capitalize flex items-center gap-2">
                  {field}
                  {flagged && <AlertTriangle size={12} className="text-warning" title={flagged.issue} />}
                </label>
                <input
                  className={`w-full mt-1 bg-panel border rounded-md p-2 text-sm ${flagged ? 'border-warning/50' : 'border-border'}`}
                  value={String(field === 'overtime' ? (extracted.overtime ?? overtimeHours) : extracted[field] ?? '')}
                  onChange={(e) => setEdited((d) => ({
                    ...d,
                    [field]: ['workingDays', 'overtime', 'reimbursements'].includes(field) ? Number(e.target.value) : e.target.value,
                  }))}
                />
                {flagged && <p className="text-[10px] text-warning mt-0.5">{flagged.issue}</p>}
              </div>
            );
          })}

          {timesheet.validationResults?.length ? (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Validation Rules</h3>
              {timesheet.validationResults.map((r, i) => (
                <div key={i} className="flex items-start gap-2 text-sm mb-2">
                  {r.passed ? <CheckCircle size={14} className="text-success mt-0.5" /> : <AlertTriangle size={14} className="text-danger mt-0.5" />}
                  <div>
                    <span className="font-medium">{r.ruleName}</span>
                    <p className="text-muted-foreground text-xs">{r.message}</p>
                    {r.suggestedFix && <p className="text-xs text-primary mt-0.5">Fix: {r.suggestedFix}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {timesheet.fraudReasons?.length ? (
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Fraud Signals</h3>
              {timesheet.fraudReasons.map((r, i) => (
                <div key={i} className="text-sm mb-2 p-2 bg-panel rounded border border-border/50">
                  <p className="font-medium capitalize">{(r.checkType || 'check').replace(/_/g, ' ')}</p>
                  <p className="text-muted-foreground text-xs">{r.reason}</p>
                  {(r.score ?? 0) > 0 && <p className="text-xs text-warning mt-0.5">Risk score: +{r.score}</p>}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
