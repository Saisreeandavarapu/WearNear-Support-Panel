import React, { useState } from 'react';
import { MOCK_AUDIT_LOGS } from '../../mock/data';
import { ShieldCheck, ChevronDown, ChevronRight, Laptop } from 'lucide-react';

export const AuditLogsPage: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(MOCK_AUDIT_LOGS[0].id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#172033]">Forensic Audit Logs & Compliance Ledger</h1>
        <p className="text-xs text-[#687085] mt-0.5">
          Immutable audit records of all financial approvals, status changes, captain reassignments, and sensitive data access.
        </p>
      </div>

      <div className="bg-[#FFFCF5] rounded-2xl border border-[#DDD7CA] overflow-hidden shadow-xs">
        <div className="p-4 bg-[#F5F0E6] border-b border-[#DDD7CA] font-bold text-xs text-[#172033] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700" /> Authorized Forensic Support Audit Trail
        </div>

        <div className="divide-y divide-[#DDD7CA]">
          {MOCK_AUDIT_LOGS.map((aud) => {
            const isExpanded = expandedId === aud.id;
            return (
              <div key={aud.id} className="p-4 hover:bg-[#F5F0E6]/50 transition-colors">
                <div
                  onClick={() => setExpandedId(isExpanded ? null : aud.id)}
                  className="flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-[#243FBA]" /> : <ChevronRight className="w-4 h-4 text-[#687085]" />}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#243FBA]">{aud.id}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-blue-50 text-blue-900 border border-blue-200 uppercase">
                          {aud.action}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-[#172033] mt-0.5">
                        User: {aud.user} ({aud.role.replace(/_/g, ' ')})
                      </p>
                    </div>
                  </div>

                  <div className="text-right text-xs">
                    <span className="font-mono text-[#687085] block">{aud.timestamp}</span>
                    <span className="text-[11px] text-[#687085]">IP: {aud.ipAddress}</span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-[#DDD7CA] space-y-3 text-xs bg-[#F5F0E6] p-4 rounded-xl">
                    <div>
                      <span className="text-[#687085] font-semibold block">Mandatory Reason:</span>
                      <p className="font-semibold text-[#172033] mt-0.5">{aud.reason}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <span className="font-bold text-red-900 block text-[11px] uppercase">Old Value State:</span>
                        <code className="font-mono text-xs text-red-800 block mt-1">{aud.oldValue || 'N/A'}</code>
                      </div>
                      <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                        <span className="font-bold text-emerald-900 block text-[11px] uppercase">New Value State:</span>
                        <code className="font-mono text-xs text-emerald-800 block mt-1">{aud.newValue || 'N/A'}</code>
                      </div>
                    </div>

                    <div className="text-[11px] text-[#687085] flex items-center gap-2 pt-1">
                      <Laptop className="w-3.5 h-3.5" /> Device Context: {aud.device}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
