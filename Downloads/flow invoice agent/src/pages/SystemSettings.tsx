import { useState } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Key, 
  Database,
  Save,
  CheckCircle2
} from 'lucide-react';

export function SystemSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

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
          <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-1">System Settings</h1>
          <p className="text-muted-foreground text-[15px]">Manage global platform preferences, security, and access controls.</p>
        </div>
        <div className="flex items-center space-x-3">
          {showSaved && (
            <span className="text-sm font-medium text-success flex items-center animate-in fade-in slide-in-from-right-4">
              <CheckCircle2 size={16} className="mr-1.5" /> Saved Successfully
            </span>
          )}
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center disabled:opacity-50"
          >
            {isSaving ? <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2"></div> : <Save size={16} className="mr-2" />}
            Save Settings
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Tabs */}
        <div className="w-64 border-r border-[#2A3442]/50 bg-[#0B0F14] p-6 space-y-2 shrink-0 hidden md:block">
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4 pl-3">Preferences</div>
          <button 
            onClick={() => setActiveTab('general')}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'general' ? 'bg-panel text-foreground shadow-sm border border-border/50' : 'text-muted-foreground hover:text-foreground hover:bg-panel/50'}`}
          >
            <Settings size={16} className="mr-3" /> General
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'security' ? 'bg-panel text-foreground shadow-sm border border-border/50' : 'text-muted-foreground hover:text-foreground hover:bg-panel/50'}`}
          >
            <Shield size={16} className="mr-3" /> Security
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'notifications' ? 'bg-panel text-foreground shadow-sm border border-border/50' : 'text-muted-foreground hover:text-foreground hover:bg-panel/50'}`}
          >
            <Bell size={16} className="mr-3" /> Notifications
          </button>
          <button 
            onClick={() => setActiveTab('api')}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'api' ? 'bg-panel text-foreground shadow-sm border border-border/50' : 'text-muted-foreground hover:text-foreground hover:bg-panel/50'}`}
          >
            <Key size={16} className="mr-3" /> API Keys
          </button>
          <button 
            onClick={() => setActiveTab('backup')}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'backup' ? 'bg-panel text-foreground shadow-sm border border-border/50' : 'text-muted-foreground hover:text-foreground hover:bg-panel/50'}`}
          >
            <Database size={16} className="mr-3" /> Data Backup
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 bg-[#0B0F14]">
          <div className="max-w-3xl">
            
            {activeTab === 'general' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="bg-card border border-border/60 rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-foreground mb-6">Platform Settings</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Platform Name</label>
                      <input type="text" defaultValue="FlowInvoice AI Operations" className="w-full bg-panel border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Default Timezone</label>
                      <select className="w-full bg-panel border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors appearance-none">
                        <option>UTC (Coordinated Universal Time)</option>
                        <option>EST (Eastern Standard Time)</option>
                        <option>PST (Pacific Standard Time)</option>
                      </select>
                    </div>
                    <div className="pt-4 flex items-center space-x-3 border-t border-border/50">
                      <div className="w-10 h-5 rounded-full bg-primary relative cursor-pointer">
                        <div className="absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full translate-x-5 transition-transform"></div>
                      </div>
                      <span className="text-sm font-medium text-foreground">Enable Dark Mode globally</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="bg-card border border-border/60 rounded-xl p-6 shadow-sm flex items-start space-x-4">
                  <div className="p-3 bg-danger/10 text-danger rounded-lg shrink-0">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-1">Two-Factor Authentication (2FA)</h3>
                    <p className="text-sm text-muted-foreground mb-4">Require all administrators and managers to authenticate with a second factor.</p>
                    <button className="px-4 py-2 bg-panel border border-border hover:bg-card text-foreground rounded-lg text-sm font-medium transition-colors">
                      Configure 2FA
                    </button>
                  </div>
                </div>

                <div className="bg-card border border-border/60 rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-foreground mb-6">Password Policy</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Minimum password length</span>
                      <select className="bg-panel border border-border rounded-md px-3 py-1.5 text-sm">
                        <option>8 characters</option>
                        <option selected>12 characters</option>
                        <option>16 characters</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Require uppercase & numbers</span>
                      <div className="w-10 h-5 rounded-full bg-primary relative cursor-pointer">
                        <div className="absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full translate-x-5 transition-transform"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Force password reset every 90 days</span>
                      <div className="w-10 h-5 rounded-full bg-panel border border-border relative cursor-pointer">
                        <div className="absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {(activeTab === 'notifications' || activeTab === 'api' || activeTab === 'backup') && (
              <div className="bg-card border border-border/60 rounded-xl p-8 text-center text-muted-foreground animate-in fade-in">
                <Settings className="mx-auto mb-4 opacity-50" size={32} />
                <p>This configuration panel is available in the Enterprise Edition.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
