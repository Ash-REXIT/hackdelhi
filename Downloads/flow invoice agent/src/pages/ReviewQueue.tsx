import { useNavigate } from 'react-router-dom';
import { 
  GitPullRequest, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle,
  Search
} from 'lucide-react';

export function ReviewQueue() {
  const navigate = useNavigate();

  const reviews = [
    {
      id: "REV-8942",
      client: "Acme Corp",
      project: "Project Phoenix",
      confidence: 98,
      issues: ["Overtime policy violation"],
      recommendation: "Flag for Manual Review",
      priority: "high",
      time: "2 mins ago"
    },
    {
      id: "REV-8941",
      client: "Globex Inc",
      project: "Q4 Marketing",
      confidence: 76,
      issues: ["Missing employee ID", "Illegible handwriting"],
      recommendation: "Manual Data Entry Required",
      priority: "critical",
      time: "15 mins ago"
    },
    {
      id: "REV-8940",
      client: "Initech",
      project: "Software Upgrade",
      confidence: 99,
      issues: [],
      recommendation: "Auto-Approve Candidate",
      priority: "normal",
      time: "1 hr ago"
    }
  ];

  return (
    <div className="flex flex-col h-full bg-background p-10 overflow-y-auto">
      <div className="flex justify-between items-end border-b border-border/50 pb-6 mb-10 mt-4 max-w-5xl mx-auto w-full">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-foreground mb-1">Review Queue</h1>
          <p className="text-muted-foreground text-sm">7 Documents Need Attention</p>
        </div>
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
          <input 
            type="text" 
            placeholder="Search by client or ID..." 
            className="w-full bg-panel border border-border/80 rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors shadow-sm"
          />
        </div>
      </div>

      <div className="flex flex-col space-y-4 max-w-5xl mx-auto w-full pb-20">
        {reviews.map((review) => (
          <div 
            key={review.id} 
            onClick={() => navigate(`/workspace/review/${review.id}`)}
            className="bg-card border border-border/60 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between hover:border-primary/50 hover:shadow-md cursor-pointer transition-all group shadow-sm"
          >
            <div className="flex items-start space-x-5">
              <div className="mt-1 text-muted-foreground group-hover:text-primary transition-colors">
                <GitPullRequest size={20} />
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-1.5">
                  <span className="font-medium text-foreground text-lg">{review.client}</span>
                  <span className="text-muted-foreground font-mono text-xs bg-panel px-2 py-0.5 rounded border border-border/50">{review.id}</span>
                  {review.priority === 'critical' && (
                    <span className="bg-danger/10 text-danger text-[10px] px-2 py-0.5 rounded font-mono uppercase tracking-wide">Critical</span>
                  )}
                  {review.priority === 'high' && (
                    <span className="bg-warning/10 text-warning text-[10px] px-2 py-0.5 rounded font-mono uppercase tracking-wide">High</span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  Project: <span className="text-foreground">{review.project}</span> <span className="mx-2 text-border">•</span> {review.time}
                </div>
                
                {review.issues.length > 0 ? (
                  <div className="flex items-center space-x-2 text-sm text-warning font-medium">
                    <AlertTriangle size={14} />
                    <span>{review.issues.join(", ")}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-sm text-success font-medium">
                    <CheckCircle size={14} />
                    <span>No issues found</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 md:mt-0 flex flex-col md:items-end justify-center border-t border-border/50 md:border-t-0 md:border-l md:border-border/50 pt-4 md:pt-0 md:pl-8">
              <div className="flex items-center space-x-2 mb-2">
                <ShieldCheck size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Confidence: <span className="font-mono">{review.confidence}%</span></span>
              </div>
              <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wide mb-4">
                Rec: <span className="text-foreground">{review.recommendation}</span>
              </div>
              <button 
                className="bg-panel border border-border/80 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary text-foreground px-4 py-1.5 rounded-md text-sm font-medium transition-colors w-full md:w-auto text-center shadow-sm"
              >
                Open Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
