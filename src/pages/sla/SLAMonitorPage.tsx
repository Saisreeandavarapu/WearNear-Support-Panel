import React from 'react';
import { MOCK_SLA_RULES, MOCK_TICKETS } from '../../mock/data';
import { StatusBadge } from '../../components/common/StatusBadge';
import { SLACountdown } from '../../components/common/SLACountdown';
import { Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const SLAMonitorPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#172033]">SLA Breaches & Compliance Rules</h1>
        <p className="text-xs text-[#687085] mt-0.5">
          Real-time first response SLA, resolution SLA, and configured target rules per category and priority.
        </p>
      </div>

      {/* SLA COMPLIANCE METRICS SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#FFFCF5] border border-[#DDD7CA] space-y-1">
          <span className="text-xs font-bold text-[#687085] uppercase">First Response Compliance</span>
          <span className="text-2xl font-bold text-emerald-800 block font-mono">96.4%</span>
          <span className="text-[11px] text-[#687085]">Target: 95.0% • Avg time: 4m 12s</span>
        </div>

        <div className="p-4 rounded-xl bg-[#FFFCF5] border border-[#DDD7CA] space-y-1">
          <span className="text-xs font-bold text-[#687085] uppercase">Resolution SLA Compliance</span>
          <span className="text-2xl font-bold text-emerald-800 block font-mono">92.8%</span>
          <span className="text-[11px] text-[#687085]">Target: 90.0% • Avg resolution: 18m</span>
        </div>

        <div className="p-4 rounded-xl bg-[#FFFCF5] border border-red-200 bg-red-50/50 space-y-1">
          <span className="text-xs font-bold text-red-700 uppercase">Active SLA Breaches</span>
          <span className="text-2xl font-bold text-red-800 block font-mono">1 Ticket</span>
          <span className="text-[11px] text-red-700">Critical action required on TKT10003</span>
        </div>
      </div>

      {/* ACTIVE TICKETS SLA MONITOR TABLE */}
      <div className="bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA] space-y-4 shadow-xs">
        <h3 className="font-bold text-sm text-[#172033] flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#243FBA]" /> Live SLA Timers for Active Tickets
        </h3>

        <div className="space-y-3">
          {MOCK_TICKETS.map((t) => (
            <div key={t.id} className="p-4 rounded-xl border border-[#DDD7CA] bg-[#F5F0E6] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#243FBA]">{t.id}</span>
                  <StatusBadge status={t.status} size="sm" />
                </div>
                <h4 className="font-bold text-[#172033] mt-1">{t.subject}</h4>
                <p className="text-[#687085]">Category: {t.category} • Assigned: {t.assignedAgentName || 'Unassigned'}</p>
              </div>

              <div className="flex items-center gap-3">
                <SLACountdown
                  label="First Response"
                  initialSeconds={t.firstResponseSLA.remainingSeconds}
                  status={t.firstResponseSLA.status}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SLA CONFIGURATION RULES TABLE */}
      <div className="bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA] space-y-4 shadow-xs">
        <h3 className="font-bold text-sm text-[#172033]">Enterprise SLA Target Rules</h3>
        <div className="overflow-x-auto rounded-xl border border-[#DDD7CA]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F0E6] font-semibold text-[#172033] border-b border-[#DDD7CA]">
              <tr>
                <th className="py-2.5 px-4">Category</th>
                <th className="py-2.5 px-4">Priority</th>
                <th className="py-2.5 px-4">Target First Response</th>
                <th className="py-2.5 px-4">Target Resolution</th>
                <th className="py-2.5 px-4">Auto-Escalation Threshold</th>
                <th className="py-2.5 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD7CA]">
              {MOCK_SLA_RULES.map((rule) => (
                <tr key={rule.id} className="hover:bg-[#F5F0E6]/50">
                  <td className="py-2.5 px-4 font-bold text-[#172033]">{rule.category}</td>
                  <td className="py-2.5 px-4 font-semibold text-[#243FBA]">{rule.priority}</td>
                  <td className="py-2.5 px-4 font-mono">{rule.firstResponseMinutes} mins</td>
                  <td className="py-2.5 px-4 font-mono">{rule.resolutionMinutes} mins</td>
                  <td className="py-2.5 px-4 font-mono">{rule.escalationMinutes} mins</td>
                  <td className="py-2.5 px-4 text-right">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                      ACTIVE
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
