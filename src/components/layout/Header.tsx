import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  Shield,
  LogOut,
  AlertTriangle,
} from 'lucide-react';
import logoPng from '../../assets/logo.png';
import { useAuth } from '../../context/AuthContext';
import { useSupport } from '../../context/SupportContext';
import { AgentStatus } from '../../types';
import { Tooltip } from '../common/Tooltip';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu, title = 'Support Command Center' }) => {
  const { user, setAgentStatus, logout } = useAuth();
  const { setIsSearchOpen, tickets } = useSupport();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const breachedCount = tickets.filter((t) => t.firstResponseSLA.status === 'BREACHED').length;

  return (
    <header className="h-14 sm:h-16 bg-[#FFFCF5] border-b border-[#DDD7CA] px-3 sm:px-6 flex items-center justify-between z-20 sticky top-0 backdrop-blur-xs bg-opacity-95">
      {/* LEFT AREA: Mobile Menu Trigger + Logo (Mobile) / Breadcrumbs (Desktop) */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          aria-label="Open navigation menu"
          className="flex xl:hidden p-2 rounded-xl text-[#172033] hover:bg-[#F5F0E6] focus:outline-none focus:ring-2 focus:ring-[#3155D8] min-h-[44px] min-w-[44px] items-center justify-center"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Logo Brand Display */}
        <div className="flex xl:hidden items-center gap-2">
          <img src={logoPng} alt="WearNear" className="max-h-7 w-auto object-contain" />
          <span className="font-extrabold text-xs tracking-wider text-[#172033] uppercase">Support Panel</span>
        </div>

        {/* Desktop Page Title & Breadcrumb */}
        <div className="hidden xl:block">
          <h2 className="text-base font-bold text-[#172033] tracking-tight">{title}</h2>
          <div className="flex items-center gap-1.5 text-[11px] text-[#687085]">
            <span>Support Panel</span>
            <span>/</span>
            <span className="font-mono text-[#243FBA] font-semibold">{user?.role.replace(/_/g, ' ')}</span>
          </div>
        </div>
      </div>

      {/* CENTER AREA: Global Search Command Palette (Desktop) */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl border border-[#DDD7CA] bg-white text-xs text-[#687085] hover:border-[#243FBA] transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#3155D8]"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[#243FBA]" />
            <span className="truncate">Search customer, order, ticket, store, captain...</span>
          </div>
          <kbd className="px-2 py-0.5 text-[10px] font-mono bg-[#F5F0E6] rounded border border-[#DDD7CA] text-[#172033]">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* RIGHT AREA: Mobile Search Icon, SLA Alerts, Notifications, Profile Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search Icon */}
        <button
          onClick={() => setIsSearchOpen(true)}
          aria-label="Search"
          className="flex md:hidden p-2.5 rounded-xl text-[#172033] hover:bg-[#F5F0E6] min-h-[44px] min-w-[44px] items-center justify-center"
        >
          <Search className="w-5 h-5 text-[#243FBA]" />
        </button>

        {/* SLA BREACH WARNING BADGE */}
        {breachedCount > 0 && (
          <button
            onClick={() => navigate('/support/sla')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors animate-pulse"
            title="Active SLA Breaches"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            <span className="hidden sm:inline">SLA:</span>
            <span>{breachedCount} Breached</span>
          </button>
        )}

        {/* AGENT AVAILABILITY SELECTOR */}
        <div className="hidden sm:flex items-center gap-1.5 bg-[#F5F0E6] px-2.5 py-1 rounded-full border border-[#DDD7CA] text-xs">
          <span
            className={`w-2 h-2 rounded-full ${
              user?.status === 'AVAILABLE'
                ? 'bg-emerald-500'
                : user?.status === 'AWAY'
                ? 'bg-amber-500'
                : 'bg-gray-400'
            }`}
          />
          <select
            value={user?.status}
            onChange={(e) => setAgentStatus(e.target.value as AgentStatus)}
            className="bg-transparent font-medium text-[#172033] focus:outline-none cursor-pointer text-xs"
          >
            <option value="AVAILABLE">Available</option>
            <option value="AWAY">Away</option>
            <option value="OFFLINE">Offline</option>
          </select>
        </div>

        {/* NOTIFICATIONS ICON */}
        <Tooltip content="Notifications" position="bottom">
          <button
            onClick={() => navigate('/support/notifications')}
            aria-label="Notifications"
            className="relative p-2.5 rounded-xl text-[#172033] hover:bg-[#F5F0E6] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#3155D8]" />
          </button>
        </Tooltip>

        {/* KNOWLEDGE BASE HELP ICON */}
        <Tooltip content="Knowledge Base SOP" position="bottom">
          <button
            onClick={() => navigate('/support/knowledge-base')}
            aria-label="Help & Knowledge Base"
            className="hidden sm:flex p-2.5 rounded-xl text-[#172033] hover:bg-[#F5F0E6] transition-colors min-h-[44px] min-w-[44px] items-center justify-center"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </Tooltip>

        {/* PROFILE MENU DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            aria-label="User account menu"
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-[#F5F0E6] transition-colors min-h-[44px]"
          >
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover border border-[#DDD7CA]"
            />
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-[#172033]">{user?.name}</div>
              <div className="text-[10px] text-[#687085]">{user?.employeeId}</div>
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[#FFFCF5] rounded-xl border border-[#DDD7CA] shadow-2xl py-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3.5 py-2 border-b border-[#DDD7CA]">
                <p className="font-bold text-[#172033]">{user?.name}</p>
                <p className="text-[11px] text-[#687085]">{user?.email}</p>
                <p className="font-mono text-[10px] text-[#243FBA] font-semibold mt-1">
                  {user?.role.replace(/_/g, ' ')}
                </p>
              </div>

              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate('/support/settings');
                }}
                className="w-full text-left px-3.5 py-2 hover:bg-[#F5F0E6] flex items-center gap-2 text-[#172033] font-medium"
              >
                <Shield className="w-4 h-4 text-[#243FBA]" /> Account Settings
              </button>

              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  logout();
                  navigate('/support/login');
                }}
                className="w-full text-left px-3.5 py-2 hover:bg-red-50 flex items-center gap-2 text-red-600 font-semibold border-t border-[#DDD7CA] mt-1"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
