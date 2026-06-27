import { useState } from 'react';
import { 
  ZoomIn, ZoomOut, Maximize,
  CheckCircle, AlertTriangle, ShieldCheck, HelpCircle, FileSearch, ArrowRight,
  ThumbsUp, ThumbsDown
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
      <div className="w-[30%] min-w-[300px] border-r border-border flex flex-col bg-panel">
        <div className="h-10 border-b border-border flex items-center justify-between px-4 bg-card shrink-0">
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wide">Document Evidence</div>
          <div className="flex space-x-2 text-muted-foreground">
            <ZoomOut size={14} className="cursor-pointer hover:text-foreground" />
            <ZoomIn size={14} className="cursor-pointer hover:text-foreground" />
            <Maximize size={14} className="cursor-pointer hover:text-foreground ml-2" />
          </div>
        </div>
        <div className="flex-1 p-4 overflow-y-auto relative bg-[#090b0e]">
          {/* Mock PDF Document */}
          <div className="w-full h-[800px] bg-white rounded shadow-sm relative text-black p-8 font-sans border border-neutral-300">
            <div className="text-2xl font-bold border-b pb-4 mb-4 text-neutral-800">TIMESHEET SUBMISSION</div>
            <div className="grid grid-cols-2 gap-4 mb-8 text-sm text-neutral-600">
              <div>
                <strong>Contractor:</strong> Jane Doe<br/>
                <strong>ID:</strong> #CT-8921<br/>
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
              <tbody>
                <tr className="border-b border-neutral-200">
                  <td className="py-2 px-2">Oct 1</td>
                  <td className="py-2 px-2">8</td>
                  <td className="py-2 px-2">Regular</td>
                  <td className="py-2 px-2">$150/hr</td>
                </tr>
                <tr className="border-b border-neutral-200 bg-yellow-100/50 relative group cursor-crosshair">
                  <td className="py-2 px-2">Oct 2</td>
                  <td className="py-2 px-2 text-red-600 font-bold">12</td>
                  <td className="py-2 px-2 text-red-600 font-bold">Overtime</td>
                  <td className="py-2 px-2">$225/hr</td>
                  {/* Mock OCR highlight box */}
                  <div className="absolute inset-0 border-2 border-ai-accent/50 bg-ai-accent/10 pointer-events-none"></div>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CENTER PANEL: Extracted Data & Execution */}
      <div className="flex-1 border-r border-border flex flex-col bg-background min-w-[400px]">
        <div className="h-10 border-b border-border flex items-center justify-between px-4 bg-card shrink-0">
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wide">Extracted Data</div>
          <div className="flex space-x-2 text-xs">
            <span className="bg-success/20 text-success px-2 py-0.5 rounded flex items-center">
              <CheckCircle size={10} className="mr-1" /> OCR Confidence: 99.2%
            </span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 flex flex-col space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wide">Contractor</label>
              <input type="text" value="Jane Doe" className="w-full bg-panel border border-border rounded p-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" readOnly />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wide">Project</label>
              <input type="text" value="Acme Corp - Project Phoenix" className="w-full bg-panel border border-border rounded p-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" readOnly />
            </div>
          </div>

          <div className="border border-border rounded-lg bg-panel overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-card border-b border-border">
                <tr>
                  <th className="px-4 py-2 font-mono text-xs font-medium text-muted-foreground">Line Item</th>
                  <th className="px-4 py-2 font-mono text-xs font-medium text-muted-foreground">Hours</th>
                  <th className="px-4 py-2 font-mono text-xs font-medium text-muted-foreground">Rate</th>
                  <th className="px-4 py-2 font-mono text-xs font-medium text-muted-foreground">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-4 py-3">Regular Time (Oct 1)</td>
                  <td className="px-4 py-3">8</td>
                  <td className="px-4 py-3">$150.00</td>
                  <td className="px-4 py-3">$1,200.00</td>
                </tr>
                <tr className="bg-warning/10 border-l-2 border-l-warning">
                  <td className="px-4 py-3 flex items-center">
                    <AlertTriangle size={14} className="text-warning mr-2" />
                    Overtime (Oct 2)
                  </td>
                  <td className="px-4 py-3">12</td>
                  <td className="px-4 py-3">$225.00</td>
                  <td className="px-4 py-3 font-semibold">$2,700.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-auto pt-8">
            <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-wide mb-4">AI Execution Pipeline</h4>
            <div className="space-y-3 font-mono text-xs">
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
        <div className="h-10 border-b border-border flex items-center justify-between px-4 bg-card shrink-0">
          <div className="flex items-center text-xs font-mono text-ai-accent uppercase tracking-wide">
            <ShieldCheck size={14} className="mr-2" />
            AI Assistant
          </div>
        </div>
        
        <div className="flex-1 p-4 flex flex-col space-y-4 overflow-y-auto">
          {/* AI Message */}
          <div className="bg-card border border-border p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-3 border-b border-border pb-2">
              <AlertTriangle size={16} className="text-warning" />
              <span className="font-semibold text-sm">Policy Exception Detected</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              I noticed a potential policy violation for <strong>Jane Doe</strong> on Oct 2. 
              The timesheet claims 12 hours of overtime, but the client contract (Acme Corp) requires pre-approval for OT exceeding 10 hours/day.
            </p>
            <div className="bg-background border border-border p-3 rounded mb-4 text-xs font-mono">
              <strong>Evidence:</strong> <span className="text-ai-accent cursor-pointer hover:underline flex items-center inline-flex ml-1"><FileSearch size={12} className="mr-1"/> Contract Section 4.2</span>
            </div>
            <p className="text-sm text-foreground font-medium mb-3">Suggested Action:</p>
            <div className="flex flex-col space-y-2">
              <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded text-sm transition-colors shadow-sm flex items-center justify-center">
                <CheckCircle size={14} className="mr-2" /> Accept & Proceed
              </button>
              <button className="w-full bg-card hover:bg-background border border-border text-foreground py-2 rounded text-sm transition-colors flex items-center justify-center">
                <AlertTriangle size={14} className="mr-2" /> Flag for Manual Review
              </button>
            </div>
          </div>

          {/* Contextual Actions (Cursor-like) */}
          <div className="mt-auto space-y-2">
            <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-wide mb-2 px-1">Contextual Actions</h4>
            <button className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-card border border-transparent hover:border-border rounded transition-all flex items-center">
              <HelpCircle size={14} className="mr-2 text-primary" /> Explain this exception
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-card border border-transparent hover:border-border rounded transition-all flex items-center">
              <FileSearch size={14} className="mr-2 text-ai-accent" /> Compare with previous invoice
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-border bg-card">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Ask AI anything about this invoice..." 
              className="w-full bg-background border border-border rounded-md pl-3 pr-10 py-2 text-sm focus:outline-none focus:border-ai-accent transition-colors"
            />
            <button className="absolute right-2 top-2 text-muted-foreground hover:text-ai-accent transition-colors">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
