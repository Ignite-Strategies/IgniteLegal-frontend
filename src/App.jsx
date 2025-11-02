import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CompanyCentral from './pages/CompanyCentral';
import GrowthDashboard from './pages/GrowthDashboard';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// NDA imports
import NDAHub from './pages/nda/NDAHub';
import NDADashboard from './pages/nda/NDADashboard';
import NDAAnalytics from './pages/nda/NDAAnalytics';
import Ingest from './pages/nda/Ingest';
import AssignNdaWork from './pages/nda/AssignNdaWork';
import ReviewNdaWork from './pages/nda/ReviewNdaWork';
import Review from './pages/nda/Review';
import ApprovalFinal from './pages/nda/ApprovalFinal';

// Financial imports
import FinancialHub from './pages/financial/FinancialHub';
import Billing from './pages/financial/Billing';
import BillingCreate from './pages/financial/BillingCreate';
import BillingDetail from './pages/financial/BillingDetail';
import Forecasting from './pages/financial/Forecasting';
import FinancialSpends from './pages/financial/FinancialSpends';

// Attract imports
import AttractHub from './pages/attract/AttractHub';

// Relationship imports
import RelationshipDashboard from './pages/relationship/RelationshipDashboard';
import Relationship from './pages/relationship/Relationship';
import MeetingDashboard from './pages/relationship/MeetingDashboard';
import MeetingPrep from './pages/relationship/MeetingPrep';
import Ecosystem from './pages/relationship/Ecosystem';

// Outreach imports
import EmailCampaigns from './pages/outreach/EmailCampaigns';
import Ads from './pages/outreach/Ads';
import Content from './pages/outreach/Content';
import Seo from './pages/outreach/Seo';

// Contacts/CRM imports
import ContactsHub from './pages/contacts/ContactsHub';
import CrmHub from './pages/contacts/CrmHub';
import CrmList from './pages/contacts/CrmList';
import CrmCreate from './pages/contacts/CrmCreate';
import CrmPipeline from './pages/contacts/CrmPipeline';
import Companies from './pages/contacts/Companies';
import Pipeline from './pages/contacts/Pipeline';

// Personas imports
import Personas from './pages/personas/Personas';
import PersonaCreate from './pages/personas/PersonaCreate';

// Analytics imports
import AnalyticsHub from './pages/analytics/AnalyticsHub';
import GrowthInsights from './pages/analytics/GrowthInsights';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<CompanyCentral />} />
          
          {/* NDA Routes */}
          <Route path="/nda-hub" element={<NDAHub />} />
          <Route path="/nda-dashboard" element={<NDADashboard />} />
          <Route path="/nda-analytics" element={<NDAAnalytics />} />
          <Route path="/nda/ingest" element={<Ingest />} />
          <Route path="/nda/assign" element={<AssignNdaWork />} />
          <Route path="/nda/review" element={<ReviewNdaWork />} />
          <Route path="/review/:id" element={<Review />} />
          <Route path="/approval-final/:id" element={<ApprovalFinal />} />
          
          {/* Financial Routes */}
          <Route path="/financial-hub" element={<FinancialHub />} />
          <Route path="/financial/billing" element={<Billing />} />
          <Route path="/financial/billing/create" element={<BillingCreate />} />
          <Route path="/financial/billing/:id" element={<BillingDetail />} />
          <Route path="/financial/forecasting" element={<Forecasting />} />
          <Route path="/financial/spends" element={<FinancialSpends />} />
          
          {/* Growth Routes */}
          <Route path="/growth-dashboard" element={<GrowthDashboard />} />
          <Route path="/business-development" element={<GrowthDashboard />} />
          
          {/* Attract Routes */}
          <Route path="/attract" element={<AttractHub />} />
          
          {/* Relationship Routes */}
          <Route path="/relationship" element={<Relationship />} />
          <Route path="/relationship-dashboard" element={<RelationshipDashboard />} />
          <Route path="/meeting-dashboard" element={<MeetingDashboard />} />
          <Route path="/meeting-prep/:id" element={<MeetingPrep />} />
          <Route path="/ecosystem" element={<Ecosystem />} />
          
          {/* Outreach Routes */}
          <Route path="/outreach" element={<OutreachHome />} />
          <Route path="/outreach/outreach-home" element={<OutreachHome />} />
          <Route path="/outreach/create" element={<CampaignCreator />} />
          <Route path="/outreach/campaign-creator" element={<CampaignCreator />} />
          <Route path="/outreach/personal-email" element={<PersonalEmail />} />
          <Route path="/business-development/ads" element={<Ads />} />
          <Route path="/business-development/content" element={<Content />} />
          <Route path="/business-development/seo" element={<Seo />} />
          <Route path="/business-development/email-campaigns" element={<OutreachHome />} />
          <Route path="/outreach/email-campaigns" element={<OutreachHome />} />
          
          {/* Contacts/CRM Routes */}
          <Route path="/contacts" element={<ContactsHub />} />
          <Route path="/crm-hub" element={<CrmHub />} />
          <Route path="/crm/list" element={<CrmList />} />
          <Route path="/crm/create" element={<CrmCreate />} />
          <Route path="/crm/pipeline" element={<CrmPipeline />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/messages" element={<PersonalEmail />} />
          <Route path="/business-development/events" element={<CrmList />} />
          
          {/* Personas Routes */}
          <Route path="/personas" element={<Personas />} />
          <Route path="/personas/create" element={<PersonaCreate />} />
          
          {/* Analytics Routes */}
          <Route path="/bd-central" element={<AnalyticsHub />} />
          <Route path="/bd-insights" element={<GrowthInsights />} />
          
          {/* Settings & 404 */}
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
