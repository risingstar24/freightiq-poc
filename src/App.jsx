import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard';
import LoadBoard from './pages/LoadBoard';
import LoadDetail from './pages/LoadDetail';
import CarrierDirectory from './pages/CarrierDirectory';
import CarrierDetail from './pages/CarrierDetail';
import AIMatching from './pages/AIMatching';
import Dispatch from './pages/Dispatch';
import DocumentCenter from './pages/DocumentCenter';
import PODManager from './pages/PODManager';
import BotManager from './pages/BotManager';
import InvoiceCenter from './pages/InvoiceCenter';
import Analytics from './pages/Analytics';
import AICommand from './pages/AICommand';
import Messages from './pages/Messages';
import Compliance from './pages/Compliance';
import RateIntelligence from './pages/RateIntelligence';
import Exceptions from './pages/Exceptions';
import Integrations from './pages/Integrations';
import Shippers from './pages/Shippers';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="loads" element={<LoadBoard />} />
          <Route path="loads/:id" element={<LoadDetail />} />
          <Route path="carriers" element={<CarrierDirectory />} />
          <Route path="carriers/:id" element={<CarrierDetail />} />
          <Route path="ai-matching" element={<AIMatching />} />
          <Route path="dispatch" element={<Dispatch />} />
          <Route path="documents" element={<DocumentCenter />} />
          <Route path="pod" element={<PODManager />} />
          <Route path="bots" element={<BotManager />} />
          <Route path="invoices" element={<InvoiceCenter />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="ai" element={<AICommand />} />
          <Route path="messages" element={<Messages />} />
          <Route path="compliance" element={<Compliance />} />
          <Route path="rates" element={<RateIntelligence />} />
          <Route path="exceptions" element={<Exceptions />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="shippers" element={<Shippers />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
