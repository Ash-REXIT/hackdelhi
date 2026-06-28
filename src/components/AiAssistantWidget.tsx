import { useCallback, useEffect, useRef, useState } from 'react';
import { Command, Loader2, Send, Sparkles } from 'lucide-react';
import { api } from '@/lib/api';

type ChatMessage = {
  id: string;
  role: string;
  content: string;
};

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Hi! I can help with timesheets, invoices, validation rules, payroll, and client billing. Ask me anything about your workspace.',
};

export function AiAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [error, setError] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const historyLoaded = useRef(false);

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [isOpen, messages, scrollToBottom]);

  useEffect(() => {
    if (!isOpen || historyLoaded.current) return;

    setHistoryLoading(true);
    setError('');
    api<ChatMessage[]>('/api/chat/history')
      .then((history) => {
        historyLoaded.current = true;
        setMessages(history.length > 0 ? history : [WELCOME]);
      })
      .catch(() => {
        setMessages([WELCOME]);
      })
      .finally(() => setHistoryLoading(false));
  }, [isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    setError('');
    setLoading(true);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
    };
    setMessages((prev) => [...prev.filter((m) => m.id !== 'welcome'), userMsg]);

    try {
      const { reply } = await api<{ reply: string }>('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message: text }),
      });
      setMessages((prev) => [
        ...prev,
        { id: `assistant-${Date.now()}`, role: 'assistant', content: reply },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not reach AI assistant');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <div
        className={`absolute right-6 bottom-20 w-96 max-w-[calc(100vw-3rem)] bg-panel border border-ai-accent/30 rounded-xl shadow-2xl shadow-ai-accent/10 transition-all duration-300 ease-in-out z-40 flex flex-col ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="p-3 border-b border-border flex items-center space-x-2 shrink-0">
          <Sparkles size={16} className="text-ai-accent" />
          <span className="text-sm font-semibold">FlowInvoice AI</span>
        </div>

        <div ref={scrollRef} className="p-4 h-80 overflow-y-auto space-y-3">
          {historyLoading ? (
            <div className="flex items-center justify-center h-full text-xs text-muted-foreground gap-2">
              <Loader2 size={14} className="animate-spin" />
              Loading conversation…
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`text-sm leading-relaxed rounded-lg px-3 py-2.5 ${
                  msg.role === 'user'
                    ? 'bg-primary/15 text-foreground ml-6'
                    : 'bg-background border border-border/60 text-muted-foreground mr-2'
                }`}
              >
                {msg.content}
              </div>
            ))
          )}
          {loading && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
              <Loader2 size={12} className="animate-spin text-ai-accent" />
              Thinking…
            </div>
          )}
        </div>

        {error && (
          <p className="px-3 pb-1 text-[11px] text-danger">{error}</p>
        )}

        <div className="p-3 border-t border-border relative shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading || historyLoading}
            placeholder="Ask about timesheets, invoices…"
            className="w-full bg-background border border-border rounded-lg text-sm pl-3 pr-9 py-2 focus:outline-none focus:border-ai-accent transition-colors disabled:opacity-60"
          />
          <button
            type="button"
            onClick={sendMessage}
            disabled={loading || historyLoading || !input.trim()}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-ai-accent disabled:opacity-40 transition-colors"
            aria-label="Send message"
          >
            <Send size={14} />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="absolute right-6 bottom-6 w-12 h-12 bg-ai-accent hover:bg-ai-accent/90 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 z-40"
        aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'}
      >
        {isOpen ? <Command size={20} /> : <Sparkles size={20} />}
      </button>
    </>
  );
}
