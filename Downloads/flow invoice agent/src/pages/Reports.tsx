import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle,
  Zap
} from 'lucide-react';

const revenueData = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 5000 },
  { name: 'Thu', value: 8780 },
  { name: 'Fri', value: 6890 },
  { name: 'Sat', value: 2390 },
  { name: 'Sun', value: 3490 },
];

const exceptionData = [
  { name: 'Missing ID', count: 45 },
  { name: 'Overtime', count: 32 },
  { name: 'Illegible', count: 18 },
  { name: 'No Project', count: 12 },
];

export function Reports() {
  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <div className="h-16 border-b border-border/50 flex items-center justify-between px-10 bg-card shrink-0 shadow-sm relative z-10">
        <div>
          <h1 className="text-xl font-medium text-foreground tracking-tight">Executive Insights</h1>
          <p className="text-[11px] text-muted-foreground font-mono mt-1 uppercase tracking-widest">Last 7 Days</p>
        </div>
        <button className="bg-panel border border-border/80 hover:bg-card hover:border-primary/50 text-foreground px-5 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
          Export PDF
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-10 bg-background">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card border border-border/60 p-6 rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
              <span className="text-muted-foreground text-[11px] font-mono uppercase tracking-widest mb-3 flex items-center relative z-10">
                <TrendingUp size={14} className="mr-2 text-primary" /> Revenue Processed
              </span>
              <div className="relative z-10">
                <div className="text-3xl font-medium tracking-tight text-foreground mb-1 font-mono">$33.5K</div>
                <div className="text-xs text-success flex items-center font-medium">+12.5% from last week</div>
              </div>
            </div>
            
            <div className="bg-card border border-border/60 p-6 rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
              <span className="text-muted-foreground text-[11px] font-mono uppercase tracking-widest mb-3 flex items-center relative z-10">
                <Zap size={14} className="mr-2 text-primary" /> Manual Work Saved
              </span>
              <div className="relative z-10">
                <div className="text-3xl font-medium tracking-tight text-foreground mb-1 font-mono">142 <span className="text-lg font-sans font-normal text-muted-foreground">hrs</span></div>
                <div className="text-xs text-success flex items-center font-medium">~$7,100 operational savings</div>
              </div>
            </div>
            
            <div className="bg-card border border-border/60 p-6 rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
              <span className="text-muted-foreground text-[11px] font-mono uppercase tracking-widest mb-3 flex items-center relative z-10">
                <Clock size={14} className="mr-2 text-warning" /> Avg Processing Time
              </span>
              <div className="relative z-10">
                <div className="text-3xl font-medium tracking-tight text-foreground mb-1 font-mono">18<span className="text-lg font-sans font-normal text-muted-foreground">s</span></div>
                <div className="text-xs text-success flex items-center font-medium">-2s from last week</div>
              </div>
            </div>

            <div className="bg-card border border-border/60 p-6 rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
              <span className="text-muted-foreground text-[11px] font-mono uppercase tracking-widest mb-3 flex items-center relative z-10">
                <CheckCircle size={14} className="mr-2 text-success" /> AI Accuracy
              </span>
              <div className="relative z-10">
                <div className="text-3xl font-medium tracking-tight text-foreground mb-1 font-mono">94%</div>
                <div className="text-xs text-muted-foreground flex items-center">Straight-through processing</div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-card border border-border/60 rounded-2xl p-6 shadow-sm relative">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none rounded-2xl"></div>
              <h3 className="text-[11px] font-medium text-muted-foreground mb-8 font-mono uppercase tracking-widest relative z-10">Revenue Velocity</h3>
              <div className="h-64 w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} fontFamily="Inter" />
                    <YAxis stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} fontFamily="Inter" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#151A21', border: '1px solid #2A3442', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                      itemStyle={{ color: '#3B82F6', fontWeight: 500, fontFamily: 'Inter' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-card border border-border/60 rounded-2xl p-6 flex flex-col shadow-sm relative">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none rounded-2xl"></div>
              <h3 className="text-[11px] font-medium text-muted-foreground mb-8 font-mono uppercase tracking-widest relative z-10">Exception Breakdown</h3>
              <div className="flex-1 w-full relative -left-4 z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={exceptionData} layout="vertical" margin={{ top: 0, right: 0, left: 30, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} fontFamily="Inter" />
                    <Tooltip 
                      cursor={{fill: '#1D2430'}}
                      contentStyle={{ backgroundColor: '#151A21', border: '1px solid #2A3442', borderRadius: '8px' }}
                      itemStyle={{ fontFamily: 'Inter' }}
                    />
                    <Bar dataKey="count" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
