import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  comparison?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  description?: string;
  variant?: 'default' | 'danger' | 'warning' | 'primary' | 'success';
  onClick?: () => void;
  isActive?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  comparison,
  trend = 'neutral',
  icon: Icon,
  description,
  variant = 'default',
  onClick,
  isActive = false,
}) => {
  let cardBg = 'bg-[#FFFCF5] border-[#DDD7CA] hover:border-[#243FBA]';
  let iconBg = 'bg-[#F5F0E6] text-[#243FBA]';
  let valueColor = 'text-[#172033]';

  if (variant === 'danger') {
    cardBg = 'bg-red-50/50 border-red-200 hover:border-red-400';
    iconBg = 'bg-red-100 text-red-700';
    valueColor = 'text-red-700';
  } else if (variant === 'warning') {
    cardBg = 'bg-amber-50/50 border-amber-200 hover:border-amber-400';
    iconBg = 'bg-amber-100 text-amber-800';
    valueColor = 'text-amber-800';
  } else if (variant === 'primary') {
    cardBg = 'bg-blue-50/50 border-blue-200 hover:border-blue-400';
    iconBg = 'bg-blue-100 text-blue-800';
    valueColor = 'text-blue-900';
  } else if (variant === 'success') {
    cardBg = 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-400';
    iconBg = 'bg-emerald-100 text-emerald-800';
    valueColor = 'text-emerald-900';
  }

  if (isActive) {
    cardBg += ' ring-2 ring-[#243FBA]';
  }

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl border transition-all duration-150 shadow-2xs ${cardBg} ${
        onClick ? 'cursor-pointer select-none' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-xs font-semibold text-[#687085] uppercase tracking-wider block">{title}</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`text-2xl font-bold font-sans tracking-tight ${valueColor}`}>{value}</span>
            {comparison && (
              <span
                className={`inline-flex items-center text-xs font-medium ${
                  trend === 'up'
                    ? 'text-emerald-700'
                    : trend === 'down'
                    ? 'text-red-700'
                    : 'text-[#687085]'
                }`}
              >
                {trend === 'up' && <TrendingUp className="w-3 h-3 mr-0.5" />}
                {trend === 'down' && <TrendingDown className="w-3 h-3 mr-0.5" />}
                {trend === 'neutral' && <Minus className="w-3 h-3 mr-0.5" />}
                {comparison}
              </span>
            )}
          </div>
        </div>
        <div className={`p-2.5 rounded-lg shrink-0 ${iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {description && <p className="text-[11px] text-[#687085] mt-2 line-clamp-1">{description}</p>}
    </div>
  );
};
