import React, { useState } from 'react';
import { MOCK_REFUNDS } from '../../mock/data';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { RefreshCw, CheckCircle2, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const RefundsListPage: React.FC = () => {
  const { hasPermission } = useAuth();
  const [selectedRefund, setSelectedRefund] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#172033]">Refund Approvals & Disbursement Console</h1>
          <p className="text-xs text-[#687085] mt-0.5">
            Permission-controlled customer refund requests, wallet disbursements, and bank transfers.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {MOCK_REFUNDS.map((r) => (
          <div key={r.id} className="bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-[#243FBA]">{r.id}</span>
                <span className="font-mono text-xs text-[#687085]">Order #{r.orderId}</span>
                <StatusBadge status={r.status} size="sm" />
              </div>
              <h3 className="font-bold text-xs text-[#172033] mt-1">Customer: {r.customerName} ({r.customerId})</h3>
              <p className="text-xs text-[#687085] mt-0.5">Reason: {r.reason}</p>
              <p className="text-[11px] text-[#687085]">
                Requested by: {r.requestedBy} • Destination: <strong className="text-[#172033]">{r.destination}</strong>
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="font-mono font-bold text-lg text-emerald-800 block">₹{r.amount}</span>
              {r.status === 'REFUND_REQUESTED' && hasPermission('APPROVE_REFUND') && (
                <button
                  onClick={() => setSelectedRefund(r.id)}
                  className="mt-2 px-3.5 py-1.5 rounded-lg bg-[#243FBA] hover:bg-[#172B82] text-white font-bold text-xs shadow-xs"
                >
                  Approve Refund
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <ConfirmationModal
        isOpen={Boolean(selectedRefund)}
        onClose={() => setSelectedRefund(null)}
        onConfirm={() => {}}
        title="Approve & Dispatch Refund"
        description="Verify refund parameters against store return receipt and original payment gateway log before dispatch."
        confirmText="Approve Refund Action"
        requireReason
      />
    </div>
  );
};
