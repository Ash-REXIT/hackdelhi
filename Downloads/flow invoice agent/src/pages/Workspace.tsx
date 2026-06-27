import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Moon, 
  AlertTriangle, 
  Clock,
  Sparkles
} from 'lucide-react';

export function Workspace() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-background p-10 overflow-y-auto">
      <div className="flex flex-col max-w-4xl mx-auto w-full justify-center h-full space-y-16 pb-20">
        
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-ai-accent font-mono text-sm uppercase tracking-wider mb-4">
            <Sparkles size={16} />
            <span>AI Operations Online</span>
          </div>
          <h1 className="text-5xl font-semibold tracking-tight text-foreground leading-tight">
            Good morning. <br />
            <span className="text-muted-foreground">The AI processed 142 invoices overnight.</span>
          </h1>
        </div>

        {/* Actionable Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-panel border border-border p-6 rounded-xl flex flex-col justify-between">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-warning/10 rounded-md border border-warning/20 text-warning">
                <AlertTriangle size={20} />
              </div>
              <span className="text-muted-foreground text-sm font-medium uppercase tracking-wide font-mono">Attention Required</span>
            </div>
            <div>
              <div className="text-5xl font-bold font-mono tracking-tight text-foreground mb-2">7</div>
              <div className="text-sm text-muted-foreground">Documents pending manual review</div>
            </div>
          </div>

          <div className="bg-panel border border-border p-6 rounded-xl flex flex-col justify-between">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-ai-accent/10 rounded-md border border-ai-accent/20 text-ai-accent">
                <Moon size={20} />
              </div>
              <span className="text-muted-foreground text-sm font-medium uppercase tracking-wide font-mono">Completed Overnight</span>
            </div>
            <div>
              <div className="text-5xl font-bold font-mono tracking-tight text-foreground mb-2">142</div>
              <div className="text-sm text-muted-foreground">Invoices extracted and validated</div>
            </div>
          </div>

          <div className="bg-panel border border-border p-6 rounded-xl flex flex-col justify-between">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-md border border-primary/20 text-primary">
                <Clock size={20} />
              </div>
              <span className="text-muted-foreground text-sm font-medium uppercase tracking-wide font-mono">Est. Review Time</span>
            </div>
            <div>
              <div className="text-5xl font-bold font-mono tracking-tight text-foreground mb-2">12<span className="text-3xl text-muted-foreground ml-1">m</span></div>
              <div className="text-sm text-muted-foreground">Based on historical velocity</div>
            </div>
          </div>
        </div>

        {/* Primary Action */}
        <div className="flex justify-start">
          <button 
            onClick={() => navigate('/review')}
            className="group relative bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg flex items-center space-x-3 text-lg font-medium transition-all shadow-lg hover:shadow-primary/25 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none"></div>
            <Play size={24} fill="currentColor" className="relative z-10" />
            <span className="relative z-10">Continue AI Review</span>
          </button>
        </div>

      </div>
    </div>
  );
}
