import { Send, FileText, Bot, Paperclip } from 'lucide-react';

export function PortalMessages() {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full max-w-5xl mx-auto border-x border-[#2A3442]/50 bg-[#0B0F14]">
      <div className="h-16 border-b border-[#2A3442]/50 flex items-center px-8 bg-[#0B0F14] shrink-0">
        <h1 className="text-lg font-medium text-foreground tracking-tight">TASC Support & AI</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        
        {/* User Message */}
        <div className="flex justify-end">
          <div className="max-w-[80%]">
            <div className="bg-[#151A21] border border-[#2A3442]/50 rounded-2xl rounded-tr-sm p-4 text-sm text-foreground shadow-sm">
              I noticed that invoice INV-8925 is stuck in approvals. The overtime was pre-approved by email.
            </div>
            <div className="text-[11px] font-mono text-muted-foreground mt-1.5 text-right">Today at 10:45 AM</div>
          </div>
        </div>

        {/* AI Assistant Message */}
        <div className="flex justify-start">
          <div className="max-w-[80%] flex space-x-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 border border-primary/30">
              <Bot size={16} />
            </div>
            <div>
              <div className="bg-[#1D2430] border border-[#2A3442]/60 rounded-2xl rounded-tl-sm p-4 text-sm text-foreground shadow-sm">
                <p className="mb-3">I understand. Since the overtime exceeds the SLA threshold of 10 hours, I flagged it for safety.</p>
                <p>If you have the email approval, you can upload it here, or you can simply click "Approve" in the Approval Center and note that it was pre-approved.</p>
                <div className="mt-4 p-3 bg-[#151A21] border border-[#2A3442]/50 rounded-lg flex items-center space-x-3 cursor-pointer hover:border-primary/50 transition-colors">
                  <FileText size={16} className="text-muted-foreground" />
                  <span className="font-medium text-primary text-[13px]">Go to Approval Center</span>
                </div>
              </div>
              <div className="text-[11px] font-mono text-muted-foreground mt-1.5">FlowInvoice AI • Today at 10:46 AM</div>
            </div>
          </div>
        </div>

      </div>

      {/* Input Area */}
      <div className="p-6 bg-[#0B0F14] border-t border-[#2A3442]/50 shrink-0">
        <div className="relative">
          <button className="absolute left-4 top-3.5 text-muted-foreground hover:text-foreground transition-colors">
            <Paperclip size={18} />
          </button>
          <input 
            type="text" 
            placeholder="Type a message or paste a reference..." 
            className="w-full bg-[#151A21] border border-[#2A3442] rounded-xl pl-12 pr-14 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors shadow-sm"
          />
          <button className="absolute right-3 top-2.5 p-1 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
            <Send size={16} />
          </button>
        </div>
        <div className="flex items-center space-x-2 mt-3 pl-2">
          <span className="text-xs text-muted-foreground">Suggested:</span>
          <button className="text-xs px-2 py-1 bg-[#151A21] border border-[#2A3442] rounded-md text-muted-foreground hover:text-foreground transition-colors">
            Upload email approval
          </button>
          <button className="text-xs px-2 py-1 bg-[#151A21] border border-[#2A3442] rounded-md text-muted-foreground hover:text-foreground transition-colors">
            Connect to human agent
          </button>
        </div>
      </div>
    </div>
  );
}
