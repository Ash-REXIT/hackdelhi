import { Building, CreditCard, Users, Bell, Shield } from 'lucide-react';

export function PortalAccount() {
  return (
    <div className="p-12 w-full max-w-4xl mx-auto h-full overflow-y-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Account Settings</h1>
        <p className="text-muted-foreground">Manage your company profile and portal preferences.</p>
      </div>

      <div className="space-y-8">
        
        {/* Company Info */}
        <section className="bg-[#1D2430] border border-[#2A3442]/60 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <Building className="text-primary" size={20} />
            <h2 className="text-lg font-medium text-foreground">Company Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Company Name</label>
              <div className="p-3 bg-[#151A21] border border-[#2A3442]/50 rounded-lg text-sm text-foreground">Infosys Limited</div>
            </div>
            <div>
              <label className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Primary Industry</label>
              <div className="p-3 bg-[#151A21] border border-[#2A3442]/50 rounded-lg text-sm text-foreground">Information Technology</div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Billing Address</label>
              <div className="p-3 bg-[#151A21] border border-[#2A3442]/50 rounded-lg text-sm text-foreground">
                Electronics City, Hosur Road<br />
                Bengaluru, Karnataka 560100<br />
                India
              </div>
            </div>
          </div>
        </section>

        {/* Assigned Team */}
        <section className="bg-[#1D2430] border border-[#2A3442]/60 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <Users className="text-primary" size={20} />
            <h2 className="text-lg font-medium text-foreground">Assigned TASC Team</h2>
          </div>
          <div className="flex items-center justify-between p-4 bg-[#151A21] border border-[#2A3442]/50 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-medium border border-primary/30">
                AS
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Alice Smith</div>
                <div className="text-xs text-muted-foreground font-mono mt-0.5">Account Manager</div>
              </div>
            </div>
            <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              Contact
            </button>
          </div>
        </section>

        {/* Quick Settings Toggles */}
        <section className="bg-[#1D2430] border border-[#2A3442]/60 rounded-2xl p-8 shadow-sm">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-6 border-b border-[#2A3442]/50">
              <div className="flex items-center space-x-4">
                <Bell className="text-muted-foreground" size={20} />
                <div>
                  <div className="text-sm font-medium text-foreground">Email Notifications</div>
                  <div className="text-xs text-muted-foreground mt-1">Receive daily summaries of processed invoices.</div>
                </div>
              </div>
              <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Shield className="text-muted-foreground" size={20} />
                <div>
                  <div className="text-sm font-medium text-foreground">Two-Factor Authentication</div>
                  <div className="text-xs text-muted-foreground mt-1">Secure your portal access with 2FA.</div>
                </div>
              </div>
              <button className="px-4 py-1.5 bg-[#151A21] border border-[#2A3442] hover:bg-[#0B0F14] rounded-lg text-sm font-medium transition-colors">
                Enable
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
