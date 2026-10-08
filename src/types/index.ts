export type UserRole =
  | 'SUPPORT_AGENT'
  | 'SENIOR_SUPPORT_AGENT'
  | 'SUPPORT_ADMIN'
  | 'OPERATIONS_SUPPORT'
  | 'FINANCE_SUPPORT';

export type AgentStatus = 'AVAILABLE' | 'AWAY' | 'OFFLINE';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  status: AgentStatus;
  employeeId: string;
  permissions: string[];
}

export type TicketStatus =
  | 'OPEN'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'WAITING_FOR_CUSTOMER'
  | 'WAITING_FOR_STORE'
  | 'WAITING_FOR_CAPTAIN'
  | 'INVESTIGATION'
  | 'RESOLVED'
  | 'CLOSED'
  | 'REOPENED';

export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' | 'CRITICAL';

export type TicketChannel = 'IN_APP_CHAT' | 'EMAIL' | 'SMS' | 'WHATSAPP' | 'INTERNAL_NOTE' | 'SYSTEM';

export type SLAState = 'HEALTHY' | 'WARNING' | 'AT_RISK' | 'BREACHED';

export type TicketCategory =
  | 'CUSTOMER_ACCOUNT'
  | 'ORDER'
  | 'PAYMENT'
  | 'DELIVERY'
  | 'PRODUCT_CATALOGUE'
  | 'INVENTORY'
  | 'RETURN'
  | 'REFUND'
  | 'STORE'
  | 'CAPTAIN'
  | 'WALLET'
  | 'SETTLEMENT'
  | 'TECHNICAL';

export interface Ticket {
  id: string; // TKT10001
  customerId: string;
  customerName: string;
  customerMobile: string;
  customerEmail: string;
  subject: string;
  description: string;
  category: TicketCategory;
  subcategory: string;
  priority: TicketPriority;
  status: TicketStatus;
  channel: TicketChannel;
  assignedAgentId?: string;
  assignedAgentName?: string;
  assignedTeam: string;
  orderId?: string;
  storeId?: string;
  storeName?: string;
  captainId?: string;
  captainName?: string;
  firstResponseSLA: {
    targetMinutes: number;
    dueAt: string;
    remainingSeconds: number;
    status: SLAState;
  };
  resolutionSLA: {
    targetMinutes: number;
    dueAt: string;
    remainingSeconds: number;
    status: SLAState;
  };
  escalationLevel?: number;
  createdAt: string;
  updatedAt: string;
  lastActivityBy: string;
  tags: string[];
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  senderId: string;
  senderName: string;
  senderRole: 'CUSTOMER' | 'SUPPORT' | 'STORE' | 'CAPTAIN' | 'SYSTEM';
  channel: TicketChannel;
  content: string;
  isInternal: boolean;
  attachments?: { id: string; name: string; url: string; size: string; type: string }[];
  timestamp: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  actor: string;
  actorRole: string;
  iconType: 'order' | 'payment' | 'delivery' | 'ticket' | 'refund' | 'return' | 'store' | 'captain' | 'audit' | 'system';
  statusBadge?: { label: string; type: 'success' | 'warning' | 'error' | 'info' | 'neutral' };
  metadata?: Record<string, string | number>;
}

export interface Customer {
  id: string; // CUST101
  name: string;
  mobile: string;
  email: string;
  accountStatus: 'ACTIVE' | 'SUSPENDED' | 'UNVERIFIED' | 'BLOCKED';
  customerSince: string;
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  returnedOrders: number;
  refundedOrders: number;
  openTicketsCount: number;
  resolvedTicketsCount: number;
  escalatedTicketsCount: number;
  csatScore: number;
  walletBalance: number;
  codLimit: number;
  defaultAddress: string;
  avatar: string;
}

export interface OrderItem {
  id: string;
  sku: string;
  name: string;
  storeId: string;
  storeName: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string; // WN10001
  customerId: string;
  customerName: string;
  storeId: string;
  storeName: string;
  items: OrderItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  tax: number;
  totalAmount: number;
  paymentMethod: 'ONLINE_UPI' | 'CREDIT_CARD' | 'COD' | 'WALLET' | 'PARTIAL_WALLET';
  paymentStatus: 'SUCCESS' | 'PENDING' | 'FAILED' | 'REFUNDED' | 'DISPUTED';
  orderStatus: 'PLACED' | 'STORE_ACCEPTED' | 'PACKED' | 'CAPTAIN_ASSIGNED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED' | 'RETURN_REQUESTED';
  deliveryCaptainId?: string;
  deliveryCaptainName?: string;
  deliveryCaptainMobile?: string;
  deliveryAddress: string;
  placedAt: string;
  estimatedDeliveryAt: string;
  deliveredAt?: string;
}

export interface DeliveryTracking {
  id: string;
  orderId: string;
  customerName: string;
  storeName: string;
  captainName: string;
  captainMobile: string;
  captainId: string;
  vehicleNumber: string;
  status: 'ASSIGNED' | 'PICKUP_IN_PROGRESS' | 'ARRIVED_AT_STORE' | 'ORDER_PICKED_UP' | 'IN_TRANSIT' | 'ARRIVED_AT_CUSTOMER' | 'DELIVERED' | 'FAILED';
  etaMinutes: number;
  distanceKm: number;
  currentLat?: number;
  currentLng?: number;
  storeLat: number;
  storeLng: number;
  customerLat: number;
  customerLng: number;
  updatedAt: string;
}

export interface Store {
  id: string; // STR1001
  name: string;
  ownerName: string;
  mobile: string;
  email: string;
  address: string;
  status: 'ACTIVE' | 'PAUSED' | 'SUSPENDED';
  kycStatus: 'VERIFIED' | 'PENDING' | 'REJECTED';
  rating: number;
  totalProducts: number;
  totalOrders: number;
  openIssuesCount: number;
}

export interface ProductCatalogue {
  id: string; // PRD1001
  sku: string;
  name: string;
  storeId: string;
  storeName: string;
  category: string;
  brand: string;
  price: number;
  discountPrice: number;
  stock: number;
  sizes: string[];
  colors: string[];
  image: string;
  status: 'ACTIVE' | 'OUT_OF_STOCK' | 'DISCONTINUED' | 'FLAGGED';
  catalogueExecutive: string;
  issuesCount: number;
}

export interface Captain {
  id: string; // CAP1001
  name: string;
  mobile: string;
  vehicle: string;
  kycStatus: 'VERIFIED' | 'PENDING' | 'EXPIRED';
  status: 'ONLINE' | 'OFFLINE' | 'ON_DELIVERY' | 'SUSPENDED';
  currentDeliveryId?: string;
  totalDeliveries: number;
  completedDeliveries: number;
  failedDeliveries: number;
  codCollectedToday: number;
  earningsToday: number;
  rating: number;
  openTicketsCount: number;
}

export interface PaymentTransaction {
  id: string; // PAY1001
  orderId: string;
  customerId: string;
  customerName: string;
  amount: number;
  method: 'UPI' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'NET_BANKING' | 'WALLET' | 'COD';
  transactionRef: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED' | 'REFUNDED' | 'DISPUTED';
  gateway: 'Razorpay' | 'PayTM' | 'PhonePe' | 'Stripe';
  failureReason?: string;
  createdAt: string;
}

export interface RefundRequest {
  id: string; // REF1001
  orderId: string;
  ticketId?: string;
  customerId: string;
  customerName: string;
  amount: number;
  reason: string;
  destination: 'ORIGINAL_PAYMENT_MODE' | 'WEARNEAR_WALLET' | 'BANK_TRANSFER';
  paymentRef: string;
  status: 'REFUND_REQUESTED' | 'REFUND_APPROVED' | 'REFUND_PROCESSING' | 'REFUNDED' | 'REFUND_FAILED' | 'REFUND_REJECTED';
  requestedBy: string;
  approvedBy?: string;
  createdAt: string;
  processedAt?: string;
}

export interface ReturnRequest {
  id: string; // RET1001
  orderId: string;
  ticketId?: string;
  customerId: string;
  customerName: string;
  productName: string;
  sku: string;
  size: string;
  color: string;
  reason: 'WRONG_SIZE' | 'DAMAGED_PRODUCT' | 'DEFECTIVE_PRODUCT' | 'WRONG_PRODUCT' | 'NOT_AS_EXPECTED' | 'OTHER';
  evidenceImages: string[];
  status: 'REQUESTED' | 'APPROVED' | 'PICKUP_SCHEDULED' | 'PICKED_UP' | 'INSPECTED' | 'REFUND_INITIATED' | 'REJECTED';
  pickupCaptainId?: string;
  createdAt: string;
}

export interface CODRecord {
  id: string;
  orderId: string;
  customerName: string;
  orderAmount: number;
  collectedAmount: number;
  captainId: string;
  captainName: string;
  collectionStatus: 'COLLECTED' | 'PENDING' | 'SHORTAGE' | 'DISPUTED';
  settlementStatus: 'SETTLED' | 'UNSETTLED' | 'HOLD';
  transactionRef: string;
  collectedAt: string;
}

export interface WalletTransaction {
  id: string;
  walletId: string;
  entityName: string; // Customer / Partner name
  entityType: 'CUSTOMER' | 'STORE' | 'CAPTAIN';
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  reference: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  reason: string;
  performedBy: string;
  createdAt: string;
}

export interface SettlementRecord {
  id: string;
  entityType: 'STORE' | 'CAPTAIN';
  entityId: string;
  entityName: string;
  period: string;
  grossAmount: number;
  commission: number;
  adjustments: number;
  refunds: number;
  netAmount: number;
  status: 'PENDING' | 'PROCESSING' | 'PROCESSED' | 'FAILED';
  processedDate?: string;
}

export interface EscalationRecord {
  id: string;
  ticketId: string;
  customerName: string;
  fromLevel: number;
  toLevel: number;
  fromTeam: string;
  toTeam: string;
  reason: string;
  priority: TicketPriority;
  status: 'PENDING' | 'IN_REVIEW' | 'RESOLVED';
  createdAgent: string;
  targetAgent?: string;
  createdAt: string;
}

export interface SLARule {
  id: string;
  category: TicketCategory;
  priority: TicketPriority;
  firstResponseMinutes: number;
  resolutionMinutes: number;
  escalationMinutes: number;
  isActive: boolean;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  category: TicketCategory;
  tags: string[];
  content: string;
  author: string;
  lastUpdated: string;
  helpfulCount: number;
  unhelpfulCount: number;
  isPublished: boolean;
}

export interface ResponseTemplate {
  id: string;
  name: string;
  category: TicketCategory;
  channel: TicketChannel;
  message: string;
  variables: string[];
  status: 'ACTIVE' | 'ARCHIVED';
  createdBy: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  user: string;
  role: UserRole;
  action: string;
  entityType: string;
  entityId: string;
  ticketId?: string;
  oldValue?: string;
  newValue?: string;
  ipAddress: string;
  device: string;
  timestamp: string;
  reason: string;
}

export interface CSATRating {
  id: string;
  ticketId: string;
  customerName: string;
  agentName: string;
  rating: number; // 1 to 5
  feedback: string;
  category: TicketCategory;
  createdAt: string;
}
