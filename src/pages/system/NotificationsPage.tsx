import React from 'react';
import { Bell, AlertTriangle, MessageSquare, CheckCircle2 } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const notifications = [
    {
      id: 'N1',
      title: 'SLA Breach Warning',
      message: 'Ticket #TKT10003 for Ananya Rao has exceeded first response SLA target of 30 minutes.',
      time: '10:40 AM',
      type: 'warning',
      unread: true,
    },
    {
      id: 'N2',
      title: 'Customer Replied',
      message: 'Rahul Sharma replied to ticket #TKT10001 via In-App Chat.',
      time: '10:15 AM',
      type: 'info',
      unread: true,
    },
    {
      id: 'N3',
      title: 'Refund Approved',
      message: 'Partial refund of ₹799 approved for order #WN10002 by Tanuja Sen.',
      time: '09:45 AM',
      type: 'success',
      unread: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#172033]">Notification Center</h1>
          <p className="text-xs text-[#687085] mt-0.5">
            Real-time SLA breaches, customer replies, escalation alerts, and system notices.
          </p>
        </div>

        <button className="text-xs font-semibold text-[#243FBA] hover:underline">Mark All as Read</button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-xl border flex items-start justify-between gap-4 transition-colors ${
              n.unread ? 'bg-[#FFFCF5] border-[#243FBA]' : 'bg-[#FFFCF5]/60 border-[#DDD7CA]'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg mt-0.5 ${n.type === 'warning' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                {n.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#172033] flex items-center gap-2">
                  <span>{n.title}</span>
                  {n.unread && <span className="w-2 h-2 rounded-full bg-[#3155D8]" />}
                </h4>
                <p className="text-xs text-[#687085] mt-0.5">{n.message}</p>
              </div>
            </div>

            <span className="font-mono text-[11px] text-[#687085] shrink-0">{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
