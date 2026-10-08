import React from 'react';
import { TimelineEvent } from '../../types';
import {
  ShoppingBag,
  CreditCard,
  Truck,
  Ticket,
  RefreshCw,
  RotateCcw,
  Store,
  UserCheck,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface TimelineProps {
  events: TimelineEvent[];
  compact?: boolean;
}

export const Timeline: React.FC<TimelineProps> = ({ events, compact = false }) => {
  const getIcon = (type: TimelineEvent['iconType']) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-blue-600" />;
      case 'payment':
        return <CreditCard className="w-4 h-4 text-emerald-600" />;
      case 'delivery':
        return <Truck className="w-4 h-4 text-indigo-600" />;
      case 'ticket':
        return <Ticket className="w-4 h-4 text-amber-600" />;
      case 'refund':
        return <RefreshCw className="w-4 h-4 text-purple-600" />;
      case 'return':
        return <RotateCcw className="w-4 h-4 text-orange-600" />;
      case 'store':
        return <Store className="w-4 h-4 text-teal-600" />;
      case 'captain':
        return <UserCheck className="w-4 h-4 text-blue-700" />;
      case 'audit':
        return <ShieldCheck className="w-4 h-4 text-red-600" />;
      default:
        return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DDD7CA]">
      {events.map((evt) => (
        <div key={evt.id} className="relative flex flex-col sm:flex-row sm:items-start justify-between gap-2 group">
          {/* Node Icon */}
          <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#FFFCF5] border-2 border-[#3155D8] flex items-center justify-center shrink-0 z-10 shadow-sm">
            {getIcon(evt.iconType)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm text-[#172033]">{evt.title}</span>
              {evt.statusBadge && (
                <StatusBadge status={evt.statusBadge.label} size="sm" />
              )}
            </div>

            <p className="text-xs text-[#687085] mt-0.5 leading-relaxed">{evt.description}</p>

            <div className="flex items-center gap-3 text-[11px] text-[#687085] mt-1">
              <span>By <strong className="font-medium text-[#172033]">{evt.actor}</strong> ({evt.actorRole})</span>
              {evt.metadata && (
                <span className="font-mono bg-[#F5F0E6] px-1.5 py-0.5 rounded text-[10px] border border-[#DDD7CA]">
                  {Object.entries(evt.metadata).map(([k, v]) => `${k}: ${v}`).join(' | ')}
                </span>
              )}
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[11px] font-mono text-[#687085] bg-[#F5F0E6] px-2 py-1 rounded border border-[#DDD7CA] inline-block">
              {evt.timestamp}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
