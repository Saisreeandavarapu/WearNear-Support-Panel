import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SupportProvider } from './context/SupportContext';
import { SupportLayout } from './components/layout/SupportLayout';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { OTPPage } from './pages/auth/OTPPage';
import { SecurityPage } from './pages/auth/SecurityPage';

// Main Pages
import { SupportDashboardPage } from './pages/dashboard/SupportDashboardPage';
import { CustomersListPage } from './pages/customers/CustomersListPage';
import { Customer360Page } from './pages/customers/Customer360Page';

import { TicketsListPage } from './pages/tickets/TicketsListPage';
import { CreateTicketPage } from './pages/tickets/CreateTicketPage';
import { TicketDetailsPage } from './pages/tickets/TicketDetailsPage';

import { OrdersListPage } from './pages/orders/OrdersListPage';
import { OrderDetailsPage } from './pages/orders/OrderDetailsPage';

import { DeliveryPage } from './pages/delivery/DeliveryPage';
import { DeliveryTrackingPage } from './pages/delivery/DeliveryTrackingPage';

import { CaptainsListPage } from './pages/captains/CaptainsListPage';
import { StoresListPage } from './pages/stores/StoresListPage';
import { CatalogueListPage } from './pages/catalogue/CatalogueListPage';

import { PaymentsListPage } from './pages/finance/PaymentsListPage';
import { RefundsListPage } from './pages/finance/RefundsListPage';
import { ReturnsListPage } from './pages/finance/ReturnsListPage';
import { CODSupportPage } from './pages/finance/CODSupportPage';
import { WalletSupportPage } from './pages/finance/WalletSupportPage';
import { SettlementsPage } from './pages/finance/SettlementsPage';

import { EscalationsListPage } from './pages/escalations/EscalationsListPage';
import { SLAMonitorPage } from './pages/sla/SLAMonitorPage';

import { KnowledgeBasePage } from './pages/knowledge/KnowledgeBasePage';
import { ResponseTemplatesPage } from './pages/knowledge/ResponseTemplatesPage';

import { ReportsPage } from './pages/insights/ReportsPage';
import { CSATPage } from './pages/insights/CSATPage';
import { AnalyticsPage } from './pages/insights/AnalyticsPage';

import { AuditLogsPage } from './pages/system/AuditLogsPage';
import { NotificationsPage } from './pages/system/NotificationsPage';
import { SettingsPage } from './pages/system/SettingsPage';

export function App() {
  return (
    <AuthProvider>
      <SupportProvider>
        <BrowserRouter>
          <Routes>
            {/* AUTHENTICATION ROUTES */}
            <Route path="/support/login" element={<LoginPage />} />
            <Route path="/support/otp" element={<OTPPage />} />
            <Route path="/support/forgot-password" element={<LoginPage />} />

            {/* PROTECTED SUPPORT PANEL APP */}
            <Route element={<SupportLayout />}>
              <Route path="/" element={<Navigate to="/support/dashboard" replace />} />
              <Route path="/support" element={<Navigate to="/support/dashboard" replace />} />
              <Route path="/support/dashboard" element={<SupportDashboardPage />} />

              <Route path="/support/customers" element={<CustomersListPage />} />
              <Route path="/support/customers/:id" element={<Customer360Page />} />

              <Route path="/support/tickets" element={<TicketsListPage />} />
              <Route path="/support/tickets/my" element={<TicketsListPage />} />
              <Route path="/support/tickets/unassigned" element={<TicketsListPage />} />
              <Route path="/support/tickets/create" element={<CreateTicketPage />} />
              <Route path="/support/tickets/:id" element={<TicketDetailsPage />} />

              <Route path="/support/orders" element={<OrdersListPage />} />
              <Route path="/support/orders/:id" element={<OrderDetailsPage />} />

              <Route path="/support/delivery" element={<DeliveryPage />} />
              <Route path="/support/delivery/tracking" element={<DeliveryTrackingPage />} />

              <Route path="/support/captains" element={<CaptainsListPage />} />
              <Route path="/support/stores" element={<StoresListPage />} />
              <Route path="/support/catalogue" element={<CatalogueListPage />} />

              <Route path="/support/payments" element={<PaymentsListPage />} />
              <Route path="/support/refunds" element={<RefundsListPage />} />
              <Route path="/support/returns" element={<ReturnsListPage />} />
              <Route path="/support/cod" element={<CODSupportPage />} />
              <Route path="/support/wallet" element={<WalletSupportPage />} />
              <Route path="/support/settlements" element={<SettlementsPage />} />

              <Route path="/support/escalations" element={<EscalationsListPage />} />
              <Route path="/support/sla" element={<SLAMonitorPage />} />

              <Route path="/support/knowledge-base" element={<KnowledgeBasePage />} />
              <Route path="/support/templates" element={<ResponseTemplatesPage />} />

              <Route path="/support/reports" element={<ReportsPage />} />
              <Route path="/support/csat" element={<CSATPage />} />
              <Route path="/support/analytics" element={<AnalyticsPage />} />

              <Route path="/support/audit" element={<AuditLogsPage />} />
              <Route path="/support/notifications" element={<NotificationsPage />} />
              <Route path="/support/security" element={<SecurityPage />} />
              <Route path="/support/settings" element={<SettingsPage />} />

              {/* FALLBACK */}
              <Route path="*" element={<Navigate to="/support/dashboard" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SupportProvider>
    </AuthProvider>
  );
}

export default App;
