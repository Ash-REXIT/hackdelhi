import { Download, Filter, Mail, Search, Upload, FileText, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export function TimesheetInbox() {
  const inboxItems = [
    { id: 'INT-4091', file: 'TCS_Oct_Consultants_Final.xlsx', source: 'Portal Upload', client: 'TCS', time: '10:45 AM', status: 'Processing', agent: 'Agent Alpha', priority: 'High' },
    { id: 'INT-4090', file: 'FW: Invoice submission (Wipro)', source: 'Email', client: 'Wipro', time: '10:30 AM', status: 'Failed Extraction', agent: 'Agent Beta', priority: 'Medium' },
    { id: 'INT-4089', file: 'scanned_timesheets_batch4.pdf', source: 'SFTP Drop', client: 'Infosys', time: '09:15 AM', status: 'Completed', agent: 'Agent Gamma', priority: 'Low' },
    { id: 'INT-4088', file: 'handwritten_claims_q3.jpg', source: 'Mobile App', client: 'Cognizant', time: 'Yesterday', status: 'Pending Review', agent: 'Agent Alpha', priority: 'High' },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="pt-8 px-10 pb-6 shrink-0 border-b border-[#2A3442]/50 bg-[#0B0F14] z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-1">Timesheet Inbox</h1>
            <p className="text-muted-foreground text-[15px]">Central intake queue for raw documents from all channels.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-panel border border-border hover:bg-card text-foreground rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center">
              <Download size={16} className="mr-2" /> Export Log
            </button>
            <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center">
              <Upload size={16} className="mr-2" /> Manual Upload
            </button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex items-center space-x-4 mt-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
            <input 
              type="text" 
              placeholder="Search by ID, filename, or client..." 
              className="w-full bg-panel border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button className="px-4 py-2 bg-panel border border-border hover:bg-card rounded-lg flex items-center text-sm font-medium text-foreground transition-colors">
            <Filter size={16} className="mr-2" /> Filters
          </button>
          <div className="flex items-center space-x-2 border-l border-border/50 pl-4">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Status:</span>
            <select className="bg-panel border border-border rounded-md px-2 py-1.5 text-sm text-foreground outline-none">
              <option>All Statuses</option>
              <option>Processing</option>
              <option>Completed</option>
              <option>Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inbox List */}
      <div className="flex-1 overflow-y-auto bg-[#0B0F14] p-10">
        <div className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-panel border-b border-border/50 text-xs font-mono text-muted-foreground uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4 font-medium">Intake ID</th>
                <th className="px-6 py-4 font-medium">Document</th>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Source</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {inboxItems.map((item) => (
                <tr key={item.id} className="hover:bg-panel/50 transition-colors group">
                  <td className="px-6 py-4 font-mono text-foreground text-xs">{item.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <FileText size={16} className="text-muted-foreground" />
                      <span className="font-medium text-foreground">{item.file}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{item.client}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-muted-foreground text-xs">
                      {item.source === 'Email' ? <Mail size={14} /> : <Upload size={14} />}
                      <span>{item.source}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[11px] rounded border uppercase tracking-wider font-mono
                      ${item.status === 'Processing' ? 'bg-primary/10 text-primary border-primary/20' : ''}
                      ${item.status === 'Completed' ? 'bg-success/10 text-success border-success/20' : ''}
                      ${item.status.includes('Failed') ? 'bg-danger/10 text-danger border-danger/20' : ''}
                      ${item.status === 'Pending Review' ? 'bg-warning/10 text-warning border-warning/20' : ''}
                    `}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors opacity-0 group-hover:opacity-100">
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
