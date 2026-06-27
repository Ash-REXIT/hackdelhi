import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Download,
  Filter,
  PieChart,
  Activity,
  ArrowUpRight,
  MoreHorizontal
} from 'lucide-react';

export function Reports() {
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
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
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Top KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard 
              title="Total Processed Value" 
              value="$4.2M" 
              trend="+12.5%" 
              trendUp={true} 
              subtitle="vs previous period" 
            />
            <KPICard 
              title="Straight-Through Rate" 
              value="84.2%" 
              trend="+4.1%" 
              trendUp={true} 
              subtitle="Fully automated invoices" 
            />
            <KPICard 
              title="Avg Processing Time" 
              value="1.2m" 
              trend="-32%" 
              trendUp={true} 
              subtitle="From intake to ERP" 
            />
            <KPICard 
              title="Exceptions Flagged" 
              value="342" 
              trend="+2.4%" 
              trendUp={false} 
              subtitle="Required human review" 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Chart 1 */}
            <div className="lg:col-span-2 bg-card border border-border/60 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-semibold text-lg text-foreground flex items-center">
                  <Activity className="mr-2 text-primary" size={20} /> Processing Volume over Time
                </h3>
                <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal size={18} /></button>
              </div>
              <div className="h-64 flex items-end justify-between space-x-2 px-2">
                {/* Mock Bar Chart */}
                {[45, 55, 40, 60, 75, 65, 80, 95, 85, 100, 90, 85].map((val, i) => (
                  <div key={i} className="w-full relative group">
                    <div 
                      className="absolute bottom-0 w-full bg-primary/20 hover:bg-primary/40 rounded-t-md transition-colors"
                      style={{ height: `${val}%` }}
                    >
                      <div className="absolute bottom-0 w-full bg-primary rounded-t-md opacity-80" style={{ height: `${val * 0.8}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs font-mono text-muted-foreground uppercase tracking-widest px-2">
                <span>Oct 01</span>
                <span>Oct 15</span>
                <span>Oct 30</span>
              </div>
            </div>

            {/* AI Confidence Breakdown */}
            <div className="bg-card border border-border/60 rounded-xl p-6 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-semibold text-lg text-foreground flex items-center">
                  <PieChart className="mr-2 text-success" size={20} /> Extraction Confidence
                </h3>
              </div>
              
              <div className="flex-1 flex flex-col justify-center space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-foreground">High Confidence (>95%)</span>
                    <span className="text-muted-foreground">82%</span>
                  </div>
                  <div className="w-full bg-panel rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-foreground">Medium Confidence (80-95%)</span>
                    <span className="text-muted-foreground">14%</span>
                  </div>
                  <div className="w-full bg-panel rounded-full h-2">
                    <div className="bg-warning h-2 rounded-full" style={{ width: '14%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-foreground">Low Confidence (<80%)</span>
                    <span className="text-muted-foreground">4%</span>
                  </div>
                  <div className="w-full bg-panel rounded-full h-2">
                    <div className="bg-danger h-2 rounded-full" style={{ width: '4%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-border/50 bg-panel/30 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Top Exception Categories</h3>
                <button className="text-sm text-primary hover:underline font-medium">View All</button>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-panel border-b border-border/50 text-xs font-mono text-muted-foreground uppercase">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium">Rule Violated</th>
                    <th className="px-6 py-3 text-right font-medium">Occurrences</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  <tr className="hover:bg-panel/50">
                    <td className="px-6 py-3 font-medium text-foreground">Missing Manager Signature</td>
                    <td className="px-6 py-3 text-right font-mono text-muted-foreground">142</td>
                  </tr>
                  <tr className="hover:bg-panel/50">
                    <td className="px-6 py-3 font-medium text-foreground">Maximum Weekly Hours Exceeded</td>
                    <td className="px-6 py-3 text-right font-mono text-muted-foreground">89</td>
                  </tr>
                  <tr className="hover:bg-panel/50">
                    <td className="px-6 py-3 font-medium text-foreground">Unrecognized Client Name</td>
                    <td className="px-6 py-3 text-right font-mono text-muted-foreground">45</td>
                  </tr>
                  <tr className="hover:bg-panel/50">
                    <td className="px-6 py-3 font-medium text-foreground">Weekend Billing Detected</td>
                    <td className="px-6 py-3 text-right font-mono text-muted-foreground">22</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-border/50 bg-panel/30 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Top Clients by Volume</h3>
                <button className="text-sm text-primary hover:underline font-medium">View All</button>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-panel border-b border-border/50 text-xs font-mono text-muted-foreground uppercase">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium">Client Name</th>
                    <th className="px-6 py-3 text-right font-medium">Total Billed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  <tr className="hover:bg-panel/50">
                    <td className="px-6 py-3 font-medium text-foreground">Infosys Ltd</td>
                    <td className="px-6 py-3 text-right font-mono font-medium text-success">$1,450,200</td>
                  </tr>
                  <tr className="hover:bg-panel/50">
                    <td className="px-6 py-3 font-medium text-foreground">TCS</td>
                    <td className="px-6 py-3 text-right font-mono font-medium text-success">$985,000</td>
                  </tr>
                  <tr className="hover:bg-panel/50">
                    <td className="px-6 py-3 font-medium text-foreground">Wipro</td>
                    <td className="px-6 py-3 text-right font-mono font-medium text-success">$420,500</td>
                  </tr>
                  <tr className="hover:bg-panel/50">
                    <td className="px-6 py-3 font-medium text-foreground">Accenture</td>
                    <td className="px-6 py-3 text-right font-mono font-medium text-success">$210,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, trend, trendUp, subtitle }: any) {
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
