import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Truck, Store, User, Navigation, ShieldCheck } from 'lucide-react';
import { MOCK_DELIVERY_TRACKING } from '../../mock/data';
import { StatusBadge } from '../../components/common/StatusBadge';

export const DeliveryTrackingPage: React.FC = () => {
  const navigate = useNavigate();
  const delivery = MOCK_DELIVERY_TRACKING;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA] shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/support/delivery')}
            className="p-2 rounded-lg border border-[#DDD7CA] bg-[#F5F0E6] text-[#172033]"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#172033]">Real-Time Logistics Map Tracking Console</h1>
            <p className="text-xs text-[#687085]">
              Order #{delivery.orderId} • Captain {delivery.captainName} ({delivery.vehicleNumber})
            </p>
          </div>
        </div>

        <StatusBadge status={delivery.status} size="md" />
      </div>

      {/* TRACKING PROGRESS STEPS */}
      <div className="bg-[#FFFCF5] p-6 rounded-2xl border border-[#DDD7CA] shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-[#172033] max-w-3xl mx-auto relative before:absolute before:top-4 before:left-0 before:right-0 before:h-1 before:bg-[#DDD7CA] z-0">
          <div className="flex flex-col items-center gap-1 z-10">
            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <Store className="w-4 h-4" />
            </div>
            <span>Store Accepted</span>
          </div>

          <div className="flex flex-col items-center gap-1 z-10">
            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <User className="w-4 h-4" />
            </div>
            <span>Captain Assigned</span>
          </div>

          <div className="flex flex-col items-center gap-1 z-10">
            <div className="w-9 h-9 rounded-full bg-[#3155D8] text-white flex items-center justify-center ring-4 ring-blue-100 shadow-md animate-pulse">
              <Truck className="w-4 h-4" />
            </div>
            <span className="text-[#243FBA]">Out for Delivery</span>
          </div>

          <div className="flex flex-col items-center gap-1 z-10 opacity-50">
            <div className="w-9 h-9 rounded-full bg-[#DDD7CA] text-[#687085] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span>Delivered</span>
          </div>
        </div>
      </div>

      {/* MAP STYLED DISPLAY CONTAINER */}
      <div className="bg-[#172033] rounded-2xl border border-[#DDD7CA] h-[450px] relative overflow-hidden p-6 flex flex-col justify-between shadow-2xl">
        {/* Map grid aesthetic */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3155D8_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* TOP MAP OVERLAY BADGE */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="bg-[#FFFCF5] p-3 rounded-xl border border-[#DDD7CA] shadow-lg text-xs space-y-0.5">
            <div className="font-bold text-[#172033] flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-[#243FBA]" /> Live Telemetry Feed (WearNear Captain GPS)
            </div>
            <p className="text-[#687085]">Store: StyleHub Indiranagar ➔ Customer: Koramangala 5th Block</p>
          </div>

          <div className="bg-[#3155D8] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg">
            ETA: {delivery.etaMinutes} MINS ({delivery.distanceKm} KM REMAINING)
          </div>
        </div>

        {/* MAP NODES VISUALIZATION */}
        <div className="relative z-10 flex items-center justify-around py-12">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-white text-xs text-center space-y-1">
            <Store className="w-8 h-8 text-teal-400 mx-auto" />
            <p className="font-bold">StyleHub Store</p>
            <p className="text-[10px] text-gray-300">100 Feet Rd, Indiranagar</p>
          </div>

          <div className="flex-1 max-w-xs border-t-2 border-dashed border-blue-400 relative flex items-center justify-center">
            <div className="bg-[#3155D8] text-white p-2.5 rounded-full shadow-lg border-2 border-white animate-bounce">
              <Truck className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-white text-xs text-center space-y-1">
            <MapPin className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="font-bold">Customer Destination</p>
            <p className="text-[10px] text-gray-300">Sunrise Heights, Koramangala</p>
          </div>
        </div>

        {/* BOTTOM MAP ACTIONS */}
        <div className="relative z-10 flex items-center justify-end gap-2">
          <button
            onClick={() => navigate('/support/tickets/create')}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-lg"
          >
            Create Delivery Issue Ticket
          </button>
        </div>
      </div>
    </div>
  );
};
