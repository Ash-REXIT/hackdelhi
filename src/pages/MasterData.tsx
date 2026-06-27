import { useState } from 'react';
import { 
  Database,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Users,
  Briefcase,
  DollarSign,
  Download
} from 'lucide-react';

export function MasterData() {
  const [activeTab, setActiveTab] = useState('employees');
  
  const employees = [
    { id: 'EMP-40921', name: 'John Smith', role: 'Senior Developer', department: 'Engineering', client: 'Infosys Ltd', status: 'Active' },
    { id: 'EMP-40922', name: 'Sarah Connor', role: 'Project Manager', department: 'Operations', client: 'TCS', status: 'Active' },
    { id: 'EMP-40923', name: 'David Bowman', role: 'Systems Analyst', department: 'IT', client: 'Wipro', status: 'On Leave' },
    { id: 'EMP-40924', name: 'Ellen Ripley', role: 'DevOps Engineer', department: 'Engineering', client: 'Infosys Ltd', status: 'Active' },
  ];

  const projects = [
    { id: 'PRJ-801', name: 'Phoenix Modernization', client: 'Infosys Ltd', budget: '$450,000', start: 'Jan 2026', status: 'In Progress' },
    { id: 'PRJ-802', name: 'Cloud Migration Phase 2', client: 'TCS', budget: '$1,200,000', start: 'Mar 2026', status: 'Planning' },
    { id: 'PRJ-803', name: 'Security Audit Q3', client: 'Wipro', budget: '$85,000', start: 'Oct 2026', status: 'In Progress' },
  ];

  const rates = [
    { id: 'RAT-001', role: 'Senior Developer', client: 'Infosys Ltd', rate: '$150/hr', currency: 'USD', validFrom: 'Jan 1, 2026' },
    { id: 'RAT-002', role: 'Project Manager', client: 'TCS', rate: '$180/hr', currency: 'USD', validFrom: 'Jan 1, 2026' },
    { id: 'RAT-003', role: 'DevOps Engineer', client: 'Infosys Ltd', rate: '$165/hr', currency: 'USD', validFrom: 'Jun 1, 2026' },
    { id: 'RAT-004', role: 'Systems Analyst', client: 'Wipro', rate: '$130/hr', currency: 'USD', validFrom: 'Mar 15, 2026' },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="pt-8 px-10 pb-6 shrink-0 border-b border-[#2A3442]/50 bg-[#0B0F14] z-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-1">Master Data</h1>
          <p className="text-muted-foreground text-[15px]">Manage enterprise reference data including projects, employees, and billing rates.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-panel border border-border hover:bg-card text-foreground rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center">
            <Download size={16} className="mr-2" /> Export CSV
          </button>
          <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center">
            <Plus size={16} className="mr-2" /> New Record
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Tabs */}
        <div className="w-64 border-r border-[#2A3442]/50 bg-[#0B0F14] p-6 space-y-2 shrink-0 hidden md:block">
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4 pl-3">Data Tables</div>
          <button 
            onClick={() => setActiveTab('employees')}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'employees' ? 'bg-panel text-foreground shadow-sm border border-border/50' : 'text-muted-foreground hover:text-foreground hover:bg-panel/50'}`}
          >
            <Users size={16} className="mr-3" /> Employees
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'projects' ? 'bg-panel text-foreground shadow-sm border border-border/50' : 'text-muted-foreground hover:text-foreground hover:bg-panel/50'}`}
          >
            <Briefcase size={16} className="mr-3" /> Projects
          </button>
          <button 
            onClick={() => setActiveTab('rates')}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'rates' ? 'bg-panel text-foreground shadow-sm border border-border/50' : 'text-muted-foreground hover:text-foreground hover:bg-panel/50'}`}
          >
            <DollarSign size={16} className="mr-3" /> Billing Rates
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 bg-[#0B0F14]">
          <div className="max-w-6xl space-y-6">
            
            {/* Table Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="relative w-80">
                <Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
                <input 
                  type="text" 
                  placeholder={`Search ${activeTab}...`} 
                  className="w-full bg-panel border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors shadow-sm"
                />
              </div>
              <button className="px-4 py-2 bg-panel border border-border hover:bg-card rounded-lg flex items-center text-sm font-medium text-foreground transition-colors shadow-sm">
                <Filter size={16} className="mr-2" /> Filter
              </button>
            </div>

            {/* Tables */}
            <div className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-sm">
              
              {activeTab === 'employees' && (
                <table className="w-full text-sm text-left">
                  <thead className="bg-panel border-b border-border/50 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                    <tr>
                      <th className="px-6 py-4 font-medium">Emp ID</th>
                      <th className="px-6 py-4 font-medium">Name</th>
                      <th className="px-6 py-4 font-medium">Role</th>
                      <th className="px-6 py-4 font-medium">Client Assignment</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {employees.map(emp => (
                      <tr key={emp.id} className="hover:bg-panel/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-muted-foreground">{emp.id}</td>
                        <td className="px-6 py-4 font-medium text-foreground">{emp.name}</td>
                        <td className="px-6 py-4 text-muted-foreground">{emp.role}</td>
                        <td className="px-6 py-4 text-foreground">{emp.client}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-[11px] font-mono uppercase tracking-widest border ${
                            emp.status === 'Active' ? 'bg-success/10 text-success border-success/20' : 'bg-warning/10 text-warning border-warning/20'
                          }`}>
                            {emp.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-muted-foreground hover:text-foreground transition-colors"><MoreHorizontal size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'projects' && (
                <table className="w-full text-sm text-left">
                  <thead className="bg-panel border-b border-border/50 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                    <tr>
                      <th className="px-6 py-4 font-medium">Project ID</th>
                      <th className="px-6 py-4 font-medium">Project Name</th>
                      <th className="px-6 py-4 font-medium">Client</th>
                      <th className="px-6 py-4 font-medium">Budget</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {projects.map(prj => (
                      <tr key={prj.id} className="hover:bg-panel/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-muted-foreground">{prj.id}</td>
                        <td className="px-6 py-4 font-medium text-foreground">{prj.name}</td>
                        <td className="px-6 py-4 text-foreground">{prj.client}</td>
                        <td className="px-6 py-4 font-mono text-muted-foreground">{prj.budget}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-[11px] font-mono uppercase tracking-widest border ${
                            prj.status === 'In Progress' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-warning/10 text-warning border-warning/20'
                          }`}>
                            {prj.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-muted-foreground hover:text-foreground transition-colors"><MoreHorizontal size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'rates' && (
                <table className="w-full text-sm text-left">
                  <thead className="bg-panel border-b border-border/50 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                    <tr>
                      <th className="px-6 py-4 font-medium">Rate ID</th>
                      <th className="px-6 py-4 font-medium">Role</th>
                      <th className="px-6 py-4 font-medium">Client</th>
                      <th className="px-6 py-4 font-medium">Hourly Rate</th>
                      <th className="px-6 py-4 font-medium">Valid From</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {rates.map(rate => (
                      <tr key={rate.id} className="hover:bg-panel/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-muted-foreground">{rate.id}</td>
                        <td className="px-6 py-4 font-medium text-foreground">{rate.role}</td>
                        <td className="px-6 py-4 text-foreground">{rate.client}</td>
                        <td className="px-6 py-4 font-mono font-medium text-primary">{rate.rate}</td>
                        <td className="px-6 py-4 text-muted-foreground">{rate.validFrom}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-muted-foreground hover:text-foreground transition-colors"><MoreHorizontal size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
