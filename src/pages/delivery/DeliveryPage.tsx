import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, MapPin, Phone, UserCheck, ArrowRight } from 'lucide-react';
import { MOCK_DELIVERY_TRACKING, MOCK_CAPTAINS } from '../../mock/data';
import { StatusBadge } from '../../components/common/StatusBadge';
import { MaskedData } from '../../components/common/MaskedData';

export const DeliveryPage: React.FC = () => {
  const navigate = useNavigate();
  const delivery = MOCK_DELIVERY_TRACKING;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#172033]">Delivery Operations & Live Tracking Console</h1>
          <p className="text-xs text-[#687085] mt-0.5">
            Monitor real-time delivery captain status, route ETAs, pickup delays, and reassignment controls.
          </p>
        </div>

        <button
          onClick={() => navigate('/support/delivery/tracking')}
          className="px-4 py-2 rounded-xl bg-[#243FBA] hover:bg-[#172B82] text-white font-semibold text-xs flex items-center gap-1.5 shadow-md"
        >
          <MapPin className="w-4 h-4" />
          <span>Open Real-Time Map Tracker</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ACTIVE LIVE DELIVERY CARD */}
        <div className="bg-[#FFFCF5] p-6 rounded-2xl border border-[#DDD7CA] space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#DDD7CA] pb-3">
            <div>
              <span className="font-mono text-xs font-bold text-[#243FBA]">{delivery.id}</span>
              <h3 className="font-bold text-sm text-[#172033]">Order #{delivery.orderId}</h3>
            </div>
            <StatusBadge status={delivery.status} size="sm" />
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#687085]">Customer Name:</span>
              <strong className="text-[#172033]">{delivery.customerName}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#687085]">Store Name:</span>
              <strong className="text-[#172033]">{delivery.storeName}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#687085]">Captain Name:</span>
              <strong className="text-[#172033]">{delivery.captainName} ({delivery.captainId})</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#687085]">Captain Mobile:</span>
              <MaskedData value={delivery.captainMobile} type="phone" />
            </div>
            <div className="flex justify-between">
              <span className="text-[#687085]">Vehicle:</span>
              <strong className="text-[#172033]">{delivery.vehicleNumber}</strong>
            </div>
          </div>

          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center justify-between text-indigo-900 text-xs font-bold">
            <span>Live ETA: {delivery.etaMinutes} minutes</span>
            <span>Distance: {delivery.distanceKm} km</span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              onClick={() => navigate(`/support/captains/${delivery.captainId}`)}
              className="px-3 py-1.5 rounded-lg border border-[#DDD7CA] text-xs font-semibold text-[#172033]"
            >
              Captain Profile
            </button>
            <button
              onClick={() => navigate('/support/delivery/tracking')}
              className="px-3 py-1.5 rounded-lg bg-[#243FBA] text-white text-xs font-bold flex items-center gap-1"
            >
              <span>Track Route</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CAPTAIN AVAILABILITY & DISPATCH LIST */}
        <div className="bg-[#FFFCF5] p-6 rounded-2xl border border-[#DDD7CA] space-y-4 shadow-xs">
          <h3 className="font-bold text-sm text-[#172033] flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-emerald-600" /> Active Delivery Captains On Field
          </h3>

          <div className="space-y-3">
            {MOCK_CAPTAINS.map((cap) => (
              <div key={cap.id} className="p-3.5 rounded-xl border border-[#DDD7CA] bg-[#F5F0E6] flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#172033]">{cap.name}</span>
                    <span className="font-mono text-[10px] text-[#687085]">{cap.id}</span>
                  </div>
                  <p className="text-[11px] text-[#687085] mt-0.5">{cap.vehicle}</p>
                </div>
                <div className="text-right">
                  <StatusBadge status={cap.status} size="sm" />
                  <span className="text-[11px] font-bold text-amber-700 block mt-1">{cap.rating} ★</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
