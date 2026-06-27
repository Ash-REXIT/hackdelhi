import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export function PortalApprovals() {
  const approvals = [
    {
      id: "INV-8925",
      project: "Project Phoenix",
      amount: "$4,500.00",
      contractor: "Jane Doe",
      summary: "Timesheet claims 12 hours of overtime on Oct 2nd, which exceeds the standard 10-hour daily limit defined in the Acme Corp SLA.",
      date: "Oct 14, 2026"
    },
    {
      id: "INV-8926",
      project: "Security Audit",
      amount: "$15,000.00",
      contractor: "John Smith",
      summary: "Missing explicit approval for weekend work. AI detected Saturday logged hours which require manager sign-off.",
      date: "Oct 13, 2026"
    }
  ];

  return (
    <div className="p-12 w-full max-w-5xl mx-auto h-full overflow-y-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Approval Center</h1>
        <p className="text-muted-foreground">Exceptions and policy violations that require your manual sign-off.</p>
      </div>

      <div className="space-y-6">
        {approvals.map((approval) => (
          <div key={approval.id} className="bg-[#1D2430] border border-[#F59E0B]/30 rounded-2xl p-8 shadow-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 relative z-10">
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <span className="font-mono text-lg font-medium text-foreground">{approval.id}</span>
                  <span className="bg-[#F59E0B]/10 text-[#F59E0B] px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest border border-[#F59E0B]/20">
                    Action Required
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {approval.project} • {approval.contractor}
                </div>
              </div>
              <div className="mt-4 md:mt-0 font-mono text-2xl font-medium text-foreground tracking-tight">
                {approval.amount}
              </div>
            </div>

            <div className="bg-[#151A21] border border-[#2A3442]/60 rounded-xl p-5 mb-8 relative z-10">
              <div className="flex items-start space-x-3">
                <AlertTriangle size={18} className="text-[#F59E0B] mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">AI Exception Summary</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">{approval.summary}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 relative z-10">
              <button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center justify-center">
                <CheckCircle size={16} className="mr-2" /> Approve Exception
              </button>
              <button className="w-full sm:w-auto bg-[#151A21] hover:bg-[#0B0F14] border border-[#2A3442] text-foreground px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center justify-center">
                <XCircle size={16} className="mr-2" /> Request Changes
              </button>
              <div className="flex-1"></div>
              <button className="text-sm text-muted-foreground hover:text-foreground font-medium transition-colors">
                View Original Document →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
