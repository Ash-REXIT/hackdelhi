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
      <div className="h-16 border-b border-border/50 flex items-center justify-between px-10 bg-card shrink-0 shadow-sm relative z-10">
        <div>
          <h1 className="text-xl font-medium text-foreground">Client Directory</h1>
          <p className="text-[11px] text-muted-foreground font-mono mt-1 tracking-wide uppercase">6 Enterprise Partners</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-10 bg-background">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
          {clients.map((client, i) => (
            <div key={i} className="bg-card border border-border/60 rounded-2xl p-7 hover:border-primary/50 transition-all cursor-pointer group flex flex-col shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
              
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-panel border border-border/50 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors shadow-sm">
                    <Building2 size={22} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground text-lg mb-0.5">{client.name}</h3>
                    <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded ${client.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted border border-border text-muted-foreground'}`}>
                      {client.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-sm relative z-10 mb-2">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-[11px] font-mono uppercase tracking-wide flex items-center mb-1.5">
                    <Briefcase size={12} className="mr-1.5" /> Projects
                  </span>
                  <span className="font-medium text-foreground">{client.projects} Active</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-[11px] font-mono uppercase tracking-wide flex items-center mb-1.5">
                    <Users size={12} className="mr-1.5" /> Employees
                  </span>
                  <span className="font-medium text-foreground font-mono">{client.employees} <span className="font-sans font-normal text-muted-foreground ml-1">Billed</span></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-[11px] font-mono uppercase tracking-wide flex items-center mb-1.5">
                    <FileText size={12} className="mr-1.5" /> Invoices
                  </span>
                  <span className="font-medium text-foreground font-mono">{client.invoices} <span className="font-sans font-normal text-muted-foreground ml-1">YTD</span></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-[11px] font-mono uppercase tracking-wide flex items-center mb-1.5">
                    <DollarSign size={12} className="mr-1.5" /> Revenue
                  </span>
                  <span className="font-medium text-success font-mono">{client.revenue} <span className="font-sans font-normal text-muted-foreground ml-1">YTD</span></span>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-border/50 flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-2">
                  <AlertTriangle size={14} className={client.pending > 0 ? "text-warning" : "text-muted-foreground"} />
                  <span className={`text-sm font-medium ${client.pending > 0 ? "text-warning" : "text-muted-foreground"}`}>
                    {client.pending} Pending Reviews
                  </span>
                </div>
                <button className="text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
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
