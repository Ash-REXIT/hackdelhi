import { useState } from 'react';
import { 
  ZoomIn, ZoomOut, Maximize,
  CheckCircle, AlertTriangle, ShieldCheck, FileSearch, ArrowRight,
  FileText
} from 'lucide-react';

export function ReviewSession() {
  const [stages] = useState([
    { label: "Receiving Document", status: "completed" },
    { label: "OCR Completed", status: "completed" },
    { label: "Employee Matched", status: "completed" },
    { label: "Business Rules Validated", status: "completed" },
    { label: "Duplicate Detection", status: "completed" },
    { label: "Exception Analysis", status: "completed" },
    { label: "Invoice Ready", status: "pending" },
  ]);

  return (
    <div className="flex h-full w-full bg-background overflow-hidden">
      {/* LEFT PANEL: Evidence Viewer */}
      <div className="w-[30%] min-w-[300px] border-r border-border/50 flex flex-col bg-panel">
        <div className="h-12 border-b border-border/50 flex items-center justify-between px-5 bg-card shrink-0">
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wide">Document Evidence</div>
          <div className="flex space-x-3 text-muted-foreground">
            <ZoomOut size={16} className="cursor-pointer hover:text-foreground transition-colors" />
            <ZoomIn size={16} className="cursor-pointer hover:text-foreground transition-colors" />
            <Maximize size={16} className="cursor-pointer hover:text-foreground ml-2 transition-colors" />
          </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto relative bg-[#0a0d11]">
          {/* Mock PDF Document */}
          <div className="w-full h-[800px] bg-white rounded shadow-sm relative text-black p-8 font-sans border border-neutral-300">
            <div className="text-2xl font-bold border-b pb-4 mb-4 text-neutral-800">TIMESHEET SUBMISSION</div>
            <div className="grid grid-cols-2 gap-4 mb-8 text-sm text-neutral-600">
              <div>
                <strong>Contractor:</strong> Jane Doe<br/>
                <strong className="font-sans">ID:</strong> <span className="font-mono">#CT-8921</span><br/>
                <strong>Period:</strong> Oct 1 - Oct 14, 2026
              </div>
              <div className="text-right">
                <strong>Client:</strong> Acme Corp<br/>
                <strong>Project:</strong> Project Phoenix
              </div>
            </div>
            
            <table className="w-full text-sm mb-8">
              <thead className="bg-neutral-100 border-b border-neutral-300">
                <tr>
                  <th className="text-left py-2 px-2">Date</th>
                  <th className="text-left py-2 px-2">Hours</th>
                  <th className="text-left py-2 px-2">Type</th>
                  <th className="text-left py-2 px-2">Rate</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                <tr className="border-b border-neutral-200">
                  <td className="py-2 px-2">Oct 1</td>
                  <td className="py-2 px-2">8</td>
                  <td className="py-2 px-2 font-sans">Regular</td>
                  <td className="py-2 px-2">$150/hr</td>
                </tr>
                <tr className="border-b border-neutral-200 bg-yellow-100/50 relative group cursor-crosshair">
                  <td className="py-2 px-2">Oct 2</td>
                  <td className="py-2 px-2 text-red-600 font-bold">12</td>
                  <td className="py-2 px-2 text-red-600 font-bold font-sans">Overtime</td>
                  <td className="py-2 px-2">$225/hr</td>
                  {/* Mock OCR highlight box */}
                  <div className="absolute inset-0 border-2 border-primary/50 bg-primary/10 pointer-events-none"></div>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CENTER PANEL: Extracted Data & Execution */}
      <div className="flex-1 border-r border-border/50 flex flex-col bg-background min-w-[400px]">
        <div className="h-12 border-b border-border/50 flex items-center justify-between px-6 bg-card shrink-0">
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wide">Extracted Data</div>
          <div className="flex space-x-2 text-xs">
            <span className="bg-success/10 text-success px-2 py-0.5 rounded flex items-center font-mono">
              <CheckCircle size={12} className="mr-1.5" /> OCR Confidence: 99.2%
            </span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 flex flex-col space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wide">Contractor</label>
              <input type="text" value="Jane Doe" className="w-full bg-panel border border-border/80 rounded-md p-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors shadow-sm" readOnly />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wide">Project</label>
              <input type="text" value="Acme Corp - Project Phoenix" className="w-full bg-panel border border-border/80 rounded-md p-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors shadow-sm" readOnly />
            </div>
          </div>

          <div className="border border-border/80 rounded-xl bg-panel shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-card border-b border-border/50">
                <tr>
                  <th className="px-5 py-3 font-mono text-xs font-medium text-muted-foreground">Line Item</th>
                  <th className="px-5 py-3 font-mono text-xs font-medium text-muted-foreground">Hours</th>
                  <th className="px-5 py-3 font-mono text-xs font-medium text-muted-foreground">Rate</th>
                  <th className="px-5 py-3 font-mono text-xs font-medium text-muted-foreground">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <tr>
                  <td className="px-5 py-4">Regular Time (Oct 1)</td>
                  <td className="px-5 py-4 font-mono">8</td>
                  <td className="px-5 py-4 font-mono">$150.00</td>
                  <td className="px-5 py-4 font-mono">$1,200.00</td>
                </tr>
                <tr className="bg-warning/5 border-l-2 border-l-warning">
                  <td className="px-5 py-4 flex items-center font-medium">
                    <AlertTriangle size={16} className="text-warning mr-2" />
                    Overtime (Oct 2)
                  </td>
                  <td className="px-5 py-4 font-mono">12</td>
                  <td className="px-5 py-4 font-mono">$225.00</td>
                  <td className="px-5 py-4 font-mono font-semibold">$2,700.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-auto pt-8">
            <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-wide mb-5">AI Execution Pipeline</h4>
            <div className="space-y-4 font-mono text-xs bg-panel border border-border/60 p-5 rounded-xl shadow-sm">
              {stages.map((stage, i) => (
                <div key={i} className="flex items-center space-x-3">
                  {stage.status === 'completed' ? (
                    <CheckCircle size={14} className="text-success shrink-0" />
                  ) : (
                    <div className="w-[14px] h-[14px] border border-muted-foreground rounded-full shrink-0 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse" />
                    </div>
                  )}
                  <span className={stage.status === 'completed' ? 'text-foreground' : 'text-muted-foreground'}>{stage.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: AI Assistant */}
      <div className="w-[30%] min-w-[320px] flex flex-col bg-panel">
        <div className="h-12 border-b border-border/50 flex items-center justify-between px-5 bg-card shrink-0">
          <div className="flex items-center text-xs font-mono text-primary uppercase tracking-wide">
            <ShieldCheck size={14} className="mr-2" />
            AI Assistant
          </div>
        </div>
        
        <div className="flex-1 p-5 flex flex-col overflow-y-auto">
          {/* AI Message */}
          <div className="bg-card border border-border/80 p-5 rounded-xl shadow-sm mb-6">
            <div className="flex items-center space-x-2 mb-4 border-b border-border/50 pb-3">
              <AlertTriangle size={16} className="text-warning" />
              <span className="font-medium text-sm text-foreground">Policy Exception Detected</span>
            </div>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              I noticed a potential policy violation for <strong>Jane Doe</strong> on Oct 2. 
              The timesheet claims 12 hours of overtime, but the client contract (Acme Corp) requires pre-approval for OT exceeding 10 hours/day.
            </p>
            <div className="bg-background border border-border/60 p-3 rounded-lg mb-5 text-xs font-mono flex items-center">
              <span className="text-muted-foreground mr-2">Evidence:</span> 
              <span className="text-primary cursor-pointer hover:underline flex items-center">
                <FileSearch size={12} className="mr-1"/> Contract Section 4.2
              </span>
            </div>
            
            <p className="text-sm text-foreground font-medium mb-3">Suggested Action:</p>
            <div className="flex flex-col space-y-2.5">
              <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center justify-center">
                <CheckCircle size={16} className="mr-2" /> Accept & Proceed
              </button>
              <button className="w-full bg-panel hover:bg-background border border-border/80 text-foreground py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center justify-center">
                <AlertTriangle size={16} className="mr-2 text-warning" /> Flag for Manual Review
              </button>
            </div>
          </div>
        </div>

        {/* AI Command Bar */}
        <div className="p-4 border-t border-border/50 bg-card shrink-0">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Ask AI anything about this invoice..." 
              className="w-full bg-background border border-border/80 rounded-lg pl-3 pr-10 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors shadow-sm"
            />
            <button className="absolute right-2 top-2.5 text-muted-foreground hover:text-primary transition-colors">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
