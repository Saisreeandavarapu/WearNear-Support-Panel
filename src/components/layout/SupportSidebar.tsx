import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Ticket,
  AlertTriangle,
  Clock,
  ShoppingBag,
  Truck,
  Store,
  Shirt,
  UserCheck as CaptainIcon,
  CreditCard,
  RefreshCw,
  Coins,
  Wallet,
  Building,
  BookOpen,
  FileText,
  BarChart3,
  Smile,
  LineChart,
  Bell,
  ShieldCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  onCloseMobile?: () => void;
}

export const SupportSidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed, onCloseMobile }) => {
  const location = useLocation();
  const { user, setUserRole, maskSensitiveData, setMaskSensitiveData } = useAuth();

  const navGroups = [
    {
      group: 'OVERVIEW',
      items: [
        { label: 'Dashboard', path: '/support/dashboard', icon: LayoutDashboard },
      ],
    },
    {
      group: 'CUSTOMERS',
      items: [
        { label: 'Customers', path: '/support/customers', icon: Users },
        { label: 'Customer 360', path: '/support/customers/CUST101', icon: UserCheck },
      ],
    },
    {
      group: 'SUPPORT',
      items: [
        { label: 'Tickets', path: '/support/tickets', icon: Ticket },
        { label: 'My Tickets', path: '/support/tickets/my', icon: Ticket },
        { label: 'Unassigned', path: '/support/tickets/unassigned', icon: Ticket },
        { label: 'Escalations', path: '/support/escalations', icon: AlertTriangle },
        { label: 'SLA Monitor', path: '/support/sla', icon: Clock },
      ],
    },
    {
      group: 'OPERATIONS',
      items: [
        { label: 'Orders', path: '/support/orders', icon: ShoppingBag },
        { label: 'Delivery Tracking', path: '/support/delivery', icon: Truck },
        { label: 'Stores', path: '/support/stores', icon: Store },
        { label: 'Catalogue', path: '/support/catalogue', icon: Shirt },
        { label: 'Captains', path: '/support/captains', icon: CaptainIcon },
      ],
    },
    {
      group: 'FINANCE',
      items: [
        { label: 'Payments', path: '/support/payments', icon: CreditCard },
        { label: 'Refunds', path: '/support/refunds', icon: RefreshCw },
        { label: 'COD Support', path: '/support/cod', icon: Coins },
        { label: 'Wallet', path: '/support/wallet', icon: Wallet },
        { label: 'Settlements', path: '/support/settlements', icon: Building },
      ],
    },
    {
      group: 'KNOWLEDGE',
      items: [
        { label: 'Knowledge Base', path: '/support/knowledge-base', icon: BookOpen },
        { label: 'Response Templates', path: '/support/templates', icon: FileText },
      ],
    },
    {
      group: 'INSIGHTS',
      items: [
        { label: 'Reports', path: '/support/reports', icon: BarChart3 },
        { label: 'CSAT Ratings', path: '/support/csat', icon: Smile },
        { label: 'Analytics', path: '/support/analytics', icon: LineChart },
      ],
    },
    {
      group: 'SYSTEM',
      items: [
        { label: 'Notifications', path: '/support/notifications', icon: Bell },
        { label: 'Audit Logs', path: '/support/audit', icon: ShieldCheck },
        { label: 'Settings', path: '/support/settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside
      className={`h-screen bg-[#172033] text-white flex flex-col transition-all duration-300 select-none relative z-30 ${
        collapsed ? 'w-[76px]' : 'w-[260px]'
      }`}
    >
      {/* BRAND HEADER */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-[#243FBA]/30 bg-[#172B82]">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-lg bg-[#3155D8] flex items-center justify-center font-black text-white text-lg tracking-wider shrink-0 shadow-md">
            WN
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <h1 className="font-bold text-sm tracking-wide text-white leading-tight uppercase">WearNear</h1>
              <span className="text-[10px] text-blue-200 tracking-wider font-semibold uppercase block">
                Support Panel
              </span>
            </div>
          )}
        </div>

        {/* COLLAPSE BUTTON INSIDE SIDEBAR */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex p-1.5 rounded-lg bg-[#172033] hover:bg-[#243FBA] text-white/80 hover:text-white transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* NAVIGATION GROUPS */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin">
        {navGroups.map((g) => (
          <div key={g.group} className="space-y-1">
            {!collapsed && (
              <h3 className="px-3 text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">
                {g.group}
              </h3>
            )}
            {g.items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/support/dashboard' && location.pathname.startsWith(item.path));

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  className={({ isActive: active }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all group relative ${
                      active || isActive
                        ? 'bg-[#243FBA] text-white font-semibold shadow-xs'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`
                  }
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-blue-300 group-hover:text-white'}`} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* DEMO ROLE & SECURITY TOOLS IN SIDEBAR */}
      {!collapsed && (
        <div className="p-3 border-t border-[#243FBA]/30 bg-[#172B82]/40 text-xs space-y-2">
          <div className="flex items-center justify-between text-[11px] text-gray-300">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-blue-400" /> Support Role
            </span>
            <select
              value={user?.role}
              onChange={(e) => setUserRole(e.target.value as UserRole)}
              className="bg-[#172033] text-white text-[10px] rounded px-1.5 py-0.5 border border-blue-500/40 focus:outline-none"
            >
              <option value="SUPPORT_AGENT">Agent</option>
              <option value="SENIOR_SUPPORT_AGENT">Senior Agent</option>
              <option value="SUPPORT_ADMIN">Support Admin</option>
              <option value="OPERATIONS_SUPPORT">Operations</option>
              <option value="FINANCE_SUPPORT">Finance</option>
            </select>
          </div>

          <button
            onClick={() => setMaskSensitiveData(!maskSensitiveData)}
            className="w-full py-1 px-2 rounded bg-[#172033] hover:bg-[#243FBA] text-[11px] text-gray-200 flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-1.5">
              {maskSensitiveData ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-amber-400" />}
              <span>Data Masking</span>
            </span>
            <span className="font-mono text-[9px] uppercase px-1 rounded bg-white/10">
              {maskSensitiveData ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>
      )}
    </aside>
  );
};
