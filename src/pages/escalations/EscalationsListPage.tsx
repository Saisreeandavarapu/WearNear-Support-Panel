import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_ESCALATIONS } from '../../mock/data';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import { AlertTriangle, ArrowRight } from 'lucide-react';

export const EscalationsListPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#172033]">Support Escalation Command Queue</h1>
        <p className="text-xs text-[#687085] mt-0.5">
          Tickets escalated across L1 Support, L2 Senior Agent, L3 Operations/Finance, and L4 Support Admin.
        </p>
      </div>

      <div className="space-y-3">
        {MOCK_ESCALATIONS.map((esc) => (
          <div key={esc.id} className="bg-[#FFFCF5] p-5 rounded-2xl border border-amber-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-[#243FBA]">{esc.id}</span>
                <span className="font-mono text-xs text-[#687085]">Ticket #{esc.ticketId}</span>
                <PriorityBadge priority={esc.priority} />
                <StatusBadge status={esc.status} size="sm" />
              </div>

              <h3 className="font-bold text-sm text-[#172033] mt-1">Customer: {esc.customerName}</h3>
              <p className="text-xs text-[#687085] mt-0.5">
                Escalated from <strong className="text-[#172033]">L{esc.fromLevel} ({esc.fromTeam})</strong> ➔ <strong className="text-amber-900 font-bold">L{esc.toLevel} ({esc.toTeam})</strong>
              </p>
              <p className="text-xs font-semibold text-amber-900 mt-1">Reason: {esc.reason}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => navigate(`/support/tickets/${esc.ticketId}`)}
                className="px-4 py-2 rounded-xl bg-[#243FBA] text-white font-bold text-xs flex items-center gap-1"
              >
                <span>Handle Escalation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
