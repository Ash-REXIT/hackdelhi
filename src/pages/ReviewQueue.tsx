import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GitPullRequest, AlertTriangle, ShieldCheck, Search } from 'lucide-react';
import { api } from '@/lib/api';
import type { Timesheet } from '@/types/api';

export function ReviewQueue() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Timesheet[]>([]);

  useEffect(() => {
    const load = () => api<Timesheet[]>('/api/timesheets?queue=review').then(setReviews).catch(console.error);
    load();
    const t = setInterval(load, 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="pt-8 px-10 pb-6 shrink-0 border-b border-[#2A3442]/50 bg-[#0B0F14] z-10">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-1">Review Queue</h1>
          <p className="text-muted-foreground text-[15px]">Human-in-the-loop queue for AI exceptions and ambiguous matches.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 bg-[#0B0F14]">
        <div className="flex flex-col space-y-4 max-w-6xl">
          {reviews.map((review) => {
            const extracted = review.extractedData as Record<string, unknown> | undefined;
            const amb = (extracted?._ambiguityReasons as string[]) || [];
            return (
              <div
                key={review.id}
                className="bg-card border border-border/60 rounded-xl p-6 flex flex-col xl:flex-row xl:items-center justify-between hover:border-primary/50 transition-all shadow-sm cursor-pointer"
                onClick={() => navigate(`/workspace/review/${review.id}`)}
              >
                <div className="flex items-start space-x-4 mb-4 xl:mb-0">
                  <div className="p-3 bg-panel rounded-lg border border-border/50">
                    <GitPullRequest size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-1">
                      {review.documents?.[0]?.fileName || review.id.slice(0, 8)}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">{review.client?.name}</div>
                    <div className="text-sm text-warning flex items-start">
                      <AlertTriangle size={14} className="mr-2 shrink-0 mt-0.5" />
                      {review.exceptionReason || amb[0] || 'Requires manual review'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground uppercase font-mono mb-1">Confidence</div>
                    <div className="font-semibold">{review.overallConfidence ?? '—'}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground uppercase font-mono mb-1">Fraud</div>
                    <div className="font-semibold flex items-center">
                      <ShieldCheck size={14} className="mr-1 text-muted-foreground" />
                      {review.fraudRiskLevel || '—'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {!reviews.length && (
            <p className="text-center text-muted-foreground py-12">No items in review queue</p>
          )}
        </div>
      </div>
    </div>
  );
}
