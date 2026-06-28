import { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Circle,
  RotateCw,
  RefreshCcw,
  Terminal,
  Server,
  Play,
  Search,
  MoreHorizontal,
  Loader2,
  Wifi,
  WifiOff,
  AlertTriangle,
} from 'lucide-react';
import { api } from '@/lib/api';
import type { ErpClientStatus, ErpPipeline, ErpQueueData } from '@/types/api';

export function ERPQueue() {
  const [data, setData] = useState<ErpQueueData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pipelines, setPipelines] = useState<ErpPipeline[]>([]);

  useEffect(() => {
    api<ErpQueueData>('/api/erp/queue')
      .then((res) => {
        setData(res);
        setPipelines(res.pipelines);
        setError('');
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load ERP queue'))
      .finally(() => setLoading(false));
  }, []);

  const handleRetry = (id: string) => {
    setPipelines((prev) =>
      prev.map((pl) => {
        if (pl.id !== id) return pl;
        const stages = [...pl.stages];
        stages[4] = { name: 'ERP Upload', status: 'processing', time: '...' };
        return { ...pl, status: 'processing', elapsed: '0s', stages };
      })
    );
  };

  const statusIcon = (status: ErpClientStatus['syncStatus']) => {
    if (status === 'connected') return <Wifi size={14} className="text-success" />;
    if (status === 'syncing') return <RotateCw size={14} className="text-primary animate-spin" />;
    if (status === 'error') return <AlertTriangle size={14} className="text-danger" />;
    return <WifiOff size={14} className="text-muted-foreground" />;
  };

  const statusLabel = (status: ErpClientStatus['syncStatus']) => {
    if (status === 'connected') return 'Synced';
    if (status === 'syncing') return 'Syncing';
    if (status === 'error') return 'Error';
    return 'Idle';
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="pt-8 px-10 pb-6 shrink-0 border-b border-[#2A3442]/50 bg-[#0B0F14] z-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-1">ERP Sync Pipeline</h1>
          <p className="text-muted-foreground text-[15px]">
            Monitor integration pipelines for Emirates Steel and other TASC clients.
          </p>
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

      <div className="flex-1 overflow-y-auto p-10 bg-[#0B0F14]">
        <div className="flex flex-col space-y-6 max-w-7xl mx-auto">
          {loading && (
            <div className="flex items-center justify-center py-16 text-muted-foreground gap-2">
              <Loader2 size={18} className="animate-spin" /> Loading ERP queue…
            </div>
          )}

          {error && !loading && (
            <div className="text-center py-12 text-danger bg-danger/5 border border-danger/20 rounded-xl">
              {error}
            </div>
          )}

          {!loading && !error && data && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {data.clientStatuses.map((client) => (
                <div
                  key={client.clientCode}
                  className="bg-card border border-border/60 rounded-xl p-4 shadow-sm flex items-start gap-3"
                >
                  <div
                    className={`p-2 rounded-lg border shrink-0 ${
                      client.syncStatus === 'connected'
                        ? 'bg-success/10 border-success/20'
                        : client.syncStatus === 'syncing'
                          ? 'bg-primary/10 border-primary/20'
                          : client.syncStatus === 'error'
                            ? 'bg-danger/10 border-danger/20'
                            : 'bg-panel border-border/50'
                    }`}
                  >
                    {statusIcon(client.syncStatus)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-foreground truncate">{client.name}</span>
                      <span className="text-[10px] font-mono text-muted-foreground bg-panel px-1.5 py-0.5 rounded border border-border/50">
                        {client.clientCode}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">{client.erpTarget}</div>
                    <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                      <span
                        className={`px-2 py-0.5 rounded border uppercase tracking-wider ${
                          client.syncStatus === 'connected'
                            ? 'bg-success/10 text-success border-success/20'
                            : client.syncStatus === 'syncing'
                              ? 'bg-primary/10 text-primary border-primary/20'
                              : client.syncStatus === 'error'
                                ? 'bg-danger/10 text-danger border-danger/20'
                                : 'bg-panel text-muted-foreground border-border/50'
                        }`}
                      >
                        {statusLabel(client.syncStatus)}
                      </span>
                      <span className="text-muted-foreground">{client.syncedCount} synced</span>
                      {client.pendingSync > 0 && (
                        <span className="text-warning">{client.pendingSync} pending</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && pipelines.length === 0 && data && (
            <div className="text-center py-12 text-muted-foreground bg-card border border-border/60 rounded-xl">
              No invoice pipelines yet. Upload timesheets or run <code className="font-mono text-xs">npm run seed:dispatch-demos</code> for demo invoices.
            </div>
          )}

          {!loading && !error && pipelines.map((pipeline) => (
            <div key={pipeline.id} className="bg-card border border-border/60 rounded-xl p-6 shadow-sm">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-8">
                <div className="flex items-center space-x-4 mb-4 xl:mb-0">
                  <div
                    className={`p-2.5 rounded-lg border ${
                      pipeline.status === 'completed'
                        ? 'bg-success/10 border-success/20 text-success'
                        : pipeline.status === 'processing'
                          ? 'bg-primary/10 border-primary/20 text-primary'
                          : pipeline.status === 'failed'
                            ? 'bg-danger/10 border-danger/20 text-danger'
                            : 'bg-panel border-border/50 text-muted-foreground'
                    }`}
                  >
                    <Server size={20} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="font-semibold text-foreground text-lg">{pipeline.client}</span>
                      <span className="text-muted-foreground font-mono text-xs bg-panel px-2 py-0.5 rounded border border-border/50">
                        {pipeline.invoice}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>
                        Target: <span className="font-medium text-foreground">{pipeline.target}</span>
                      </span>
                      <span>•</span>
                      <span>
                        Pipeline ID: <span className="font-mono">{pipeline.id}</span>
                      </span>
                      <span>•</span>
                      <span>
                        Elapsed: <span className="font-mono text-foreground">{pipeline.elapsed}</span>
                      </span>
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

              <div className="relative">
                <div className="absolute top-3.5 left-6 right-6 h-0.5 bg-border z-0" />
                <div className="relative z-10 flex justify-between">
                  {pipeline.stages.map((stage, index) => (
                    <div key={index} className="flex flex-col items-center w-1/5 group">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center mb-3 transition-colors ${
                          stage.status === 'done'
                            ? 'bg-success text-background ring-4 ring-success/20'
                            : stage.status === 'processing'
                              ? 'bg-primary text-background ring-4 ring-primary/20'
                              : stage.status === 'failed'
                                ? 'bg-danger text-background ring-4 ring-danger/20'
                                : 'bg-panel border-2 border-border text-muted-foreground'
                        }`}
                      >
                        {stage.status === 'done' ? (
                          <CheckCircle2 size={16} />
                        ) : stage.status === 'processing' ? (
                          <RotateCw size={14} className="animate-spin" />
                        ) : (
                          <Circle size={10} fill="currentColor" />
                        )}
                      </div>
                      <span
                        className={`text-xs font-medium mb-1 ${
                          stage.status === 'done'
                            ? 'text-foreground'
                            : stage.status === 'processing'
                              ? 'text-primary'
                              : stage.status === 'failed'
                                ? 'text-danger'
                                : 'text-muted-foreground'
                        }`}
                      >
                        {stage.name}
                      </span>
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
