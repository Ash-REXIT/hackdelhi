import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Filter, Mail, Search, Upload, FileText } from 'lucide-react';
import { api } from '@/lib/api';
import type { Timesheet } from '@/types/api';
import { formatStatus, statusTone } from '@/lib/status';

export function TimesheetInbox() {
  const [items, setItems] = useState<Timesheet[]>([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const load = () => api<Timesheet[]>('/api/timesheets').then(setItems).catch(console.error);

  useEffect(() => {
    load();
    const t = setInterval(load, 6000);
    return () => clearInterval(t);
  }, []);

  const filtered = items.filter((ts) => {
    const q = search.toLowerCase();
    const name = ts.documents?.[0]?.fileName?.toLowerCase() || '';
    return !q || name.includes(q) || ts.client?.name?.toLowerCase().includes(q) || ts.id.includes(q);
  });

  const toneClass = (status: string) => {
    const t = statusTone(status);
    if (t === 'success') return 'bg-success/10 text-success border-success/20';
    if (t === 'danger') return 'bg-danger/10 text-danger border-danger/20';
    if (t === 'warning') return 'bg-warning/10 text-warning border-warning/20';
    return 'bg-primary/10 text-primary border-primary/20';
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="pt-8 px-10 pb-6 shrink-0 border-b border-[#2A3442]/50 bg-[#0B0F14] z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-1">Timesheet Inbox</h1>
            <p className="text-muted-foreground text-[15px]">Central intake queue for raw documents from all channels.</p>
          </div>
          <button onClick={load} className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium">
            Refresh
          </button>
        </div>

        <div className="flex items-center space-x-4 mt-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ID, filename, or client..."
              className="w-full bg-panel border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#0B0F14] p-10">
        <div className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-panel border-b border-border/50 text-xs font-mono text-muted-foreground uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4 font-medium">Intake ID</th>
                <th className="px-6 py-4 font-medium">Document</th>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Employee</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-panel/50 transition-colors group">
                  <td className="px-6 py-4 font-mono text-foreground text-xs">{item.id.slice(0, 8)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <FileText size={16} className="text-muted-foreground" />
                      <span className="font-medium text-foreground">{item.documents?.[0]?.fileName || '—'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{item.client?.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.employee?.name || (item.extractedData as { employeeName?: string })?.employeeName || '—'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[11px] rounded border uppercase tracking-wider font-mono ${toneClass(item.status)}`}>
                      {formatStatus(item.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => navigate(`/workspace/review/${item.id}`)}
                      className="text-primary hover:text-primary/80 text-sm font-medium"
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))}
              {!filtered.length && (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">No timesheets yet — upload from Client Portal</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
