import { useRef, useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import type { Timesheet } from '@/types/api';
import { PIPELINE_STAGES, pipelineStageStatus } from '@/lib/status';

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function PortalUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [timesheet, setTimesheet] = useState<Timesheet | null>(null);
  const [error, setError] = useState('');

  const pollTimesheet = async (id: string) => {
    const ts = await api<Timesheet>(`/api/timesheets/${id}`);
    setTimesheet(ts);
    const done = ['INVOICE_GENERATED', 'APPROVED', 'PENDING_REVIEW', 'PENDING_CLIENT_APPROVAL', 'EXCEPTION', 'REJECTED', 'DISPATCHED'].includes(ts.status);
    if (!done) setTimeout(() => pollTimesheet(id), 1500);
  };

  const uploadFile = async (selected: File) => {
    setError('');
    setFile(selected);
    setFileName(selected.name);
    setFileSize(formatBytes(selected.size));
    setIsUploading(true);
    setTimesheet(null);

    const form = new FormData();
    form.append('file', selected);
    form.append('source', 'Portal Upload');

    try {
      const created = await api<Timesheet>('/api/timesheets/upload', { method: 'POST', body: form, isForm: true });
      setTimesheet(created);
      pollTimesheet(created.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed. Log in as user@client.com and ensure the backend is running.');
      setIsUploading(false);
    }
  };

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const reset = () => {
    setFile(null);
    setFileName('');
    setFileSize('');
    setIsUploading(false);
    setTimesheet(null);
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const stages = PIPELINE_STAGES.map((stage, i) => ({
    label: stage.label,
    status: timesheet ? pipelineStageStatus(timesheet.status, i) : 'pending',
  }));

  const processingDone = timesheet && ['INVOICE_GENERATED', 'APPROVED', 'PENDING_REVIEW', 'PENDING_CLIENT_APPROVAL', 'EXCEPTION', 'REJECTED', 'DISPATCHED'].includes(timesheet.status);

  return (
    <div className="p-12 w-full max-w-4xl mx-auto h-full overflow-y-auto">
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".pdf,.xlsx,.xls,.txt,.eml,.jpg,.jpeg,.png,.webp"
        onChange={(e) => {
          const selected = e.target.files?.[0];
          if (selected) uploadFile(selected);
        }}
      />

      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Upload Timesheet</h1>
        <p className="text-muted-foreground">Select a real file — samples are in <code className="text-primary">data/test-cases/</code></p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-danger/10 border border-danger/30 text-sm text-danger">{error}</div>
      )}

      {!isUploading ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const selected = e.dataTransfer.files?.[0];
            if (selected) uploadFile(selected);
          }}
          className="border-2 border-dashed border-[#2A3442] rounded-2xl p-20 flex flex-col items-center justify-center text-center bg-[#0B0F14] group shadow-sm"
        >
          <div className="p-4 bg-[#151A21] border border-[#2A3442]/50 text-muted-foreground rounded-xl mb-6">
            <UploadCloud size={32} />
          </div>
          <h3 className="text-xl font-medium text-foreground mb-2">Drag & drop a file here</h3>
          <p className="text-sm text-muted-foreground mb-8">PDF, Excel, TXT/Email, Images</p>
          <button
            type="button"
            onClick={openFilePicker}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            Browse Files
          </button>
        </div>
      ) : (
        <div className="bg-[#1D2430] border border-[#2A3442]/60 rounded-2xl p-10 shadow-sm">
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-[#2A3442]/50">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[#151A21] border border-[#2A3442]/50 rounded-lg text-muted-foreground">
                <FileText size={24} />
              </div>
              <div>
                <div className="text-base font-medium text-foreground mb-1">{fileName || file?.name}</div>
                <div className="text-xs text-muted-foreground font-mono">
                  {fileSize}
                  {timesheet ? ` · ${timesheet.status.replace(/_/g, ' ')}` : ' · Uploading…'}
                </div>
              </div>
            </div>
            {processingDone && (
              <button type="button" onClick={reset} className="text-sm text-primary flex items-center gap-2">
                <RotateCcw size={14} /> Upload another
              </button>
            )}
          </div>

          <div className="space-y-6 pl-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">AI Execution Pipeline</h3>
            {stages.map((stage, i) => (
              <div key={i} className="flex items-center space-x-4 text-sm">
                {stage.status === 'completed' ? (
                  <CheckCircle2 size={18} className="text-[#22C55E]" />
                ) : stage.status === 'active' ? (
                  <div className="w-[18px] h-[18px] border-2 border-[#2A3442] border-t-primary rounded-full animate-spin" />
                ) : (
                  <div className="w-[18px] h-[18px] border-2 border-[#2A3442] rounded-full" />
                )}
                <span className={stage.status === 'active' ? 'text-primary font-medium' : stage.status === 'completed' ? 'text-foreground' : 'text-muted-foreground'}>
                  {stage.label}
                </span>
              </div>
            ))}
          </div>

          {timesheet?.status === 'PENDING_CLIENT_APPROVAL' && (
            <div className="mt-6 p-4 rounded-xl border border-[#F59E0B]/40 bg-[#F59E0B]/10">
              <div className="flex items-start gap-3">
                <AlertTriangle size={18} className="text-[#F59E0B] mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Overtime requires your approval</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    {timesheet.exceptionReason || 'This timesheet exceeded the overtime policy and was sent to your Approval Center.'}
                  </p>
                  <Link
                    to="/portal/approvals"
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Go to Approval Center →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {timesheet?.status === 'INVOICE_GENERATED' && (
            <p className="mt-6 text-sm text-success">
              Invoice generated successfully — visible in FinOps dashboard.
            </p>
          )}

          {timesheet?.exceptionReason && timesheet.status !== 'PENDING_CLIENT_APPROVAL' && (
            <p className="mt-6 text-sm text-warning">{timesheet.exceptionReason}</p>
          )}
        </div>
      )}
    </div>
  );
}
