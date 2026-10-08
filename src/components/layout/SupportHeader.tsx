import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  Clock,
  HelpCircle,
  User as UserIcon,
  LogOut,
  Shield,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSupport } from '../../context/SupportContext';
import { useNavigate } from 'react-router-dom';
import { AgentStatus } from '../../types';

interface HeaderProps {
  onOpenMobileSidebar: () => void;
  title?: string;
}

export const SupportHeader: React.FC<HeaderProps> = ({ onOpenMobileSidebar, title = 'Support Command Center' }) => {
  const { user, setAgentStatus, logout } = useAuth();
  const { setIsSearchOpen, tickets } = useSupport();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const breachedCount = tickets.filter((t) => t.firstResponseSLA.status === 'BREACHED').length;
  const warningCount = tickets.filter((t) => t.firstResponseSLA.status === 'WARNING' || t.resolutionSLA.status === 'AT_RISK').length;

  return (
    <header className="h-16 bg-[#FFFCF5] border-b border-[#DDD7CA] px-4 md:px-6 flex items-center justify-between z-20 sticky top-0">
      {/* LEFT: Mobile Menu Toggle + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="flex md:hidden p-2 rounded-lg text-[#172033] hover:bg-[#F5F0E6]"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-base font-bold text-[#172033] tracking-tight">{title}</h2>
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#687085]">
            <span>Support Panel</span>
            <span>/</span>
            <span className="font-mono text-[#243FBA] font-medium">{user?.role.replace(/_/g, ' ')}</span>
          </div>
        </div>
      </div>

      {/* CENTER: Global Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl border border-[#DDD7CA] bg-white text-xs text-[#687085] hover:border-[#243FBA] transition-colors shadow-2xs"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[#243FBA]" />
            <span>Search customer, order, ticket, store, captain...</span>
          </div>
          <kbd className="px-2 py-0.5 text-[10px] font-mono bg-[#F5F0E6] rounded border border-[#DDD7CA] text-[#172033]">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* RIGHT: Status, Alerts, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search Icon */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex md:hidden p-2 rounded-lg text-[#172033] hover:bg-[#F5F0E6]"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* SLA BREACH / WARNING ALERTS BADGE */}
        {(breachedCount > 0 || warningCount > 0) && (
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

        {/* AVAILABILITY SELECTOR */}
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
        <button
          onClick={() => navigate('/support/notifications')}
          className="relative p-2 rounded-lg text-[#172033] hover:bg-[#F5F0E6] transition-colors"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#3155D8]" />
        </button>

        {/* KNOWLEDGE BASE HELP ICON */}
        <button
          onClick={() => navigate('/support/knowledge-base')}
          className="p-2 rounded-lg text-[#172033] hover:bg-[#F5F0E6] transition-colors"
          title="Knowledge Base Help"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* PROFILE MENU DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-[#F5F0E6] transition-colors"
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
            <div className="absolute right-0 mt-2 w-56 bg-[#FFFCF5] rounded-xl border border-[#DDD7CA] shadow-xl py-2 z-50 text-xs">
              <div className="px-3 py-2 border-b border-[#DDD7CA]">
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
                className="w-full text-left px-3 py-2 hover:bg-[#F5F0E6] flex items-center gap-2 text-[#172033]"
              >
                <Shield className="w-4 h-4 text-[#243FBA]" /> Account Settings
              </button>

              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  logout();
                  navigate('/support/login');
                }}
                className="w-full text-left px-3 py-2 hover:bg-red-50 flex items-center gap-2 text-red-600 font-medium border-t border-[#DDD7CA] mt-1"
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
