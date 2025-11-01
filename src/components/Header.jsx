import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img 
              src="/BPL_2025.png" 
              alt="BusinessPointLaw" 
              className="h-12 w-auto"
            />
            <span className="text-xl font-semibold text-gray-900 hidden sm:block">
              BusinessPointLaw
            </span>
          </Link>
          <nav className="flex gap-6">
            <Link
              to="/nda-dashboard"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              NDA Dashboard
            </Link>
            <Link
              to="/ingest"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Ingest
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

