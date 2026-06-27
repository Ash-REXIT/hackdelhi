import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Layouts
import { AppShell } from './components/layout/AppShell';
import { PortalShell } from './components/layout/PortalShell';
import { OperationsShell } from './components/layout/OperationsShell';

// Auth Page
import { Login } from './pages/Login';

// Internal TASC AI Workspace Pages (Admin)
import { Workspace } from './pages/Workspace';
import { ReviewQueue } from './pages/ReviewQueue';
import { ReviewSession } from './pages/ReviewSession';
import { Invoices } from './pages/Invoices';
import { Clients } from './pages/Clients';
import { Knowledge } from './pages/Knowledge';
import { Reports } from './pages/Reports';
import { DataView } from './pages/DataView';

// Client Portal Pages (Client)
import { PortalHome } from './pages/portal/PortalHome';
import { PortalUpload } from './pages/portal/PortalUpload';
import { PortalInvoices } from './pages/portal/PortalInvoices';
import { PortalApprovals } from './pages/portal/PortalApprovals';
import { PortalMessages } from './pages/portal/PortalMessages';
import { PortalNotifications } from './pages/portal/PortalNotifications';
import { PortalAccount } from './pages/portal/PortalAccount';

// Operations Center Pages (Manager)
import { OperationsCenter } from './pages/OperationsCenter';

function App() {
  const { isAuthenticated, role } = useAuth();

  return (
    <Routes>
      {/* Root Route: Redirects based on auth status */}
      <Route path="/" element={
        !isAuthenticated ? <Navigate to="/login" replace /> :
        role === 'admin' ? <Navigate to="/workspace" replace /> :
        role === 'client' ? <Navigate to="/portal" replace /> :
        role === 'manager' ? <Navigate to="/operations" replace /> :
        <Navigate to="/login" replace />
      } />

      {/* Login / Landing Page */}
      <Route path="/login" element={<Login />} />

      {/* Client Portal Routes (Role: 'client') */}
      <Route path="/portal/*" element={
        <ProtectedRoute allowedRoles={['client']}>
          <PortalShell>
            <Routes>
              <Route path="/" element={<PortalHome />} />
              <Route path="/upload" element={<PortalUpload />} />
              <Route path="/invoices" element={<PortalInvoices />} />
              <Route path="/approvals" element={<PortalApprovals />} />
              <Route path="/messages" element={<PortalMessages />} />
              <Route path="/notifications" element={<PortalNotifications />} />
              <Route path="/account" element={<PortalAccount />} />
            </Routes>
          </PortalShell>
        </ProtectedRoute>
      } />

      {/* Internal TASC FinOps Routes (Role: 'admin') */}
      <Route path="/workspace/*" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AppShell>
            <Routes>
              <Route path="/" element={<Workspace />} />
              <Route path="/review" element={<ReviewQueue />} />
              <Route path="/review/:id" element={<ReviewSession />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/knowledge" element={<Knowledge />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<DataView title="System Settings" />} />
            </Routes>
          </AppShell>
        </ProtectedRoute>
      } />

      {/* Operations Center Routes (Role: 'manager') */}
      <Route path="/operations/*" element={
        <ProtectedRoute allowedRoles={['manager']}>
          <OperationsShell>
            <Routes>
              <Route path="/" element={<OperationsCenter />} />
            </Routes>
          </OperationsShell>
        </ProtectedRoute>
      } />

      {/* Fallback Catch-all Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
