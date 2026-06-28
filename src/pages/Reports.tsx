import { useEffect, useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Download,
  PieChart,
  Activity,
  MoreHorizontal,
  Loader2,
} from 'lucide-react';
import { api } from '@/lib/api';
import type { AnalyticsInsights } from '@/types/api';

function formatAed(value: number): string {
  if (value >= 1_000_000) return `AED ${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `AED ${(value / 1_000).toFixed(0)}K`;
  return `AED ${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

function formatChartDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function Reports() {
  const [timeRange, setTimeRange] = useState('30d');
  const [data, setData] = useState<AnalyticsInsights | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api<AnalyticsInsights>(`/api/analytics/insights?range=${timeRange}`)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [timeRange]);

  const chartPoints = data?.volumeOverTime ?? [];
  const maxCount = data?.maxVolume ?? 1;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="pt-8 px-10 pb-6 shrink-0 border-b border-[#2A3442]/50 bg-[#0B0F14] z-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-1">Analytics & Insights</h1>
          <p className="text-muted-foreground text-[15px]">Monitor AI performance, processing volumes, and automation rates.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-panel border border-border rounded-lg p-1">
            <button onClick={() => setTimeRange('7d')} className={`px-3 py-1 text-sm rounded-md transition-colors ${timeRange === '7d' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>7D</button>
            <button onClick={() => setTimeRange('30d')} className={`px-3 py-1 text-sm rounded-md transition-colors ${timeRange === '30d' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>30D</button>
            <button onClick={() => setTimeRange('90d')} className={`px-3 py-1 text-sm rounded-md transition-colors ${timeRange === '90d' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>90D</button>
          </div>
          <button className="px-4 py-2 bg-panel border border-border hover:bg-card text-foreground rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center">
            <Download size={16} className="mr-2" /> Export Report
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 bg-[#0B0F14]">
        {loading && (
          <div className="flex items-center justify-center py-24 text-muted-foreground gap-2">
            <Loader2 size={18} className="animate-spin" /> Loading analytics…
          </div>
        )}

        {!loading && data && (
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard
                title="Total Processed Value"
                value={formatAed(data.kpis.totalProcessedValue)}
                trend={`${data.kpis.timesheetsInRange} uploads`}
                trendUp={true}
                subtitle="in selected period"
              />
              <KPICard
                title="Straight-Through Rate"
                value={`${data.kpis.straightThroughRate.toFixed(1)}%`}
                trend="Auto-invoiced"
                trendUp={data.kpis.straightThroughRate >= 50}
                subtitle="Fully automated timesheets"
              />
              <KPICard
                title="Avg Processing Time"
                value={`${data.kpis.avgProcessingMinutes.toFixed(1)}m`}
                trend="Pipeline"
                trendUp={true}
                subtitle="From intake to ERP"
              />
              <KPICard
                title="Exceptions Flagged"
                value={String(data.kpis.exceptionsFlagged)}
                trend="Review queue"
                trendUp={false}
                subtitle="Required human review"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-card border border-border/60 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-semibold text-lg text-foreground flex items-center">
                    <Activity className="mr-2 text-primary" size={20} /> Processing Volume over Time
                  </h3>
                  <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal size={18} /></button>
                </div>

                {chartPoints.length === 0 ? (
                  <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
                    No timesheet uploads in this period yet.
                  </div>
                ) : (
                  <>
                    <div className="h-64 flex items-end gap-1 px-2">
                      {chartPoints.map((point) => {
                        const pct = Math.max(4, (point.count / maxCount) * 100);
                        return (
                          <div
                            key={point.date}
                            className="flex-1 flex flex-col justify-end h-full min-w-0 group"
                            title={`${formatChartDate(point.date)}: ${point.count} uploads`}
                          >
                            <div
                              className="w-full bg-primary rounded-t-md opacity-90 hover:opacity-100 transition-opacity"
                              style={{ height: `${pct}%` }}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between mt-4 text-xs font-mono text-muted-foreground uppercase tracking-widest px-2">
                      <span>{formatChartDate(chartPoints[0].date)}</span>
                      {chartPoints.length > 2 && (
                        <span>{formatChartDate(chartPoints[Math.floor(chartPoints.length / 2)].date)}</span>
                      )}
                      <span>{formatChartDate(chartPoints[chartPoints.length - 1].date)}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="bg-card border border-border/60 rounded-xl p-6 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-semibold text-lg text-foreground flex items-center">
                    <PieChart className="mr-2 text-success" size={20} /> Extraction Confidence
                  </h3>
                </div>

                <div className="flex-1 flex flex-col justify-center space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-foreground">High Confidence ({'>'}95%)</span>
                      <span className="text-muted-foreground">{data.confidenceBreakdown.high}%</span>
                    </div>
                    <div className="w-full bg-panel rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: `${data.confidenceBreakdown.high}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-foreground">Medium Confidence (80-95%)</span>
                      <span className="text-muted-foreground">{data.confidenceBreakdown.medium}%</span>
                    </div>
                    <div className="w-full bg-panel rounded-full h-2">
                      <div className="bg-warning h-2 rounded-full" style={{ width: `${data.confidenceBreakdown.medium}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-foreground">Low Confidence ({'<'}80%)</span>
                      <span className="text-muted-foreground">{data.confidenceBreakdown.low}%</span>
                    </div>
                    <div className="w-full bg-panel rounded-full h-2">
                      <div className="bg-danger h-2 rounded-full" style={{ width: `${data.confidenceBreakdown.low}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-border/50 bg-panel/30 flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Top Exception Categories</h3>
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-panel border-b border-border/50 text-xs font-mono text-muted-foreground uppercase">
                    <tr>
                      <th className="px-6 py-3 text-left font-medium">Rule Violated</th>
                      <th className="px-6 py-3 text-right font-medium">Occurrences</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {data.topExceptions.length ? (
                      data.topExceptions.map((row) => (
                        <tr key={row.rule} className="hover:bg-panel/50">
                          <td className="px-6 py-3 font-medium text-foreground capitalize">{row.rule}</td>
                          <td className="px-6 py-3 text-right font-mono text-muted-foreground">{row.count}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="px-6 py-8 text-center text-muted-foreground">
                          No exceptions recorded yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-border/50 bg-panel/30 flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Top Clients by Volume</h3>
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-panel border-b border-border/50 text-xs font-mono text-muted-foreground uppercase">
                    <tr>
                      <th className="px-6 py-3 text-left font-medium">Client Name</th>
                      <th className="px-6 py-3 text-right font-medium">Total Billed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {data.topClients.length ? (
                      data.topClients.map((row) => (
                        <tr key={row.clientCode} className="hover:bg-panel/50">
                          <td className="px-6 py-3 font-medium text-foreground">{row.name}</td>
                          <td className="px-6 py-3 text-right font-mono font-medium text-success">
                            {formatAed(row.total)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="px-6 py-8 text-center text-muted-foreground">
                          No invoice data in this period yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function KPICard({
  title,
  value,
  trend,
  trendUp,
  subtitle,
}: {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  subtitle: string;
}) {
  return (
    <div className="bg-card border border-border/60 rounded-xl p-6 shadow-sm">
      <div className="text-sm font-medium text-muted-foreground mb-4">{title}</div>
      <div className="flex items-baseline space-x-3 mb-2">
        <div className="text-3xl font-semibold text-foreground tracking-tight">{value}</div>
        <div className={`flex items-center text-sm font-medium ${trendUp ? 'text-success' : 'text-danger'}`}>
          {trendUp ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
          {trend}
        </div>
      </div>
      <div className="text-xs text-muted-foreground">{subtitle}</div>
    </div>
  );
}
