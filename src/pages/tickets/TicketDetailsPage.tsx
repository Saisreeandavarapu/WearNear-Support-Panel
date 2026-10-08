import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSupport } from '../../context/SupportContext';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import { SLACountdown } from '../../components/common/SLACountdown';
import { Timeline } from '../../components/common/Timeline';
import { Drawer } from '../../components/common/Drawer';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { MaskedData } from '../../components/common/MaskedData';
import {
  Ticket,
  User,
  ShoppingBag,
  Store as StoreIcon,
  Truck,
  Send,
  Lock,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Paperclip,
  Smile,
  ArrowLeft,
  RefreshCw,
  MessageSquare,
  Shield,
  Clock,
  UserCheck,
} from 'lucide-react';
import { TicketChannel, TicketStatus } from '../../types';
import { MOCK_TIMELINE_EVENTS, MOCK_TEMPLATES } from '../../mock/data';

export const TicketDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    tickets,
    getTicketMessages,
    addTicketMessage,
    updateTicketStatus,
    assignTicket,
    escalateTicket,
    getDeliveryTracking,
  } = useSupport();
  const { user, hasPermission } = useAuth();

  const ticket = tickets.find((t) => t.id === id) || tickets[0];
  const messages = getTicketMessages(ticket.id);
  const deliveryTracking = getDeliveryTracking(ticket.orderId || '');

  // Form composer state
  const [channel, setChannel] = useState<TicketChannel>('IN_APP_CHAT');
  const [messageContent, setMessageContent] = useState('');
  const [isInternalNote, setIsInternalNote] = useState(false);

  // Drawers & Modals state
  const [isAssignDrawerOpen, setIsAssignDrawerOpen] = useState(false);
  const [isEscalateDrawerOpen, setIsEscalateDrawerOpen] = useState(false);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [isTemplateDrawerOpen, setIsTemplateDrawerOpen] = useState(false);

  const [assignAgentName, setAssignAgentName] = useState('Karthik Raja');
  const [escalateTeam, setEscalateTeam] = useState('Finance Support');
  const [escalateReason, setEscalateReason] = useState('COD cash dispute requiring senior approval');
  const [refundAmount, setRefundAmount] = useState(799);

  const handleSendMessage = (andResolve: boolean = false) => {
    if (!messageContent.trim()) return;

    addTicketMessage(ticket.id, {
      ticketId: ticket.id,
      senderId: user?.id || 'USR100',
      senderName: user?.name || 'Tanuja Sen',
      senderRole: 'SUPPORT',
      channel: isInternalNote ? 'INTERNAL_NOTE' : channel,
      content: messageContent,
      isInternal: isInternalNote,
    });

    setMessageContent('');

    if (andResolve) {
      updateTicketStatus(ticket.id, 'RESOLVED', 'Resolved during response dispatch');
    }
  };

  const handleInsertTemplate = (tplMessage: string) => {
    let replaced = tplMessage
      .replace('{{customer_name}}', ticket.customerName)
      .replace('{{order_id}}', ticket.orderId || 'WN10001')
      .replace('{{captain_name}}', ticket.captainName || 'Ramesh Pawar')
      .replace('{{eta_time}}', '11:45 AM');
    setMessageContent((prev) => (prev ? `${prev}\n${replaced}` : replaced));
    setIsTemplateDrawerOpen(false);
  };

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto">
      {/* HEADER BAR */}
      <div className="bg-[#FFFCF5] p-4 rounded-2xl border border-[#DDD7CA] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-16 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/support/tickets')}
            className="p-2 rounded-lg border border-[#DDD7CA] bg-[#F5F0E6] hover:bg-[#DDD7CA] text-[#172033]"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-mono font-bold text-lg text-[#243FBA]">{ticket.id}</span>
              <PriorityBadge priority={ticket.priority} />
              <StatusBadge status={ticket.status} size="sm" />
              {ticket.escalationLevel && (
                <span className="bg-red-100 text-red-900 border border-red-300 px-2 py-0.5 rounded text-xs font-bold">
                  Escalation L{ticket.escalationLevel}
                </span>
              )}
            </div>
            <h1 className="text-sm font-bold text-[#172033] mt-0.5 line-clamp-1">{ticket.subject}</h1>
          </div>
        </div>

        {/* SLA COUNTDOWN & ACTIONS */}
        <div className="flex items-center gap-2 flex-wrap">
          <SLACountdown
            label="First Response SLA"
            initialSeconds={ticket.firstResponseSLA.remainingSeconds}
            status={ticket.firstResponseSLA.status}
          />

          <div className="h-6 w-px bg-[#DDD7CA] hidden sm:block" />

          <button
            onClick={() => setIsAssignDrawerOpen(true)}
            className="px-3 py-1.5 rounded-lg border border-[#DDD7CA] bg-[#F5F0E6] text-xs font-semibold text-[#172033] hover:bg-white transition-colors"
          >
            Reassign
          </button>

          <button
            onClick={() => setIsEscalateDrawerOpen(true)}
            className="px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 text-xs font-semibold text-amber-900 hover:bg-amber-100 transition-colors"
          >
            Escalate
          </button>

          {hasPermission('APPROVE_REFUND') && (
            <button
              onClick={() => setIsRefundModalOpen(true)}
              className="px-3 py-1.5 rounded-lg border border-purple-300 bg-purple-50 text-xs font-semibold text-purple-900 hover:bg-purple-100 transition-colors"
            >
              Approve Refund
            </button>
          )}

          {ticket.status !== 'RESOLVED' ? (
            <button
              onClick={() => updateTicketStatus(ticket.id, 'RESOLVED', 'Manual status change')}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
            >
              Mark Resolved
            </button>
          ) : (
            <button
              onClick={() => updateTicketStatus(ticket.id, 'REOPENED', 'Reopened by support agent')}
              className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
            >
              Reopen Ticket
            </button>
          )}
        </div>
      </div>

      {/* THREE-COLUMN WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: CONTEXT CARDS (Customer, Order, Store, Delivery) */}
        <div className="lg:col-span-3 space-y-4">
          {/* CUSTOMER CONTEXT */}
          <div className="bg-[#FFFCF5] p-4 rounded-xl border border-[#DDD7CA] space-y-3 shadow-2xs">
            <div className="flex items-center justify-between border-b border-[#DDD7CA] pb-2">
              <h3 className="font-bold text-xs text-[#172033] flex items-center gap-1.5 uppercase tracking-wider">
                <User className="w-3.5 h-3.5 text-[#243FBA]" /> Customer Context
              </h3>
              <button
                onClick={() => navigate(`/support/customers/${ticket.customerId}`)}
                className="text-[11px] font-semibold text-[#243FBA] hover:underline"
              >
                Customer 360 →
              </button>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="font-bold text-[#172033]">{ticket.customerName}</div>
              <MaskedData value={ticket.customerMobile} type="phone" label="Mobile" />
              <MaskedData value={ticket.customerEmail} type="email" label="Email" />
            </div>
          </div>

          {/* ORDER CONTEXT */}
          {ticket.orderId && (
            <div className="bg-[#FFFCF5] p-4 rounded-xl border border-[#DDD7CA] space-y-3 shadow-2xs">
              <div className="flex items-center justify-between border-b border-[#DDD7CA] pb-2">
                <h3 className="font-bold text-xs text-[#172033] flex items-center gap-1.5 uppercase tracking-wider">
                  <ShoppingBag className="w-3.5 h-3.5 text-blue-600" /> Order Context
                </h3>
                <button
                  onClick={() => navigate(`/support/orders/${ticket.orderId}`)}
                  className="text-[11px] font-semibold text-[#243FBA] hover:underline font-mono"
                >
                  #{ticket.orderId} →
                </button>
              </div>
              <div className="space-y-1 text-xs">
                <div className="text-[#687085]">Store: <strong className="text-[#172033]">{ticket.storeName}</strong></div>
                <div className="text-[#687085]">Item: <strong className="text-[#172033]">Slim Fit Blazer (Size 40)</strong></div>
                <div className="text-[#687085]">Amount: <strong className="text-[#172033]">₹3,779 (UPI Paid)</strong></div>
              </div>
            </div>
          )}

          {/* DELIVERY & CAPTAIN CONTEXT */}
          {deliveryTracking && (
            <div className="bg-[#FFFCF5] p-4 rounded-xl border border-[#DDD7CA] space-y-3 shadow-2xs">
              <div className="flex items-center justify-between border-b border-[#DDD7CA] pb-2">
                <h3 className="font-bold text-xs text-[#172033] flex items-center gap-1.5 uppercase tracking-wider">
                  <Truck className="w-3.5 h-3.5 text-indigo-600" /> Live Delivery Tracking
                </h3>
                <button
                  onClick={() => navigate('/support/delivery/tracking')}
                  className="text-[11px] font-semibold text-[#243FBA] hover:underline"
                >
                  Map View →
                </button>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="font-bold text-[#172033]">Captain: {deliveryTracking.captainName}</div>
                <MaskedData value={deliveryTracking.captainMobile} type="phone" label="Captain Mobile" />
                <div className="text-[#687085]">Vehicle: {deliveryTracking.vehicleNumber}</div>
                <div className="p-2 rounded bg-indigo-50 border border-indigo-200 text-indigo-900 text-[11px] font-semibold flex items-center justify-between">
                  <span>ETA: {deliveryTracking.etaMinutes} mins</span>
                  <span>Dist: {deliveryTracking.distanceKm} km</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CENTER COLUMN: MAIN CONVERSATION STREAM & COMPOSER */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA] shadow-xs flex flex-col h-[680px]">
            {/* CONVERSATION HEADER */}
            <div className="pb-3 border-b border-[#DDD7CA] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#243FBA]" />
                <h3 className="font-bold text-sm text-[#172033]">Support Communication Interface</h3>
              </div>
              <button
                onClick={() => setIsTemplateDrawerOpen(true)}
                className="px-2.5 py-1 rounded bg-[#F5F0E6] border border-[#DDD7CA] text-xs font-semibold text-[#243FBA] hover:bg-[#DDD7CA] flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Insert Template</span>
              </button>
            </div>

            {/* MESSAGES SCROLL AREA */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4 my-2">
              {messages.map((m) => {
                if (m.isInternal) {
                  return (
                    <div
                      key={m.id}
                      className="p-3.5 rounded-xl bg-amber-50/80 border-2 border-dashed border-amber-300 text-amber-950 text-xs space-y-1 shadow-2xs"
                    >
                      <div className="flex items-center justify-between font-bold text-[11px] uppercase tracking-wider text-amber-800">
                        <span className="flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5" /> INTERNAL NOTE — {m.senderName} ({m.senderRole})
                        </span>
                        <span className="font-mono text-[10px] text-amber-700">{m.timestamp.slice(11, 16)}</span>
                      </div>
                      <p className="leading-relaxed font-sans">{m.content}</p>
                      <p className="text-[10px] text-amber-700 font-semibold italic pt-1">
                        🔒 Confidential: Visible only to internal support personnel. Never shared with customer.
                      </p>
                    </div>
                  );
                }

                const isCustomer = m.senderRole === 'CUSTOMER';
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isCustomer ? 'items-start' : 'items-end'}`}
                  >
                    <div className="flex items-center gap-2 text-[10px] text-[#687085] mb-1">
                      <span className="font-bold text-[#172033]">{m.senderName}</span>
                      <span>•</span>
                      <span>{m.channel.replace(/_/g, ' ')}</span>
                      <span>•</span>
                      <span className="font-mono">{m.timestamp.slice(11, 16)}</span>
                    </div>
                    <div
                      className={`p-3.5 rounded-2xl max-w-lg text-xs leading-relaxed shadow-2xs ${
                        isCustomer
                          ? 'bg-[#F5F0E6] text-[#172033] border border-[#DDD7CA] rounded-tl-none'
                          : 'bg-[#243FBA] text-white rounded-tr-none'
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* MESSAGE COMPOSER */}
            <div className="pt-3 border-t border-[#DDD7CA] space-y-3">
              <div className="flex items-center justify-between text-xs">
                {/* Channel Selector */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[#687085] font-semibold text-[11px]">Channel:</span>
                  <select
                    value={channel}
                    onChange={(e) => setChannel(e.target.value as TicketChannel)}
                    disabled={isInternalNote}
                    className="p-1 rounded border border-[#DDD7CA] bg-white text-[#172033] text-xs font-semibold"
                  >
                    <option value="IN_APP_CHAT">In-App Chat</option>
                    <option value="EMAIL">Email</option>
                    <option value="SMS">SMS</option>
                    <option value="WHATSAPP">WhatsApp</option>
                  </select>
                </div>

                {/* Internal Note Toggle */}
                <label className="flex items-center gap-1.5 cursor-pointer font-bold text-xs text-amber-900 bg-amber-50 px-2.5 py-1 rounded border border-amber-300">
                  <input
                    type="checkbox"
                    checked={isInternalNote}
                    onChange={(e) => setIsInternalNote(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Internal Note Only</span>
                </label>
              </div>

              {/* Textarea */}
              <div className="relative">
                <textarea
                  rows={3}
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder={
                    isInternalNote
                      ? 'Write an internal note for team members (never visible to customer)...'
                      : `Type support reply to customer via ${channel.replace(/_/g, ' ')}...`
                  }
                  className={`w-full p-3 rounded-xl text-xs border focus:outline-none focus:ring-2 ${
                    isInternalNote
                      ? 'bg-amber-50/50 border-amber-300 focus:ring-amber-500 text-amber-950 font-sans'
                      : 'bg-white border-[#DDD7CA] focus:ring-[#243FBA] text-[#172033]'
                  }`}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#687085]">
                  <button className="p-1.5 rounded hover:bg-[#F5F0E6]" title="Attach document or screenshot">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded hover:bg-[#F5F0E6]" title="Insert emoji">
                    <Smile className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {!isInternalNote && (
                    <button
                      onClick={() => handleSendMessage(true)}
                      className="px-3 py-2 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-semibold hover:bg-emerald-100"
                    >
                      Send & Resolve
                    </button>
                  )}
                  <button
                    onClick={() => handleSendMessage(false)}
                    className={`px-4 py-2 rounded-lg font-bold text-xs text-white flex items-center gap-1.5 shadow-md ${
                      isInternalNote ? 'bg-amber-700 hover:bg-amber-800' : 'bg-[#243FBA] hover:bg-[#172B82]'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isInternalNote ? 'Save Internal Note' : 'Send Message'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: UNIFIED AUDIT TIMELINE */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA] shadow-xs space-y-4">
            <h3 className="font-bold text-xs text-[#172033] uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#243FBA]" /> Operational Audit Timeline
            </h3>
            <Timeline events={MOCK_TIMELINE_EVENTS} compact />
          </div>
        </div>
      </div>

      {/* DRAWERS & MODALS */}

      {/* REASSIGN DRAWER */}
      <Drawer
        isOpen={isAssignDrawerOpen}
        onClose={() => setIsAssignDrawerOpen(false)}
        title="Reassign Ticket"
        subtitle="Transfer ticket ownership to another support agent or team"
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold mb-1 text-[#172033]">Target Agent Name</label>
            <input
              type="text"
              value={assignAgentName}
              onChange={(e) => setAssignAgentName(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[#DDD7CA] bg-white text-[#172033]"
            />
          </div>
          <button
            onClick={() => {
              assignTicket(ticket.id, 'USR102', assignAgentName);
              setIsAssignDrawerOpen(false);
            }}
            className="w-full py-2.5 rounded-lg bg-[#243FBA] text-white font-bold"
          >
            Confirm Reassignment
          </button>
        </div>
      </Drawer>

      {/* ESCALATION DRAWER */}
      <Drawer
        isOpen={isEscalateDrawerOpen}
        onClose={() => setIsEscalateDrawerOpen(false)}
        title="Escalate Ticket to L3 Operations / Finance"
        subtitle="Escalate complex issues requiring senior operational override"
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold mb-1 text-[#172033]">Target Department</label>
            <select
              value={escalateTeam}
              onChange={(e) => setEscalateTeam(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[#DDD7CA] bg-white"
            >
              <option value="Finance Support">Finance Support</option>
              <option value="Logistics Operations">Logistics Operations</option>
              <option value="Catalogue Ops">Catalogue Ops</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1 text-[#172033]">Escalation Reason</label>
            <textarea
              rows={3}
              value={escalateReason}
              onChange={(e) => setEscalateReason(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[#DDD7CA] bg-white"
            />
          </div>
          <button
            onClick={() => {
              escalateTicket(ticket.id, escalateTeam, escalateReason);
              setIsEscalateDrawerOpen(false);
            }}
            className="w-full py-2.5 rounded-lg bg-amber-600 text-white font-bold"
          >
            Dispatch Escalation
          </button>
        </div>
      </Drawer>

      {/* REFUND MODAL */}
      <ConfirmationModal
        isOpen={isRefundModalOpen}
        onClose={() => setIsRefundModalOpen(false)}
        onConfirm={() => {
          updateTicketStatus(ticket.id, 'RESOLVED', `Refund approved for ₹${refundAmount}`);
        }}
        title="Approve Customer Refund Action"
        description={`Are you sure you want to approve a refund of ₹${refundAmount} to WearNear Wallet for customer ${ticket.customerName}? This action is audit-logged.`}
        confirmText="Approve & Process Refund"
        variant="primary"
        requireReason
        reasonPlaceholder="Mandatory finance reason for approving refund..."
      />

      {/* RESPONSE TEMPLATES DRAWER */}
      <Drawer
        isOpen={isTemplateDrawerOpen}
        onClose={() => setIsTemplateDrawerOpen(false)}
        title="Select Quick Response Template"
        subtitle="Insert pre-approved customer communication templates with dynamic variables"
      >
        <div className="space-y-3">
          {MOCK_TEMPLATES.map((tpl) => (
            <div key={tpl.id} className="p-3.5 rounded-xl border border-[#DDD7CA] bg-[#F5F0E6] text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#172033]">{tpl.name}</span>
                <span className="text-[10px] text-[#243FBA] font-mono">{tpl.category}</span>
              </div>
              <p className="text-[#687085] italic font-sans">{tpl.message}</p>
              <button
                onClick={() => handleInsertTemplate(tpl.message)}
                className="w-full py-1.5 rounded bg-[#243FBA] text-white font-semibold text-xs hover:bg-[#172B82]"
              >
                Insert Template into Composer
              </button>
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
};
