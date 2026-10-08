import React, { createContext, useContext, useState } from 'react';
import { Ticket, TicketMessage, Customer, Order, DeliveryTracking } from '../types';
import {
  MOCK_TICKETS,
  MOCK_TICKET_MESSAGES,
  MOCK_CUSTOMERS,
  MOCK_ORDERS,
  MOCK_DELIVERY_TRACKING,
} from '../mock/data';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface SupportContextType {
  tickets: Ticket[];
  customers: Customer[];
  orders: Order[];
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  addTicketMessage: (ticketId: string, message: Omit<TicketMessage, 'id' | 'timestamp'>) => void;
  getTicketMessages: (ticketId: string) => TicketMessage[];
  updateTicketStatus: (ticketId: string, status: Ticket['status'], reason?: string) => void;
  assignTicket: (ticketId: string, agentId: string, agentName: string) => void;
  escalateTicket: (ticketId: string, toTeam: string, reason: string) => void;
  createTicket: (newTicket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'firstResponseSLA' | 'resolutionSLA'>) => Ticket;
  getDeliveryTracking: (orderId: string) => DeliveryTracking | undefined;
}

const SupportContext = createContext<SupportContextType | undefined>(undefined);

export const SupportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
  const [ticketMessages, setTicketMessages] = useState<Record<string, TicketMessage[]>>(MOCK_TICKET_MESSAGES);
  const [customers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [orders] = useState<Order[]>(MOCK_ORDERS);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getTicketMessages = (ticketId: string) => {
    return ticketMessages[ticketId] || [];
  };

  const addTicketMessage = (ticketId: string, messageData: Omit<TicketMessage, 'id' | 'timestamp'>) => {
    const newMessage: TicketMessage = {
      ...messageData,
      id: `MSG-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };

    setTicketMessages((prev) => ({
      ...prev,
      [ticketId]: [...(prev[ticketId] || []), newMessage],
    }));

    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              updatedAt: new Date().toISOString(),
              lastActivityBy: messageData.senderName,
            }
          : t
      )
    );

    addToast({
      type: messageData.isInternal ? 'info' : 'success',
      title: messageData.isInternal ? 'Internal Note Added' : 'Message Sent',
      message: messageData.isInternal
        ? 'Internal note saved successfully to ticket audit timeline.'
        : `Message sent to customer via ${messageData.channel}.`,
    });
  };

  const updateTicketStatus = (ticketId: string, status: Ticket['status'], reason?: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status, updatedAt: new Date().toISOString() } : t))
    );

    if (reason) {
      addTicketMessage(ticketId, {
        ticketId,
        senderId: 'USR100',
        senderName: 'Tanuja Sen',
        senderRole: 'SUPPORT',
        channel: 'SYSTEM',
        content: `Ticket status updated to ${status}. Reason: ${reason}`,
        isInternal: true,
      });
    }

    addToast({
      type: 'success',
      title: 'Status Updated',
      message: `Ticket #${ticketId} status changed to ${status}.`,
    });
  };

  const assignTicket = (ticketId: string, agentId: string, agentName: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              assignedAgentId: agentId,
              assignedAgentName: agentName,
              status: t.status === 'OPEN' ? 'ASSIGNED' : t.status,
              updatedAt: new Date().toISOString(),
            }
          : t
      )
    );

    addToast({
      type: 'info',
      title: 'Ticket Assigned',
      message: `Ticket #${ticketId} assigned to ${agentName}.`,
    });
  };

  const escalateTicket = (ticketId: string, toTeam: string, reason: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              assignedTeam: toTeam,
              escalationLevel: (t.escalationLevel || 1) + 1,
              priority: 'URGENT',
              updatedAt: new Date().toISOString(),
            }
          : t
      )
    );

    addTicketMessage(ticketId, {
      ticketId,
      senderId: 'USR100',
      senderName: 'Tanuja Sen',
      senderRole: 'SUPPORT',
      channel: 'SYSTEM',
      content: `ESCALATED to ${toTeam}. Reason: ${reason}`,
      isInternal: true,
    });

    addToast({
      type: 'warning',
      title: 'Ticket Escalated',
      message: `Ticket #${ticketId} escalated to ${toTeam}.`,
    });
  };

  const createTicket = (
    newTicketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'firstResponseSLA' | 'resolutionSLA'>
  ): Ticket => {
    const id = `TKT${10000 + tickets.length + 1}`;
    const now = new Date().toISOString();
    const created: Ticket = {
      ...newTicketData,
      id,
      createdAt: now,
      updatedAt: now,
      firstResponseSLA: {
        targetMinutes: 15,
        dueAt: new Date(Date.now() + 15 * 60000).toISOString(),
        remainingSeconds: 900,
        status: 'HEALTHY',
      },
      resolutionSLA: {
        targetMinutes: 120,
        dueAt: new Date(Date.now() + 120 * 60000).toISOString(),
        remainingSeconds: 7200,
        status: 'HEALTHY',
      },
    };

    setTickets((prev) => [created, ...prev]);

    addToast({
      type: 'success',
      title: 'Ticket Created',
      message: `Ticket #${id} created successfully.`,
    });

    return created;
  };

  const getDeliveryTracking = (orderId: string) => {
    if (orderId === 'WN10001') return MOCK_DELIVERY_TRACKING;
    return undefined;
  };

  return (
    <SupportContext.Provider
      value={{
        tickets,
        customers,
        orders,
        isSearchOpen,
        setIsSearchOpen,
        toasts,
        addToast,
        removeToast,
        addTicketMessage,
        getTicketMessages,
        updateTicketStatus,
        assignTicket,
        escalateTicket,
        createTicket,
        getDeliveryTracking,
      }}
    >
      {children}
    </SupportContext.Provider>
  );
};

export const useSupport = () => {
  const context = useContext(SupportContext);
  if (!context) {
    throw new Error('useSupport must be used within a SupportProvider');
  }
  return context;
};
