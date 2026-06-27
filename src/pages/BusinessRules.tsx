import { useState, useMemo } from 'react';
import { 
  Shield, 
  Power, 
  CheckCircle2, 
  AlertTriangle, 
  Save, 
  RefreshCcw,
  Search,
  Filter,
  MoreHorizontal,
  X,
  Play,
  Copy,
  Edit2
} from 'lucide-react';

// Mock Rules Data
const initialRules = [
  // Compliance
  { id: 'RUL-C01', name: 'GST Mandatory', description: 'Ensures GST identification number is present on Indian invoices.', category: 'compliance', severity: 'critical', enabled: true, owner: 'Finance Dept', lastUpdated: 'Oct 15, 2026', type: 'Tax', risk: 'High', lastAudit: 'Sep 2026', evidence: 'Missing GSTIN format.' },
  { id: 'RUL-C02', name: 'Invoice Number Format', description: 'Validates invoice number length and alphanumeric format.', category: 'compliance', severity: 'medium', enabled: true, owner: 'Operations', lastUpdated: 'Oct 10, 2026', type: 'Format', risk: 'Low', lastAudit: 'Oct 2026', evidence: 'Invalid string pattern.' },
  { id: 'RUL-C03', name: 'Audit Trail Required', description: 'Checks if document metadata contains valid creation stamps.', category: 'compliance', severity: 'high', enabled: false, owner: 'IT Security', lastUpdated: 'Sep 22, 2026', type: 'Audit', risk: 'High', lastAudit: 'Aug 2026', evidence: 'Missing PDF metadata.' },
  
  // Policy
  { id: 'RUL-P01', name: 'Maximum Daily Hours', description: 'Flags timesheets exceeding 12 hours billed in a single day.', category: 'policy', severity: 'high', enabled: true, owner: 'HR Dept', lastUpdated: 'Oct 01, 2026', appliesTo: 'All Contractors', status: 'Active' },
  { id: 'RUL-P02', name: 'Weekend Billing', description: 'Flags billable hours logged on Saturdays or Sundays.', category: 'policy', severity: 'medium', enabled: false, owner: 'Project Mgmt', lastUpdated: 'Oct 05, 2026', appliesTo: 'Non-Exempt', status: 'Disabled' },
  { id: 'RUL-P03', name: 'Duplicate Billing Prevention', description: 'Checks for duplicate hour entries on identical dates.', category: 'policy', severity: 'critical', enabled: true, owner: 'Finance Dept', lastUpdated: 'Oct 20, 2026', appliesTo: 'All Employees', status: 'Active' },

  // Validation
  { id: 'RUL-V01', name: 'Missing Signature', description: 'Detects the absence of a handwritten/digital signature.', category: 'validation', severity: 'critical', enabled: true, owner: 'AI Engine', lastUpdated: 'Oct 25, 2026', logic: 'OCR Signature Block', threshold: '90%', accuracy: '99.2%', failures: '14', lastTriggered: '2 hrs ago' },
  { id: 'RUL-V02', name: 'OCR Confidence Threshold', description: 'Fails documents if average OCR confidence falls below 85%.', category: 'validation', severity: 'high', enabled: true, owner: 'AI Engine', lastUpdated: 'Oct 26, 2026', logic: 'Avg Confidence Score', threshold: '85%', accuracy: '100%', failures: '3', lastTriggered: '10 mins ago' },
  
  // Finance
  { id: 'RUL-F01', name: 'Overtime Calculation', description: 'Applies 1.5x multiplier to hours over 40 per week.', category: 'finance', severity: 'high', enabled: true, owner: 'Billing Team', lastUpdated: 'Sep 15, 2026', formula: '(Hours - 40) * (Rate * 1.5)', currency: 'USD', defaultValue: '0', usedBy: '12 Clients' },
  { id: 'RUL-F02', name: 'Currency Conversion', description: 'Converts EUR/GBP to USD using daily spot rate.', category: 'finance', severity: 'medium', enabled: true, owner: 'Treasury', lastUpdated: 'Oct 26, 2026', formula: 'Amount * FX_Rate_Daily', currency: 'Multi', defaultValue: '1.0', usedBy: '4 Clients' },
];

export function BusinessRules() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [rules, setRules] = useState(initialRules);
  const [selectedRule, setSelectedRule] = useState<any>(null);
  
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  // Filter Rules
  const displayedRules = useMemo(() => {
    return rules.filter(r => {
      const matchesCategory = activeCategory === 'all' || r.category === activeCategory;
      const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [rules, activeCategory, searchQuery]);

  // Actions
  const toggleRule = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 3000);
    }, 800);
  };

  // KPIs
  const renderKPIs = () => {
    if (activeCategory === 'all') {
      const total = rules.length;
      const enabled = rules.filter(r => r.enabled).length;
      return (
        <div className="grid grid-cols-4 gap-4 mb-8">
          <KPICard title="Total Rules" value={total} />
          <KPICard title="Enabled" value={enabled} color="text-success" />
          <KPICard title="Disabled" value={total - enabled} color="text-muted-foreground" />
          <KPICard title="Pending Review" value={2} color="text-warning" />
        </div>
      );
    }
    if (activeCategory === 'compliance') {
      return (
        <div className="grid grid-cols-4 gap-4 mb-8">
          <KPICard title="GST Rules" value={4} />
          <KPICard title="Tax Rules" value={12} />
          <KPICard title="Labor Rules" value={3} />
          <KPICard title="Audit Rules" value={1} color="text-warning" />
        </div>
      );
    }
    if (activeCategory === 'policy') {
      return (
        <div className="grid grid-cols-4 gap-4 mb-8">
          <KPICard title="Policy Rules" value={8} />
          <KPICard title="Approvals" value={142} color="text-success" />
          <KPICard title="Exceptions" value={12} color="text-warning" />
          <KPICard title="Violations" value={3} color="text-danger" />
        </div>
      );
    }
    if (activeCategory === 'validation') {
      return (
        <div className="grid grid-cols-4 gap-4 mb-8">
          <KPICard title="Validation Rules" value={15} />
          <KPICard title="Avg Confidence" value="96.4%" color="text-success" />
          <KPICard title="Failed Today" value={42} color="text-danger" />
          <KPICard title="Avg Accuracy" value="99.1%" />
        </div>
      );
    }
    if (activeCategory === 'finance') {
      return (
        <div className="grid grid-cols-4 gap-4 mb-8">
          <KPICard title="Billing Rules" value={6} />
          <KPICard title="Rate Rules" value={24} />
          <KPICard title="Tax Rules" value={8} />
          <KPICard title="Currency Rules" value={2} />
        </div>
      );
    }
  };

  // Tables
  const renderTable = () => {
    return (
      <div className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-panel border-b border-border/50 text-xs font-mono text-muted-foreground uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4 font-medium">Rule Name</th>
              
              {activeCategory === 'all' && (
                <>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Owner</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </>
              )}
              {activeCategory === 'compliance' && (
                <>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Risk Level</th>
                  <th className="px-6 py-4 font-medium">Last Audit</th>
                </>
              )}
              {activeCategory === 'policy' && (
                <>
                  <th className="px-6 py-4 font-medium">Business Owner</th>
                  <th className="px-6 py-4 font-medium">Applies To</th>
                  <th className="px-6 py-4 font-medium">Severity</th>
                </>
              )}
              {activeCategory === 'validation' && (
                <>
                  <th className="px-6 py-4 font-medium">Logic</th>
                  <th className="px-6 py-4 font-medium">Threshold</th>
                  <th className="px-6 py-4 font-medium">Accuracy</th>
                </>
              )}
              {activeCategory === 'finance' && (
                <>
                  <th className="px-6 py-4 font-medium">Formula</th>
                  <th className="px-6 py-4 font-medium">Currency</th>
                  <th className="px-6 py-4 font-medium">Used By</th>
                </>
              )}
              
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {displayedRules.map((rule) => (
              <tr 
                key={rule.id} 
                onClick={() => setSelectedRule(rule)}
                className="hover:bg-panel/50 transition-colors cursor-pointer group"
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-foreground">{rule.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 truncate max-w-xs">{rule.description}</div>
                </td>

                {activeCategory === 'all' && (
                  <>
                    <td className="px-6 py-4 text-muted-foreground capitalize">{rule.category}</td>
                    <td className="px-6 py-4 text-muted-foreground">{rule.owner}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[11px] font-mono uppercase tracking-widest border ${rule.enabled ? 'bg-success/10 text-success border-success/20' : 'bg-panel text-muted-foreground border-border'}`}>
                        {rule.enabled ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                  </>
                )}
                {activeCategory === 'compliance' && (
                  <>
                    <td className="px-6 py-4 text-muted-foreground">{rule.type}</td>
                    <td className="px-6 py-4 text-muted-foreground">{rule.risk}</td>
                    <td className="px-6 py-4 text-muted-foreground">{rule.lastAudit}</td>
                  </>
                )}
                {activeCategory === 'policy' && (
                  <>
                    <td className="px-6 py-4 text-muted-foreground">{rule.owner}</td>
                    <td className="px-6 py-4 text-muted-foreground">{rule.appliesTo}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[11px] font-mono uppercase tracking-widest border ${
                        rule.severity === 'critical' ? 'bg-danger/10 text-danger border-danger/20' :
                        rule.severity === 'high' ? 'bg-warning/10 text-warning border-warning/20' :
                        'bg-primary/10 text-primary border-primary/20'
                      }`}>{rule.severity}</span>
                    </td>
                  </>
                )}
                {activeCategory === 'validation' && (
                  <>
                    <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{rule.logic}</td>
                    <td className="px-6 py-4 text-muted-foreground">{rule.threshold}</td>
                    <td className="px-6 py-4 text-success">{rule.accuracy}</td>
                  </>
                )}
                {activeCategory === 'finance' && (
                  <>
                    <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{rule.formula}</td>
                    <td className="px-6 py-4 text-muted-foreground">{rule.currency}</td>
                    <td className="px-6 py-4 text-muted-foreground">{rule.usedBy}</td>
                  </>
                )}

                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-3">
                    <button 
                      onClick={(e) => toggleRule(rule.id, e)}
                      className={`w-10 h-5 rounded-full transition-colors relative flex items-center ${rule.enabled ? 'bg-success' : 'bg-panel border border-border'}`}
                    >
                      <div className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${rule.enabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </button>
                    <button className="text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100" onClick={(e) => { e.stopPropagation(); setSelectedRule(rule); }}>
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {displayedRules.length === 0 && (
          <div className="p-10 text-center text-muted-foreground text-sm">
            No rules found for this criteria.
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-full overflow-hidden relative">
      <div className="flex flex-col flex-1 overflow-hidden transition-all duration-300">
        {/* Header */}
        <div className="pt-8 px-10 pb-6 shrink-0 border-b border-[#2A3442]/50 bg-[#0B0F14] z-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-1">
              {activeCategory === 'all' ? 'All Business Rules' : 
               activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1) + ' Rules'}
            </h1>
            <p className="text-muted-foreground text-[15px]">Manage and configure enterprise AI policies.</p>
          </div>
          <div className="flex items-center space-x-3">
            {showSaved && (
              <span className="text-sm font-medium text-success flex items-center animate-in fade-in slide-in-from-right-4">
                <CheckCircle2 size={16} className="mr-1.5" /> Published
              </span>
            )}
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center disabled:opacity-50"
            >
              {isSaving ? <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2"></div> : <Save size={16} className="mr-2" />}
              Publish Changes
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Categories Sidebar */}
          <div className="w-64 border-r border-[#2A3442]/50 bg-[#0B0F14] p-6 shrink-0 hidden md:block">
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Categories</div>
            <div className="space-y-1">
              {['all', 'compliance', 'policy', 'validation', 'finance'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    activeCategory === cat ? 'bg-panel text-foreground shadow-sm border border-border/50' : 'text-muted-foreground hover:bg-panel hover:text-foreground'
                  }`}
                >
                  {cat === 'all' ? 'All Rules' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-10 bg-[#0B0F14]">
            <div className="max-w-6xl mx-auto">
              {renderKPIs()}
              
              <div className="flex items-center justify-between mb-6">
                <div className="relative w-80">
                  <Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search rules..." 
                    className="w-full bg-panel border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors shadow-sm"
                  />
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-panel border border-border hover:bg-card rounded-lg flex items-center text-sm font-medium text-foreground transition-colors shadow-sm">
                    <Filter size={16} className="mr-2" /> Filter
                  </button>
                </div>
              </div>

              {renderTable()}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Detail Panel */}
      {selectedRule && (
        <div className="w-96 border-l border-border/50 bg-[#0B0F14] shrink-0 shadow-2xl flex flex-col absolute right-0 top-0 bottom-0 z-20 animate-in slide-in-from-right">
          <div className="p-6 border-b border-border/50 flex items-center justify-between bg-panel/30">
            <h2 className="font-semibold text-lg text-foreground">Rule Details</h2>
            <button onClick={() => setSelectedRule(null)} className="text-muted-foreground hover:text-foreground transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className={`text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded border ${
                  selectedRule.severity === 'critical' ? 'bg-danger/10 text-danger border-danger/20' :
                  selectedRule.severity === 'high' ? 'bg-warning/10 text-warning border-warning/20' :
                  'bg-primary/10 text-primary border-primary/20'
                }`}>
                  {selectedRule.severity || 'Normal'}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground bg-panel px-2 py-0.5 rounded border border-border/50">
                  {selectedRule.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{selectedRule.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedRule.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground mb-1">Status</div>
                <div className={`font-medium ${selectedRule.enabled ? 'text-success' : 'text-muted-foreground'}`}>{selectedRule.enabled ? 'Active' : 'Disabled'}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Owner</div>
                <div className="font-medium text-foreground">{selectedRule.owner}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Last Modified</div>
                <div className="font-medium text-foreground">{selectedRule.lastUpdated}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Rule ID</div>
                <div className="font-mono text-foreground">{selectedRule.id}</div>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-border/50">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Business Impact</div>
              <div className="bg-panel p-4 rounded-lg border border-border text-sm text-foreground">
                This rule intercepted <strong>142</strong> invoices in the last 30 days, preventing approximately <strong>$45,000</strong> in policy violations.
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-border/50">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">AI Recommendation</div>
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 text-sm text-foreground">
                Based on historical override rates, consider lowering the confidence threshold to <strong>80%</strong> to reduce manual review overhead by 15%.
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-border/50 bg-panel/30 space-y-3 shrink-0">
            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
              <Edit2 size={16} className="mr-2" /> Edit Configuration
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button className="px-4 py-2 bg-panel border border-border hover:bg-card text-foreground rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                <Play size={16} className="mr-2" /> Test
              </button>
              <button 
                onClick={(e) => toggleRule(selectedRule.id, e)}
                className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors flex items-center justify-center ${selectedRule.enabled ? 'bg-danger/10 text-danger border-danger/20 hover:bg-danger/20' : 'bg-success/10 text-success border-success/20 hover:bg-success/20'}`}
              >
                <Power size={16} className="mr-2" /> {selectedRule.enabled ? 'Disable' : 'Enable'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function KPICard({ title, value, color = "text-foreground" }: { title: string, value: string | number, color?: string }) {
  return (
    <div className="bg-card border border-border/60 rounded-xl p-5 shadow-sm">
      <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">{title}</div>
      <div className={`text-2xl font-semibold ${color}`}>{value}</div>
    </div>
  );
}
