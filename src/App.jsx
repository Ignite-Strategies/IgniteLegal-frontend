import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CompanyCentral from './pages/CompanyCentral';
import NDADashboard from './pages/NDADashboard';
import Ingest from './pages/Ingest';
import Review from './pages/Review';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<CompanyCentral />} />
          <Route path="/nda-dashboard" element={<NDADashboard />} />
          <Route path="/ingest" element={<Ingest />} />
          <Route path="/review/:id" element={<Review />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

