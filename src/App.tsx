import { Routes, Route, Navigate } from 'react-router-dom'
import { useApp } from './context/AppContext'
import { RoleSelector } from './pages/RoleSelector'
import { DashboardLayout } from './components/layout/DashboardLayout'

import { ClientDashboard } from './pages/client/ClientDashboard'
import { UploadTimesheet } from './pages/client/UploadTimesheet'
import { AIProcessing } from './pages/client/AIProcessing'
import { MyTimesheets } from './pages/client/MyTimesheets'
import { VerificationReportPage, VerificationReportsList } from './pages/client/VerificationReport'
import { ClientInvoices } from './pages/client/ClientInvoices'
import { ClientNotifications } from './pages/client/ClientNotifications'
import { ClientProfile, ClientAssistant } from './pages/client/ClientProfile'

import { AdminDashboard } from './pages/admin/AdminDashboard'
import { ClientManagement } from './pages/admin/ClientManagement'
import { IncomingTimesheets } from './pages/admin/IncomingTimesheets'
import { AIReviewQueue } from './pages/admin/AIReviewQueue'
import { AIEvidenceEngine } from './pages/admin/AIEvidenceEngine'
import { InvoiceValidation } from './pages/admin/InvoiceValidation'
import { InvoiceGenerator } from './pages/admin/InvoiceGenerator'
import { DispatchCenter } from './pages/admin/DispatchCenter'
import { ExceptionCenter } from './pages/admin/ExceptionCenter'
import { Analytics } from './pages/admin/Analytics'
import { AuditLogs } from './pages/admin/AuditLogs'
import { AdminNotifications, AdminSettings, AdminCopilot } from './pages/admin/AdminNotifications'

const clientChatSuggestions = [
  'Explain this verification',
  'Why was my timesheet flagged?',
  'Show invoice summary',
]

const adminChatSuggestions = [
  "Summarize today's uploads",
  'Explain anomaly',
  'Generate finance summary',
]

function ProtectedRoute({ role, children }: { role: 'client' | 'admin'; children: React.ReactNode }) {
  const { role: currentRole } = useApp()
  if (!currentRole) return <Navigate to="/" replace />
  if (currentRole !== role) return <Navigate to={currentRole === 'client' ? '/client' : '/admin'} replace />
  return <>{children}</>
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelector />} />

      <Route
        path="/client"
        element={
          <ProtectedRoute role="client">
            <DashboardLayout variant="client" chatSuggestions={clientChatSuggestions} chatTitle="AI Assistant" />
          </ProtectedRoute>
        }
      >
        <Route index element={<ClientDashboard />} />
        <Route path="upload" element={<UploadTimesheet />} />
        <Route path="processing/:id" element={<AIProcessing />} />
        <Route path="timesheets" element={<MyTimesheets />} />
        <Route path="reports" element={<VerificationReportsList />} />
        <Route path="reports/:id" element={<VerificationReportPage />} />
        <Route path="invoices" element={<ClientInvoices />} />
        <Route path="notifications" element={<ClientNotifications />} />
        <Route path="assistant" element={<ClientAssistant />} />
        <Route path="profile" element={<ClientProfile />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <DashboardLayout variant="admin" chatSuggestions={adminChatSuggestions} showFloatingChat />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="clients" element={<ClientManagement />} />
        <Route path="timesheets" element={<IncomingTimesheets />} />
        <Route path="review" element={<AIReviewQueue />} />
        <Route path="evidence/:id" element={<AIEvidenceEngine />} />
        <Route path="invoice-validation" element={<InvoiceValidation />} />
        <Route path="invoice-generator/:id?" element={<InvoiceGenerator />} />
        <Route path="dispatch" element={<DispatchCenter />} />
        <Route path="exceptions" element={<ExceptionCenter />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="audit" element={<AuditLogs />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="copilot" element={<AdminCopilot />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
