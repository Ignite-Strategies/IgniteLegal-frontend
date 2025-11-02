import { Link } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Home className="h-5 w-5" />
              Go to Company Central
            </Link>
            
            <div className="text-sm text-gray-500">
              <p className="mb-2">Common pages:</p>
              <div className="flex flex-wrap justify-center gap-2">
                <Link to="/nda-hub" className="text-blue-600 hover:text-blue-800 underline">
                  NDA Management
                </Link>
                <span className="text-gray-400">•</span>
                <Link to="/contacts" className="text-blue-600 hover:text-blue-800 underline">
                  Contact Management
                </Link>
                <span className="text-gray-400">•</span>
                <Link to="/bd-central" className="text-blue-600 hover:text-blue-800 underline">
                  Business Development
                </Link>
                <span className="text-gray-400">•</span>
                <Link to="/financial-hub" className="text-blue-600 hover:text-blue-800 underline">
                  Financial Tools
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

