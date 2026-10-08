import React from 'react';
import { MOCK_WALLETS } from '../../mock/data';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Wallet, Shield } from 'lucide-react';

export const WalletSupportPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#172033]">WearNear Wallet & Audit Transaction Console</h1>
        <p className="text-xs text-[#687085] mt-0.5">
          Inspect customer and store digital wallet ledgers. Every adjustment creates an immutable audit trail.
        </p>
      </div>

      <div className="space-y-3">
        {MOCK_WALLETS.map((w) => (
          <div key={w.id} className="bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-[#243FBA]">{w.id}</span>
                <span className="font-mono text-xs text-[#687085]">{w.walletId}</span>
                <StatusBadge status={w.status} size="sm" />
              </div>
              <h3 className="font-bold text-xs text-[#172033] mt-1">{w.entityName} ({w.entityType})</h3>
              <p className="text-xs text-[#687085] mt-0.5">Reason: {w.reason}</p>
              <p className="text-[11px] text-[#687085]">Performed by: <strong className="text-[#172033]">{w.performedBy}</strong></p>
            </div>

            <div className="text-right shrink-0">
              <span className={`font-mono font-bold text-base block ${w.type === 'CREDIT' ? 'text-emerald-700' : 'text-red-700'}`}>
                {w.type === 'CREDIT' ? '+' : '-'}₹{w.amount}
              </span>
              <span className="text-[11px] font-mono text-[#687085]">{w.createdAt.slice(0, 10)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
