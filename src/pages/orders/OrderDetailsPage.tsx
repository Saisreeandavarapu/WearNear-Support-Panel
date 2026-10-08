import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSupport } from '../../context/SupportContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Timeline } from '../../components/common/Timeline';
import { MaskedData } from '../../components/common/MaskedData';
import { ShoppingBag, ArrowLeft, Store, Truck, CreditCard, RefreshCw, AlertTriangle } from 'lucide-react';
import { MOCK_TIMELINE_EVENTS } from '../../mock/data';

export const OrderDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { orders } = useSupport();

  const order = orders.find((o) => o.id === id) || orders[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA] shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/support/orders')}
            className="p-2 rounded-lg border border-[#DDD7CA] bg-[#F5F0E6] text-[#172033]"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-mono text-[#243FBA]">{order.id}</h1>
              <StatusBadge status={order.orderStatus} size="sm" />
            </div>
            <p className="text-xs text-[#687085] mt-0.5">
              Placed on <strong className="text-[#172033]">{order.placedAt.slice(0, 10)}</strong> • Customer: <strong className="text-[#172033]">{order.customerName}</strong>
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/support/tickets/create')}
          className="px-4 py-2 rounded-xl bg-[#243FBA] text-white font-bold text-xs"
        >
          + Create Ticket for Order
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ORDER ITEMS & PRICING BREAKDOWN */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#FFFCF5] p-6 rounded-2xl border border-[#DDD7CA] space-y-4 shadow-xs">
            <h3 className="font-bold text-sm text-[#172033] flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-blue-600" /> Order Items & SKU Context
            </h3>

            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="p-4 rounded-xl border border-[#DDD7CA] bg-[#F5F0E6] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover border border-[#DDD7CA]" />
                    <div>
                      <h4 className="font-bold text-xs text-[#172033]">{item.name}</h4>
                      <p className="text-[11px] text-[#687085] mt-0.5">
                        SKU: <span className="font-mono text-[#243FBA] font-semibold">{item.sku}</span> • Size: {item.size} • Color: {item.color}
                      </p>
                      <p className="text-[11px] text-[#687085]">Store: {item.storeName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-sm text-[#172033] block">₹{item.price}</span>
                    <span className="text-xs text-[#687085]">Qty: {item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* FINANCIAL SUMMARY */}
            <div className="pt-4 border-t border-[#DDD7CA] space-y-2 text-xs">
              <div className="flex justify-between text-[#687085]">
                <span>Items Subtotal:</span>
                <span className="font-mono">₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Discount Applied:</span>
                <span className="font-mono">-₹{order.discount}</span>
              </div>
              <div className="flex justify-between text-[#687085]">
                <span>Delivery Charge:</span>
                <span className="font-mono">₹{order.deliveryCharge}</span>
              </div>
              <div className="flex justify-between text-[#687085]">
                <span>GST Tax (18%):</span>
                <span className="font-mono">₹{order.tax}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#172033] pt-2 border-t border-[#DDD7CA]">
                <span>Total Amount Paid:</span>
                <span className="font-mono text-[#243FBA]">₹{order.totalAmount} ({order.paymentMethod})</span>
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR CONTEXT */}
        <div className="space-y-6">
          <div className="bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA] space-y-3 shadow-xs">
            <h3 className="font-bold text-xs text-[#172033] uppercase tracking-wider">Delivery Address</h3>
            <p className="text-xs text-[#172033] leading-relaxed">{order.deliveryAddress}</p>
            {order.deliveryCaptainName && (
              <div className="pt-2 border-t border-[#DDD7CA] text-xs space-y-1">
                <span className="text-[#687085] block">Assigned Captain:</span>
                <span className="font-bold text-[#172033]">{order.deliveryCaptainName}</span>
                <MaskedData value={order.deliveryCaptainMobile || ''} type="phone" />
              </div>
            )}
          </div>

          <div className="bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA] space-y-4 shadow-xs">
            <h3 className="font-bold text-xs text-[#172033] uppercase tracking-wider">Order Timeline</h3>
            <Timeline events={MOCK_TIMELINE_EVENTS.slice(0, 4)} compact />
          </div>
        </div>
      </div>
    </div>
  );
};
