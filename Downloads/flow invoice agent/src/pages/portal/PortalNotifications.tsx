import { Bell, CheckCircle, FileText, CreditCard } from 'lucide-react';

export function PortalNotifications() {
  const notifications = [
    {
      id: 1,
      type: 'approval',
      icon: CheckCircle,
      title: 'Approval Required',
      message: 'Invoice INV-8925 requires your manual approval due to an SLA exception.',
      time: '10 mins ago',
      unread: true,
      color: 'text-[#F59E0B]',
      bg: 'bg-[#F59E0B]/10 border-[#F59E0B]/20'
    },
    {
      id: 2,
      type: 'invoice',
      icon: FileText,
      title: 'Invoice Generated',
      message: 'Invoice INV-8924 for Project Phoenix has been generated and is ready for download.',
      time: '1 hour ago',
      unread: true,
      color: 'text-primary',
      bg: 'bg-primary/10 border-primary/20'
    },
    {
      id: 3,
      type: 'payment',
      icon: CreditCard,
      title: 'Payment Received',
      message: 'Payment of $12,200.00 for INV-8890 has been successfully processed.',
      time: 'Yesterday',
      unread: false,
      color: 'text-[#22C55E]',
      bg: 'bg-[#22C55E]/10 border-[#22C55E]/20'
    }
  ];

  return (
    <div className="p-12 w-full max-w-4xl mx-auto h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Notifications</h1>
          <p className="text-muted-foreground">Stay updated on your invoicing pipeline.</p>
        </div>
        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <div 
            key={notif.id} 
            className={`p-6 rounded-xl border transition-all cursor-pointer flex items-start space-x-5 ${
              notif.unread 
                ? 'bg-[#1D2430] border-[#2A3442]/80 shadow-sm' 
                : 'bg-[#0B0F14] border-[#2A3442]/40 opacity-70 hover:opacity-100'
            }`}
          >
            <div className={`p-3 rounded-lg border shrink-0 ${notif.bg} ${notif.color}`}>
              <notif.icon size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className={`font-medium text-sm ${notif.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {notif.title}
                </h3>
                <span className="text-[11px] font-mono text-muted-foreground">{notif.time}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {notif.message}
              </p>
            </div>
            {notif.unread && (
              <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
