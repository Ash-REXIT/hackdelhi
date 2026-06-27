import { FileText, MoreHorizontal } from 'lucide-react';

export function DataView({ title }: { title: string }) {
  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <div className="h-14 border-b border-border flex items-center justify-between px-6 bg-background shrink-0">
        <h1 className="text-lg font-medium text-foreground">{title}</h1>
        <div className="flex space-x-2">
          <input 
            type="text" 
            placeholder="Filter..." 
            className="bg-panel border border-border rounded px-3 py-1 text-sm focus:outline-none focus:border-primary transition-colors w-64"
          />
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1 rounded text-sm font-medium transition-colors">
            New View
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="border border-border rounded-lg bg-panel overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-card border-b border-border text-xs uppercase tracking-wide text-muted-foreground font-mono">
              <tr>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Entity Name</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Date Modified</th>
                <th className="px-4 py-3 font-medium">Assigned To</th>
                <th className="px-4 py-3 font-medium w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[...Array(15)].map((_, i) => (
                <tr key={i} className="hover:bg-card/50 transition-colors cursor-pointer group">
                  <td className="px-4 py-3 font-mono text-muted-foreground group-hover:text-primary transition-colors">REQ-{10592 - i}</td>
                  <td className="px-4 py-3 text-foreground font-medium flex items-center">
                    <FileText size={14} className="mr-2 text-muted-foreground" />
                    Standard {title} Entity {i + 1}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${i % 3 === 0 ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'}`}>
                      {i % 3 === 0 ? 'Pending' : 'Completed'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">Oct {14 - (i % 14)}, 2026</td>
                  <td className="px-4 py-3 text-muted-foreground flex items-center">
                    <div className="w-5 h-5 rounded bg-muted flex items-center justify-center text-[10px] mr-2 text-foreground font-bold border border-border">
                      {i % 2 === 0 ? 'AI' : 'JD'}
                    </div>
                    {i % 2 === 0 ? 'FlowInvoice AI' : 'Jane Doe'}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity text-right">
                    <MoreHorizontal size={16} />
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
