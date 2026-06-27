import { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  MoreHorizontal, 
  BookOpen, 
  BrainCircuit,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export function Knowledge() {
  const [documents] = useState([
    { id: 'DOC-001', name: 'Infosys Master Services Agreement 2026.pdf', type: 'Contract', client: 'Infosys Ltd', size: '2.4 MB', uploadedAt: 'Oct 20, 2026', status: 'Indexed' },
    { id: 'DOC-002', name: 'TCS Overtime Policy Addendum.pdf', type: 'Policy', client: 'TCS', size: '1.1 MB', uploadedAt: 'Oct 18, 2026', status: 'Indexed' },
    { id: 'DOC-003', name: 'Wipro Global Rate Card Q4.xlsx', type: 'Rate Card', client: 'Wipro', size: '450 KB', uploadedAt: 'Oct 15, 2026', status: 'Indexed' },
    { id: 'DOC-004', name: 'Vendor Compliance Guidelines v3.pdf', type: 'Guideline', client: 'All', size: '3.8 MB', uploadedAt: 'Oct 10, 2026', status: 'Requires Review' },
    { id: 'DOC-005', name: 'Accenture Subcontractor NDA.pdf', type: 'Legal', client: 'Accenture', size: '1.2 MB', uploadedAt: 'Oct 05, 2026', status: 'Indexed' },
  ]);

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      {/* Header */}
      <div className="pt-8 px-10 pb-6 shrink-0 border-b border-[#2A3442]/50 bg-[#0B0F14] z-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-1">Knowledge Base</h1>
          <p className="text-muted-foreground text-[15px]">Upload contracts and policies to train the AI validation engine.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center">
            <Upload size={16} className="mr-2" /> Upload Document
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Tabs */}
        <div className="w-64 border-r border-[#2A3442]/50 bg-[#0B0F14] p-6 space-y-2 shrink-0 hidden md:block">
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Document Types</div>
          <button className="w-full flex items-center px-3 py-2 rounded-lg bg-panel text-foreground text-sm font-medium shadow-sm border border-border/50">
            <BookOpen size={16} className="mr-3 text-primary" /> All Documents
          </button>
          <button className="w-full flex items-center px-3 py-2 rounded-lg text-muted-foreground hover:bg-panel hover:text-foreground transition-colors text-sm font-medium">
            <FileText size={16} className="mr-3" /> Contracts
          </button>
          <button className="w-full flex items-center px-3 py-2 rounded-lg text-muted-foreground hover:bg-panel hover:text-foreground transition-colors text-sm font-medium">
            <FileText size={16} className="mr-3" /> Policies
          </button>
          <button className="w-full flex items-center px-3 py-2 rounded-lg text-muted-foreground hover:bg-panel hover:text-foreground transition-colors text-sm font-medium">
            <FileText size={16} className="mr-3" /> Rate Cards
          </button>

          <div className="mt-8 mb-4">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
              <BrainCircuit className="text-primary mb-2" size={24} />
              <div className="text-sm font-medium text-foreground mb-1">AI Engine Status</div>
              <div className="text-xs text-muted-foreground mb-3">Model is up to date with latest documents.</div>
              <button className="w-full px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-md text-xs font-medium transition-colors">
                Force Retrain
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 bg-[#0B0F14]">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Table Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="relative w-80">
                <Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
                <input 
                  type="text" 
                  placeholder="Search documents by name, client, or content..." 
                  className="w-full bg-panel border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors shadow-sm"
                />
              </div>
              <button className="px-4 py-2 bg-panel border border-border hover:bg-card rounded-lg flex items-center text-sm font-medium text-foreground transition-colors shadow-sm">
                <Filter size={16} className="mr-2" /> Filter
              </button>
            </div>

            {/* Document Table */}
            <div className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-panel border-b border-border/50 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4 font-medium">Document Name</th>
                    <th className="px-6 py-4 font-medium">Type</th>
                    <th className="px-6 py-4 font-medium">Client</th>
                    <th className="px-6 py-4 font-medium">Size</th>
                    <th className="px-6 py-4 font-medium">Uploaded</th>
                    <th className="px-6 py-4 font-medium">AI Status</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-panel/50 transition-colors">
                      <td className="px-6 py-4 flex items-center">
                        <FileText size={16} className="mr-3 text-primary" />
                        <span className="font-medium text-foreground">{doc.name}</span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{doc.type}</td>
                      <td className="px-6 py-4 text-foreground">{doc.client}</td>
                      <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{doc.size}</td>
                      <td className="px-6 py-4 text-muted-foreground">{doc.uploadedAt}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-[11px] font-mono uppercase tracking-widest border ${
                          doc.status === 'Indexed' ? 'bg-success/10 text-success border-success/20' : 'bg-warning/10 text-warning border-warning/20'
                        }`}>
                          {doc.status === 'Indexed' ? <CheckCircle2 size={12} className="mr-1.5" /> : <AlertCircle size={12} className="mr-1.5" />}
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-muted-foreground hover:text-foreground transition-colors"><MoreHorizontal size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Dropzone */}
            <div className="border-2 border-dashed border-border/60 hover:border-primary/50 bg-panel/30 hover:bg-panel/50 rounded-xl p-10 flex flex-col items-center justify-center transition-colors cursor-pointer mt-8 text-center group">
              <div className="w-16 h-16 rounded-full bg-panel flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload size={24} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-1">Drag and drop documents here</h3>
              <p className="text-sm text-muted-foreground max-w-sm mb-4">Upload contracts, MSAs, and policy PDFs to automatically train the validation engine.</p>
              <button className="px-4 py-2 bg-panel border border-border hover:bg-card text-foreground rounded-lg text-sm font-medium transition-colors shadow-sm">
                Browse Files
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
