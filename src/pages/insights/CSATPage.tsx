import React from 'react';
import { MOCK_CSAT } from '../../mock/data';
import { Smile, Star } from 'lucide-react';

export const CSATPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#172033]">Customer Satisfaction (CSAT) Metrics</h1>
        <p className="text-xs text-[#687085] mt-0.5">
          1–5 rating customer ratings, feedback comments, and agent satisfaction performance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#FFFCF5] border border-[#DDD7CA] space-y-1">
          <span className="text-xs font-bold text-[#687085] uppercase">Average CSAT Score</span>
          <span className="text-3xl font-extrabold text-amber-700 block font-mono flex items-center gap-1">
            4.7 <Star className="w-6 h-6 fill-amber-500 text-amber-500 inline" />
          </span>
          <span className="text-xs text-[#687085]">Based on 142 customer survey responses this month</span>
        </div>
      </div>

      <div className="space-y-3">
        {MOCK_CSAT.map((c) => (
          <div key={c.id} className="bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA] space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-[#172033]">{c.customerName}</span>
                <span className="text-xs text-[#687085]">Ticket #{c.ticketId}</span>
              </div>
              <div className="flex items-center gap-1 font-bold text-sm text-amber-700">
                {Array.from({ length: c.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
            </div>

            <p className="text-xs text-[#172033] italic bg-[#F5F0E6] p-3 rounded-xl border border-[#DDD7CA]">
              "{c.feedback}"
            </p>

            <div className="text-[11px] text-[#687085]">
              Handled by Agent <strong className="text-[#172033]">{c.agentName}</strong> • Category: {c.category}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
