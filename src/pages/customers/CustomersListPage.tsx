import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupport } from '../../context/SupportContext';
import { DataTable, Column } from '../../components/common/DataTable';
import { MaskedData } from '../../components/common/MaskedData';
import { StatusBadge } from '../../components/common/StatusBadge';
import { FilterBar } from '../../components/common/FilterBar';
import { Customer } from '../../types';
import { UserCheck, ShoppingBag, Ticket, Star, ArrowRight } from 'lucide-react';

export const CustomersListPage: React.FC = () => {
  const { customers } = useSupport();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    category: '',
    assignedTeam: '',
  });

  const filteredCustomers = customers.filter((c) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchId = c.id.toLowerCase().includes(q);
      const matchMobile = c.mobile.includes(q);
      const matchEmail = c.email.toLowerCase().includes(q);
      if (!matchName && !matchId && !matchMobile && !matchEmail) return false;
    }
    if (filters.status && c.accountStatus !== filters.status) return false;
    return true;
  });

  const columns: Column<Customer>[] = [
    {
      key: 'name',
      header: 'Customer',
      sortable: true,
      accessor: (c) => (
        <div className="flex items-center gap-3">
          <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full object-cover border border-[#DDD7CA]" />
          <div>
            <div className="font-bold text-xs text-[#172033] hover:text-[#243FBA] flex items-center gap-1.5">
              <span>{c.name}</span>
            </div>
            <span className="font-mono text-[10px] text-[#687085] bg-[#F5F0E6] px-1.5 py-0.5 rounded border border-[#DDD7CA]">
              {c.id}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'mobile',
      header: 'Mobile',
      accessor: (c) => <MaskedData value={c.mobile} type="phone" requiredPermission="READ_CUSTOMER" />,
    },
    {
      key: 'email',
      header: 'Email',
      accessor: (c) => <MaskedData value={c.email} type="email" requiredPermission="READ_CUSTOMER" />,
    },
    {
      key: 'accountStatus',
      header: 'Account Status',
      sortable: true,
      accessor: (c) => <StatusBadge status={c.accountStatus} size="sm" />,
    },
    {
      key: 'totalOrders',
      header: 'Orders',
      sortable: true,
      align: 'center',
      accessor: (c) => (
        <span className="font-mono text-xs font-semibold text-[#172033]">
          {c.totalOrders} total ({c.completedOrders} completed)
        </span>
      ),
    },
    {
      key: 'openTicketsCount',
      header: 'Open Tickets',
      sortable: true,
      align: 'center',
      accessor: (c) => (
        <span
          className={`font-mono text-xs font-bold px-2 py-0.5 rounded-full ${
            c.openTicketsCount > 0 ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'text-[#687085]'
          }`}
        >
          {c.openTicketsCount} open
        </span>
      ),
    },
    {
      key: 'csatScore',
      header: 'CSAT Rating',
      sortable: true,
      align: 'center',
      accessor: (c) => (
        <span className="inline-flex items-center gap-1 font-bold text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
          {c.csatScore.toFixed(1)}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Action',
      align: 'right',
      accessor: (c) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/support/customers/${c.id}`);
          }}
          className="px-3 py-1.5 rounded-lg bg-[#243FBA] hover:bg-[#172B82] text-white font-semibold text-xs transition-colors inline-flex items-center gap-1 shadow-2xs"
        >
          <span>Customer 360</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#172033]">Customer Directory & 360 Search</h1>
          <p className="text-xs text-[#687085] mt-0.5">
            Search, inspect masked customer profiles, order metrics, and support history across WearNear platform.
          </p>
        </div>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        onReset={() => setFilters({ search: '', status: '', priority: '', category: '', assignedTeam: '' })}
        placeholder="Search customers by name, customer ID, mobile or email..."
      />

      <DataTable
        columns={columns}
        data={filteredCustomers}
        keyExtractor={(c) => c.id}
        onRowClick={(c) => navigate(`/support/customers/${c.id}`)}
        emptyMessage="No customers found matching your search parameters."
        mobileCardRender={(c) => (
          <div className="bg-[#FFFCF5] p-4 rounded-xl border border-[#DDD7CA] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-sm text-[#172033]">{c.name}</h4>
                  <span className="font-mono text-[10px] text-[#687085]">{c.id}</span>
                </div>
              </div>
              <StatusBadge status={c.accountStatus} size="sm" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#DDD7CA]">
              <div>
                <span className="text-[#687085] block">Mobile:</span>
                <MaskedData value={c.mobile} type="phone" />
              </div>
              <div>
                <span className="text-[#687085] block">Orders:</span>
                <span className="font-semibold text-[#172033]">{c.totalOrders} total</span>
              </div>
            </div>

            <button
              onClick={() => navigate(`/support/customers/${c.id}`)}
              className="w-full py-2 rounded-lg bg-[#243FBA] text-white font-semibold text-xs flex items-center justify-center gap-1"
            >
              <span>View Customer 360 Command Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      />
    </div>
  );
};
