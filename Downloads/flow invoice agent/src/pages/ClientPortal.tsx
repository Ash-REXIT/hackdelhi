import { UploadCloud, FileText, CheckCircle, MessageSquare, Download, HelpCircle } from 'lucide-react';

export function ClientPortal() {
  return (
    <div className="flex flex-col h-screen w-full bg-[#161b22] text-foreground font-sans">
      <header className="h-16 border-b border-[#30363d] flex items-center justify-between px-8 bg-[#0d1117] shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
            A
          </div>
          <span className="font-semibold text-lg">Acme Corp Portal</span>
        </div>
        <div className="flex space-x-6 text-sm font-medium">
          <a href="#" className="text-foreground border-b-2 border-primary pb-5 mt-5">Timesheets</a>
          <a href="#" className="text-muted-foreground hover:text-foreground pb-5 mt-5">Invoices</a>
          <a href="#" className="text-muted-foreground hover:text-foreground pb-5 mt-5">Support</a>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-12 max-w-5xl mx-auto w-full">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Submit Timesheets</h1>
          <p className="text-muted-foreground">Upload your weekly contractor timesheets for processing.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Upload Zone */}
          <div className="md:col-span-2">
            <div className="border-2 border-dashed border-[#30363d] rounded-xl p-12 flex flex-col items-center justify-center text-center hover:bg-[#1f242d] hover:border-primary/50 transition-colors cursor-pointer bg-[#0d1117]">
              <div className="p-4 bg-primary/10 text-primary rounded-full mb-4">
                <UploadCloud size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-1">Drag & drop files here</h3>
              <p className="text-sm text-muted-foreground mb-4">Supported formats: PDF, Excel, Image, Email (.eml)</p>
              <button className="bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Browse Files
              </button>
            </div>

            <h2 className="text-xl font-bold mt-12 mb-4 border-b border-[#30363d] pb-2">Recent Uploads</h2>
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="text-muted-foreground" size={20} />
                    <div>
                      <div className="font-medium text-sm">timesheet_oct_week{i}.pdf</div>
                      <div className="text-xs text-muted-foreground">Uploaded {i} days ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center text-xs text-success bg-success/10 px-2 py-1 rounded">
                      <CheckCircle size={12} className="mr-1" /> Processed
                    </span>
                    <button className="text-muted-foreground hover:text-foreground">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-5">
              <h3 className="font-semibold mb-4">Pending Approvals</h3>
              <div className="p-4 border border-warning/20 bg-warning/5 rounded-lg mb-3">
                <div className="font-medium text-sm mb-1">Overtime Exception</div>
                <div className="text-xs text-muted-foreground mb-3">Please approve 12hrs OT for Jane Doe.</div>
                <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-1.5 rounded text-sm transition-colors">
                  Review Request
                </button>
              </div>
            </div>

            <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-5">
              <h3 className="font-semibold mb-4">Need Help?</h3>
              <button className="w-full flex items-center justify-center space-x-2 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] py-2 rounded text-sm transition-colors mb-2">
                <MessageSquare size={16} />
                <span>Message FinOps Team</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 text-muted-foreground hover:text-foreground py-2 rounded text-sm transition-colors">
                <HelpCircle size={16} />
                <span>Raise a Query</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
