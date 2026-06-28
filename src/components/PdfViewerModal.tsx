import { useEffect } from 'react';
import { X } from 'lucide-react';

interface PdfViewerModalProps {
  url: string | null;
  title?: string;
  onClose: () => void;
}

export function PdfViewerModal({ url, title = 'Document Preview', onClose }: PdfViewerModalProps) {
  useEffect(() => {
    if (!url) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [url, onClose]);

  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [url]);

  if (!url) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 md:p-8">
      <div className="flex flex-col w-full max-w-5xl h-[90vh] bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-panel shrink-0">
          <h2 className="text-sm font-medium text-foreground truncate">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-background text-muted-foreground hover:text-foreground"
            aria-label="Close preview"
          >
            <X size={18} />
          </button>
        </div>
        <iframe title={title} src={url} className="flex-1 w-full bg-white" />
      </div>
    </div>
  );
}
