import { UploadCloud, FileText, CheckCircle, MessageSquare, Download, HelpCircle } from 'lucide-react';

export function ClientPortal() {
  return (
    <div className="flex flex-col h-screen w-full bg-[#111418] text-foreground font-sans overflow-hidden">
      <header className="h-16 border-b border-[#2A3442]/60 flex items-center justify-between px-10 bg-[#0B0F14] shrink-0 shadow-sm relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-semibold text-sm shadow-sm">
            A
          </div>
          <span className="font-medium text-[15px]">Acme Corp Portal</span>
        </div>
        <div className="flex space-x-8 text-sm font-medium">
          <a href="#" className="text-foreground border-b-2 border-primary pb-[1.15rem] mt-[1.15rem]">Timesheets</a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors pb-[1.15rem] mt-[1.15rem]">Invoices</a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors pb-[1.15rem] mt-[1.15rem]">Support</a>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-12 max-w-6xl mx-auto w-full">
        <div className="mb-12">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Submit Timesheets</h1>
          <p className="text-muted-foreground">Upload your weekly contractor timesheets for processing.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Upload Zone */}
          <div className="md:col-span-2">
            <div className="border-2 border-dashed border-[#2A3442] rounded-2xl p-16 flex flex-col items-center justify-center text-center hover:bg-[#151A21] hover:border-primary/50 transition-all cursor-pointer bg-[#0B0F14] group shadow-sm">
              <div className="p-4 bg-panel border border-border/50 text-muted-foreground group-hover:text-primary rounded-xl mb-6 shadow-sm transition-colors">
                <UploadCloud size={28} />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Drag & drop files here</h3>
              <p className="text-sm text-muted-foreground mb-6">Supported formats: PDF, Excel, Image, Email (.eml)</p>
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
                Browse Files
              </button>
            </div>

            <h2 className="text-xl font-medium tracking-tight mt-16 mb-6 border-b border-[#2A3442]/60 pb-3">Recent Uploads</h2>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-[#0B0F14] border border-[#2A3442]/60 rounded-xl shadow-sm hover:border-primary/30 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-panel rounded border border-border/50 text-muted-foreground">
                      <FileText size={18} />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-foreground">timesheet_oct_week{i}.pdf</div>
                      <div className="text-xs text-muted-foreground mt-0.5 font-mono">Uploaded {i} days ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <span className="flex items-center text-[11px] font-mono uppercase tracking-widest text-success bg-success/10 px-2 py-0.5 rounded border border-success/20">
                      <CheckCircle size={12} className="mr-1.5" /> Processed
                    </span>
                    <button className="text-muted-foreground hover:text-primary transition-colors">
                      <Download size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-[#0B0F14] border border-[#2A3442]/60 rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
              <h3 className="font-medium tracking-tight mb-5 relative z-10">Pending Approvals</h3>
              <div className="p-5 border border-warning/30 bg-warning/5 rounded-xl mb-2 relative z-10">
                <div className="font-medium text-sm text-foreground mb-1.5 flex items-center">
                  <AlertTriangle size={14} className="text-warning mr-2" /> Exception
                </div>
                <div className="text-[13px] text-muted-foreground mb-4 leading-relaxed">Please approve 12hrs OT for Jane Doe.</div>
                <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                  Review Request
                </button>
              </div>
            </div>

            <div className="bg-[#0B0F14] border border-[#2A3442]/60 rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
              <h3 className="font-medium tracking-tight mb-5 relative z-10">Need Help?</h3>
              <div className="space-y-3 relative z-10">
                <button className="w-full flex items-center justify-center space-x-2 bg-panel hover:bg-card border border-[#2A3442]/80 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
                  <MessageSquare size={16} className="text-muted-foreground" />
                  <span>Message FinOps Team</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 bg-panel hover:bg-card border border-[#2A3442]/80 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
                  <HelpCircle size={16} className="text-muted-foreground" />
                  <span>Raise a Query</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
