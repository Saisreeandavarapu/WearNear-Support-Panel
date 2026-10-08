import React from 'react';
import { MOCK_STORES } from '../../mock/data';
import { StatusBadge } from '../../components/common/StatusBadge';
import { MaskedData } from '../../components/common/MaskedData';
import { Store as StoreIcon, Star, ShieldCheck, ShoppingBag } from 'lucide-react';

export const StoresListPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#172033]">Store Partner Operations Directory</h1>
        <p className="text-xs text-[#687085] mt-0.5">
          Inspect partner stores, catalogue listings, open store disputes, and settlement histories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_STORES.map((s) => (
          <div key={s.id} className="bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA] space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#DDD7CA] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-[#172033]">{s.name}</h3>
                  <span className="font-mono text-xs font-semibold text-[#243FBA]">{s.id}</span>
                </div>
                <p className="text-xs text-[#687085] mt-0.5">{s.address}</p>
              </div>
              <StatusBadge status={s.status} size="sm" />
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#687085]">Owner:</span>
                <strong className="text-[#172033]">{s.ownerName}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#687085]">Mobile:</span>
                <MaskedData value={s.mobile} type="phone" />
              </div>
              <div className="flex justify-between">
                <span className="text-[#687085]">Catalogue Products:</span>
                <strong className="text-[#172033]">{s.totalProducts} active SKUs</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#687085]">Open Issues:</span>
                <span className={`font-bold ${s.openIssuesCount > 0 ? 'text-amber-800 font-mono' : 'text-emerald-700'}`}>
                  {s.openIssuesCount} issues
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#DDD7CA] flex items-center justify-between text-xs">
              <span className="font-bold text-amber-700 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {s.rating} Rating
              </span>
              <button className="px-3 py-1.5 rounded bg-[#243FBA] text-white font-semibold text-xs">
                Inspect Store Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
