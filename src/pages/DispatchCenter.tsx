import { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Clock, 
  Mail, 
  Eye, 
  ThumbsUp, 
  DollarSign, 
  XCircle,
  Search,
  Filter
} from 'lucide-react';

export function DispatchCenter() {
  const [dispatches] = useState([
    {
      id: 'DISP-992',
      invoice: 'INV-2023-10-A',
      client: 'Infosys',
      amount: '$14,250.00',
      status: 'Paid',
      timeline: [
        { state: 'Generated', time: 'Oct 16, 09:00 AM', icon: FileText, color: 'text-primary' },
        { state: 'Dispatched via API', time: 'Oct 16, 09:05 AM', icon: Send, color: 'text-primary' },
        { state: 'Delivered', time: 'Oct 16, 09:06 AM', icon: CheckCircle2, color: 'text-primary' },
        { state: 'Viewed by Client', time: 'Oct 16, 11:30 AM', icon: Eye, color: 'text-primary' },
        { state: 'Client Approved', time: 'Oct 17, 10:15 AM', icon: ThumbsUp, color: 'text-primary' },
        { state: 'Payment Received', time: 'Oct 19, 02:45 PM', icon: DollarSign, color: 'text-success' },
      ]
    },
    {
      id: 'DISP-991',
      invoice: 'INV-2023-10-B',
      client: 'TCS',
      amount: '$8,400.00',
      status: 'Awaiting Approval',
      timeline: [
        { state: 'Generated', time: 'Oct 18, 11:00 AM', icon: FileText, color: 'text-primary' },
        { state: 'Dispatched via Email', time: 'Oct 18, 11:05 AM', icon: Mail, color: 'text-primary' },
        { state: 'Delivered', time: 'Oct 18, 11:06 AM', icon: CheckCircle2, color: 'text-primary' },
        { state: 'Viewed by Client', time: 'Oct 18, 04:20 PM', icon: Eye, color: 'text-primary' },
        { state: 'Awaiting Approval', time: 'Currently Pending', icon: Clock, color: 'text-warning' },
      ]
    },
    {
      id: 'DISP-990',
      invoice: 'INV-2023-10-C',
      client: 'Wipro',
      amount: '$22,100.00',
      status: 'Rejected',
      timeline: [
        { state: 'Generated', time: 'Oct 19, 08:30 AM', icon: FileText, color: 'text-primary' },
        { state: 'Dispatched via API', time: 'Oct 19, 08:35 AM', icon: Send, color: 'text-primary' },
        { state: 'Delivered', time: 'Oct 19, 08:36 AM', icon: CheckCircle2, color: 'text-primary' },
        { state: 'Rejected by Client', time: 'Oct 19, 09:15 AM', icon: XCircle, color: 'text-danger', note: 'Disputed overtime hours.' },
      ]
    }
  ]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="pt-8 px-10 pb-6 shrink-0 border-b border-[#2A3442]/50 bg-[#0B0F14] z-10">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-1">Dispatch Center</h1>
            <p className="text-muted-foreground text-[15px]">Track final invoice delivery, client viewing, and payment status.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
              <input 
                type="text" 
                placeholder="Search dispatches..." 
                className="w-full bg-panel border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors shadow-sm"
              />
            </div>
            <button className="px-4 py-2 bg-panel border border-border hover:bg-card rounded-lg flex items-center text-sm font-medium text-foreground transition-colors shadow-sm">
              <Filter size={16} className="mr-2" /> Filter
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-10 bg-[#0B0F14]">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {dispatches.map(dispatch => (
            <div key={dispatch.id} className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-sm flex flex-col">
              <div className="p-6 border-b border-border/50 bg-panel/30">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1">{dispatch.client}</h3>
                    <span className="text-muted-foreground font-mono text-xs bg-panel px-2 py-0.5 rounded border border-border/50">{dispatch.invoice}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-lg font-medium text-foreground">{dispatch.amount}</div>
                  </div>
                </div>
                <div className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${
                  dispatch.status === 'Paid' ? 'bg-success/10 text-success border-success/20' :
                  dispatch.status === 'Rejected' ? 'bg-danger/10 text-danger border-danger/20' :
                  'bg-warning/10 text-warning border-warning/20'
                }`}>
                  {dispatch.status}
                </div>
              </div>
              
              <div className="p-6 flex-1 bg-black/10">
                <div className="relative border-l-2 border-border/50 ml-3 space-y-6">
                  {dispatch.timeline.map((event, i) => {
                    const isLast = i === dispatch.timeline.length - 1;
                    return (
                      <div key={i} className="relative pl-6">
                        <div className={`absolute -left-[11px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center bg-card border-2 ${
                          isLast && dispatch.status === 'Paid' ? 'border-success text-success' :
                          isLast && dispatch.status === 'Rejected' ? 'border-danger text-danger' :
                          isLast && dispatch.status === 'Awaiting Approval' ? 'border-warning text-warning' :
                          'border-primary text-primary'
                        }`}>
                          <event.icon size={10} strokeWidth={3} />
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${isLast ? 'text-foreground' : 'text-muted-foreground'}`}>{event.state}</p>
                          <p className="text-xs font-mono text-muted-foreground mt-0.5">{event.time}</p>
                          {event.note && (
                            <div className="mt-2 text-xs text-danger bg-danger/10 border border-danger/20 p-2 rounded-md">
                              {event.note}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Needed to import FileText since we used it in the state
import { FileText } from 'lucide-react';
