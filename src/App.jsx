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

// Engage imports (formerly Relationship)
import EngageDashboard from './pages/relationship/RelationshipDashboard';
import Engage from './pages/relationship/Engage';
import EngagementInsights from './pages/engage/EngagementInsights';
import Ecosystem from './pages/relationship/Ecosystem';

// Meetings imports
import MeetingDashboard from './pages/meetings/MeetingDashboard';
import MeetingPrep from './pages/meetings/MeetingPrep';
import MeetingAnalytics from './pages/meetings/MeetingAnalytics';
import MeetingFeedbackForm from './pages/meetings/MeetingFeedbackForm';
import MeetingScheduler from './pages/meetings/MeetingScheduler';

// Outreach imports
import OutreachHome from './pages/outreach/OutreachHome';
import CampaignCreator from './pages/outreach/CampaignCreator';
import IndividualEmail from './pages/outreach/IndividualEmail';
import EmailCampaigns from './pages/outreach/EmailCampaigns';
import Templates from './pages/outreach/Templates';
import TemplateView from './pages/outreach/TemplateView';
import CampaignAnalytics from './pages/outreach/CampaignAnalytics';
import CampaignPreview from './pages/outreach/CampaignPreview';
import CampaignSuccess from './pages/outreach/CampaignSuccess';

// Attract imports
import Ads from './pages/attract/Ads';
import Content from './pages/attract/Content';
import Seo from './pages/attract/Seo';

// Contacts imports
import ContactsHub from './pages/contacts/ContactsHub';
import ContactManageHome from './pages/contacts/ContactManageHome';
import ContactUpload from './pages/contacts/ContactUpload';
import DemoContactList from './pages/contacts/DemoContactList';
import Companies from './pages/contacts/Companies';
import Pipeline from './pages/contacts/Pipeline';
// Contact Lists imports
import ContactListManager from './pages/contacts/ContactListManager';
import ContactListBuilder from './pages/contacts/ContactListBuilder';
import ContactListView from './pages/contacts/ContactListView';
import ContactListDetail from './pages/contacts/ContactListDetail';

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
          
          {/* Engage Routes (formerly Relationship) */}
          <Route path="/engage" element={<Engage />} />
          <Route path="/engage/insights" element={<EngagementInsights />} />
          <Route path="/engage-dashboard" element={<EngageDashboard />} />
          {/* Meetings Routes */}
          <Route path="/meeting-dashboard" element={<MeetingDashboard />} />
          <Route path="/meetings" element={<MeetingDashboard />} />
          <Route path="/meetings/prep/:id" element={<MeetingPrep />} />
          <Route path="/meeting-prep/:id" element={<MeetingPrep />} /> {/* Legacy route */}
          <Route path="/meetings/analytics" element={<MeetingAnalytics />} />
          <Route path="/meeting-analytics" element={<MeetingAnalytics />} /> {/* Legacy route */}
          <Route path="/meetings/analytics/person-type/:type" element={<MeetingAnalytics />} />
          <Route path="/meetings/analytics/company-type/:type" element={<MeetingAnalytics />} />
          <Route path="/meetings/feedback/:id" element={<MeetingFeedbackForm />} />
          <Route path="/meeting-feedback/:id" element={<MeetingFeedbackForm />} /> {/* Legacy route */}
          <Route path="/meetings/schedule" element={<MeetingScheduler />} />
          <Route path="/ecosystem" element={<Ecosystem />} />
          
          {/* Outreach Routes */}
          <Route path="/outreach" element={<OutreachHome />} />
          <Route path="/outreach/outreach-home" element={<OutreachHome />} />
          <Route path="/outreach/create" element={<CampaignCreator />} />
          <Route path="/outreach/campaign-creator" element={<CampaignCreator />} />
          <Route path="/outreach/campaign-dashboard" element={<EmailCampaigns />} />
          <Route path="/outreach/individual-email" element={<IndividualEmail />} />
          <Route path="/outreach/personal-email" element={<IndividualEmail />} />
          <Route path="/outreach/templates" element={<Templates />} />
          <Route path="/outreach/templates/:templateId" element={<TemplateView />} />
          <Route path="/outreach/email-campaigns" element={<EmailCampaigns />} />
          <Route path="/outreach/analytics" element={<CampaignAnalytics />} />
          <Route path="/outreach/campaign-preview" element={<CampaignPreview />} />
          <Route path="/outreach/campaign-success" element={<CampaignSuccess />} />
          
          {/* Attract Routes */}
          <Route path="/attract/ads" element={<Ads />} />
          <Route path="/attract/content" element={<Content />} />
          <Route path="/attract/seo" element={<Seo />} />
          
          {/* Legacy business-development routes - redirect to attract */}
          <Route path="/business-development/ads" element={<Ads />} />
          <Route path="/business-development/content" element={<Content />} />
          <Route path="/business-development/seo" element={<Seo />} />
          <Route path="/business-development/email-campaigns" element={<OutreachHome />} />
          
          {/* Contacts Routes */}
          <Route path="/contacts" element={<ContactManageHome />} />
          <Route path="/contacts/hub" element={<ContactsHub />} />
          <Route path="/contacts/upload" element={<ContactManageHome />} /> {/* Redirect to main contact management */}
          <Route path="/contacts/demo-list/:listId" element={<DemoContactList />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/pipeline" element={<Pipeline />} />
          
          {/* Contact Lists Routes */}
          <Route path="/contact-list-manager" element={<ContactListManager />} />
          <Route path="/contact-list-builder" element={<ContactListBuilder />} />
          <Route path="/contact-list-view" element={<ContactListView />} />
          <Route path="/contact-list-detail/:listId" element={<ContactListDetail />} />
          
          {/* Personas Routes */}
          <Route path="/personas" element={<Personas />} />
          <Route path="/personas/create" element={<PersonaCreate />} />
          
          {/* Analytics Routes */}
          <Route path="/analytics" element={<CampaignAnalytics />} />
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
