import { Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';

import { Workspace } from './pages/Workspace';
import { ReviewQueue } from './pages/ReviewQueue';
import { ReviewSession } from './pages/ReviewSession';
import { Invoices } from './pages/Invoices';
import { Clients } from './pages/Clients';
import { Knowledge } from './pages/Knowledge';
import { Reports } from './pages/Reports';
import { ClientPortal } from './pages/ClientPortal';

function App() {
  return (
    <Routes>
      {/* Client Portal - Separate from the FinOps IDE */}
      <Route path="/portal" element={<ClientPortal />} />

      {/* Internal FinOps IDE Routes */}
      <Route path="/*" element={
        <AppShell>
          <Routes>
            <Route path="/" element={<Workspace />} />
            <Route path="/review" element={<ReviewQueue />} />
            <Route path="/review/:id" element={<ReviewSession />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/reports" element={<Reports />} />
            {/* Fallbacks */}
            <Route path="*" element={<div className="p-8">Not Found</div>} />
          </Routes>
        </AppShell>
      } />
    </Routes>
  );
}

export default App;
