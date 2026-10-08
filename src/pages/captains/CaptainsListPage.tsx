import React from 'react';
import { MOCK_CAPTAINS } from '../../mock/data';
import { StatusBadge } from '../../components/common/StatusBadge';
import { MaskedData } from '../../components/common/MaskedData';
import { UserCheck, Star, ShieldCheck } from 'lucide-react';

export const CaptainsListPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#172033]">Delivery Captain Operations Directory</h1>
        <p className="text-xs text-[#687085] mt-0.5">
          Inspect captain profiles, vehicle registrations, KYC verification, COD collection balance, and delivery history.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_CAPTAINS.map((c) => (
          <div key={c.id} className="bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA] space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#DDD7CA] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-[#172033]">{c.name}</h3>
                  <span className="font-mono text-xs font-semibold text-[#243FBA]">{c.id}</span>
                </div>
                <p className="text-xs text-[#687085] mt-0.5">{c.vehicle}</p>
              </div>
              <StatusBadge status={c.status} size="sm" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[#687085] block">Mobile:</span>
                <MaskedData value={c.mobile} type="phone" />
              </div>
              <div>
                <span className="text-[#687085] block">KYC Status:</span>
                <span className="font-semibold text-emerald-700 inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> {c.kycStatus}
                </span>
              </div>
              <div>
                <span className="text-[#687085] block">Deliveries Completed:</span>
                <strong className="text-[#172033]">{c.completedDeliveries}</strong> ({c.failedDeliveries} failed)
              </div>
              <div>
                <span className="text-[#687085] block">COD Collected Today:</span>
                <strong className="text-[#172033] font-mono">₹{c.codCollectedToday}</strong>
              </div>
            </div>

            <div className="pt-2 border-t border-[#DDD7CA] flex items-center justify-between text-xs">
              <span className="font-bold text-amber-700 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {c.rating} / 5.0 Rating
              </span>
              <button className="px-3 py-1.5 rounded bg-[#243FBA] text-white font-semibold text-xs">
                Inspect Captain Audit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
