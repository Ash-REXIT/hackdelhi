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
      <div className="w-64 border-r border-border bg-[#10141a] flex flex-col shrink-0">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-2.5 top-2 text-muted-foreground" size={14} />
            <input 
              type="text" 
              placeholder="Search rules..." 
              className="w-full bg-[#1a1f26] border border-transparent rounded px-8 py-1.5 text-sm focus:outline-none focus:border-border transition-colors text-foreground placeholder:text-muted-foreground/70"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-2 text-sm">
          {/* Global Policies */}
          <div className="px-2">
            <div 
              className="flex items-center px-2 py-1.5 text-muted-foreground hover:bg-card hover:text-foreground rounded cursor-pointer transition-colors"
              onClick={() => toggleFolder('policies')}
            >
              {expandedFolders['policies'] ? <ChevronDown size={14} className="mr-1" /> : <ChevronRight size={14} className="mr-1" />}
              <span className="font-medium">Global Policies</span>
            </div>
            
            {expandedFolders['policies'] && (
              <div className="pl-6 space-y-0.5 mt-0.5">
                <div className="flex items-center px-2 py-1.5 bg-primary/10 text-primary rounded cursor-pointer">
                  <Scale size={14} className="mr-2 opacity-70" />
                  <span>Standard Overtime Rules</span>
                </div>
                <div className="flex items-center px-2 py-1.5 text-muted-foreground hover:bg-card hover:text-foreground rounded cursor-pointer transition-colors">
                  <CreditCard size={14} className="mr-2 opacity-70" />
                  <span>GST Billing Guidelines</span>
                </div>
                <div className="flex items-center px-2 py-1.5 text-muted-foreground hover:bg-card hover:text-foreground rounded cursor-pointer transition-colors">
                  <History size={14} className="mr-2 opacity-70" />
                  <span>Previous AI Decisions</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 px-2">
            <div 
              className="flex items-center px-2 py-1.5 text-muted-foreground hover:bg-card hover:text-foreground rounded cursor-pointer transition-colors"
              onClick={() => toggleFolder('clients')}
            >
              {expandedFolders['clients'] ? <ChevronDown size={14} className="mr-1" /> : <ChevronRight size={14} className="mr-1" />}
              <span className="font-medium">Client Specific Rules</span>
            </div>
            
            {expandedFolders['clients'] && (
              <div className="pl-6 space-y-0.5 mt-0.5">
                <div className="flex items-center px-2 py-1.5 text-muted-foreground hover:bg-card hover:text-foreground rounded cursor-pointer transition-colors">
                  <Book size={14} className="mr-2 opacity-70" />
                  <span>Acme Corp SLA</span>
                </div>
                <div className="flex items-center px-2 py-1.5 text-muted-foreground hover:bg-card hover:text-foreground rounded cursor-pointer transition-colors">
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
        <div className="max-w-3xl w-full px-12 py-16">
          <div className="flex items-center space-x-2 text-muted-foreground mb-6">
            <Book size={16} />
            <span className="text-sm">Global Policies</span>
            <span className="text-sm">/</span>
            <span className="text-sm text-foreground">Standard Overtime Rules</span>
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-8">Standard Overtime Rules</h1>
          
          <div className="prose prose-invert max-w-none text-muted-foreground">
            <p className="text-lg leading-relaxed mb-6">
              This document outlines the standard baseline heuristics the FlowInvoice AI engine uses when determining overtime validity across all client invoices unless overridden by a client-specific contract.
            </p>
            
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4 border-b border-border pb-2">1. Thresholds</h2>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li><strong>Daily Overtime:</strong> Any hours exceeding 8 hours in a single contiguous 24-hour block.</li>
              <li><strong>Weekly Overtime:</strong> Any hours exceeding 40 hours within the standard Monday-Sunday billing cycle.</li>
              <li><strong>Multiplier:</strong> Default multiplier is 1.5x the base rate. Double time (2.0x) applies only on federal holidays.</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4 border-b border-border pb-2">2. AI Confidence Matrices</h2>
            <p className="mb-4">
              When the AI encounters ambiguous handwriting indicating "OT" or "Overtime", it maps the entry to the employee's HRIS profile. If the HRIS profile lacks an explicit overtime rate, the AI will default to the 1.5x rule and flag the invoice with a <strong>Priority: High</strong> review request.
            </p>
            
            <div className="bg-panel border border-border rounded-lg p-4 mt-6">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles size={16} className="text-ai-accent" />
                <span className="text-sm font-semibold text-foreground">AI Rule Interpretation</span>
              </div>
              <code className="text-xs font-mono text-ai-accent block bg-[#1a1f26] p-3 rounded border border-border">
                IF (hours_logged &gt; 8 AND rate_modifier == UNKNOWN) <br/>
                THEN set_rate(base_rate * 1.5) AND flag_for_review(REASON="Missing explicit OT rate")
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
