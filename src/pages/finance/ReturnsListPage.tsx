import React from 'react';
import { MOCK_RETURNS } from '../../mock/data';
import { StatusBadge } from '../../components/common/StatusBadge';
import { RotateCcw } from 'lucide-react';

export const ReturnsListPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#172033]">Product Return & Exchange Management</h1>
        <p className="text-xs text-[#687085] mt-0.5">
          Review size exchange requests, product damage evidence photos, and return pickup logistics.
        </p>
      </div>

      <div className="space-y-3">
        {MOCK_RETURNS.map((ret) => (
          <div key={ret.id} className="bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-start gap-4">
              <img src={ret.evidenceImages[0]} alt={ret.productName} className="w-16 h-16 rounded-xl object-cover border border-[#DDD7CA]" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-[#243FBA]">{ret.id}</span>
                  <span className="font-mono text-xs text-[#687085]">Order #{ret.orderId}</span>
                  <StatusBadge status={ret.status} size="sm" />
                </div>
                <h3 className="font-bold text-xs text-[#172033] mt-1">{ret.productName}</h3>
                <p className="text-xs text-[#687085] mt-0.5">
                  Reason: <strong className="text-amber-800">{ret.reason.replace(/_/g, ' ')}</strong> • Size: {ret.size} • Color: {ret.color}
                </p>
                <p className="text-[11px] text-[#687085]">Customer: {ret.customerName}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-[#DDD7CA] bg-[#F5F0E6] text-xs font-semibold text-[#172033]">
                Request Photo Evidence
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-[#243FBA] text-white font-bold text-xs">
                Approve Return Pickup
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
