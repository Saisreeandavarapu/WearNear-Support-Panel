import React from 'react';
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
} from 'lucide-react';
import logoPng from '../../assets/logo.png';
import { SidebarSection } from './SidebarSection';
import { SidebarItem } from './SidebarItem';
import { UserMenu } from './UserMenu';
import { Tooltip } from '../common/Tooltip';
import { useSupport } from '../../context/SupportContext';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse?: () => void;
  onItemClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleCollapse, onItemClick }) => {
  const { tickets } = useSupport();

  const unassignedCount = tickets.filter((t) => !t.assignedAgentId).length;
  const urgentCount = tickets.filter((t) => t.priority === 'URGENT' || t.priority === 'CRITICAL').length;
  const breachedCount = tickets.filter((t) => t.firstResponseSLA.status === 'BREACHED').length;

  const navGroups = [
    {
      group: 'OVERVIEW',
      items: [{ label: 'Dashboard', path: '/support/dashboard', icon: LayoutDashboard }],
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
        { label: 'Tickets', path: '/support/tickets', icon: Ticket, badge: tickets.length },
        { label: 'My Tickets', path: '/support/tickets/my', icon: Ticket },
        { label: 'Unassigned', path: '/support/tickets/unassigned', icon: Ticket, badge: unassignedCount > 0 ? unassignedCount : undefined },
        { label: 'Escalations', path: '/support/escalations', icon: AlertTriangle, badge: urgentCount > 0 ? urgentCount : undefined },
        { label: 'SLA Monitor', path: '/support/sla', icon: Clock, badge: breachedCount > 0 ? breachedCount : undefined },
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
      role="navigation"
      aria-label="Sidebar Navigation"
      className={`h-screen bg-[#172033] text-white flex flex-col transition-all duration-200 ease-out select-none relative z-30 shadow-2xl ${
        isCollapsed ? 'w-[72px]' : 'w-[260px]'
      }`}
    >
      {/* FLOATING COLLAPSE TOGGLE HANDLE ON RIGHT BORDER */}
      {onToggleCollapse && (
        <Tooltip
          content={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
          position="right"
        >
          <button
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
            aria-expanded={!isCollapsed}
            className="absolute -right-3 top-5 z-40 w-6 h-6 rounded-full bg-[#243FBA] hover:bg-[#3155D8] text-white border-2 border-[#FFFCF5] shadow-md flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#3155D8]"
          >
            {isCollapsed ? (
              <ChevronRight className="w-3.5 h-3.5" />
            ) : (
              <ChevronLeft className="w-3.5 h-3.5" />
            )}
          </button>
        </Tooltip>
      )}

      {/* BRAND HEADER AREA */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-[#243FBA]/30 bg-[#172B82] shrink-0 overflow-hidden">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'w-full justify-center' : ''}`}>
          <img
            src={logoPng}
            alt="WearNear Logo"
            className="max-h-9 w-auto object-contain shrink-0 rounded-lg drop-shadow-sm transition-transform duration-200 hover:scale-105"
          />
          <div
            className={`transition-all duration-200 ease-out overflow-hidden whitespace-nowrap ${
              isCollapsed ? 'max-w-0 opacity-0 pointer-events-none' : 'max-w-[180px] opacity-100'
            }`}
          >
            <h1 className="font-extrabold text-sm tracking-wider text-white leading-tight uppercase truncate">
              WearNear
            </h1>
            <span className="text-[10px] text-blue-200 tracking-wider font-semibold uppercase block truncate">
              Support Panel
            </span>
          </div>
        </div>
      </div>

      {/* INDEPENDENTLY SCROLLABLE NAVIGATION LIST */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 scrollbar-thin">
        {navGroups.map((g) => (
          <SidebarSection key={g.group} title={g.group} isCollapsed={isCollapsed}>
            {g.items.map((item) => (
              <SidebarItem
                key={item.path}
                label={item.label}
                path={item.path}
                icon={item.icon}
                badge={item.badge}
                isCollapsed={isCollapsed}
                onItemClick={onItemClick}
              />
            ))}
          </SidebarSection>
        ))}
      </div>

      {/* FIXED FOOTER USER PROFILE SECTION */}
      <UserMenu isCollapsed={isCollapsed} />
    </aside>
  );
};
