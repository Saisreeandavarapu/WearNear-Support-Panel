import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupport } from '../../context/SupportContext';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { FilterBar } from '../../components/common/FilterBar';
import { Order } from '../../types';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const OrdersListPage: React.FC = () => {
  const { orders } = useSupport();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    category: '',
    assignedTeam: '',
  });

  const filteredOrders = orders.filter((o) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchId = o.id.toLowerCase().includes(q);
      const matchCust = o.customerName.toLowerCase().includes(q);
      const matchStore = o.storeName.toLowerCase().includes(q);
      if (!matchId && !matchCust && !matchStore) return false;
    }
    if (filters.status && o.orderStatus !== filters.status) return false;
    return true;
  });

  const columns: Column<Order>[] = [
    {
      key: 'id',
      header: 'Order ID',
      sortable: true,
      accessor: (o) => <span className="font-mono font-bold text-xs text-[#243FBA]">{o.id}</span>,
    },
    {
      key: 'customerName',
      header: 'Customer',
      sortable: true,
      accessor: (o) => <span className="font-bold text-xs text-[#172033]">{o.customerName}</span>,
    },
    {
      key: 'storeName',
      header: 'Store',
      sortable: true,
      accessor: (o) => <span className="text-xs text-[#172033]">{o.storeName}</span>,
    },
    {
      key: 'totalAmount',
      header: 'Amount',
      sortable: true,
      accessor: (o) => <span className="font-mono font-bold text-xs text-[#172033]">₹{o.totalAmount}</span>,
    },
    {
      key: 'paymentMethod',
      header: 'Payment Method',
      accessor: (o) => (
        <span className="text-xs text-[#687085]">
          {o.paymentMethod} (<StatusBadge status={o.paymentStatus} size="sm" />)
        </span>
      ),
    },
    {
      key: 'orderStatus',
      header: 'Order Status',
      sortable: true,
      accessor: (o) => <StatusBadge status={o.orderStatus} size="sm" />,
    },
    {
      key: 'actions',
      header: 'Action',
      align: 'right',
      accessor: (o) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/support/orders/${o.id}`);
          }}
          className="px-3 py-1.5 rounded-lg bg-[#243FBA] hover:bg-[#172B82] text-white font-semibold text-xs transition-colors inline-flex items-center gap-1 shadow-2xs"
        >
          <span>Inspect Order</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#172033]">Order Support & Investigation Console</h1>
        <p className="text-xs text-[#687085] mt-0.5">
          Investigate customer order items, pricing breakdowns, payment verification, and delivery tracking.
        </p>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        onReset={() => setFilters({ search: '', status: '', priority: '', category: '', assignedTeam: '' })}
        placeholder="Search orders by Order ID (WN...), Customer name, or Store name..."
      />

      <DataTable
        columns={columns}
        data={filteredOrders}
        keyExtractor={(o) => o.id}
        onRowClick={(o) => navigate(`/support/orders/${o.id}`)}
      />
    </div>
  );
};
