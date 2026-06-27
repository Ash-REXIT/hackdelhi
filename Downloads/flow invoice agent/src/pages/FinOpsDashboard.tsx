import { Activity, AlertTriangle, ArrowRight, CheckCircle2, Clock, FileText, Zap } from 'lucide-react';

export function FinOpsDashboard() {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header Area */}
      <div className="pt-8 px-10 pb-6 shrink-0 border-b border-[#2A3442]/50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-1">FinOps Dashboard</h1>
            <p className="text-muted-foreground text-[15px]">Real-time visibility into your automated invoice processing pipeline.</p>
          </div>
          <div className="flex items-center space-x-3 bg-success/10 border border-success/20 px-4 py-2 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
            <span className="text-xs font-medium text-success uppercase tracking-widest">System Operational</span>
          </div>
        </div>
      </div>

      <div className="p-10 space-y-8">
        {/* KPI Cards (Max 5) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-card border border-border/60 rounded-xl p-5 shadow-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
            <div className="flex items-center space-x-3 mb-4 relative z-10">
              <Zap size={18} className="text-primary" />
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Processing Today</span>
            </div>
            <div className="relative z-10">
              <div className="text-2xl font-semibold text-foreground mb-1">1,482</div>
              <div className="text-xs text-success flex items-center"><ArrowRight size={12} className="-rotate-45 mr-1" /> +12% from yesterday</div>
            </div>
          </div>

          <div className="bg-card border border-border/60 rounded-xl p-5 shadow-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
            <div className="flex items-center space-x-3 mb-4 relative z-10">
              <Clock size={18} className="text-warning" />
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">In Pipeline</span>
            </div>
            <div className="relative z-10">
              <div className="text-2xl font-semibold text-foreground mb-1">345</div>
              <div className="text-xs text-muted-foreground">Timesheets currently queued</div>
            </div>
          </div>

          <div className="bg-card border border-[#2A3442] rounded-xl p-5 shadow-sm relative overflow-hidden group border-l-2 border-l-danger">
            <div className="absolute inset-0 bg-gradient-to-b from-danger/5 to-transparent pointer-events-none"></div>
            <div className="flex items-center space-x-3 mb-4 relative z-10">
              <AlertTriangle size={18} className="text-danger" />
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Human Review</span>
            </div>
            <div className="relative z-10">
              <div className="text-2xl font-semibold text-foreground mb-1">12</div>
              <div className="text-xs text-danger">Exceptions requiring action</div>
            </div>
          </div>

          <div className="bg-card border border-border/60 rounded-xl p-5 shadow-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
            <div className="flex items-center space-x-3 mb-4 relative z-10">
              <CheckCircle2 size={18} className="text-success" />
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">AI Confidence</span>
            </div>
            <div className="relative z-10">
              <div className="text-2xl font-semibold text-foreground mb-1">98.4%</div>
              <div className="text-xs text-success flex items-center"><ArrowRight size={12} className="-rotate-45 mr-1" /> +0.2% 7d avg</div>
            </div>
          </div>

          <div className="bg-card border border-border/60 rounded-xl p-5 shadow-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
            <div className="flex items-center space-x-3 mb-4 relative z-10">
              <FileText size={18} className="text-primary" />
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Dispatch Rate</span>
            </div>
            <div className="relative z-10">
              <div className="text-2xl font-semibold text-foreground mb-1">99.1%</div>
              <div className="text-xs text-muted-foreground">Successful ERP syncs</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Pipeline Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-lg font-medium tracking-tight text-foreground flex items-center">
              <Activity size={18} className="mr-2 text-muted-foreground" />
              Live Processing Timeline
            </h2>
            <div className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-panel border-b border-border/50 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4 font-medium">Time</th>
                    <th className="px-6 py-4 font-medium">Event</th>
                    <th className="px-6 py-4 font-medium">Client</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  <tr className="hover:bg-panel/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-muted-foreground text-xs">10:45:12</td>
                    <td className="px-6 py-4 text-foreground font-medium">Invoice INV-8921 Dispatched to SAP</td>
                    <td className="px-6 py-4 text-muted-foreground">Infosys Ltd</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-success/10 text-success text-xs rounded border border-success/20">Success</span></td>
                  </tr>
                  <tr className="hover:bg-panel/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-muted-foreground text-xs">10:44:03</td>
                    <td className="px-6 py-4 text-foreground font-medium">Business Rule Exception (Overtime)</td>
                    <td className="px-6 py-4 text-muted-foreground">Wipro Technologies</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-danger/10 text-danger text-xs rounded border border-danger/20">Flagged</span></td>
                  </tr>
                  <tr className="hover:bg-panel/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-muted-foreground text-xs">10:42:55</td>
                    <td className="px-6 py-4 text-foreground font-medium">Batch 45 (102 Timesheets) OCR Complete</td>
                    <td className="px-6 py-4 text-muted-foreground">Cognizant</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-success/10 text-success text-xs rounded border border-success/20">Success</span></td>
                  </tr>
                  <tr className="hover:bg-panel/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-muted-foreground text-xs">10:30:00</td>
                    <td className="px-6 py-4 text-foreground font-medium">Email Intake Triggered (5 files)</td>
                    <td className="px-6 py-4 text-muted-foreground">TCS</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded border border-primary/20">Processing</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Context Panel Widget */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium tracking-tight text-foreground flex items-center">
              <Zap size={18} className="mr-2 text-primary" />
              AI Insights
            </h2>
            <div className="bg-panel border border-border/60 rounded-xl p-6 shadow-sm">
              <div className="space-y-4">
                <div className="p-4 bg-card border border-border rounded-lg border-l-2 border-l-warning">
                  <h3 className="text-sm font-medium text-foreground mb-1">Anomaly Detected</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Wipro's submission volume for Q3 is currently 24% higher than historical averages. AI Agent has preemptively spun up 3 additional OCR worker nodes.
                  </p>
                </div>
                <div className="p-4 bg-card border border-border rounded-lg border-l-2 border-l-primary">
                  <h3 className="text-sm font-medium text-foreground mb-1">Rule Optimization Suggestion</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    12 invoices flagged today for "Missing Manager Signature". Recommend adjusting the Infosys configuration profile to allow "Email Approval" as valid evidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
