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
import FinancialHub from './pages/FinancialHub';
import Billing from './pages/Billing';
import Forecasting from './pages/Forecasting';
import FinancialSpends from './pages/FinancialSpends';
import CrmHub from './pages/CrmHub';
import CrmList from './pages/CrmList';
import Personas from './pages/Personas';

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
          <Route path="/financial-hub" element={<FinancialHub />} />
          <Route path="/financial/billing" element={<Billing />} />
          <Route path="/financial/forecasting" element={<Forecasting />} />
          <Route path="/financial/spends" element={<FinancialSpends />} />
          <Route path="/crm-hub" element={<CrmHub />} />
          <Route path="/crm/list" element={<CrmList />} />
          <Route path="/personas" element={<Personas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

