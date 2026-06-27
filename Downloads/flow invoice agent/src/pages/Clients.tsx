import { 
  Building2, 
  Briefcase, 
  Users, 
  FileText,
  AlertTriangle,
  DollarSign
} from 'lucide-react';

export function Clients() {
  const clients = [
    { name: "Acme Corp", projects: 4, employees: 120, invoices: 842, pending: 3, revenue: "$1.2M", status: "active" },
    { name: "Globex Inc", projects: 2, employees: 45, invoices: 156, pending: 0, revenue: "$450K", status: "active" },
    { name: "Initech", projects: 7, employees: 340, invoices: 2104, pending: 12, revenue: "$3.8M", status: "active" },
    { name: "Stark Industries", projects: 12, employees: 890, invoices: 5430, pending: 1, revenue: "$12.4M", status: "active" },
    { name: "Wayne Enterprises", projects: 3, employees: 210, invoices: 940, pending: 0, revenue: "$2.1M", status: "active" },
    { name: "Soylent Corp", projects: 1, employees: 12, invoices: 45, pending: 0, revenue: "$85K", status: "inactive" },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <div className="h-16 border-b border-border flex items-center justify-between px-8 bg-background shrink-0">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Client Directory</h1>
          <p className="text-xs text-muted-foreground font-mono mt-1">6 Enterprise Partners</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-8 bg-[#090b0e]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client, i) => (
            <div key={i} className="bg-panel border border-border rounded-xl p-6 hover:border-primary/50 transition-all cursor-pointer group flex flex-col shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/30 transition-colors">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{client.name}</h3>
                    <span className={`text-[10px] font-mono uppercase tracking-wide px-1.5 py-0.5 rounded ${client.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                      {client.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs font-mono uppercase tracking-wide flex items-center mb-1">
                    <Briefcase size={12} className="mr-1" /> Projects
                  </span>
                  <span className="font-medium text-foreground">{client.projects} Active</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs font-mono uppercase tracking-wide flex items-center mb-1">
                    <Users size={12} className="mr-1" /> Employees
                  </span>
                  <span className="font-medium text-foreground">{client.employees} Billed</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs font-mono uppercase tracking-wide flex items-center mb-1">
                    <FileText size={12} className="mr-1" /> Invoices
                  </span>
                  <span className="font-medium text-foreground">{client.invoices} YTD</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs font-mono uppercase tracking-wide flex items-center mb-1">
                    <DollarSign size={12} className="mr-1" /> Revenue
                  </span>
                  <span className="font-medium text-foreground">{client.revenue} YTD</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle size={14} className={client.pending > 0 ? "text-warning" : "text-muted-foreground"} />
                  <span className={`text-sm font-medium ${client.pending > 0 ? "text-warning" : "text-muted-foreground"}`}>
                    {client.pending} Pending Reviews
                  </span>
                </div>
                <button className="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
