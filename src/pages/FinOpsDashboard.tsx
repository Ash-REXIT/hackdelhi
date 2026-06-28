import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  FileText,
  Loader2,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { api } from '@/lib/api';
import type { DashboardData } from '@/types/api';

function formatAed(value: number): string {
  if (value >= 1_000_000) return `AED ${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `AED ${(value / 1_000).toFixed(1)}K`;
  return `AED ${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

function actionTone(action: string): string {
  if (/FAILED|REJECT|EXCEPTION/i.test(action)) return 'bg-danger/10 text-danger border-danger/20';
  if (/APPROVED|GENERATED|DISPATCHED|COMPLETED/i.test(action)) return 'bg-success/10 text-success border-success/20';
  if (/REVIEW|OVERTIME|PENDING/i.test(action)) return 'bg-warning/10 text-warning border-warning/20';
  return 'bg-primary/10 text-primary border-primary/20';
}

export function FinOpsDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = () =>
      api<DashboardData>('/api/analytics/dashboard')
        .then(setData)
        .catch(console.error)
        .finally(() => setLoading(false));
    load();
    const t = setInterval(load, 8000);
    return () => clearInterval(t);
  }, []);

  const kpis = data?.kpis;
  const straightThrough =
    kpis && kpis.submittedTimesheets > 0
      ? Math.round((kpis.completed / kpis.submittedTimesheets) * 100)
      : 0;

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#0B0F14]">
      <div className="relative shrink-0 border-b border-[#2A3442]/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-success/5 pointer-events-none" />
        <div className="relative pt-8 px-10 pb-7 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-widest mb-3">
              <Sparkles size={12} /> FinOps Control Center
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">FinOps Dashboard</h1>
            <p className="text-muted-foreground text-[15px] max-w-xl">
              Real-time visibility into automated timesheet intake, validation, fraud checks, and invoice generation.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-success/10 border border-success/20 px-4 py-2 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-medium text-success uppercase tracking-widest">Live</span>
            </div>
            <Link
              to="/workspace/review"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-sm font-medium transition-colors"
            >
              Review Queue
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <div className="p-10 space-y-8">
        {loading && !data && (
          <div className="flex items-center justify-center py-20 text-muted-foreground gap-2">
            <Loader2 size={18} className="animate-spin" /> Loading dashboard…
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          <KpiCard
            icon={Zap}
            label="Processing Today"
            value={kpis?.todayUploads ?? '—'}
            sub="Uploads today"
            accent="primary"
          />
          <KpiCard
            icon={Clock}
            label="In Pipeline"
            value={kpis?.processing ?? '—'}
            sub="OCR → fraud check"
            accent="blue"
          />
          <KpiCard
            icon={AlertTriangle}
            label="Human Review"
            value={kpis?.exceptions ?? '—'}
            sub="Needs FinOps action"
            accent="danger"
            highlight={!!kpis && kpis.exceptions > 0}
          />
          <KpiCard
            icon={CheckCircle2}
            label="AI Confidence"
            value={kpis ? `${Math.round(kpis.averageConfidence)}%` : '—'}
            sub="Average extraction"
            accent="success"
          />
          <KpiCard
            icon={FileText}
            label="Completed"
            value={kpis?.completed ?? '—'}
            sub="Invoices generated"
            accent="success"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-gradient-to-br from-card to-panel border border-border/60 rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-1">Pipeline health</h3>
                <p className="text-2xl font-semibold text-foreground">{straightThrough}% straight-through</p>
              </div>
              <TrendingUp className="text-success" size={22} />
            </div>
            <div className="h-2 bg-panel rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-primary to-success rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, straightThrough)}%` }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground text-xs mb-1">Total timesheets</div>
                <div className="font-semibold text-lg">{kpis?.submittedTimesheets ?? '—'}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs mb-1">Pending queue</div>
                <div className="font-semibold text-lg text-warning">{kpis?.pendingProcessing ?? '—'}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs mb-1">Invoices</div>
                <div className="font-semibold text-lg">{kpis?.invoicesGenerated ?? '—'}</div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-2">Revenue processed</h3>
              <p className="text-3xl font-semibold text-foreground tracking-tight">
                {kpis ? formatAed(kpis.revenue) : '—'}
              </p>
              <p className="text-xs text-muted-foreground mt-2">All non-cancelled invoices</p>
            </div>
            <Link
              to="/workspace/dispatch"
              className="mt-6 text-sm text-primary hover:underline inline-flex items-center gap-1"
            >
              Open Dispatch Center <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-medium tracking-tight text-foreground flex items-center">
              <Activity size={18} className="mr-2 text-primary" />
              Live Processing Timeline
            </h2>
            <div className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-panel/80 border-b border-border/50 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4 font-medium">Time</th>
                    <th className="px-6 py-4 font-medium">Event</th>
                    <th className="px-6 py-4 font-medium">User</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {data?.recentActivity?.length ? (
                    data.recentActivity.slice(0, 8).map((row) => (
                      <tr key={row.id} className="hover:bg-panel/40 transition-colors">
                        <td className="px-6 py-4 font-mono text-muted-foreground text-xs whitespace-nowrap">
                          {new Date(row.createdAt).toLocaleString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td className="px-6 py-4 text-foreground font-medium capitalize">
                          {row.action.replace(/_/g, ' ').toLowerCase()}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground text-xs">
                          {row.user?.name || row.user?.email || 'System'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-md border ${actionTone(row.action)}`}>
                            {/FAILED|REJECT/i.test(row.action) ? 'Alert' : 'Logged'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                        Upload a timesheet as client to see live activity
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium tracking-tight text-foreground flex items-center">
              <Zap size={18} className="mr-2 text-primary" />
              Quick links
            </h2>
            <div className="space-y-3">
              <QuickLink to="/workspace/inbox" label="Timesheet Inbox" desc="All uploaded documents" />
              <QuickLink to="/workspace/review" label="Review Queue" desc="Exceptions & fraud flags" />
              <QuickLink to="/workspace/validation" label="Validation Center" desc="Rule failures" />
              <QuickLink to="/workspace/analytics" label="Analytics" desc="Volume & confidence" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
  highlight,
}: {
  icon: typeof Zap;
  label: string;
  value: string | number;
  sub: string;
  accent: 'primary' | 'blue' | 'success' | 'danger';
  highlight?: boolean;
}) {
  const colors = {
    primary: 'from-primary/20 to-primary/5 text-primary border-primary/20',
    blue: 'from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/20',
    success: 'from-success/20 to-success/5 text-success border-success/20',
    danger: 'from-danger/20 to-danger/5 text-danger border-danger/20',
  }[accent];

  return (
    <div
      className={`bg-card border rounded-2xl p-5 shadow-sm relative overflow-hidden transition-transform hover:-translate-y-0.5 ${
        highlight ? 'border-danger/40 ring-1 ring-danger/20' : 'border-border/60'
      }`}
    >
      <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${colors} opacity-60 blur-2xl`} />
      <div className="relative">
        <div className={`inline-flex p-2 rounded-xl border mb-4 ${colors}`}>
          <Icon size={18} />
        </div>
        <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">{label}</div>
        <div className="text-3xl font-semibold text-foreground mb-1 tabular-nums">{value}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
    </div>
  );
}

function QuickLink({ to, label, desc }: { to: string; label: string; desc: string }) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between p-4 bg-panel/50 border border-border/50 rounded-xl hover:border-primary/40 hover:bg-panel transition-colors group"
    >
      <div>
        <div className="font-medium text-sm text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
    </Link>
  );
}
