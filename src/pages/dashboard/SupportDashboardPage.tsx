import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Ticket,
  UserCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  Store,
  User,
  Plus,
  Search,
  ArrowRight,
  TrendingUp,
  Activity,
  Smile,
  Zap,
} from 'lucide-react';
import { MetricCard } from '../../components/common/MetricCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import { SLACountdown } from '../../components/common/SLACountdown';
import { useAuth } from '../../context/AuthContext';
import { useSupport } from '../../context/SupportContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

export const SupportDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { tickets, setIsSearchOpen } = useSupport();
  const navigate = useNavigate();

  const openTickets = tickets.filter((t) => t.status !== 'RESOLVED' && t.status !== 'CLOSED');
  const myTickets = tickets.filter((t) => t.assignedAgentId === user?.id);
  const unassigned = tickets.filter((t) => !t.assignedAgentId);
  const urgent = tickets.filter((t) => t.priority === 'URGENT' || t.priority === 'CRITICAL');
  const breached = tickets.filter((t) => t.firstResponseSLA.status === 'BREACHED');
  const waitingCust = tickets.filter((t) => t.status === 'WAITING_FOR_CUSTOMER');
  const waitingStore = tickets.filter((t) => t.status === 'WAITING_FOR_STORE');
  const waitingCaptain = tickets.filter((t) => t.status === 'WAITING_FOR_CAPTAIN');

  const categoryChartData = [
    { name: 'Delivery', count: 42 },
    { name: 'Payment', count: 28 },
    { name: 'Return/Refund', count: 35 },
    { name: 'Product/Catalogue', count: 18 },
    { name: 'Store', count: 12 },
  ];

  const priorityChartData = [
    { name: 'Critical', value: 3, color: '#DC2626' },
    { name: 'Urgent', value: 8, color: '#F59E0B' },
    { name: 'High', value: 15, color: '#3155D8' },
    { name: 'Medium', value: 24, color: '#687085' },
    { name: 'Low', value: 10, color: '#9CA3AF' },
  ];

  const hourlyVolumeData = [
    { time: '08:00', volume: 12, resolved: 10 },
    { time: '09:00', volume: 28, resolved: 22 },
    { time: '10:00', volume: 45, resolved: 38 },
    { time: '11:00', volume: 32, resolved: 29 },
    { time: '12:00', volume: 20, resolved: 18 },
  ];

  return (
    <div className="space-y-6">
      {/* TOP GREETING & WORKLOAD HEADER */}
      <div className="bg-[#FFFCF5] p-6 rounded-2xl border border-[#DDD7CA] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#172033]">Good morning, {user?.name.split(' ')[0]}</h1>
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              ● {user?.status}
            </span>
          </div>
          <p className="text-xs text-[#687085] mt-1">
            Here is your live WearNear support workload and operational command metrics for today.
          </p>
        </div>

        {/* QUICK ACTION BUTTONS */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => navigate('/support/tickets/create')}
            className="px-3.5 py-2 rounded-xl bg-[#243FBA] hover:bg-[#172B82] text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Create Ticket</span>
          </button>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#F5F0E6] hover:bg-[#DDD7CA] text-[#172033] font-semibold text-xs border border-[#DDD7CA] transition-colors flex items-center gap-1.5"
          >
            <Search className="w-4 h-4 text-[#243FBA]" />
            <span>Quick Search</span>
          </button>

          <button
            onClick={() => navigate('/support/escalations')}
            className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-xs border border-amber-300 transition-colors flex items-center gap-1.5"
          >
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Escalations ({tickets.filter((t) => t.escalationLevel).length})</span>
          </button>
        </div>
      </div>

      {/* KPI METRICS GRID */}
      <div>
        <h2 className="text-xs font-bold text-[#687085] uppercase tracking-wider mb-3">Operational Workload Metrics</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <MetricCard
            title="Open Tickets"
            value={openTickets.length}
            comparison="+12% vs yesterday"
            trend="up"
            icon={Ticket}
            description="Active tickets requiring handling"
            variant="primary"
            onClick={() => navigate('/support/tickets')}
          />
          <MetricCard
            title="My Tickets"
            value={myTickets.length}
            comparison="3 high priority"
            trend="neutral"
            icon={UserCheck}
            description="Assigned directly to you"
            variant="default"
            onClick={() => navigate('/support/tickets/my')}
          />
          <MetricCard
            title="Unassigned"
            value={unassigned.length}
            comparison="Requires dispatch"
            trend="up"
            icon={AlertCircle}
            description="Unassigned in queue"
            variant="warning"
            onClick={() => navigate('/support/tickets/unassigned')}
          />
          <MetricCard
            title="Urgent / Critical"
            value={urgent.length}
            comparison="2 SLA risk"
            trend="down"
            icon={AlertTriangle}
            description="High business urgency"
            variant="danger"
            onClick={() => navigate('/support/tickets')}
          />
          <MetricCard
            title="SLA Breaches"
            value={breached.length}
            comparison="Critical action needed"
            trend="up"
            icon={Clock}
            description="First response or resolution breached"
            variant="danger"
            onClick={() => navigate('/support/sla')}
          />
          <MetricCard
            title="Waiting for Captain"
            value={waitingCaptain.length}
            comparison="Logistics inquiry"
            trend="neutral"
            icon={ShoppingBag}
            description="Awaiting captain delivery update"
            variant="default"
          />
        </div>
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* HOURLY TICKET VOLUME & RESOLUTION CHART */}
        <div className="lg:col-span-2 bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA] space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-[#172033] flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#243FBA]" /> Live Hourly Support Volume & Resolution Rate
              </h3>
              <p className="text-xs text-[#687085]">Tickets received vs resolved across WearNear platform today</p>
            </div>
            <span className="text-[11px] font-mono text-[#243FBA] bg-blue-50 px-2 py-1 rounded border border-blue-200">
              Avg Resolution: 18m
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyVolumeData}>
                <XAxis dataKey="time" stroke="#687085" fontSize={11} />
                <YAxis stroke="#687085" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#172033', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="volume" name="Incoming Tickets" fill="#3155D8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" name="Resolved Tickets" fill="#16A34A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PRIORITY & CATEGORY DISTRIBUTION */}
        <div className="bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA] space-y-4 shadow-xs">
          <h3 className="font-bold text-sm text-[#172033]">Tickets by Priority Breakdown</h3>
          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={priorityChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4}>
                  {priorityChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#172033', color: '#fff', borderRadius: '8px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 divide-y divide-[#DDD7CA] text-xs pt-1">
            {priorityChartData.map((p) => (
              <div key={p.name} className="flex items-center justify-between pt-1.5">
                <span className="flex items-center gap-2 text-[#172033]">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  {p.name}
                </span>
                <span className="font-mono font-bold text-[#172033]">{p.value} tickets</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LIVE SUPPORT QUEUE & RECENT ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LIVE SUPPORT QUEUE TABLE */}
        <div className="lg:col-span-2 bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA] space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-[#172033] flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-600" /> Active High-Priority Support Queue
              </h3>
              <p className="text-xs text-[#687085]">Tickets ordered by SLA urgency and priority</p>
            </div>
            <button
              onClick={() => navigate('/support/tickets')}
              className="text-xs font-semibold text-[#243FBA] hover:underline flex items-center gap-1"
            >
              View All Queue <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#DDD7CA]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F0E6] text-[#172033] font-semibold border-b border-[#DDD7CA]">
                <tr>
                  <th className="py-2.5 px-3">Ticket ID</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Priority</th>
                  <th className="py-2.5 px-3">SLA Countdown</th>
                  <th className="py-2.5 px-3">Assigned Agent</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDD7CA]">
                {tickets.map((t) => (
                  <tr key={t.id} className="hover:bg-[#F5F0E6]/50">
                    <td className="py-2.5 px-3 font-mono font-bold text-[#243FBA]">{t.id}</td>
                    <td className="py-2.5 px-3 font-medium text-[#172033]">{t.customerName}</td>
                    <td className="py-2.5 px-3 text-[#687085]">{t.category}</td>
                    <td className="py-2.5 px-3">
                      <PriorityBadge priority={t.priority} />
                    </td>
                    <td className="py-2.5 px-3">
                      <SLACountdown
                        label="Response"
                        initialSeconds={t.firstResponseSLA.remainingSeconds}
                        status={t.firstResponseSLA.status}
                      />
                    </td>
                    <td className="py-2.5 px-3 text-[#172033]">
                      {t.assignedAgentName || <span className="text-amber-700 italic font-semibold">Unassigned</span>}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => navigate(`/support/tickets/${t.id}`)}
                        className="px-2.5 py-1 rounded bg-[#243FBA] text-white font-semibold text-[11px] hover:bg-[#172B82] transition-colors"
                      >
                        Open Workspace
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RECENT OPERATIONAL ACTIVITY STREAM */}
        <div className="bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA] space-y-4 shadow-xs">
          <h3 className="font-bold text-sm text-[#172033] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#243FBA]" /> Live Activity Stream
          </h3>

          <div className="space-y-3 divide-y divide-[#DDD7CA]/60 text-xs">
            <div className="pt-2 flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <div>
                <p className="text-[#172033] font-medium">Customer <strong className="font-bold">Rahul Sharma</strong> replied to ticket #TKT10001</p>
                <p className="text-[11px] text-[#687085] mt-0.5">10:45 AM • In-App Chat</p>
              </div>
            </div>

            <div className="pt-3 flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
              <div>
                <p className="text-[#172033] font-medium">Partial refund ₹799 approved by <strong className="font-bold">Tanuja Sen</strong> for order #WN10002</p>
                <p className="text-[11px] text-[#687085] mt-0.5">09:45 AM • WearNear Wallet</p>
              </div>
            </div>

            <div className="pt-3 flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-amber-600 mt-1.5 shrink-0" />
              <div>
                <p className="text-[#172033] font-medium">Ticket #TKT10002 escalated to <strong className="font-bold">Finance Support</strong></p>
                <p className="text-[11px] text-[#687085] mt-0.5">09:30 AM • COD Discrepancy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
