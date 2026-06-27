import { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  FileText,
  Search,
  Filter,
  ArrowRight
} from 'lucide-react';

export function ValidationCenter() {
  const [exceptions, setExceptions] = useState([
    {
      id: 'VAL-1092',
      invoice: 'INV-2023-10-A',
      client: 'Infosys',
      rule: 'Maximum Hours Exceeded',
      confidence: 99,
      evidence: 'Timesheet logs 45 hours. Contract max is 40 hours per week.',
      resolution: 'Reject line item or obtain manual client override.',
      status: 'pending'
    },
    {
      id: 'VAL-1091',
      invoice: 'INV-2023-10-B',
      client: 'TCS',
      rule: 'Duplicate Invoice Detected',
      confidence: 85,
      evidence: 'Invoice INV-2023-10-B amounts and dates match previously paid INV-2023-09-B.',
      resolution: 'Reject entirely as duplicate.',
      status: 'pending'
    },
    {
      id: 'VAL-1090',
      invoice: 'INV-2023-10-C',
      client: 'Wipro',
      rule: 'Missing Manager Signature',
      confidence: 95,
      evidence: 'Signature block on page 2 is blank. AI OCR found no ink marks.',
      resolution: 'Route back to contractor for signature.',
      status: 'pending'
    }
  ]);

  const handleAction = (id: string, action: 'approve' | 'reject' | 'override') => {
    setExceptions(prev => prev.map(ex => 
      ex.id === id ? { ...ex, status: action } : ex
    ));
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header Area */}
      <div className="pt-8 px-10 pb-6 shrink-0 border-b border-[#2A3442]/50 bg-[#0B0F14] z-10">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-1">Validation Center</h1>
            <p className="text-muted-foreground text-[15px]">Review and resolve business rule exceptions flagged by the AI.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
              <input 
                type="text" 
                placeholder="Search exceptions..." 
                className="w-full bg-panel border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors shadow-sm"
              />
            </div>
            <button className="px-4 py-2 bg-panel border border-border hover:bg-card rounded-lg flex items-center text-sm font-medium text-foreground transition-colors shadow-sm">
              <Filter size={16} className="mr-2" /> Filter
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-10 bg-[#0B0F14]">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {exceptions.map((ex) => (
            <div 
              key={ex.id}
              className={`bg-card border rounded-xl overflow-hidden shadow-sm transition-all ${
                ex.status === 'pending' ? 'border-warning/50' :
                ex.status === 'approve' ? 'border-success/50 bg-success/5' :
                ex.status === 'reject' ? 'border-danger/50 bg-danger/5' :
                'border-primary/50 bg-primary/5'
              }`}
            >
              <div className={`p-5 border-b ${
                ex.status === 'pending' ? 'bg-warning/5 border-warning/20' :
                ex.status === 'approve' ? 'border-success/20' :
                ex.status === 'reject' ? 'border-danger/20' :
                'border-primary/20'
              }`}>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    {ex.status === 'pending' ? <ShieldAlert className="text-warning" size={20} /> :
                     ex.status === 'approve' ? <CheckCircle className="text-success" size={20} /> :
                     ex.status === 'reject' ? <XCircle className="text-danger" size={20} /> :
                     <CheckCircle className="text-primary" size={20} />
                    }
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">{ex.rule}</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                        <span className="font-medium text-foreground">{ex.client}</span>
                        <span>•</span>
                        <span className="font-mono">{ex.invoice}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground mb-1">AI Confidence</span>
                    <span className="font-mono font-medium text-foreground">{ex.confidence}%</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-2 flex items-center">
                    <FileText size={12} className="mr-1.5" /> AI Evidence
                  </h4>
                  <p className="text-sm text-foreground leading-relaxed bg-panel p-3 rounded-lg border border-border/50">
                    {ex.evidence}
                  </p>
                </div>

                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-2 flex items-center">
                    <AlertTriangle size={12} className="mr-1.5" /> Suggested Resolution
                  </h4>
                  <p className="text-sm font-medium text-foreground flex items-center">
                    <ArrowRight size={14} className="text-primary mr-2" />
                    {ex.resolution}
                  </p>
                </div>

                {ex.status === 'pending' ? (
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <button 
                      onClick={() => handleAction(ex.id, 'approve')}
                      className="px-4 py-2.5 bg-success/10 text-success hover:bg-success/20 border border-success/20 rounded-lg text-sm font-medium transition-colors"
                    >
                      Accept AI Rec
                    </button>
                    <button 
                      onClick={() => handleAction(ex.id, 'reject')}
                      className="px-4 py-2.5 bg-danger/10 text-danger hover:bg-danger/20 border border-danger/20 rounded-lg text-sm font-medium transition-colors"
                    >
                      Reject Invoice
                    </button>
                    <button 
                      onClick={() => handleAction(ex.id, 'override')}
                      className="px-4 py-2.5 bg-panel border border-border hover:bg-primary/10 hover:text-primary hover:border-primary/30 text-foreground rounded-lg text-sm font-medium transition-colors"
                    >
                      Force Override
                    </button>
                  </div>
                ) : (
                  <div className="pt-2 flex justify-between items-center border-t border-border/50 pt-4 mt-4">
                    <span className={`text-sm font-medium ${
                      ex.status === 'approve' ? 'text-success' :
                      ex.status === 'reject' ? 'text-danger' :
                      'text-primary'
                    }`}>
                      Exception Resolved: {ex.status.charAt(0).toUpperCase() + ex.status.slice(1)}
                    </span>
                    <button 
                      onClick={() => handleAction(ex.id, 'pending')}
                      className="text-xs text-muted-foreground hover:text-foreground underline"
                    >
                      Undo Action
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
