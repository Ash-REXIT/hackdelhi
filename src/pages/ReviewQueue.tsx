import { useNavigate } from 'react-router-dom';
import { 
  GitPullRequest, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle,
  Search,
  User
} from 'lucide-react';

export function ReviewQueue() {
  const navigate = useNavigate();

  const reviews = [
    {
      id: "REV-8942",
      invoice: "INV-2023-10-A",
      client: "Infosys",
      project: "Phoenix Modernization",
      confidence: 98,
      reason: "Overtime policy violation: 45 hours billed, max is 40.",
      reviewer: "Sarah Connor",
      recommendation: "Flag for Manual Approval",
      priority: "high",
      time: "2 mins ago"
    },
    {
      id: "REV-8941",
      invoice: "INV-2023-10-B",
      client: "TCS",
      project: "Cloud Migration",
      confidence: 76,
      reason: "Missing employee ID match in Master Data.",
      reviewer: "Unassigned",
      recommendation: "Manual Data Entry Required",
      priority: "critical",
      time: "15 mins ago"
    },
    {
      id: "REV-8940",
      invoice: "INV-2023-10-C",
      client: "Wipro",
      project: "Security Audit",
      confidence: 99,
      reason: "AI detected anomalous billing pattern (weekend work).",
      reviewer: "David Bowman",
      recommendation: "Request Client Clarification",
      priority: "normal",
      time: "1 hr ago"
    }
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header Area */}
      <div className="pt-8 px-10 pb-6 shrink-0 border-b border-[#2A3442]/50 bg-[#0B0F14] z-10">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-1">Review Queue</h1>
            <p className="text-muted-foreground text-[15px]">Human-in-the-loop operational work queue for AI exceptions.</p>
          </div>
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
            <input 
              type="text" 
              placeholder="Search by client or ID..." 
              className="w-full bg-panel border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-10 bg-[#0B0F14]">
        <div className="flex flex-col space-y-4 max-w-6xl">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-card border border-border/60 rounded-xl p-6 flex flex-col xl:flex-row xl:items-center justify-between hover:border-primary/50 transition-all shadow-sm group"
            >
              <div className="flex items-start space-x-5 flex-1">
                <div className="mt-1 text-muted-foreground group-hover:text-primary transition-colors">
                  <GitPullRequest size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1.5">
                    <span className="font-semibold text-foreground text-lg">{review.client}</span>
                    <span className="text-muted-foreground font-mono text-xs bg-panel px-2 py-0.5 rounded border border-border/50">{review.invoice}</span>
                    {review.priority === 'critical' && (
                      <span className="bg-danger/10 text-danger text-[10px] px-2 py-0.5 rounded border border-danger/20 font-mono uppercase tracking-wide">Critical</span>
                    )}
                    {review.priority === 'high' && (
                      <span className="bg-warning/10 text-warning text-[10px] px-2 py-0.5 rounded border border-warning/20 font-mono uppercase tracking-wide">High</span>
                    )}
                    {review.priority === 'normal' && (
                      <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded border border-primary/20 font-mono uppercase tracking-wide">Normal</span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Project: <span className="text-foreground font-medium">{review.project}</span> <span className="mx-2 text-border">•</span> <span className="font-mono text-xs">{review.time}</span>
                  </div>
                  
                  <div className="flex items-start space-x-2 text-sm text-warning font-medium bg-warning/5 border border-warning/10 p-3 rounded-lg mb-4 xl:mb-0 max-w-2xl">
                    <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                    <span>{review.reason}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 xl:mt-0 flex flex-col xl:items-end justify-center border-t border-border/50 xl:border-t-0 xl:border-l xl:border-border/50 pt-4 xl:pt-0 xl:pl-8 xl:min-w-[280px]">
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2 bg-panel px-3 py-1.5 rounded-md border border-border/50">
                    <ShieldCheck size={14} className="text-primary" />
                    <span className="text-xs font-medium text-foreground">AI Conf: <span className="font-mono">{review.confidence}%</span></span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <User size={14} />
                    <span>{review.reviewer}</span>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wide mb-4 text-left xl:text-right w-full">
                  Action: <span className="text-primary font-semibold">{review.recommendation}</span>
                </div>
                
                <div className="flex items-center space-x-2 w-full xl:w-auto">
                  <button className="flex-1 xl:flex-none px-4 py-2 text-xs font-medium bg-success/10 text-success hover:bg-success/20 border border-success/20 rounded-md transition-colors">
                    Approve
                  </button>
                  <button className="flex-1 xl:flex-none px-4 py-2 text-xs font-medium bg-danger/10 text-danger hover:bg-danger/20 border border-danger/20 rounded-md transition-colors">
                    Reject
                  </button>
                  <button 
                    onClick={() => navigate(`/workspace/review/${review.id}`)}
                    className="flex-1 xl:flex-none px-4 py-2 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-md transition-colors shadow-sm"
                  >
                    Open
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
