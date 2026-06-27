import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { Header } from '../../components/layout/Header'
import { analyticsData } from '../../data/mockData'

const tooltipStyle = {
  contentStyle: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    fontSize: '12px',
  },
}

export function Analytics() {
  return (
    <>
      <Header title="Analytics" subtitle="Platform performance and billing insights" />
      <div className="p-6 lg:p-8 space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartCard title="Monthly Uploads">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={analyticsData.monthlyUploads}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip {...tooltipStyle} />
                <Legend />
                <Bar dataKey="uploads" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Uploads" />
                <Bar dataKey="approved" fill="#22c55e" radius={[6, 6, 0, 0]} name="Approved" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Approval Rate (%)">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={analyticsData.approvalRate}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis domain={[80, 100]} tick={{ fontSize: 12 }} />
                <Tooltip {...tooltipStyle} />
                <Line type="monotone" dataKey="rate" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4 }} name="Approval %" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Avg Processing Time (min)">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={analyticsData.processingTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip {...tooltipStyle} />
                <Line type="monotone" dataKey="minutes" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} name="Minutes" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Manual Review %">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={analyticsData.manualReview}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="percent" fill="#f97316" radius={[6, 6, 0, 0]} name="Manual Review %" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Invoice Trend (₹ Cr)">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={analyticsData.invoiceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="amount" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="₹ Crores" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Top Clients (₹ L)">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={analyticsData.topClients} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={70} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="amount" fill="#2563eb" radius={[0, 6, 6, 0]} name="Amount (₹L)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Risk Distribution">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={analyticsData.riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {analyticsData.riskDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="AI Confidence Trend">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={analyticsData.confidenceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis domain={[80, 100]} tick={{ fontSize: 12 }} />
                <Tooltip {...tooltipStyle} />
                <Line type="monotone" dataKey="confidence" stroke="#06b6d4" strokeWidth={2.5} dot={{ r: 4 }} name="Confidence %" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <ChartCard title="Dispatch Success Rate (%)">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={analyticsData.dispatchSuccess}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis domain={[90, 100]} tick={{ fontSize: 12 }} />
              <Tooltip {...tooltipStyle} />
              <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} name="Success %" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </>
  )
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800">
      <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
      {children}
    </div>
  )
}
