import { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export function PortalUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [stages, setStages] = useState([
    { label: "Document Received", status: "pending" },
    { label: "OCR Complete", status: "pending" },
    { label: "Employee Validation", status: "pending" },
    { label: "Business Validation", status: "pending" },
    { label: "AI Review", status: "pending" },
    { label: "Invoice Generated", status: "pending" },
  ]);

  const handleUpload = () => {
    setIsUploading(true);
    let currentStage = 0;
    
    // Simulate pipeline progression
    const interval = setInterval(() => {
      setStages(prev => prev.map((stage, idx) => {
        if (idx < currentStage) return { ...stage, status: "completed" };
        if (idx === currentStage) return { ...stage, status: "active" };
        return stage;
      }));
      
      currentStage++;
      if (currentStage > 6) {
        clearInterval(interval);
      }
    }, 1500);
  };

  return (
    <div className="p-12 w-full max-w-4xl mx-auto h-full overflow-y-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Upload Timesheet</h1>
        <p className="text-muted-foreground">Securely submit contractor timesheets for automated processing.</p>
      </div>

      {!isUploading ? (
        <div 
          onClick={handleUpload}
          className="border-2 border-dashed border-[#2A3442] rounded-2xl p-20 flex flex-col items-center justify-center text-center hover:bg-[#151A21] hover:border-primary/50 transition-all cursor-pointer bg-[#0B0F14] group shadow-sm"
        >
          <div className="p-4 bg-[#151A21] border border-[#2A3442]/50 text-muted-foreground group-hover:text-primary rounded-xl mb-6 shadow-sm transition-colors">
            <UploadCloud size={32} />
          </div>
          <h3 className="text-xl font-medium text-foreground mb-2">Drag & drop files here</h3>
          <p className="text-sm text-muted-foreground mb-8">Supported formats: PDF, Excel, Image, Email (.eml)</p>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg text-sm font-medium transition-colors shadow-sm">
            Browse Files
          </button>
        </div>
      ) : (
        <div className="bg-[#1D2430] border border-[#2A3442]/60 rounded-2xl p-10 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
          
          <div className="flex items-center space-x-4 mb-10 pb-6 border-b border-[#2A3442]/50 relative z-10">
            <div className="p-3 bg-[#151A21] border border-[#2A3442]/50 rounded-lg text-muted-foreground">
              <FileText size={24} />
            </div>
            <div>
              <div className="text-base font-medium text-foreground mb-1">timesheet_oct_week1.pdf</div>
              <div className="text-xs text-muted-foreground font-mono">1.2 MB • Uploaded just now</div>
            </div>
          </div>

          <div className="space-y-6 relative z-10 pl-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">AI Execution Pipeline</h3>
            {stages.map((stage, i) => (
              <div key={i} className="flex items-center space-x-4 text-sm">
                {stage.status === 'completed' ? (
                  <CheckCircle2 size={18} className="text-[#22C55E]" />
                ) : stage.status === 'active' ? (
                  <div className="w-[18px] h-[18px] border-2 border-[#2A3442] border-t-primary rounded-full animate-spin"></div>
                ) : (
                  <div className="w-[18px] h-[18px] border-2 border-[#2A3442] rounded-full"></div>
                )}
                <span className={stage.status === 'active' ? 'text-primary font-medium' : stage.status === 'completed' ? 'text-foreground' : 'text-muted-foreground'}>
                  {stage.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
