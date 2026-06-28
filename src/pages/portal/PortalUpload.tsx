import { useEffect, useRef, useState } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  RotateCcw,
  AlertTriangle,
  Mic,
  Square,
  Loader2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import type { Timesheet } from '@/types/api';
import { PIPELINE_STAGES, pipelineStageStatus } from '@/lib/status';

type UploadMode = 'file' | 'voice';

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function PortalUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const [mode, setMode] = useState<UploadMode>('file');
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [timesheet, setTimesheet] = useState<Timesheet | null>(null);
  const [error, setError] = useState('');

  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [payrollPeriod, setPayrollPeriod] = useState('');

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const pollTimesheet = async (id: string) => {
    const ts = await api<Timesheet>(`/api/timesheets/${id}`);
    setTimesheet(ts);
    const done = [
      'INVOICE_GENERATED',
      'APPROVED',
      'PENDING_REVIEW',
      'PENDING_CLIENT_APPROVAL',
      'EXCEPTION',
      'REJECTED',
      'DISPATCHED',
    ].includes(ts.status);
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
      const created = await api<Timesheet>('/api/timesheets/upload', {
        method: 'POST',
        body: form,
        isForm: true,
      });
      setTimesheet(created);
      pollTimesheet(created.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed. Log in as user@client.com and ensure the backend is running.');
      setIsUploading(false);
    }
  };

  const transcribeRecording = async (blob: Blob) => {
    setIsTranscribing(true);
    setError('');
    const form = new FormData();
    form.append('audio', blob, 'recording.webm');

    try {
      const result = await api<{ transcript: string }>('/api/timesheets/voice/transcribe', {
        method: 'POST',
        body: form,
        isForm: true,
      });
      setTranscript(result.transcript);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transcription failed. Check SMALLEST_AI_API_KEY in .env');
    } finally {
      setIsTranscribing(false);
    }
  };

  const startRecording = async () => {
    setError('');
    setTranscript('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        if (blob.size > 0) transcribeRecording(blob);
        else setError('No audio captured. Please try again.');
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch {
      setError('Microphone access denied. Allow mic permission and try again.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const submitVoice = async () => {
    if (!transcript.trim()) {
      setError('Add or edit the transcript before submitting.');
      return;
    }

    setError('');
    setIsUploading(true);
    setTimesheet(null);
    setFileName('voice-submission.txt');
    setFileSize(`${transcript.length} chars`);

    try {
      const created = await api<Timesheet>('/api/timesheets/voice/submit', {
        method: 'POST',
        body: JSON.stringify({
          transcript: transcript.trim(),
          payrollPeriod: payrollPeriod.trim() || undefined,
        }),
      });
      setTimesheet(created);
      pollTimesheet(created.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Voice submission failed');
      setIsUploading(false);
    }
  };

  const openFilePicker = () => inputRef.current?.click();

  const reset = () => {
    setFile(null);
    setFileName('');
    setFileSize('');
    setIsUploading(false);
    setTimesheet(null);
    setError('');
    setTranscript('');
    setPayrollPeriod('');
    setIsRecording(false);
    setIsTranscribing(false);
    if (inputRef.current) inputRef.current.value = '';
  };

  const stages = PIPELINE_STAGES.map((stage, i) => ({
    label: stage.label,
    status: timesheet ? pipelineStageStatus(timesheet.status, i) : 'pending',
  }));

  const processingDone =
    timesheet &&
    [
      'INVOICE_GENERATED',
      'APPROVED',
      'PENDING_REVIEW',
      'PENDING_CLIENT_APPROVAL',
      'EXCEPTION',
      'REJECTED',
      'DISPATCHED',
    ].includes(timesheet.status);

  const pipelineView = (
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
              {timesheet ? ` · ${timesheet.status.replace(/_/g, ' ')}` : ' · Processing…'}
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
            <span
              className={
                stage.status === 'active'
                  ? 'text-primary font-medium'
                  : stage.status === 'completed'
                    ? 'text-foreground'
                    : 'text-muted-foreground'
              }
            >
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
                {timesheet.exceptionReason ||
                  'This timesheet exceeded the overtime policy and was sent to your Approval Center.'}
              </p>
              <Link to="/portal/approvals" className="text-xs font-medium text-primary hover:underline">
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
  );

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
        <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Submit Timesheet</h1>
        <p className="text-muted-foreground">Upload a file or speak your timesheet details — both go to FinOps for processing.</p>
      </div>

      <div className="flex gap-2 mb-6 p-1 bg-[#151A21] border border-[#2A3442] rounded-xl w-fit">
        <button
          type="button"
          onClick={() => { if (!isUploading) setMode('file'); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'file' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          File Upload
        </button>
        <button
          type="button"
          onClick={() => { if (!isUploading) setMode('voice'); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
            mode === 'voice' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Mic size={14} /> Voice Input
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-danger/10 border border-danger/30 text-sm text-danger">{error}</div>
      )}

      {isUploading ? (
        pipelineView
      ) : mode === 'file' ? (
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
      ) : transcript ? (
        <div className="bg-[#1D2430] border border-[#2A3442]/60 rounded-2xl p-8 shadow-sm space-y-5">
          <div>
            <h3 className="text-lg font-medium text-foreground mb-1">Review transcript</h3>
            <p className="text-sm text-muted-foreground">Edit anything before sending to FinOps.</p>
          </div>
          <div>
            <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2 block">
              Payroll period (optional)
            </label>
            <input
              type="text"
              value={payrollPeriod}
              onChange={(e) => setPayrollPeriod(e.target.value)}
              placeholder="e.g. June 2026"
              className="w-full bg-[#151A21] border border-[#2A3442] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2 block">
              Transcript
            </label>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              rows={8}
              className="w-full bg-[#151A21] border border-[#2A3442] rounded-lg px-4 py-3 text-sm leading-relaxed focus:outline-none focus:border-primary resize-y"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={submitVoice}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-medium"
            >
              Submit to FinOps
            </button>
            <button
              type="button"
              onClick={() => { setTranscript(''); setPayrollPeriod(''); }}
              className="px-6 py-2.5 rounded-lg text-sm font-medium border border-[#2A3442] text-muted-foreground hover:text-foreground"
            >
              Record again
            </button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-[#2A3442] rounded-2xl p-16 flex flex-col items-center justify-center text-center bg-[#0B0F14] shadow-sm">
          {isTranscribing ? (
            <>
              <Loader2 size={40} className="text-primary animate-spin mb-6" />
              <h3 className="text-xl font-medium text-foreground mb-2">Transcribing your recording…</h3>
              <p className="text-sm text-muted-foreground">Powered by Smallest.ai Pulse</p>
            </>
          ) : (
            <>
              <div
                className={`p-5 rounded-full mb-6 border ${
                  isRecording
                    ? 'bg-danger/15 border-danger/40 text-danger animate-pulse'
                    : 'bg-[#151A21] border-[#2A3442]/50 text-muted-foreground'
                }`}
              >
                {isRecording ? <Square size={32} /> : <Mic size={32} />}
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2">
                {isRecording ? 'Recording… tap stop when done' : 'Speak your timesheet details'}
              </h3>
              <p className="text-sm text-muted-foreground mb-8 max-w-md">
                Say employee names, working days, overtime, and period — e.g. &quot;June 2026, David Fernandez 20 days,
                Rajesh Johnson 21 days&quot;
              </p>
              {isRecording ? (
                <button
                  type="button"
                  onClick={stopRecording}
                  className="bg-danger hover:bg-danger/90 text-white px-8 py-3 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  <Square size={16} /> Stop & transcribe
                </button>
              ) : (
                <button
                  type="button"
                  onClick={startRecording}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  <Mic size={16} /> Start recording
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
