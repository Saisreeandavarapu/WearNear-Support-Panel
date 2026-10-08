import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Inbox } from 'lucide-react';

export interface Column<T> {
  key: string;
  header: string;
  accessor?: (item: T) => React.ReactNode;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  mobileCardRender?: (item: T) => React.ReactNode;
  onRowClick?: (item: T) => void;
  pageSize?: number;
  emptyMessage?: string;
  loading?: boolean;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  keyExtractor,
  mobileCardRender,
  onRowClick,
  pageSize = 10,
  emptyMessage = 'No records found matching your criteria.',
  loading = false,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  let sortedData = [...data];
  if (sortKey) {
    sortedData.sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (loading) {
    return (
      <div className="p-8 text-center bg-[#FFFCF5] rounded-xl border border-[#DDD7CA] space-y-3 animate-pulse">
        <div className="h-6 bg-[#F5F0E6] rounded w-1/3 mx-auto" />
        <div className="h-4 bg-[#F5F0E6] rounded w-1/2 mx-auto" />
        <div className="h-4 bg-[#F5F0E6] rounded w-2/3 mx-auto" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-3">
      {/* DESKTOP TABLE (Hidden on mobile if mobileCardRender provided) */}
      <div className={`overflow-x-auto rounded-xl border border-[#DDD7CA] bg-[#FFFCF5] shadow-xs ${mobileCardRender ? 'hidden md:block' : 'block'}`}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F5F0E6] border-b border-[#DDD7CA] text-xs font-semibold text-[#172033] tracking-wide">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`py-3 px-4 select-none ${col.sortable ? 'cursor-pointer hover:bg-[#EAE4D6]' : ''} ${
                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                  } ${col.className || ''}`}
                >
                  <div className="inline-flex items-center gap-1.5">
                    <span>{col.header}</span>
                    {col.sortable && sortKey === col.key && (
                      sortDirection === 'asc' ? <ChevronUp className="w-3.5 h-3.5 text-[#243FBA]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#243FBA]" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DDD7CA] text-sm text-[#172033]">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center text-[#687085]">
                  <Inbox className="w-10 h-10 mx-auto text-[#DDD7CA] mb-2" />
                  <p className="font-medium text-sm text-[#172033]">{emptyMessage}</p>
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr
                  key={keyExtractor(item)}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={`hover:bg-[#F5F0E6]/50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`py-3 px-4 ${
                        col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                      }`}
                    >
                      {col.accessor ? col.accessor(item) : item[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS VIEW */}
      {mobileCardRender && (
        <div className="block md:hidden space-y-3">
          {paginatedData.length === 0 ? (
            <div className="p-8 text-center bg-[#FFFCF5] rounded-xl border border-[#DDD7CA]">
              <Inbox className="w-8 h-8 mx-auto text-[#DDD7CA] mb-2" />
              <p className="font-medium text-sm text-[#172033]">{emptyMessage}</p>
            </div>
          ) : (
            paginatedData.map((item) => (
              <div key={keyExtractor(item)} onClick={() => onRowClick && onRowClick(item)}>
                {mobileCardRender(item)}
              </div>
            ))
          )}
        </div>
      )}

      {/* PAGINATION BAR */}
      {sortedData.length > pageSize && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#FFFCF5] rounded-xl border border-[#DDD7CA] text-xs text-[#687085]">
          <span>
            Showing <strong className="text-[#172033]">{(currentPage - 1) * pageSize + 1}</strong> to{' '}
            <strong className="text-[#172033]">{Math.min(currentPage * pageSize, sortedData.length)}</strong> of{' '}
            <strong className="text-[#172033]">{sortedData.length}</strong> entries
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded border border-[#DDD7CA] disabled:opacity-40 hover:bg-[#F5F0E6] text-[#172033]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-medium text-[#172033]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded border border-[#DDD7CA] disabled:opacity-40 hover:bg-[#F5F0E6] text-[#172033]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
