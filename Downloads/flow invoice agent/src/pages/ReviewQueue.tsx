import { useNavigate } from 'react-router-dom';
import { 
  GitPullRequest, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle,
  Clock,
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
    <div className="flex flex-col h-full bg-background p-8 overflow-y-auto">
      <div className="flex justify-between items-end border-b border-border pb-6 mb-8 mt-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-1">Review Queue</h1>
          <p className="text-muted-foreground text-sm font-mono uppercase tracking-wider">7 Documents Need Attention</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
          <input 
            type="text" 
            placeholder="Search by client or ID..." 
            className="w-full bg-panel border border-border rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-ai-accent transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col space-y-4 max-w-5xl mx-auto w-full">
        {reviews.map((review) => (
          <div 
            key={review.id} 
            onClick={() => navigate(`/review/${review.id}`)}
            className="bg-panel border border-border rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between hover:border-primary/50 cursor-pointer transition-all group"
          >
            <div className="flex items-start space-x-4">
              <div className="mt-1 text-muted-foreground group-hover:text-primary transition-colors">
                <GitPullRequest size={20} />
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <span className="font-semibold text-foreground text-lg">{review.client}</span>
                  <span className="text-muted-foreground font-mono text-sm">{review.id}</span>
                  {review.priority === 'critical' && (
                    <span className="bg-danger/10 text-danger text-xs px-2 py-0.5 rounded font-mono uppercase tracking-wide">Critical</span>
                  )}
                  {review.priority === 'high' && (
                    <span className="bg-warning/10 text-warning text-xs px-2 py-0.5 rounded font-mono uppercase tracking-wide">High</span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  Project: <span className="text-foreground">{review.project}</span> • Created {review.time}
                </div>
                
                {review.issues.length > 0 ? (
                  <div className="flex items-center space-x-2 text-sm text-warning">
                    <AlertTriangle size={14} />
                    <span>{review.issues.join(", ")}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-sm text-success">
                    <CheckCircle size={14} />
                    <span>No issues found</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex flex-col md:items-end justify-center border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
              <div className="flex items-center space-x-2 mb-2">
                <ShieldCheck size={16} className="text-ai-accent" />
                <span className="text-sm font-medium">Confidence: {review.confidence}%</span>
              </div>
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wide mb-3">
                Rec: <span className="text-foreground">{review.recommendation}</span>
              </div>
              <button 
                className="bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground px-4 py-1.5 rounded text-sm font-medium transition-colors w-full md:w-auto text-center"
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
