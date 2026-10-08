import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSupport } from '../../context/SupportContext';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import { SLACountdown } from '../../components/common/SLACountdown';
import { FilterBar } from '../../components/common/FilterBar';
import { Ticket } from '../../types';
import { Plus, ArrowRight, UserCheck, Clock, Ticket as TicketIcon } from 'lucide-react';

export const TicketsListPage: React.FC = () => {
  const { tickets } = useSupport();
  const navigate = useNavigate();
  const location = useLocation();

  const isMyTickets = location.pathname.includes('/my');
  const isUnassigned = location.pathname.includes('/unassigned');

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    category: '',
    assignedTeam: '',
  });

  const filteredTickets = tickets.filter((t) => {
    if (isMyTickets && t.assignedAgentId !== 'USR100') return false;
    if (isUnassigned && Boolean(t.assignedAgentId)) return false;

    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchId = t.id.toLowerCase().includes(q);
      const matchCust = t.customerName.toLowerCase().includes(q);
      const matchSubject = t.subject.toLowerCase().includes(q);
      if (!matchId && !matchCust && !matchSubject) return false;
    }
    if (filters.status && t.status !== filters.status) return false;
    if (filters.priority && t.priority !== filters.priority) return false;
    if (filters.category && t.category !== filters.category) return false;
    if (filters.assignedTeam && t.assignedTeam !== filters.assignedTeam) return false;

    return true;
  });

  const columns: Column<Ticket>[] = [
    {
      key: 'id',
      header: 'Ticket ID',
      sortable: true,
      accessor: (t) => (
        <div>
          <span className="font-mono font-bold text-xs text-[#243FBA] hover:underline">{t.id}</span>
          <span className="text-[10px] text-[#687085] block font-sans">{t.channel.replace(/_/g, ' ')}</span>
        </div>
      ),
    },
    {
      key: 'customerName',
      header: 'Customer',
      sortable: true,
      accessor: (t) => (
        <div>
          <span className="font-bold text-xs text-[#172033] block">{t.customerName}</span>
          <span className="text-[10px] text-[#687085] font-mono">{t.customerMobile}</span>
        </div>
      ),
    },
    {
      key: 'subject',
      header: 'Subject & Category',
      accessor: (t) => (
        <div className="max-w-xs">
          <span className="font-semibold text-xs text-[#172033] line-clamp-1">{t.subject}</span>
          <span className="text-[10px] text-[#687085] block">{t.category} • {t.subcategory}</span>
        </div>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      sortable: true,
      accessor: (t) => <PriorityBadge priority={t.priority} />,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      accessor: (t) => <StatusBadge status={t.status} size="sm" />,
    },
    {
      key: 'firstResponseSLA',
      header: 'SLA Countdown',
      accessor: (t) => (
        <SLACountdown
          label="SLA"
          initialSeconds={t.firstResponseSLA.remainingSeconds}
          status={t.firstResponseSLA.status}
        />
      ),
    },
    {
      key: 'assignedAgentName',
      header: 'Assigned Agent',
      sortable: true,
      accessor: (t) => (
        <span className="text-xs text-[#172033]">
          {t.assignedAgentName || <span className="text-amber-700 italic font-semibold">Unassigned</span>}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Action',
      align: 'right',
      accessor: (t) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/support/tickets/${t.id}`);
          }}
          className="px-3 py-1.5 rounded-lg bg-[#243FBA] hover:bg-[#172B82] text-white font-semibold text-xs transition-colors inline-flex items-center gap-1 shadow-2xs"
        >
          <span>Open Workspace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#172033]">
            {isMyTickets ? 'My Assigned Tickets Workload' : isUnassigned ? 'Unassigned Support Queue' : 'All Enterprise Support Tickets'}
          </h1>
          <p className="text-xs text-[#687085] mt-0.5">
            Monitor real-time customer tickets, assigned teams, SLA breaches, and resolution workflows.
          </p>
        </div>

        <button
          onClick={() => navigate('/support/tickets/create')}
          className="px-4 py-2 rounded-xl bg-[#243FBA] hover:bg-[#172B82] text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Ticket</span>
        </button>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        onReset={() => setFilters({ search: '', status: '', priority: '', category: '', assignedTeam: '' })}
      />

      <DataTable
        columns={columns}
        data={filteredTickets}
        keyExtractor={(t) => t.id}
        onRowClick={(t) => navigate(`/support/tickets/${t.id}`)}
        emptyMessage="No support tickets found matching your active filters."
        mobileCardRender={(t) => (
          <div className="bg-[#FFFCF5] p-4 rounded-xl border border-[#DDD7CA] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm text-[#243FBA]">{t.id}</span>
                <PriorityBadge priority={t.priority} />
              </div>
              <StatusBadge status={t.status} size="sm" />
            </div>

            <h4 className="font-bold text-xs text-[#172033] line-clamp-1">{t.subject}</h4>
            <p className="text-[11px] text-[#687085]">Customer: {t.customerName} • {t.category}</p>

            <div className="pt-2 border-t border-[#DDD7CA] flex items-center justify-between text-xs">
              <SLACountdown
                label="SLA"
                initialSeconds={t.firstResponseSLA.remainingSeconds}
                status={t.firstResponseSLA.status}
              />
              <button
                onClick={() => navigate(`/support/tickets/${t.id}`)}
                className="px-3 py-1.5 rounded bg-[#243FBA] text-white font-semibold text-xs"
              >
                Open Workspace
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
};
