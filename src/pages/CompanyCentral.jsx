import { Link } from 'react-router-dom';
import { FileText, DollarSign, Users } from 'lucide-react';

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
    title: 'Business Development',
    description: 'CRM, contacts, and pipeline management',
    icon: <Users className="h-8 w-8" />,
    path: '/crm-hub',
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
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Hi Joel - welcome!</h1>
          <p className="text-gray-600 text-lg">What do you want to do today?</p>
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
      </div>
    </div>
  );
}

