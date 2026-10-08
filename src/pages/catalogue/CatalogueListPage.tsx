import React from 'react';
import { MOCK_PRODUCTS } from '../../mock/data';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Shirt, AlertCircle, CheckCircle2 } from 'lucide-react';

export const CatalogueListPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#172033]">Product & Catalogue Support Console</h1>
        <p className="text-xs text-[#687085] mt-0.5">
          Investigate product SKU discrepancies, incorrect pricing, wrong image reports, and stock reservation issues.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_PRODUCTS.map((p) => (
          <div key={p.id} className="bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA] space-y-3 shadow-xs">
            <img src={p.image} alt={p.name} className="w-full h-44 rounded-xl object-cover border border-[#DDD7CA]" />
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#243FBA]">{p.sku}</span>
                <StatusBadge status={p.status} size="sm" />
              </div>
              <h3 className="font-bold text-xs text-[#172033] mt-1 line-clamp-1">{p.name}</h3>
              <p className="text-[11px] text-[#687085]">Store: {p.storeName} • Brand: {p.brand}</p>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-[#DDD7CA]">
              <div>
                <span className="font-mono font-bold text-sm text-[#172033]">₹{p.discountPrice}</span>
                <span className="line-through text-[#687085] text-[10px] ml-1">₹{p.price}</span>
              </div>
              <span className="font-semibold text-xs text-[#172033]">Stock: {p.stock} units</span>
            </div>

            <div className="pt-2 border-t border-[#DDD7CA] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#687085]">Executive: {p.catalogueExecutive}</span>
              <button className="px-3 py-1.5 rounded bg-[#243FBA] text-white font-semibold text-xs">
                Log Catalogue Issue
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
