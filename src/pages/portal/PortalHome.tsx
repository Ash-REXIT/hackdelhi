import { useEffect, useState } from 'react';
import {
  FileText,
  CheckCircle,
  Clock,
  DollarSign,
  UploadCloud,
  Download,
  MessageSquare,
  ArrowRight,
  Loader2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import type { DashboardData, Timesheet } from '@/types/api';

function formatAed(value: number): string {
  if (value >= 1_000_000) return `AED ${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `AED ${(value / 1_000).toFixed(0)}K`;
  return `AED ${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

export function PortalHome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const companyName = user?.client?.name || 'Emirates Steel Industries LLC';
  const clientCode = user?.client?.clientCode || 'CL001';

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [approvals, setApprovals] = useState<Timesheet[]>([]);
  const [recent, setRecent] = useState<Timesheet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api<DashboardData>('/api/analytics/dashboard'),
      api<Timesheet[]>('/api/timesheets?queue=client-approval'),
      api<Timesheet[]>('/api/timesheets'),
    ])
      .then(([dash, pending, all]) => {
        setDashboard(dash);
        setApprovals(pending);
        setRecent(all.slice(0, 5));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const kpis = dashboard?.kpis;
  const processing = (kpis?.processing ?? 0) + (kpis?.pendingProcessing ?? 0);
  const pendingApprovals = approvals.length;
  const generated = kpis?.invoicesGenerated ?? 0;
  const revenue = kpis?.revenue ?? 0;
  const cycleProgress =
    kpis && kpis.submittedTimesheets > 0
      ? Math.min(100, Math.round((kpis.completed / kpis.submittedTimesheets) * 100))
      : 0;

  return (
    <div className="p-8 md:p-12 w-full max-w-6xl mx-auto h-full overflow-y-auto">
      {/* Hero */}
      <div className="relative mb-10 rounded-2xl border border-[#2A3442]/60 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-[#1D2430] to-[#0B0F14]" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="relative p-8 md:p-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/25 text-primary text-xs font-mono uppercase tracking-widest">
              <Sparkles size={12} /> Client Portal
            </span>
            <span className="px-3 py-1 rounded-full bg-panel border border-border/50 text-muted-foreground text-xs font-mono">
              {clientCode}
            </span>
            <span className="px-3 py-1 rounded-full bg-panel border border-border/50 text-muted-foreground text-xs">
              June 2026 cycle
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-2">
            Welcome back, {companyName.split(' ')[0]}.
          </h1>
          <p className="text-muted-foreground text-[15px] max-w-2xl">
            Track timesheet processing, approve overtime exceptions, and download invoices for your billing cycle.
          </p>

          {!loading && pendingApprovals > 0 && (
            <button
              onClick={() => navigate('/portal/approvals')}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 bg-warning/15 border border-warning/30 text-warning rounded-xl text-sm font-medium hover:bg-warning/20 transition-colors"
            >
              <AlertCircle size={16} />
              {pendingApprovals} item{pendingApprovals !== 1 ? 's' : ''} awaiting your approval
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16 text-muted-foreground gap-2">
          <Loader2 size={18} className="animate-spin" /> Loading your dashboard…
        </div>
      )}

      {!loading && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
            <StatCard
              icon={Clock}
              label="Processing"
              value={processing}
              sub="Timesheets in pipeline"
              color="blue"
            />
            <StatCard
              icon={CheckCircle}
              label="Awaiting Approval"
              value={pendingApprovals}
              sub={pendingApprovals ? 'Action required' : 'All clear'}
              color="amber"
              pulse={pendingApprovals > 0}
            />
            <StatCard
              icon={FileText}
              label="Generated Invoices"
              value={generated}
              sub="Ready for download"
              color="green"
            />
            <StatCard
              icon={DollarSign}
              label="Total Billed"
              value={formatAed(revenue)}
              sub="Year to date"
              color="slate"
              isText
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 bg-[#151A21] border border-[#2A3442]/60 rounded-2xl p-6">
              <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">
                Billing cycle progress
              </h2>
              <div className="flex items-end justify-between mb-3">
                <span className="text-3xl font-semibold text-foreground">{cycleProgress}%</span>
                <span className="text-xs text-muted-foreground">
                  {kpis?.completed ?? 0} of {kpis?.submittedTimesheets ?? 0} timesheets invoiced
                </span>
              </div>
              <div className="h-2.5 bg-[#0B0F14] rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-primary via-blue-500 to-success rounded-full transition-all duration-700"
                  style={{ width: `${cycleProgress}%` }}
                />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-xl bg-[#0B0F14]/60 border border-[#2A3442]/40">
                  <div className="text-lg font-semibold text-foreground">{kpis?.todayUploads ?? 0}</div>
                  <div className="text-[11px] text-muted-foreground mt-1">Uploaded today</div>
                </div>
                <div className="p-3 rounded-xl bg-[#0B0F14]/60 border border-[#2A3442]/40">
                  <div className="text-lg font-semibold text-warning">{kpis?.exceptions ?? 0}</div>
                  <div className="text-[11px] text-muted-foreground mt-1">In review</div>
                </div>
                <div className="p-3 rounded-xl bg-[#0B0F14]/60 border border-[#2A3442]/40">
                  <div className="text-lg font-semibold text-success">{kpis?.approvedInvoices ?? 0}</div>
                  <div className="text-[11px] text-muted-foreground mt-1">Approved</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-medium tracking-tight mb-2">Quick Actions</h2>
              <ActionButton
                icon={UploadCloud}
                title="Upload Timesheet"
                desc="Submit new work"
                accent="primary"
                onClick={() => navigate('/portal/upload')}
              />
              <ActionButton
                icon={CheckCircle}
                title="Review Approvals"
                desc={`${pendingApprovals} pending`}
                accent="amber"
                onClick={() => navigate('/portal/approvals')}
                badge={pendingApprovals > 0 ? pendingApprovals : undefined}
              />
              <ActionButton
                icon={Download}
                title="Download Invoices"
                desc="Get latest PDFs"
                accent="neutral"
                onClick={() => navigate('/portal/invoices')}
              />
              <ActionButton
                icon={MessageSquare}
                title="Contact TASC"
                desc="Ask a question"
                accent="neutral"
                onClick={() => navigate('/portal/messages')}
              />
            </div>
          </div>

          <h2 className="text-lg font-medium tracking-tight mb-5">Recent Activity</h2>
          <div className="bg-[#151A21] border border-[#2A3442]/60 rounded-2xl p-6 md:p-8">
            {recent.length ? (
              <div className="relative pl-4 border-l border-[#2A3442] space-y-8">
                {recent.map((ts, i) => (
                  <TimelineItem
                    key={ts.id}
                    active={i === 0}
                    title={timelineTitle(ts)}
                    meta={`${new Date(ts.createdAt).toLocaleString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })} • ${ts.documents?.[0]?.fileName || 'Timesheet'}`}
                    status={ts.status}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm text-center py-8">
                No timesheets yet — upload your first file to get started.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function timelineTitle(ts: Timesheet): string {
  const name = ts.employee?.name || 'Employee';
  if (ts.status === 'INVOICE_GENERATED') return `Invoice generated for ${name}`;
  if (ts.status === 'PENDING_CLIENT_APPROVAL') return `Overtime approval needed — ${name}`;
  if (ts.status === 'PENDING_REVIEW') return `Under FinOps review — ${name}`;
  if (ts.status === 'EXCEPTION') return `Exception flagged — ${name}`;
  return `Timesheet uploaded — ${name}`;
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
  pulse,
  isText,
}: {
  icon: typeof Clock;
  label: string;
  value: string | number;
  sub: string;
  color: 'blue' | 'amber' | 'green' | 'slate';
  pulse?: boolean;
  isText?: boolean;
}) {
  const styles = {
    blue: { icon: 'text-blue-400', glow: 'from-blue-500/20', border: 'hover:border-blue-500/30' },
    amber: { icon: 'text-amber-400', glow: 'from-amber-500/20', border: 'hover:border-amber-500/30' },
    green: { icon: 'text-emerald-400', glow: 'from-emerald-500/20', border: 'hover:border-emerald-500/30' },
    slate: { icon: 'text-muted-foreground', glow: 'from-white/5', border: 'hover:border-border' },
  }[color];

  return (
    <div
      className={`relative bg-[#1D2430] border border-[#2A3442]/60 rounded-2xl p-6 shadow-sm overflow-hidden transition-all hover:-translate-y-0.5 ${styles.border} ${
        pulse ? 'ring-1 ring-amber-500/30' : ''
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${styles.glow} to-transparent opacity-80 pointer-events-none`} />
      <div className="relative">
        <div className="flex items-center gap-3 mb-5">
          <div className={`p-2 rounded-xl bg-[#0B0F14]/50 ${styles.icon}`}>
            <Icon size={20} strokeWidth={2} />
          </div>
          <span className="text-muted-foreground text-sm font-medium">{label}</span>
        </div>
        <div className={`${isText ? 'text-xl' : 'text-3xl'} font-semibold tracking-tight text-foreground mb-1 tabular-nums`}>
          {value}
        </div>
        <div className={`text-xs ${pulse ? 'text-amber-400' : 'text-muted-foreground'}`}>{sub}</div>
      </div>
    </div>
  );
}

function ActionButton({
  icon: Icon,
  title,
  desc,
  accent,
  onClick,
  badge,
}: {
  icon: typeof UploadCloud;
  title: string;
  desc: string;
  accent: 'primary' | 'amber' | 'neutral';
  onClick: () => void;
  badge?: number;
}) {
  const iconBg =
    accent === 'primary'
      ? 'bg-primary/15 text-primary'
      : accent === 'amber'
        ? 'bg-amber-500/15 text-amber-400'
        : 'bg-[#1D2430] text-muted-foreground border border-[#2A3442]/50';

  return (
    <button
      onClick={onClick}
      className="w-full bg-[#151A21] border border-[#2A3442] hover:bg-[#1D2430] hover:border-primary/30 text-left py-3.5 px-4 rounded-xl flex items-center gap-4 transition-all group"
    >
      <div className={`p-2.5 rounded-lg shrink-0 ${iconBg}`}>
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      {badge !== undefined && (
        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono">{badge}</span>
      )}
      <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
    </button>
  );
}

function TimelineItem({
  active,
  title,
  meta,
  status,
}: {
  active?: boolean;
  title: string;
  meta: string;
  status: string;
}) {
  const dotColor = active
    ? 'bg-primary ring-primary/30'
    : status.includes('INVOICE') || status.includes('APPROVED')
      ? 'bg-emerald-500 ring-emerald-500/20'
      : status.includes('PENDING') || status.includes('EXCEPTION')
        ? 'bg-amber-500 ring-amber-500/20'
        : 'bg-[#1D2430] border border-[#2A3442]';

  return (
    <div className="relative">
      <div className={`absolute -left-[21px] w-2.5 h-2.5 rounded-full ring-4 ring-[#151A21] ${dotColor}`} />
      <div className="text-sm font-medium text-foreground">{title}</div>
      <div className="text-xs text-muted-foreground mt-1 font-mono">{meta}</div>
    </div>
  );
}
