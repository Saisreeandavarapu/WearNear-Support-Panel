import React from 'react';
import { MOCK_SETTLEMENTS } from '../../mock/data';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Building } from 'lucide-react';

export const SettlementsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#172033]">Store & Captain Financial Settlements</h1>
        <p className="text-xs text-[#687085] mt-0.5">
          Review weekly net payouts, commission deductions, adjustments, and bank transfer statuses.
        </p>
      </div>

      <div className="space-y-3">
        {MOCK_SETTLEMENTS.map((s) => (
          <div key={s.id} className="bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA] space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#DDD7CA] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-[#172033]">{s.entityName} ({s.entityType})</h3>
                  <span className="font-mono text-xs font-semibold text-[#243FBA]">{s.id}</span>
                </div>
                <p className="text-xs text-[#687085] mt-0.5">Settlement Period: {s.period}</p>
              </div>
              <StatusBadge status={s.status} size="sm" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              <div>
                <span className="text-[#687085] block">Gross Sales:</span>
                <span className="font-mono font-semibold text-[#172033]">₹{s.grossAmount}</span>
              </div>
              <div>
                <span className="text-[#687085] block">WearNear Commission:</span>
                <span className="font-mono text-amber-800">-₹{s.commission}</span>
              </div>
              <div>
                <span className="text-[#687085] block">Adjustments:</span>
                <span className="font-mono text-red-700">₹{s.adjustments}</span>
              </div>
              <div>
                <span className="text-[#687085] block">Refunds Deducted:</span>
                <span className="font-mono text-purple-700">₹{s.refunds}</span>
              </div>
              <div>
                <span className="text-[#687085] block">Net Payout Amount:</span>
                <span className="font-mono font-bold text-sm text-emerald-800">₹{s.netAmount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
