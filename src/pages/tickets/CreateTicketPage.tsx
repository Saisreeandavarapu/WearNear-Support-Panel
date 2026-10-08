import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupport } from '../../context/SupportContext';
import { TicketCategory, TicketPriority, TicketChannel } from '../../types';
import { Ticket, User, ShoppingBag, Send, ArrowLeft } from 'lucide-react';

export const CreateTicketPage: React.FC = () => {
  const navigate = useNavigate();
  const { customers, orders, createTicket } = useSupport();

  const [selectedCustomer, setSelectedCustomer] = useState(customers[0].id);
  const [selectedOrder, setSelectedOrder] = useState(orders[0].id);
  const [category, setCategory] = useState<TicketCategory>('DELIVERY');
  const [subcategory, setSubcategory] = useState('Delayed delivery');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TicketPriority>('HIGH');
  const [channel, setChannel] = useState<TicketChannel>('IN_APP_CHAT');
  const [assignedTeam, setAssignedTeam] = useState('Logistics Operations');

  const customerObj = customers.find((c) => c.id === selectedCustomer) || customers[0];
  const orderObj = orders.find((o) => o.id === selectedOrder) || orders[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    const created = createTicket({
      customerId: customerObj.id,
      customerName: customerObj.name,
      customerMobile: customerObj.mobile,
      customerEmail: customerObj.email,
      subject,
      description,
      category,
      subcategory,
      priority,
      status: 'OPEN',
      channel,
      assignedTeam,
      orderId: orderObj.id,
      storeId: orderObj.storeId,
      storeName: orderObj.storeName,
      lastActivityBy: 'Support Agent',
      tags: ['Manual Creation'],
    });

    navigate(`/support/tickets/${created.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/support/tickets')}
          className="p-2 rounded-lg border border-[#DDD7CA] bg-[#FFFCF5] hover:bg-[#F5F0E6] text-[#172033]"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-[#172033]">Guided Ticket Creation</h1>
          <p className="text-xs text-[#687085]">
            Create an operational support ticket linked across Customer, Order, Store, and Delivery context.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#FFFCF5] p-6 rounded-2xl border border-[#DDD7CA] shadow-2xl space-y-6">
        {/* STEP 1: CUSTOMER & ORDER CONTEXT */}
        <div className="space-y-4 pb-6 border-b border-[#DDD7CA]">
          <h3 className="font-bold text-sm text-[#172033] flex items-center gap-2">
            <User className="w-4 h-4 text-[#243FBA]" /> Step 1: Link Customer & Recent Order
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#172033] mb-1">Select Customer</label>
              <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#DDD7CA] bg-white text-[#172033] focus:ring-2 focus:ring-[#243FBA]"
              >
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.id}) • {c.mobile}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#172033] mb-1">Select Linked Order</label>
              <select
                value={selectedOrder}
                onChange={(e) => setSelectedOrder(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#DDD7CA] bg-white text-[#172033] focus:ring-2 focus:ring-[#243FBA]"
              >
                {orders.map((o) => (
                  <option key={o.id} value={o.id}>
                    Order #{o.id} • Store: {o.storeName} (₹{o.totalAmount})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* STEP 2: ISSUE CATEGORIZATION */}
        <div className="space-y-4 pb-6 border-b border-[#DDD7CA]">
          <h3 className="font-bold text-sm text-[#172033] flex items-center gap-2">
            <Ticket className="w-4 h-4 text-amber-600" /> Step 2: Issue Categorization & Priority
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#172033] mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TicketCategory)}
                className="w-full p-2.5 rounded-lg border border-[#DDD7CA] bg-white text-[#172033]"
              >
                <option value="DELIVERY">Delivery</option>
                <option value="PAYMENT">Payment</option>
                <option value="ORDER">Order</option>
                <option value="PRODUCT_CATALOGUE">Product / Catalogue</option>
                <option value="RETURN">Return</option>
                <option value="REFUND">Refund</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#172033] mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TicketPriority)}
                className="w-full p-2.5 rounded-lg border border-[#DDD7CA] bg-white text-[#172033]"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#172033] mb-1">Assigned Team</label>
              <select
                value={assignedTeam}
                onChange={(e) => setAssignedTeam(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#DDD7CA] bg-white text-[#172033]"
              >
                <option value="Customer Care">Customer Care</option>
                <option value="Logistics Operations">Logistics Operations</option>
                <option value="Finance Support">Finance Support</option>
                <option value="Catalogue Ops">Catalogue Ops</option>
              </select>
            </div>
          </div>
        </div>

        {/* STEP 3: SUBJECT & DESCRIPTION */}
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#172033] mb-1">Subject</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Order #WN10001 delivery delay near Koramangala signal"
              className="w-full p-2.5 rounded-lg border border-[#DDD7CA] bg-white text-[#172033] focus:ring-2 focus:ring-[#243FBA]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#172033] mb-1">Description</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe customer complaint details, captain location status, or financial discrepancy..."
              className="w-full p-2.5 rounded-lg border border-[#DDD7CA] bg-white text-[#172033] focus:ring-2 focus:ring-[#243FBA]"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#DDD7CA] flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate('/support/tickets')}
            className="px-4 py-2.5 rounded-lg border border-[#DDD7CA] font-semibold text-xs text-[#172033]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-[#243FBA] hover:bg-[#172B82] text-white font-bold text-xs flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Create & Open Ticket Workspace</span>
          </button>
        </div>
      </form>
    </div>
  );
};
