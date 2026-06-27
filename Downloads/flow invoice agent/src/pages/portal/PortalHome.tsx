import { FileText, CheckCircle, Clock, DollarSign, UploadCloud, Download, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PortalHome() {
  const navigate = useNavigate();

  return (
    <div className="p-12 w-full max-w-6xl mx-auto h-full overflow-y-auto">
      {/* Greeting */}
      <div className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Welcome back, Infosys Ltd.</h1>
        <p className="text-muted-foreground">Here's the status of your processing queue for the current billing cycle.</p>
      </div>

      {/* KPI Cards (Max 4) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-[#1D2430] border border-[#2A3442]/60 rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
          <div className="flex items-center space-x-3 mb-6 relative z-10">
            <div className="text-[#3B82F6]">
              <Clock size={20} strokeWidth={2} />
            </div>
            <span className="text-muted-foreground text-sm font-medium">Processing</span>
          </div>
          <div className="relative z-10">
            <div className="text-3xl font-semibold tracking-tight text-foreground mb-1">12</div>
            <div className="text-xs text-muted-foreground">Timesheets in pipeline</div>
          </div>
        </div>

        <div className="bg-[#1D2430] border border-[#2A3442]/60 rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
          <div className="flex items-center space-x-3 mb-6 relative z-10">
            <div className="text-[#F59E0B]">
              <CheckCircle size={20} strokeWidth={2} />
            </div>
            <span className="text-muted-foreground text-sm font-medium">Awaiting Approval</span>
          </div>
          <div className="relative z-10">
            <div className="text-3xl font-semibold tracking-tight text-foreground mb-1">3</div>
            <div className="text-xs text-[#F59E0B]">Action required</div>
          </div>
        </div>

        <div className="bg-[#1D2430] border border-[#2A3442]/60 rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
          <div className="flex items-center space-x-3 mb-6 relative z-10">
            <div className="text-[#22C55E]">
              <FileText size={20} strokeWidth={2} />
            </div>
            <span className="text-muted-foreground text-sm font-medium">Generated Invoices</span>
          </div>
          <div className="relative z-10">
            <div className="text-3xl font-semibold tracking-tight text-foreground mb-1">84</div>
            <div className="text-xs text-muted-foreground">Ready for download</div>
          </div>
        </div>

        <div className="bg-[#1D2430] border border-[#2A3442]/60 rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
          <div className="flex items-center space-x-3 mb-6 relative z-10">
            <div className="text-muted-foreground">
              <DollarSign size={20} strokeWidth={2} />
            </div>
            <span className="text-muted-foreground text-sm font-medium">Paid Invoices</span>
          </div>
          <div className="relative z-10">
            <div className="text-3xl font-semibold tracking-tight text-foreground mb-1">450</div>
            <div className="text-xs text-muted-foreground">Year to date</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-medium tracking-tight mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <button 
          onClick={() => navigate('/portal/upload')}
          className="bg-[#151A21] border border-[#2A3442] hover:bg-[#1D2430] hover:border-[#3B82F6]/50 text-foreground py-4 px-6 rounded-xl flex flex-col items-start transition-all shadow-sm group"
        >
          <div className="p-2 bg-primary/10 text-primary rounded-lg mb-4">
            <UploadCloud size={20} />
          </div>
          <span className="font-medium text-sm">Upload Timesheet</span>
          <span className="text-xs text-muted-foreground mt-1">Submit new work</span>
        </button>
        
        <button 
          onClick={() => navigate('/portal/approvals')}
          className="bg-[#151A21] border border-[#2A3442] hover:bg-[#1D2430] hover:border-[#F59E0B]/50 text-foreground py-4 px-6 rounded-xl flex flex-col items-start transition-all shadow-sm group"
        >
          <div className="p-2 bg-[#F59E0B]/10 text-[#F59E0B] rounded-lg mb-4">
            <CheckCircle size={20} />
          </div>
          <span className="font-medium text-sm">Review Approvals</span>
          <span className="text-xs text-muted-foreground mt-1">3 pending actions</span>
        </button>

        <button 
          onClick={() => navigate('/portal/invoices')}
          className="bg-[#151A21] border border-[#2A3442] hover:bg-[#1D2430] hover:border-[#3B82F6]/50 text-foreground py-4 px-6 rounded-xl flex flex-col items-start transition-all shadow-sm group"
        >
          <div className="p-2 bg-[#1D2430] border border-[#2A3442]/50 text-muted-foreground rounded-lg mb-4">
            <Download size={20} />
          </div>
          <span className="font-medium text-sm">Download Invoices</span>
          <span className="text-xs text-muted-foreground mt-1">Get latest PDFs</span>
        </button>

        <button 
          onClick={() => navigate('/portal/messages')}
          className="bg-[#151A21] border border-[#2A3442] hover:bg-[#1D2430] hover:border-[#3B82F6]/50 text-foreground py-4 px-6 rounded-xl flex flex-col items-start transition-all shadow-sm group"
        >
          <div className="p-2 bg-[#1D2430] border border-[#2A3442]/50 text-muted-foreground rounded-lg mb-4">
            <MessageSquare size={20} />
          </div>
          <span className="font-medium text-sm">Contact TASC</span>
          <span className="text-xs text-muted-foreground mt-1">Ask a question</span>
        </button>
      </div>

      {/* Activity Timeline */}
      <h2 className="text-lg font-medium tracking-tight mb-6">Recent Activity</h2>
      <div className="bg-[#0B0F14] relative pl-4 border-l border-[#2A3442]">
        
        <div className="mb-8 relative">
          <div className="absolute -left-[21px] w-2.5 h-2.5 rounded-full bg-[#3B82F6] ring-4 ring-[#0B0F14]"></div>
          <div className="text-sm font-medium text-foreground">Invoice #INV-8921 Generated</div>
          <div className="text-xs text-muted-foreground mt-1 font-mono">10:33 AM • Project Phoenix</div>
        </div>

        <div className="mb-8 relative">
          <div className="absolute -left-[21px] w-2.5 h-2.5 rounded-full bg-[#1D2430] border border-[#2A3442] ring-4 ring-[#0B0F14]"></div>
          <div className="text-sm font-medium text-foreground">Exception: Manual Approval Required</div>
          <div className="text-xs text-muted-foreground mt-1 font-mono">10:31 AM • Jane Doe Timesheet</div>
        </div>

        <div className="mb-8 relative">
          <div className="absolute -left-[21px] w-2.5 h-2.5 rounded-full bg-[#1D2430] border border-[#2A3442] ring-4 ring-[#0B0F14]"></div>
          <div className="text-sm font-medium text-foreground">Timesheet Uploaded (2 files)</div>
          <div className="text-xs text-muted-foreground mt-1 font-mono">10:30 AM • Uploaded by John Doe</div>
        </div>

      </div>

    </div>
  );
}
