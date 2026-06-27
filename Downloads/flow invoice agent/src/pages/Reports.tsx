import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell
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

const accuracyData = [
  { name: 'Accurate', value: 94 },
  { name: 'Manual', value: 6 },
];

const COLORS = ['#22C55E', '#151A21'];

export function Reports() {
  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <div className="h-16 border-b border-border flex items-center justify-between px-8 bg-background shrink-0">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Executive Insights</h1>
          <p className="text-xs text-muted-foreground font-mono mt-1">Last 7 Days</p>
        </div>
        <button className="bg-panel border border-border hover:bg-card text-foreground px-4 py-1.5 rounded text-sm transition-colors shadow-sm">
          Export PDF
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-8 bg-[#090b0e]">
        
        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-panel border border-border p-5 rounded-lg flex flex-col justify-between">
            <span className="text-muted-foreground text-xs font-mono uppercase tracking-wide mb-2 flex items-center">
              <TrendingUp size={14} className="mr-2 text-primary" /> Revenue Processed
            </span>
            <div className="text-3xl font-bold font-mono tracking-tight text-foreground mb-1">$33.5K</div>
            <div className="text-xs text-success flex items-center">+12.5% from last week</div>
          </div>
          
          <div className="bg-panel border border-border p-5 rounded-lg flex flex-col justify-between">
            <span className="text-muted-foreground text-xs font-mono uppercase tracking-wide mb-2 flex items-center">
              <Zap size={14} className="mr-2 text-ai-accent" /> Manual Work Saved
            </span>
            <div className="text-3xl font-bold font-mono tracking-tight text-foreground mb-1">142 hrs</div>
            <div className="text-xs text-success flex items-center">~$7,100 operational savings</div>
          </div>
          
          <div className="bg-panel border border-border p-5 rounded-lg flex flex-col justify-between">
            <span className="text-muted-foreground text-xs font-mono uppercase tracking-wide mb-2 flex items-center">
              <Clock size={14} className="mr-2 text-warning" /> Avg Processing Time
            </span>
            <div className="text-3xl font-bold font-mono tracking-tight text-foreground mb-1">18s</div>
            <div className="text-xs text-success flex items-center">-2s from last week</div>
          </div>

          <div className="bg-panel border border-border p-5 rounded-lg flex flex-col justify-between">
            <span className="text-muted-foreground text-xs font-mono uppercase tracking-wide mb-2 flex items-center">
              <CheckCircle size={14} className="mr-2 text-success" /> AI Accuracy
            </span>
            <div className="text-3xl font-bold font-mono tracking-tight text-foreground mb-1">94%</div>
            <div className="text-xs text-muted-foreground flex items-center">Straight-through processing</div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-panel border border-border rounded-lg p-5">
            <h3 className="text-sm font-medium text-foreground mb-6 font-mono uppercase tracking-wide">Revenue Velocity</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#151A21', border: '1px solid #2A3442', borderRadius: '4px' }}
                    itemStyle={{ color: '#3B82F6', fontWeight: 500 }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-panel border border-border rounded-lg p-5 flex flex-col">
            <h3 className="text-sm font-medium text-foreground mb-6 font-mono uppercase tracking-wide">Exception Breakdown</h3>
            <div className="flex-1 w-full relative -left-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={exceptionData} layout="vertical" margin={{ top: 0, right: 0, left: 30, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{fill: '#1D2430'}}
                    contentStyle={{ backgroundColor: '#151A21', border: '1px solid #2A3442', borderRadius: '4px' }}
                  />
                  <Bar dataKey="count" fill="#8B5CF6" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
