import React from 'react';
import { TicketPriority } from '../../types';
import { AlertTriangle, AlertCircle, ArrowUp, ArrowDown } from 'lucide-react';

interface PriorityBadgeProps {
  priority: TicketPriority;
  showIcon?: boolean;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, showIcon = true }) => {
  let badgeStyle = 'bg-gray-100 text-gray-700 border-gray-300';
  let Icon = ArrowDown;

  switch (priority) {
    case 'LOW':
      badgeStyle = 'bg-slate-100 text-slate-700 border-slate-300';
      Icon = ArrowDown;
      break;
    case 'MEDIUM':
      badgeStyle = 'bg-blue-50 text-blue-800 border-blue-200';
      Icon = ArrowUp;
      break;
    case 'HIGH':
      badgeStyle = 'bg-orange-50 text-orange-800 border-orange-300 font-semibold';
      Icon = ArrowUp;
      break;
    case 'URGENT':
      badgeStyle = 'bg-red-50 text-red-800 border-red-300 font-bold';
      Icon = AlertCircle;
      break;
    case 'CRITICAL':
      badgeStyle = 'bg-red-100 text-red-900 border-red-400 font-bold animate-pulse';
      Icon = AlertTriangle;
      break;
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs border uppercase tracking-wider ${badgeStyle}`}>
      {showIcon && <Icon className="w-3 h-3" />}
      <span>{priority}</span>
    </span>
  );
};
