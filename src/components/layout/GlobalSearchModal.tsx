import React, { useState, useEffect } from 'react';
import { Search, User, Ticket, ShoppingBag, Store, Shirt, Truck, CreditCard, X, ArrowRight } from 'lucide-react';
import { useSupport } from '../../context/SupportContext';
import { useNavigate } from 'react-router-dom';
import {
  MOCK_CUSTOMERS,
  MOCK_TICKETS,
  MOCK_ORDERS,
  MOCK_STORES,
  MOCK_PRODUCTS,
  MOCK_CAPTAINS,
  MOCK_PAYMENTS,
} from '../../mock/data';
import { motion, AnimatePresence } from 'framer-motion';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen } = useSupport();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedCustomers = q
    ? MOCK_CUSTOMERS.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q) ||
          c.mobile.includes(q) ||
          c.email.toLowerCase().includes(q)
      )
    : MOCK_CUSTOMERS.slice(0, 2);

  const matchedTickets = q
    ? MOCK_TICKETS.filter(
        (t) =>
          t.id.toLowerCase().includes(q) ||
          t.subject.toLowerCase().includes(q) ||
          t.customerName.toLowerCase().includes(q)
      )
    : MOCK_TICKETS.slice(0, 2);

  const matchedOrders = q
    ? MOCK_ORDERS.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.storeName.toLowerCase().includes(q)
      )
    : MOCK_ORDERS.slice(0, 2);

  const matchedStores = q
    ? MOCK_STORES.filter(
        (s) =>
          s.id.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q) ||
          s.ownerName.toLowerCase().includes(q)
      )
    : [];

  const matchedCaptains = q
    ? MOCK_CAPTAINS.filter(
        (c) =>
          c.id.toLowerCase().includes(q) ||
          c.name.toLowerCase().includes(q) ||
          c.mobile.includes(q)
      )
    : [];

  const matchedPayments = q
    ? MOCK_PAYMENTS.filter(
        (p) =>
          p.id.toLowerCase().includes(q) ||
          p.orderId.toLowerCase().includes(q) ||
          p.transactionRef.toLowerCase().includes(q)
      )
    : [];

  const handleSelect = (url: string) => {
    setIsSearchOpen(false);
    setQuery('');
    navigate(url);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-[#FFFCF5] rounded-xl border border-[#DDD7CA] shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[80vh]"
        >
          {/* Header Bar */}
          <div className="p-3.5 border-b border-[#DDD7CA] bg-[#F5F0E6] flex items-center gap-3">
            <Search className="w-5 h-5 text-[#243FBA] shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Customers, Tickets (TKT...), Orders (WN...), Stores, Captains, Payments..."
              className="w-full text-sm bg-transparent focus:outline-none text-[#172033] font-medium"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-[#687085] hover:text-[#172033]">
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-white rounded border border-[#DDD7CA] text-[#687085]">
              ESC
            </kbd>
          </div>

          {/* Search Content */}
          <div className="p-4 overflow-y-auto space-y-5 flex-1 divide-y divide-[#DDD7CA]/50">
            {/* CUSTOMERS */}
            {matchedCustomers.length > 0 && (
              <div>
                <h4 className="text-[11px] font-bold text-[#687085] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#243FBA]" /> Customers
                </h4>
                <div className="space-y-1">
                  {matchedCustomers.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => handleSelect(`/support/customers/${c.id}`)}
                      className="p-2.5 rounded-lg hover:bg-[#F5F0E6] cursor-pointer flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <div className="text-xs font-bold text-[#172033] flex items-center gap-2">
                            <span>{c.name}</span>
                            <span className="font-mono text-[10px] text-[#687085] bg-[#F5F0E6] px-1.5 py-0.5 rounded border border-[#DDD7CA]">
                              {c.id}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#687085]">
                            {c.mobile} • {c.email} • {c.totalOrders} Orders
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#687085] group-hover:text-[#243FBA] transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TICKETS */}
            {matchedTickets.length > 0 && (
              <div className="pt-4">
                <h4 className="text-[11px] font-bold text-[#687085] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Ticket className="w-3.5 h-3.5 text-amber-600" /> Tickets
                </h4>
                <div className="space-y-1">
                  {matchedTickets.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => handleSelect(`/support/tickets/${t.id}`)}
                      className="p-2.5 rounded-lg hover:bg-[#F5F0E6] cursor-pointer flex items-center justify-between group transition-colors"
                    >
                      <div>
                        <div className="text-xs font-bold text-[#172033] flex items-center gap-2">
                          <span className="font-mono text-xs text-[#243FBA]">{t.id}</span>
                          <span className="truncate max-w-sm">{t.subject}</span>
                        </div>
                        <p className="text-[11px] text-[#687085]">
                          Customer: {t.customerName} • Status: {t.status} • Priority: {t.priority}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#687085] group-hover:text-[#243FBA] transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ORDERS */}
            {matchedOrders.length > 0 && (
              <div className="pt-4">
                <h4 className="text-[11px] font-bold text-[#687085] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-blue-600" /> Orders
                </h4>
                <div className="space-y-1">
                  {matchedOrders.map((o) => (
                    <div
                      key={o.id}
                      onClick={() => handleSelect(`/support/orders/${o.id}`)}
                      className="p-2.5 rounded-lg hover:bg-[#F5F0E6] cursor-pointer flex items-center justify-between group transition-colors"
                    >
                      <div>
                        <div className="text-xs font-bold text-[#172033] flex items-center gap-2">
                          <span className="font-mono text-xs text-emerald-700">{o.id}</span>
                          <span>Store: {o.storeName}</span>
                        </div>
                        <p className="text-[11px] text-[#687085]">
                          Customer: {o.customerName} • Total: ₹{o.totalAmount} • Status: {o.orderStatus}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#687085] group-hover:text-[#243FBA] transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STORES */}
            {matchedStores.length > 0 && (
              <div className="pt-4">
                <h4 className="text-[11px] font-bold text-[#687085] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-teal-600" /> Stores
                </h4>
                <div className="space-y-1">
                  {matchedStores.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => handleSelect(`/support/stores/${s.id}`)}
                      className="p-2.5 rounded-lg hover:bg-[#F5F0E6] cursor-pointer flex items-center justify-between group transition-colors"
                    >
                      <div>
                        <div className="text-xs font-bold text-[#172033] flex items-center gap-2">
                          <span>{s.name}</span>
                          <span className="font-mono text-[10px] text-[#687085]">{s.id}</span>
                        </div>
                        <p className="text-[11px] text-[#687085]">
                          Owner: {s.ownerName} • Rating: {s.rating} ★ • {s.address}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#687085] group-hover:text-[#243FBA] transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
