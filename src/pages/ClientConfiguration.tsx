import { useState } from 'react';
import { 
  Building2, 
  Settings2, 
  Save, 
  Server, 
  Shield, 
  User, 
  Search,
  CheckCircle2
} from 'lucide-react';

export function ClientConfiguration() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  
  const [config, setConfig] = useState({
    companyName: 'Infosys Ltd',
    industry: 'Technology Services',
    taxId: 'IN-48992011',
    erpSystem: 'SAP S/4HANA',
    erpEndpoint: 'https://api.sap.infosys.com/v2/invoices',
    autoApproveThreshold: '5000',
    requireManagerSig: true,
    allowWeekendBilling: false,
    alertOnDuplicate: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 3000);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="pt-8 px-10 pb-6 shrink-0 border-b border-[#2A3442]/50 bg-[#0B0F14] z-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-1">Client Configuration</h1>
          <p className="text-muted-foreground text-[15px]">Manage enterprise profiles, ERP mappings, and custom workflow rules.</p>
        </div>
        <div className="flex items-center space-x-3">
          {showSaved && (
            <span className="text-sm font-medium text-success flex items-center animate-in fade-in slide-in-from-right-4">
              <CheckCircle2 size={16} className="mr-1.5" /> Saved
            </span>
          )}
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center disabled:opacity-50"
          >
            {isSaving ? <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2"></div> : <Save size={16} className="mr-2" />}
            Save Configuration
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Tabs */}
        <div className="w-64 border-r border-[#2A3442]/50 bg-[#0B0F14] p-6 space-y-2 shrink-0">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-2.5 text-muted-foreground" size={14} />
            <input 
              type="text" 
              placeholder="Search clients..." 
              className="w-full bg-panel border border-border rounded-lg pl-8 pr-4 py-1.5 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3 pl-3">Active Client</div>
          <button className="w-full text-left px-3 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 text-sm font-medium">
            Infosys Ltd
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg text-muted-foreground hover:bg-panel hover:text-foreground transition-colors text-sm font-medium">
            TCS
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg text-muted-foreground hover:bg-panel hover:text-foreground transition-colors text-sm font-medium">
            Wipro
          </button>

          <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-8 mb-3 pl-3">Settings</div>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-panel text-foreground shadow-sm border border-border/50' : 'text-muted-foreground hover:text-foreground hover:bg-panel/50'}`}
          >
            <Building2 size={16} className="mr-3" /> Company Profile
          </button>
          <button 
            onClick={() => setActiveTab('erp')}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'erp' ? 'bg-panel text-foreground shadow-sm border border-border/50' : 'text-muted-foreground hover:text-foreground hover:bg-panel/50'}`}
          >
            <Server size={16} className="mr-3" /> ERP Integration
          </button>
          <button 
            onClick={() => setActiveTab('workflow')}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'workflow' ? 'bg-panel text-foreground shadow-sm border border-border/50' : 'text-muted-foreground hover:text-foreground hover:bg-panel/50'}`}
          >
            <Shield size={16} className="mr-3" /> Workflow Rules
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 bg-[#0B0F14]">
          <div className="max-w-3xl">
            
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="bg-card border border-border/60 rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-foreground mb-6 flex items-center">
                    <User className="mr-2 text-primary" size={20} /> General Information
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Company Name</label>
                      <input name="companyName" value={config.companyName} onChange={handleChange} className="w-full bg-panel border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Industry</label>
                      <input name="industry" value={config.industry} onChange={handleChange} className="w-full bg-panel border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Tax / Registration ID</label>
                      <input name="taxId" value={config.taxId} onChange={handleChange} className="w-full bg-panel border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'erp' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="bg-card border border-border/60 rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-foreground mb-6 flex items-center">
                    <Server className="mr-2 text-primary" size={20} /> ERP Connection Settings
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Target System</label>
                      <select name="erpSystem" value={config.erpSystem} onChange={handleChange} className="w-full bg-panel border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors appearance-none">
                        <option>SAP S/4HANA</option>
                        <option>Oracle NetSuite</option>
                        <option>Workday Financials</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">API Endpoint URL</label>
                      <input name="erpEndpoint" value={config.erpEndpoint} onChange={handleChange} className="w-full bg-panel border border-border rounded-lg px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div className="pt-4 flex items-center justify-between border-t border-border/50">
                      <div>
                        <div className="font-medium text-foreground text-sm">Connection Status</div>
                        <div className="text-xs text-muted-foreground">Last verified: 10 mins ago</div>
                      </div>
                      <span className="px-3 py-1 bg-success/10 text-success border border-success/20 rounded-md text-xs font-medium">Connected</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'workflow' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="bg-card border border-border/60 rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-foreground mb-6 flex items-center">
                    <Shield className="mr-2 text-primary" size={20} /> Validation Rules
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Auto-Approve Threshold ($)</label>
                      <input name="autoApproveThreshold" value={config.autoApproveThreshold} onChange={handleChange} className="w-full bg-panel border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
                      <p className="text-xs text-muted-foreground">Invoices below this amount bypass manual review if confidence is high.</p>
                    </div>

                    <div className="pt-4 space-y-4">
                      <label className="flex items-center space-x-3 cursor-pointer group">
                        <div className={`w-10 h-5 rounded-full transition-colors relative ${config.requireManagerSig ? 'bg-primary' : 'bg-panel border border-border'}`}>
                          <div className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${config.requireManagerSig ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </div>
                        <input type="checkbox" name="requireManagerSig" checked={config.requireManagerSig} onChange={handleChange} className="hidden" />
                        <div>
                          <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Require Manager Signature</div>
                          <div className="text-xs text-muted-foreground">Flag timesheets missing a physical or digital signature.</div>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3 cursor-pointer group">
                        <div className={`w-10 h-5 rounded-full transition-colors relative ${config.allowWeekendBilling ? 'bg-primary' : 'bg-panel border border-border'}`}>
                          <div className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${config.allowWeekendBilling ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </div>
                        <input type="checkbox" name="allowWeekendBilling" checked={config.allowWeekendBilling} onChange={handleChange} className="hidden" />
                        <div>
                          <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Allow Weekend Billing</div>
                          <div className="text-xs text-muted-foreground">Permit hours billed on Saturday/Sunday without flagging.</div>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3 cursor-pointer group">
                        <div className={`w-10 h-5 rounded-full transition-colors relative ${config.alertOnDuplicate ? 'bg-primary' : 'bg-panel border border-border'}`}>
                          <div className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${config.alertOnDuplicate ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </div>
                        <input type="checkbox" name="alertOnDuplicate" checked={config.alertOnDuplicate} onChange={handleChange} className="hidden" />
                        <div>
                          <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Duplicate Detection</div>
                          <div className="text-xs text-muted-foreground">Use AI semantic matching to detect similar prior invoices.</div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
