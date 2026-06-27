import { useEffect, useState } from 'react';
import { Activity, AlertTriangle, ArrowRight, CheckCircle2, Clock, FileText, Zap } from 'lucide-react';
import { api } from '@/lib/api';
import type { DashboardData } from '@/types/api';
import { formatStatus } from '@/lib/status';

export function FinOpsDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    api<DashboardData>('/api/analytics/dashboard').then(setData).catch(console.error);
    const t = setInterval(() => api<DashboardData>('/api/analytics/dashboard').then(setData).catch(() => {}), 8000);
    return () => clearInterval(t);
  }, []);

  const kpis = data?.kpis;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="pt-8 px-10 pb-6 shrink-0 border-b border-[#2A3442]/50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-1">FinOps Dashboard</h1>
            <p className="text-muted-foreground text-[15px]">Real-time visibility into your automated invoice processing pipeline.</p>
          </div>
          <div className="flex items-center space-x-3 bg-success/10 border border-success/20 px-4 py-2 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-medium text-success uppercase tracking-widest">System Operational</span>
          </div>
        </div>
      </div>

      <div className="p-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Kpi icon={Zap} label="Processing Today" value={kpis?.todayUploads ?? '—'} sub="Uploads today" />
          <Kpi icon={Clock} label="In Pipeline" value={kpis?.processing ?? '—'} sub="Currently processing" />
          <Kpi icon={AlertTriangle} label="Human Review" value={kpis?.exceptions ?? '—'} sub="Exceptions / review" danger />
          <Kpi icon={CheckCircle2} label="AI Confidence" value={kpis ? `${kpis.averageConfidence}%` : '—'} sub="Average confidence" />
          <Kpi icon={FileText} label="Completed" value={kpis?.completed ?? '—'} sub="Invoices generated" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                    <th className="px-6 py-4 font-medium">Entity</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {data?.recentActivity?.length ? data.recentActivity.map((row) => (
                    <tr key={row.id} className="hover:bg-panel/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-muted-foreground text-xs">
                        {new Date(row.createdAt).toLocaleTimeString()}
                      </td>
                      <td className="px-6 py-4 text-foreground font-medium">{row.action.replace(/_/g, ' ')}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.entity} {row.entityId.slice(0, 8)}…</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded border border-primary/20">Logged</span>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">Upload a timesheet as client to see activity</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-lg font-medium tracking-tight text-foreground flex items-center">
              <Zap size={18} className="mr-2 text-primary" />
              Pipeline Summary
            </h2>
            <div className="bg-panel border border-border/60 rounded-xl p-6 shadow-sm space-y-4 text-sm">
              <Row label="Total timesheets" value={kpis?.submittedTimesheets} />
              <Row label="Pending processing" value={kpis?.pendingProcessing} />
              <Row label="Invoices generated" value={kpis?.invoicesGenerated} />
              <Row label="Revenue (AED)" value={kpis ? kpis.revenue.toLocaleString() : '—'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Kpi({ icon: Icon, label, value, sub, danger }: { icon: typeof Zap; label: string; value: string | number; sub: string; danger?: boolean }) {
  return (
    <div className={`bg-card border rounded-xl p-5 shadow-sm relative overflow-hidden ${danger ? 'border-l-2 border-l-danger' : 'border-border/60'}`}>
      <div className="flex items-center space-x-3 mb-4">
        <Icon size={18} className={danger ? 'text-danger' : 'text-primary'} />
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{label}</span>
      </div>
      <div className="text-2xl font-semibold text-foreground mb-1">{value}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string | number }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value ?? '—'}</span>
    </div>
  );
}
