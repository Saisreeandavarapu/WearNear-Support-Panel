import React from 'react';
import { BarChart3, Download } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export const ReportsPage: React.FC = () => {
  const reportData = [
    { name: 'Tanuja Sen', handled: 48, resolved: 46, avgTime: '14m' },
    { name: 'Karthik Raja', handled: 36, resolved: 32, avgTime: '22m' },
    { name: 'Deepak Verma', handled: 29, resolved: 28, avgTime: '16m' },
    { name: 'Simran Kaur', handled: 41, resolved: 40, avgTime: '12m' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#172033]">Support Operational Performance Reports</h1>
          <p className="text-xs text-[#687085] mt-0.5">
            Agent productivity, ticket handling capacity, resolution speeds, and SLA compliance.
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-[#243FBA] text-white font-bold text-xs flex items-center gap-1.5">
          <Download className="w-4 h-4" />
          <span>Export CSV Report</span>
        </button>
      </div>

      <div className="bg-[#FFFCF5] p-6 rounded-2xl border border-[#DDD7CA] space-y-4 shadow-xs">
        <h3 className="font-bold text-sm text-[#172033]">Agent Ticket Handling Output</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reportData}>
              <XAxis dataKey="name" stroke="#687085" fontSize={11} />
              <YAxis stroke="#687085" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#172033', color: '#fff', borderRadius: '8px', fontSize: '12px' }} />
              <Bar dataKey="handled" name="Tickets Handled" fill="#3155D8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="resolved" name="Tickets Resolved" fill="#16A34A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
