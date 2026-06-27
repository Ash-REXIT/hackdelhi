import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  Clock,
  Sparkles
} from 'lucide-react';

export function Workspace() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-background p-12 overflow-y-auto">
      <div className="flex flex-col max-w-5xl mx-auto w-full justify-center h-full space-y-16 pb-20 mt-12">
        
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 text-primary text-sm font-medium">
            <Sparkles size={16} />
            <span>AI Operations Online</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-foreground leading-snug">
            Good morning. <br />
            <span className="text-muted-foreground font-normal">The AI processed 142 invoices overnight.</span>
          </h1>
        </div>

        {/* Actionable Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="bg-card border border-border/60 shadow-sm p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
            <div className="flex items-center space-x-3 mb-8 relative z-10">
              <div className="text-warning">
                <AlertCircle size={22} strokeWidth={2} />
              </div>
              <span className="text-muted-foreground text-sm font-medium">Attention Required</span>
            </div>
            <div className="relative z-10">
              <div className="text-4xl font-semibold tracking-tight text-foreground mb-2">7</div>
              <div className="text-sm text-muted-foreground">Documents pending manual review</div>
            </div>
          </div>

          <div className="bg-card border border-border/60 shadow-sm p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
            <div className="flex items-center space-x-3 mb-8 relative z-10">
              <div className="text-success">
                <CheckCircle2 size={22} strokeWidth={2} />
              </div>
              <span className="text-muted-foreground text-sm font-medium">Completed Overnight</span>
            </div>
            <div className="relative z-10">
              <div className="text-4xl font-semibold tracking-tight text-foreground mb-2">142</div>
              <div className="text-sm text-muted-foreground">Invoices extracted and validated</div>
            </div>
          </div>

          <div className="bg-card border border-border/60 shadow-sm p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
            <div className="flex items-center space-x-3 mb-8 relative z-10">
              <div className="text-primary">
                <Clock size={22} strokeWidth={2} />
              </div>
              <span className="text-muted-foreground text-sm font-medium">Est. Review Time</span>
            </div>
            <div className="relative z-10">
              <div className="text-4xl font-semibold tracking-tight text-foreground mb-2 flex items-baseline">12<span className="text-2xl text-muted-foreground ml-1 font-normal">m</span></div>
              <div className="text-sm text-muted-foreground">Based on historical velocity</div>
            </div>
          </div>
        </div>

        {/* Primary Action */}
        <div className="flex justify-start pt-4">
          <button 
            onClick={() => navigate('/workspace/review')}
            className="group relative bg-panel border border-border/80 hover:bg-card hover:border-primary/50 text-foreground px-6 py-3 rounded-lg flex items-center space-x-3 text-sm font-medium transition-all shadow-sm"
          >
            <div className="p-1 bg-primary/10 text-primary rounded-md">
              <Play size={16} fill="currentColor" />
            </div>
            <span>Continue AI Review</span>
          </button>
        </div>

      </div>
    </div>
  );
}
