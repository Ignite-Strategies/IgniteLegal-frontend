import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CompanyCentral from './pages/CompanyCentral';
import NDADashboard from './pages/NDADashboard';
import NDAAnalytics from './pages/NDAAnalytics';
import NDAHub from './pages/NDAHub';
import Ingest from './pages/Ingest';
import AssignNdaWork from './pages/AssignNdaWork';
import ReviewNdaWork from './pages/ReviewNdaWork';
import Review from './pages/Review';
import ApprovalFinal from './pages/ApprovalFinal';
import FinancialHub from './pages/FinancialHub';
import Billing from './pages/Billing';
import BillingCreate from './pages/BillingCreate';
import BillingDetail from './pages/BillingDetail';
import Forecasting from './pages/Forecasting';
import FinancialSpends from './pages/FinancialSpends';
import CrmHub from './pages/CrmHub';
import CrmList from './pages/CrmList';
import Personas from './pages/Personas';
import Settings from './pages/Settings';
import Ads from './pages/Ads';
import Content from './pages/Content';
import Seo from './pages/Seo';
import BdCentral from './pages/BdCentral';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<CompanyCentral />} />
          <Route path="/nda-hub" element={<NDAHub />} />
          <Route path="/nda-dashboard" element={<NDADashboard />} />
          <Route path="/nda-analytics" element={<NDAAnalytics />} />
          <Route path="/nda/ingest" element={<Ingest />} />
          <Route path="/nda/assign" element={<AssignNdaWork />} />
          <Route path="/nda/review" element={<ReviewNdaWork />} />
          <Route path="/review/:id" element={<Review />} />
          <Route path="/approval-final/:id" element={<ApprovalFinal />} />
          <Route path="/financial-hub" element={<FinancialHub />} />
          <Route path="/financial/billing" element={<Billing />} />
          <Route path="/financial/billing/create" element={<BillingCreate />} />
          <Route path="/financial/billing/:id" element={<BillingDetail />} />
          <Route path="/financial/forecasting" element={<Forecasting />} />
          <Route path="/financial/spends" element={<FinancialSpends />} />
          <Route path="/bd-central" element={<BdCentral />} />
          <Route path="/crm-hub" element={<CrmHub />} />
          <Route path="/crm/list" element={<CrmList />} />
          <Route path="/personas" element={<Personas />} />
          <Route path="/business-development/ads" element={<Ads />} />
          <Route path="/business-development/content" element={<Content />} />
          <Route path="/business-development/seo" element={<Seo />} />
          <Route path="/business-development/email-campaigns" element={<CrmList />} />
          <Route path="/business-development/events" element={<CrmList />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

