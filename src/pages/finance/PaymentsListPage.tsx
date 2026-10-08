import React from 'react';
import { MOCK_PAYMENTS } from '../../mock/data';
import { StatusBadge } from '../../components/common/StatusBadge';
import { MaskedData } from '../../components/common/MaskedData';
import { CreditCard, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const PaymentsListPage: React.FC = () => {
  const { hasPermission } = useAuth();
  const canReadPayment = hasPermission('READ_PAYMENT');

  if (!canReadPayment) {
    return (
      <div className="bg-[#FFFCF5] p-8 rounded-2xl border border-red-200 text-center space-y-3">
        <ShieldAlert className="w-12 h-12 text-red-600 mx-auto" />
        <h2 className="text-lg font-bold text-[#172033]">Access Restricted (RBAC)</h2>
        <p className="text-xs text-[#687085] max-w-md mx-auto">
          Your current support role does not possess permissions to view financial payment transactions. Please contact your Support Administrator.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#172033]">Payment Transactions & Gateway Disputes</h1>
        <p className="text-xs text-[#687085] mt-0.5">
          Authoritative financial payment records from payment gateways (Razorpay, PayTM, PhonePe, Stripe).
        </p>
      </div>

      <div className="space-y-3">
        {MOCK_PAYMENTS.map((p) => (
          <div key={p.id} className="bg-[#FFFCF5] p-4 rounded-xl border border-[#DDD7CA] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-[#243FBA]">{p.id}</span>
                <span className="font-mono text-xs text-[#687085]">Order #{p.orderId}</span>
                <StatusBadge status={p.status} size="sm" />
              </div>
              <h4 className="font-bold text-xs text-[#172033] mt-1">Customer: {p.customerName}</h4>
              <p className="text-[11px] text-[#687085]">
                Gateway: {p.gateway} • Ref: <span className="font-mono">{p.transactionRef}</span> • Method: {p.method}
              </p>
              {p.failureReason && (
                <p className="text-[11px] text-red-600 font-semibold mt-0.5">Failure Reason: {p.failureReason}</p>
              )}
            </div>

            <div className="text-right shrink-0">
              <span className="font-mono font-bold text-base text-[#172033] block">₹{p.amount}</span>
              <span className="text-[11px] text-[#687085]">{p.createdAt.slice(0, 10)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
