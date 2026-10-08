import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { Tooltip } from '../common/Tooltip';

interface SidebarItemProps {
  label: string;
  path: string;
  icon: LucideIcon;
  badge?: number | string;
  isCollapsed: boolean;
  onItemClick?: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  path,
  icon: Icon,
  badge,
  isCollapsed,
  onItemClick,
}) => {
  const location = useLocation();
  const isActive =
    location.pathname === path || (path !== '/support/dashboard' && location.pathname.startsWith(path));

  const linkContent = (
    <NavLink
      to={path}
      onClick={onItemClick}
      aria-current={isActive ? 'page' : undefined}
      className={`relative flex items-center min-h-[42px] rounded-xl text-xs font-medium transition-all duration-200 ease-out select-none group focus:outline-none focus:ring-2 focus:ring-[#3155D8] ${
        isCollapsed ? 'justify-center w-11 h-11 mx-auto px-0' : 'w-full px-3 gap-3'
      } ${
        isActive
          ? 'bg-[#243FBA] text-white font-bold shadow-sm'
          : 'text-gray-300 hover:bg-white/10 hover:text-white'
      }`}
    >
      {/* Active Left Indicator Pill when Expanded */}
      {!isCollapsed && isActive && (
        <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#F59E0B]" />
      )}

      {/* Icon */}
      <Icon
        className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
          isActive ? 'text-white scale-110' : 'text-blue-300 group-hover:text-white group-hover:scale-105'
        }`}
      />

      {/* Smoothly animated text label */}
      <div
        className={`transition-all duration-200 ease-out overflow-hidden whitespace-nowrap flex-1 flex items-center justify-between ${
          isCollapsed ? 'max-w-0 opacity-0 pointer-events-none' : 'max-w-[180px] opacity-100'
        }`}
      >
        <span className="truncate text-left">{label}</span>
        {badge !== undefined && (
          <span
            className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono shrink-0 ${
              isActive ? 'bg-white text-[#243FBA]' : 'bg-[#3155D8] text-white'
            }`}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Collapsed Badge Pill */}
      {isCollapsed && badge !== undefined && (
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#F59E0B] text-white text-[9px] font-bold font-mono flex items-center justify-center border border-[#172033]">
          {typeof badge === 'number' && badge > 99 ? '99+' : badge}
        </span>
      )}
    </NavLink>
  );

  if (isCollapsed) {
    return (
      <Tooltip content={badge !== undefined ? `${label} (${badge})` : label} position="right">
        {linkContent}
      </Tooltip>
    );
  }

  return linkContent;
};
