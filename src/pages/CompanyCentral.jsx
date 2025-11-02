import { Link, useNavigate } from 'react-router-dom';
import { FileText, DollarSign, Users, RefreshCw, CheckCircle } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const stats = [
  { label: 'NDAs This Month', value: 12 },
  { label: 'Clients', value: 8 },
  { label: 'Prospects', value: 5 },
];

const mainNavOptions = [
  {
    title: 'NDA Management',
    description: 'Manage NDA intake and review',
    icon: <FileText className="h-8 w-8" />,
    path: '/nda-hub',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Growth & Outreach',
    description: 'Drive growth through relationships, events, and content',
    icon: <Users className="h-8 w-8" />,
    path: '/growth-dashboard',
    color: 'bg-indigo-100 text-indigo-600'
  },
  {
    title: 'Financial Tools',
    description: 'Billing, invoicing, and forecasting',
    icon: <DollarSign className="h-8 w-8" />,
    path: '/financial-hub',
    color: 'bg-green-100 text-green-600'
  },
];

export default function CompanyCentral() {
  const [microsoftConnected] = useLocalStorage('microsoft365Connected', true);
  const [lastSync] = useLocalStorage('lastSync', new Date().toISOString());
  const navigate = useNavigate();

  const handleSync = () => {
    // Trigger sync from Growth Dashboard
    navigate('/growth-dashboard?sync=true');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Hi Joel - welcome!</h1>
            <p className="text-gray-600 text-lg">What do you want to do today?</p>
          </div>
          {microsoftConnected && (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="text-sm">
                <p className="font-medium text-green-900">Connected to Microsoft 365</p>
                <p className="text-xs text-green-600">Last synced: {new Date(lastSync).toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mainNavOptions.map((option) => (
            <Link key={option.path} to={option.path}>
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition cursor-pointer">
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${option.color} mb-4`}>
                  {option.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                <p className="text-gray-600 text-sm">{option.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Sync Action */}
        {microsoftConnected && (
          <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RefreshCw className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Sync with Microsoft 365</p>
                <p className="text-sm text-gray-500">Pull latest contacts and companies</p>
              </div>
            </div>
            <button
              onClick={handleSync}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
            >
              Sync Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
