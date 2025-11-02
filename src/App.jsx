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
import CrmCreate from './pages/CrmCreate';
import CrmPipeline from './pages/CrmPipeline';
import EmailCampaigns from './pages/EmailCampaigns';
import Personas from './pages/Personas';
import PersonaCreate from './pages/PersonaCreate';
import Settings from './pages/Settings';
import Ads from './pages/Ads';
import Content from './pages/Content';
import Seo from './pages/Seo';
import BdCentral from './pages/BdCentral';
import GrowthDashboard from './pages/GrowthDashboard';
import Relationship from './pages/Relationship';
import ContactsHub from './pages/ContactsHub';
import Messages from './pages/Messages';
import BdInsights from './pages/BdInsights';
import Companies from './pages/Companies';
import Pipeline from './pages/Pipeline';
import NotFound from './pages/NotFound';

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
          <Route path="/growth-dashboard" element={<GrowthDashboard />} />
          <Route path="/relationship" element={<Relationship />} />
          <Route path="/contacts" element={<ContactsHub />} />
          <Route path="/business-development" element={<GrowthDashboard />} />
          <Route path="/bd-central" element={<BdCentral />} />
          <Route path="/crm-hub" element={<CrmHub />} />
          <Route path="/crm/list" element={<CrmList />} />
          <Route path="/crm/create" element={<CrmCreate />} />
          <Route path="/crm/pipeline" element={<CrmPipeline />} />
          <Route path="/personas" element={<Personas />} />
          <Route path="/personas/create" element={<PersonaCreate />} />
          <Route path="/business-development/ads" element={<Ads />} />
          <Route path="/business-development/content" element={<Content />} />
          <Route path="/business-development/seo" element={<Seo />} />
          <Route path="/business-development/email-campaigns" element={<EmailCampaigns />} />
          <Route path="/business-development/events" element={<CrmList />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/bd-insights" element={<BdInsights />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

