import React from 'react';
import { TicketStatus, SLAState } from '../../types';

interface StatusBadgeProps {
  status: TicketStatus | SLAState | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  let colorClasses = 'bg-gray-100 text-gray-700 border-gray-200';
  let dotColor = 'bg-gray-400';
  let formattedStatus = status.replace(/_/g, ' ');

  switch (status) {
    case 'OPEN':
      colorClasses = 'bg-amber-50 text-amber-800 border-amber-300';
      dotColor = 'bg-amber-500';
      break;
    case 'ASSIGNED':
    case 'IN_PROGRESS':
      colorClasses = 'bg-blue-50 text-blue-800 border-blue-300';
      dotColor = 'bg-blue-600';
      break;
    case 'WAITING_FOR_CUSTOMER':
    case 'WAITING_FOR_STORE':
    case 'WAITING_FOR_CAPTAIN':
      colorClasses = 'bg-purple-50 text-purple-800 border-purple-300';
      dotColor = 'bg-purple-600';
      break;
    case 'INVESTIGATION':
      colorClasses = 'bg-indigo-50 text-indigo-800 border-indigo-300';
      dotColor = 'bg-indigo-600';
      break;
    case 'RESOLVED':
    case 'CLOSED':
    case 'SUCCESS':
    case 'DELIVERED':
    case 'HEALTHY':
    case 'PROCESSED':
    case 'VERIFIED':
    case 'REFUNDED':
    case 'ACTIVE':
      colorClasses = 'bg-emerald-50 text-emerald-800 border-emerald-300';
      dotColor = 'bg-emerald-600';
      break;
    case 'REOPENED':
    case 'WARNING':
    case 'AT_RISK':
    case 'REFUND_REQUESTED':
    case 'PENDING':
    case 'IN_TRANSIT':
      colorClasses = 'bg-amber-50 text-amber-800 border-amber-300';
      dotColor = 'bg-amber-600';
      break;
    case 'BREACHED':
    case 'FAILED':
    case 'CANCELLED':
    case 'REFUND_REJECTED':
    case 'BLOCKED':
    case 'SUSPENDED':
      colorClasses = 'bg-red-50 text-red-800 border-red-300';
      dotColor = 'bg-red-600';
      break;
  }

  const px = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${px} ${colorClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span className="capitalize">{formattedStatus.toLowerCase()}</span>
    </span>
  );
};
