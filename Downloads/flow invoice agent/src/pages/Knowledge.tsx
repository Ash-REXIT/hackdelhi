import { useState } from 'react';
import { 
  FileText, 
  ChevronRight, 
  ChevronDown, 
  Search,
  Book,
  Scale,
  CreditCard,
  History,
  Sparkles
} from 'lucide-react';

export function Knowledge() {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'policies': true,
    'clients': true
  });

  const toggleFolder = (folder: string) => {
    setExpandedFolders(prev => ({...prev, [folder]: !prev[folder]}));
  };

  return (
    <div className="flex h-full w-full bg-background overflow-hidden">
      {/* Sidebar - Notion style file tree */}
      <div className="w-64 border-r border-border/50 bg-[#0B0F14] flex flex-col shrink-0 relative z-10 shadow-[1px_0_10px_rgba(0,0,0,0.1)]">
        <div className="p-4 border-b border-border/50">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-muted-foreground" size={14} />
            <input 
              type="text" 
              placeholder="Search rules..." 
              className="w-full bg-panel border border-border/50 rounded-md px-9 py-2 text-sm focus:outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground/70 shadow-sm"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-3 text-sm">
          {/* Global Policies */}
          <div className="px-3">
            <div 
              className="flex items-center px-2 py-2 text-muted-foreground hover:bg-card hover:text-foreground rounded-md cursor-pointer transition-colors"
              onClick={() => toggleFolder('policies')}
            >
              {expandedFolders['policies'] ? <ChevronDown size={14} className="mr-2 opacity-70" /> : <ChevronRight size={14} className="mr-2 opacity-70" />}
              <span className="font-medium">Global Policies</span>
            </div>
            
            {expandedFolders['policies'] && (
              <div className="pl-6 space-y-0.5 mt-1">
                <div className="flex items-center px-2 py-2 bg-primary/10 text-primary rounded-md cursor-pointer font-medium shadow-sm">
                  <Scale size={14} className="mr-2" />
                  <span>Standard Overtime Rules</span>
                </div>
                <div className="flex items-center px-2 py-2 text-muted-foreground hover:bg-card hover:text-foreground rounded-md cursor-pointer transition-colors">
                  <CreditCard size={14} className="mr-2 opacity-70" />
                  <span>GST Billing Guidelines</span>
                </div>
                <div className="flex items-center px-2 py-2 text-muted-foreground hover:bg-card hover:text-foreground rounded-md cursor-pointer transition-colors">
                  <History size={14} className="mr-2 opacity-70" />
                  <span>Previous AI Decisions</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 px-3">
            <div 
              className="flex items-center px-2 py-2 text-muted-foreground hover:bg-card hover:text-foreground rounded-md cursor-pointer transition-colors"
              onClick={() => toggleFolder('clients')}
            >
              {expandedFolders['clients'] ? <ChevronDown size={14} className="mr-2 opacity-70" /> : <ChevronRight size={14} className="mr-2 opacity-70" />}
              <span className="font-medium">Client Specific Rules</span>
            </div>
            
            {expandedFolders['clients'] && (
              <div className="pl-6 space-y-0.5 mt-1">
                <div className="flex items-center px-2 py-2 text-muted-foreground hover:bg-card hover:text-foreground rounded-md cursor-pointer transition-colors">
                  <Book size={14} className="mr-2 opacity-70" />
                  <span>Acme Corp SLA</span>
                </div>
                <div className="flex items-center px-2 py-2 text-muted-foreground hover:bg-card hover:text-foreground rounded-md cursor-pointer transition-colors">
                  <Book size={14} className="mr-2 opacity-70" />
                  <span>Stark Ind. Routing</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Editor Content - Notion Style */}
      <div className="flex-1 overflow-y-auto bg-background relative flex justify-center">
        <div className="max-w-3xl w-full px-16 py-20">
          <div className="flex items-center space-x-2 text-muted-foreground mb-8">
            <Book size={16} />
            <span className="text-sm font-medium">Global Policies</span>
            <span className="text-sm opacity-50">/</span>
            <span className="text-sm font-medium text-foreground">Standard Overtime Rules</span>
          </div>
          
          <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-8">Standard Overtime Rules</h1>
          
          <div className="prose prose-invert max-w-none text-muted-foreground">
            <p className="text-base leading-relaxed mb-8">
              This document outlines the standard baseline heuristics the FlowInvoice AI engine uses when determining overtime validity across all client invoices unless overridden by a client-specific contract.
            </p>
            
            <h2 className="text-xl font-medium text-foreground mt-12 mb-4 border-b border-border/40 pb-3 tracking-tight">1. Thresholds</h2>
            <ul className="list-none pl-0 space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-primary mr-3 mt-1">•</span>
                <span><strong className="text-foreground font-medium">Daily Overtime:</strong> Any hours exceeding 8 hours in a single contiguous 24-hour block.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 mt-1">•</span>
                <span><strong className="text-foreground font-medium">Weekly Overtime:</strong> Any hours exceeding 40 hours within the standard Monday-Sunday billing cycle.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 mt-1">•</span>
                <span><strong className="text-foreground font-medium">Multiplier:</strong> Default multiplier is 1.5x the base rate. Double time (2.0x) applies only on federal holidays.</span>
              </li>
            </ul>

            <h2 className="text-xl font-medium text-foreground mt-12 mb-4 border-b border-border/40 pb-3 tracking-tight">2. AI Confidence Matrices</h2>
            <p className="mb-6 leading-relaxed">
              When the AI encounters ambiguous handwriting indicating "OT" or "Overtime", it maps the entry to the employee's HRIS profile. If the HRIS profile lacks an explicit overtime rate, the AI will default to the 1.5x rule and flag the invoice with a <strong className="text-foreground font-medium">Priority: High</strong> review request.
            </p>
            
            <div className="bg-panel border border-border/60 rounded-xl p-5 mt-8 shadow-sm">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">AI Rule Interpretation</span>
              </div>
              <code className="text-[13px] leading-relaxed font-mono text-muted-foreground block bg-card p-4 rounded-lg border border-border/50">
                <span className="text-primary">IF</span> (hours_logged &gt; <span className="text-success">8</span> <span className="text-primary">AND</span> rate_modifier == UNKNOWN) <br/>
                <span className="text-primary">THEN</span> set_rate(base_rate * <span className="text-success">1.5</span>) <span className="text-primary">AND</span> flag_for_review(REASON=<span className="text-warning">"Missing explicit OT rate"</span>)
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
