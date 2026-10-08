import React, { useState } from 'react';
import { Search, SlidersHorizontal, RotateCcw, X } from 'lucide-react';
import { TicketCategory, TicketPriority, TicketStatus } from '../../types';

interface FilterState {
  search: string;
  status: string;
  priority: string;
  category: string;
  assignedTeam: string;
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  placeholder?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onReset,
  placeholder = 'Search tickets by ID, customer name, mobile or subject...',
}) => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const handleChange = (field: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const activeCount = Object.entries(filters).filter(([k, v]) => k !== 'search' && Boolean(v)).length;

  return (
    <div className="bg-[#FFFCF5] p-3 rounded-xl border border-[#DDD7CA] space-y-3">
      {/* Top Bar with Search & Mobile Filter Toggle */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#687085]" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder={placeholder}
            className="w-full pl-9 pr-8 py-2 text-xs rounded-lg border border-[#DDD7CA] bg-white focus:outline-none focus:ring-2 focus:ring-[#243FBA] text-[#172033]"
          />
          {filters.search && (
            <button
              onClick={() => handleChange('search', '')}
              className="absolute right-2.5 top-2.5 text-[#687085] hover:text-[#172033]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setIsMobileDrawerOpen(true)}
          className="flex md:hidden items-center gap-1.5 px-3 py-2 rounded-lg border border-[#DDD7CA] bg-[#F5F0E6] text-xs font-semibold text-[#172033]"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
          {activeCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#243FBA] text-white text-[10px] flex items-center justify-center font-bold">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* DESKTOP FILTERS */}
      <div className="hidden md:flex items-center gap-2 flex-wrap pt-1 border-t border-[#DDD7CA]/60 text-xs">
        <select
          value={filters.status}
          onChange={(e) => handleChange('status', e.target.value)}
          className="px-2.5 py-1.5 rounded-lg border border-[#DDD7CA] bg-white text-[#172033] focus:ring-2 focus:ring-[#243FBA]"
        >
          <option value="">All Statuses</option>
          <option value="OPEN">Open</option>
          <option value="ASSIGNED">Assigned</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="WAITING_FOR_CUSTOMER">Waiting for Customer</option>
          <option value="WAITING_FOR_STORE">Waiting for Store</option>
          <option value="WAITING_FOR_CAPTAIN">Waiting for Captain</option>
          <option value="RESOLVED">Resolved</option>
          <option value="CLOSED">Closed</option>
          <option value="REOPENED">Reopened</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) => handleChange('priority', e.target.value)}
          className="px-2.5 py-1.5 rounded-lg border border-[#DDD7CA] bg-white text-[#172033] focus:ring-2 focus:ring-[#243FBA]"
        >
          <option value="">All Priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
          <option value="CRITICAL">Critical</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => handleChange('category', e.target.value)}
          className="px-2.5 py-1.5 rounded-lg border border-[#DDD7CA] bg-white text-[#172033] focus:ring-2 focus:ring-[#243FBA]"
        >
          <option value="">All Categories</option>
          <option value="DELIVERY">Delivery</option>
          <option value="PAYMENT">Payment</option>
          <option value="ORDER">Order</option>
          <option value="PRODUCT_CATALOGUE">Product / Catalogue</option>
          <option value="RETURN">Return</option>
          <option value="REFUND">Refund</option>
          <option value="STORE">Store</option>
          <option value="CAPTAIN">Captain</option>
          <option value="WALLET">Wallet</option>
        </select>

        <select
          value={filters.assignedTeam}
          onChange={(e) => handleChange('assignedTeam', e.target.value)}
          className="px-2.5 py-1.5 rounded-lg border border-[#DDD7CA] bg-white text-[#172033] focus:ring-2 focus:ring-[#243FBA]"
        >
          <option value="">All Support Teams</option>
          <option value="Customer Care">Customer Care</option>
          <option value="Logistics Operations">Logistics Operations</option>
          <option value="Finance Support">Finance Support</option>
          <option value="Catalogue Ops">Catalogue Ops</option>
        </select>

        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="px-2.5 py-1.5 rounded-lg text-xs text-[#DC2626] hover:bg-red-50 font-medium inline-flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Filters
          </button>
        )}
      </div>

      {/* MOBILE BOTTOM SHEET FOR FILTERS */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 md:hidden">
          <div className="bg-[#FFFCF5] w-full rounded-t-2xl p-5 border-t border-[#DDD7CA] space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#DDD7CA] pb-3">
              <h3 className="font-bold text-base text-[#172033]">Filter Support Tickets</h3>
              <button onClick={() => setIsMobileDrawerOpen(false)}>
                <X className="w-5 h-5 text-[#687085]" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-[#172033]">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#DDD7CA] bg-white"
                >
                  <option value="">All Statuses</option>
                  <option value="OPEN">Open</option>
                  <option value="ASSIGNED">Assigned</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="WAITING_FOR_CUSTOMER">Waiting for Customer</option>
                  <option value="RESOLVED">Resolved</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#172033]">Priority</label>
                <select
                  value={filters.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#DDD7CA] bg-white"
                >
                  <option value="">All Priorities</option>
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                  <option value="CRITICAL">Critical</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#172033]">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#DDD7CA] bg-white"
                >
                  <option value="">All Categories</option>
                  <option value="DELIVERY">Delivery</option>
                  <option value="PAYMENT">Payment</option>
                  <option value="ORDER">Order</option>
                  <option value="PRODUCT_CATALOGUE">Product / Catalogue</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[#DDD7CA]">
              <button
                onClick={() => {
                  onReset();
                  setIsMobileDrawerOpen(false);
                }}
                className="flex-1 py-2.5 rounded-lg border border-[#DDD7CA] font-semibold text-xs text-[#172033]"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="flex-1 py-2.5 rounded-lg bg-[#243FBA] font-semibold text-xs text-white"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
