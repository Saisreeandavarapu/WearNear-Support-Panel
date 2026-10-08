import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSupport } from '../../context/SupportContext';
import { useAuth } from '../../context/AuthContext';
import { MaskedData } from '../../components/common/MaskedData';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Timeline } from '../../components/common/Timeline';
import {
  User,
  ShoppingBag,
  Ticket,
  CreditCard,
  RefreshCw,
  Wallet,
  MessageSquare,
  Activity,
  Plus,
  Phone,
  Mail,
  MapPin,
  Star,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { MOCK_TIMELINE_EVENTS, MOCK_PAYMENTS, MOCK_REFUNDS, MOCK_WALLETS } from '../../mock/data';

export const Customer360Page: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { customers, tickets, orders } = useSupport();
  const { hasPermission } = useAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'tickets' | 'payments' | 'refunds' | 'wallet' | 'timeline'>('overview');

  const customer = customers.find((c) => c.id === id) || customers[0];
  const customerTickets = tickets.filter((t) => t.customerId === customer.id || t.customerName === customer.name);
  const customerOrders = orders.filter((o) => o.customerId === customer.id || o.customerName === customer.name);

  const canViewFinancials = hasPermission('READ_PAYMENT') || hasPermission('READ_WALLET');

  return (
    <div className="space-y-6">
      {/* HEADER COMMAND CARD */}
      <div className="bg-[#FFFCF5] p-6 rounded-2xl border border-[#DDD7CA] shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <img
              src={customer.avatar}
              alt={customer.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#3155D8] shrink-0 shadow-md"
            />
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-xl font-bold text-[#172033]">{customer.name}</h1>
                <span className="font-mono text-xs font-semibold text-[#243FBA] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {customer.id}
                </span>
                <StatusBadge status={customer.accountStatus} size="sm" />
              </div>

              <div className="flex items-center gap-4 text-xs text-[#687085] mt-1.5 flex-wrap">
                <span>Customer since <strong className="text-[#172033]">{customer.customerSince}</strong></span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 font-bold text-amber-700">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {customer.csatScore.toFixed(1)} CSAT
                </span>
                <span>•</span>
                <span>Default Address: <strong className="text-[#172033]">{customer.defaultAddress}</strong></span>
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <button
              onClick={() => navigate('/support/tickets/create')}
              className="px-3.5 py-2 rounded-xl bg-[#243FBA] hover:bg-[#172B82] text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Create Ticket</span>
            </button>

            <button
              onClick={() => navigate('/support/escalations')}
              className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-xs border border-amber-300 transition-colors flex items-center gap-1.5"
            >
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Escalate Customer Issue</span>
            </button>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 pt-4 border-t border-[#DDD7CA]">
          <div className="p-3 rounded-xl bg-[#F5F0E6] border border-[#DDD7CA]">
            <span className="text-[10px] font-bold text-[#687085] uppercase tracking-wider block">Total Orders</span>
            <span className="text-lg font-bold text-[#172033] font-mono mt-0.5 block">{customer.totalOrders}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#F5F0E6] border border-[#DDD7CA]">
            <span className="text-[10px] font-bold text-[#687085] uppercase tracking-wider block">Completed</span>
            <span className="text-lg font-bold text-emerald-700 font-mono mt-0.5 block">{customer.completedOrders}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#F5F0E6] border border-[#DDD7CA]">
            <span className="text-[10px] font-bold text-[#687085] uppercase tracking-wider block">Returned</span>
            <span className="text-lg font-bold text-orange-700 font-mono mt-0.5 block">{customer.returnedOrders}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#F5F0E6] border border-[#DDD7CA]">
            <span className="text-[10px] font-bold text-[#687085] uppercase tracking-wider block">Refunded</span>
            <span className="text-lg font-bold text-purple-700 font-mono mt-0.5 block">{customer.refundedOrders}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#F5F0E6] border border-[#DDD7CA]">
            <span className="text-[10px] font-bold text-[#687085] uppercase tracking-wider block">Open Tickets</span>
            <span className="text-lg font-bold text-amber-800 font-mono mt-0.5 block">{customer.openTicketsCount}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#F5F0E6] border border-[#DDD7CA]">
            <span className="text-[10px] font-bold text-[#687085] uppercase tracking-wider block">Wallet Balance</span>
            <span className="text-lg font-bold text-blue-900 font-mono mt-0.5 block">
              {canViewFinancials ? `₹${customer.walletBalance}` : '•••'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#F5F0E6] border border-[#DDD7CA]">
            <span className="text-[10px] font-bold text-[#687085] uppercase tracking-wider block">COD Limit</span>
            <span className="text-lg font-bold text-[#172033] font-mono mt-0.5 block">
              {canViewFinancials ? `₹${customer.codLimit}` : '•••'}
            </span>
          </div>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex items-center gap-2 border-b border-[#DDD7CA] overflow-x-auto pb-1 text-xs font-semibold">
        {[
          { id: 'overview', label: 'Overview', icon: User },
          { id: 'orders', label: `Orders (${customerOrders.length})`, icon: ShoppingBag },
          { id: 'tickets', label: `Tickets (${customerTickets.length})`, icon: Ticket },
          { id: 'payments', label: 'Payments', icon: CreditCard, restricted: true },
          { id: 'refunds', label: 'Refunds', icon: RefreshCw, restricted: true },
          { id: 'wallet', label: 'Wallet', icon: Wallet, restricted: true },
          { id: 'timeline', label: 'Unified Timeline', icon: Activity },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-colors border-b-2 whitespace-nowrap ${
                isActive
                  ? 'border-[#243FBA] text-[#243FBA] bg-[#FFFCF5] font-bold'
                  : 'border-transparent text-[#687085] hover:text-[#172033] hover:bg-white/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT AREAS */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* PROFILE DETAILED SUMMARY */}
          <div className="bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA] space-y-4 shadow-xs">
            <h3 className="font-bold text-sm text-[#172033] flex items-center gap-2">
              <User className="w-4 h-4 text-[#243FBA]" /> Customer Contact & Identity Profile
            </h3>
            <div className="space-y-3 text-xs divide-y divide-[#DDD7CA]">
              <div className="pt-2 flex justify-between items-center">
                <span className="text-[#687085]">Mobile Number:</span>
                <MaskedData value={customer.mobile} type="phone" requiredPermission="READ_CUSTOMER" />
              </div>
              <div className="pt-2 flex justify-between items-center">
                <span className="text-[#687085]">Email Address:</span>
                <MaskedData value={customer.email} type="email" requiredPermission="READ_CUSTOMER" />
              </div>
              <div className="pt-2 flex justify-between items-center">
                <span className="text-[#687085]">Account Status:</span>
                <StatusBadge status={customer.accountStatus} size="sm" />
              </div>
              <div className="pt-2 flex justify-between items-center">
                <span className="text-[#687085]">Registration Date:</span>
                <span className="font-mono text-[#172033]">{customer.customerSince}</span>
              </div>
            </div>
          </div>

          {/* RECENT ORDERS PREVIEW */}
          <div className="lg:col-span-2 bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA] space-y-4 shadow-xs">
            <h3 className="font-bold text-sm text-[#172033] flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-blue-600" /> Recent Customer Orders
            </h3>
            <div className="space-y-3">
              {customerOrders.map((o) => (
                <div key={o.id} className="p-3.5 rounded-xl border border-[#DDD7CA] bg-[#F5F0E6] flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#243FBA]">{o.id}</span>
                      <span className="text-xs text-[#687085]">Store: {o.storeName}</span>
                    </div>
                    <p className="text-xs font-semibold text-[#172033] mt-1">{o.items[0]?.name}</p>
                    <p className="text-[11px] text-[#687085] mt-0.5">
                      Amount: ₹{o.totalAmount} • Payment: {o.paymentMethod} • Placed: {o.placedAt.slice(0, 10)}
                    </p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={o.orderStatus} size="sm" />
                    <button
                      onClick={() => navigate(`/support/orders/${o.id}`)}
                      className="block mt-2 text-xs font-semibold text-[#243FBA] hover:underline"
                    >
                      Inspect Order →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="bg-[#FFFCF5] p-6 rounded-2xl border border-[#DDD7CA] shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-[#172033]">Unified 360° Activity Timeline</h3>
          <p className="text-xs text-[#687085]">Chronological timeline combining Orders, Payments, Tickets, Messages, Delivery and Refunds</p>
          <Timeline events={MOCK_TIMELINE_EVENTS} />
        </div>
      )}

      {activeTab === 'tickets' && (
        <div className="bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA] space-y-4 shadow-xs">
          <h3 className="font-bold text-sm text-[#172033]">Customer Ticket History</h3>
          <div className="space-y-3">
            {customerTickets.map((t) => (
              <div key={t.id} className="p-4 rounded-xl border border-[#DDD7CA] bg-[#F5F0E6] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#243FBA]">{t.id}</span>
                    <StatusBadge status={t.status} size="sm" />
                  </div>
                  <h4 className="font-bold text-xs text-[#172033] mt-1">{t.subject}</h4>
                  <p className="text-[11px] text-[#687085] mt-0.5">
                    Category: {t.category} • Priority: {t.priority} • Created: {t.createdAt.slice(0, 10)}
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/support/tickets/${t.id}`)}
                  className="px-3 py-1.5 rounded bg-[#243FBA] text-white font-semibold text-xs hover:bg-[#172B82]"
                >
                  View Workspace
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'payments' && (
        <div className="bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA] space-y-4">
          <h3 className="font-bold text-sm text-[#172033]">Payment History (Authoritative)</h3>
          {canViewFinancials ? (
            <div className="space-y-3">
              {MOCK_PAYMENTS.map((p) => (
                <div key={p.id} className="p-3.5 rounded-xl border border-[#DDD7CA] bg-[#F5F0E6] flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#172033]">{p.id}</span>
                      <span className="font-mono text-[#687085]">Order: {p.orderId}</span>
                    </div>
                    <p className="text-[#687085] mt-1">
                      Gateway: {p.gateway} • Ref: {p.transactionRef}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-sm text-[#172033] block">₹{p.amount}</span>
                    <StatusBadge status={p.status} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-red-600 bg-red-50 rounded-xl border border-red-200 text-xs">
              <ShieldAlert className="w-8 h-8 mx-auto mb-2" />
              <p className="font-bold">Permission Restricted</p>
              <p>Your current support role does not have authorization to view financial payment logs.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
