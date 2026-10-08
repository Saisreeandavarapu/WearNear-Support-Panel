import React from 'react';
import { MOCK_COD } from '../../mock/data';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Coins, AlertTriangle } from 'lucide-react';

export const CODSupportPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#172033]">COD Cash Collection & Settlement Support</h1>
        <p className="text-xs text-[#687085] mt-0.5">
          Reconcile physical cash collected by delivery captains against order receipts and store bank deposits.
        </p>
      </div>

      <div className="space-y-3">
        {MOCK_COD.map((cod) => (
          <div key={cod.id} className="bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-[#243FBA]">{cod.id}</span>
                <span className="font-mono text-xs text-[#687085]">Order #{cod.orderId}</span>
                <StatusBadge status={cod.collectionStatus} size="sm" />
                <StatusBadge status={cod.settlementStatus} size="sm" />
              </div>
              <h3 className="font-bold text-xs text-[#172033] mt-1">Customer: {cod.customerName}</h3>
              <p className="text-xs text-[#687085] mt-0.5">
                Captain: <strong className="text-[#172033]">{cod.captainName} ({cod.captainId})</strong> • Ref: {cod.transactionRef}
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="font-mono font-bold text-base text-[#172033] block">₹{cod.collectedAmount}</span>
              <span className="text-[11px] text-[#687085]">Collected at {cod.collectedAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
