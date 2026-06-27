import { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  RotateCw,
  RefreshCcw,
  Terminal,
  Server,
  Play,
  Search,
  MoreHorizontal
} from 'lucide-react';

export function ERPQueue() {
  const [pipelines, setPipelines] = useState([
    {
      id: 'PL-8891',
      invoice: 'INV-2023-10-A',
      client: 'Infosys',
      target: 'SAP S/4HANA',
      status: 'completed',
      elapsed: '14s',
      stages: [
        { name: 'Received', status: 'done', time: '0.1s' },
        { name: 'Extracted', status: 'done', time: '2.4s' },
        { name: 'Validated', status: 'done', time: '1.2s' },
        { name: 'Generated', status: 'done', time: '0.8s' },
        { name: 'ERP Upload', status: 'done', time: '9.5s' }
      ]
    },
    {
      id: 'PL-8890',
      invoice: 'INV-2023-10-B',
      client: 'TCS',
      target: 'Oracle NetSuite',
      status: 'processing',
      elapsed: '45s',
      stages: [
        { name: 'Received', status: 'done', time: '0.2s' },
        { name: 'Extracted', status: 'done', time: '3.1s' },
        { name: 'Validated', status: 'done', time: '1.5s' },
        { name: 'Generated', status: 'done', time: '1.1s' },
        { name: 'ERP Upload', status: 'processing', time: '...' }
      ]
    },
    {
      id: 'PL-8889',
      invoice: 'INV-2023-10-C',
      client: 'Wipro',
      target: 'Workday Financials',
      status: 'failed',
      elapsed: '12s',
      stages: [
        { name: 'Received', status: 'done', time: '0.1s' },
        { name: 'Extracted', status: 'done', time: '2.2s' },
        { name: 'Validated', status: 'done', time: '1.0s' },
        { name: 'Generated', status: 'done', time: '0.9s' },
        { name: 'ERP Upload', status: 'failed', time: 'Failed: API Timeout' }
      ]
    }
  ]);

  const handleRetry = (id: string) => {
    setPipelines(prev => prev.map(pl => {
      if (pl.id === id) {
        const updatedStages = [...pl.stages];
        updatedStages[4] = { name: 'ERP Upload', status: 'processing', time: '...' };
        return { ...pl, status: 'processing', elapsed: '0s', stages: updatedStages };
      }
      return pl;
    }));
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="pt-8 px-10 pb-6 shrink-0 border-b border-[#2A3442]/50 bg-[#0B0F14] z-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-1">ERP Sync Pipeline</h1>
          <p className="text-muted-foreground text-[15px]">Monitor integration pipelines and synchronize with SAP, Oracle, and Workday.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative w-64 mr-2">
            <Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
            <input 
              type="text" 
              placeholder="Search pipelines..." 
              className="w-full bg-panel border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center">
            <Play size={16} className="mr-2" /> Run All Queued
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-10 bg-[#0B0F14]">
        <div className="flex flex-col space-y-6 max-w-7xl mx-auto">
          {pipelines.map(pipeline => (
            <div key={pipeline.id} className="bg-card border border-border/60 rounded-xl p-6 shadow-sm">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-8">
                <div className="flex items-center space-x-4 mb-4 xl:mb-0">
                  <div className={`p-2.5 rounded-lg border ${
                    pipeline.status === 'completed' ? 'bg-success/10 border-success/20 text-success' :
                    pipeline.status === 'processing' ? 'bg-primary/10 border-primary/20 text-primary' :
                    'bg-danger/10 border-danger/20 text-danger'
                  }`}>
                    <Server size={20} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="font-semibold text-foreground text-lg">{pipeline.client}</span>
                      <span className="text-muted-foreground font-mono text-xs bg-panel px-2 py-0.5 rounded border border-border/50">{pipeline.invoice}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>Target: <span className="font-medium text-foreground">{pipeline.target}</span></span>
                      <span>•</span>
                      <span>Pipeline ID: <span className="font-mono">{pipeline.id}</span></span>
                      <span>•</span>
                      <span>Elapsed: <span className="font-mono text-foreground">{pipeline.elapsed}</span></span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button className="px-3 py-1.5 bg-panel hover:bg-card border border-border rounded-md text-sm font-medium text-foreground transition-colors flex items-center">
                    <Terminal size={14} className="mr-2" /> View Logs
                  </button>
                  {pipeline.status === 'failed' && (
                    <button 
                      onClick={() => handleRetry(pipeline.id)}
                      className="px-3 py-1.5 bg-danger/10 hover:bg-danger/20 border border-danger/20 text-danger rounded-md text-sm font-medium transition-colors flex items-center"
                    >
                      <RefreshCcw size={14} className="mr-2" /> Retry Sync
                    </button>
                  )}
                  <button className="p-1.5 text-muted-foreground hover:text-foreground rounded-md transition-colors">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
              </div>

              {/* Pipeline Visualizer */}
              <div className="relative">
                <div className="absolute top-3.5 left-6 right-6 h-0.5 bg-border z-0"></div>
                <div className="relative z-10 flex justify-between">
                  {pipeline.stages.map((stage, index) => (
                    <div key={index} className="flex flex-col items-center w-1/5 group">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center mb-3 transition-colors ${
                        stage.status === 'done' ? 'bg-success text-background ring-4 ring-success/20' :
                        stage.status === 'processing' ? 'bg-primary text-background ring-4 ring-primary/20' :
                        stage.status === 'failed' ? 'bg-danger text-background ring-4 ring-danger/20' :
                        'bg-panel border-2 border-border text-muted-foreground'
                      }`}>
                        {stage.status === 'done' ? <CheckCircle2 size={16} /> :
                         stage.status === 'processing' ? <RotateCw size={14} className="animate-spin" /> :
                         <Circle size={10} fill="currentColor" />}
                      </div>
                      <span className={`text-xs font-medium mb-1 ${
                        stage.status === 'done' ? 'text-foreground' :
                        stage.status === 'processing' ? 'text-primary' :
                        stage.status === 'failed' ? 'text-danger' :
                        'text-muted-foreground'
                      }`}>{stage.name}</span>
                      <span className="text-[10px] font-mono text-muted-foreground bg-panel px-1.5 py-0.5 rounded">
                        {stage.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
