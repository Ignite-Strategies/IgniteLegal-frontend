import { Link } from 'react-router-dom';
import { DollarSign, Receipt, TrendingUp, Wallet } from 'lucide-react';

const stats = [
  { label: 'Total Revenue', value: '$48,500' },
  { label: 'Outstanding Invoices', value: '$12,300' },
  { label: 'This Month Revenue', value: '$15,200' },
];

const financialNavOptions = [
  {
    title: 'Billing',
    description: 'Client invoices and payments',
    icon: <Receipt className="h-8 w-8" />,
    path: '/financial/billing',
    color: 'bg-green-100 text-green-600'
  },
  {
    title: 'Forecasting',
    description: 'Revenue and cash flow projections',
    icon: <TrendingUp className="h-8 w-8" />,
    path: '/financial/forecasting',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Spending',
    description: 'Track expenses and transactions',
    icon: <Wallet className="h-8 w-8" />,
    path: '/financial/spends',
    color: 'bg-orange-100 text-orange-600'
  },
];

export default function FinancialHub() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Financial Operations</h1>
          <p className="text-gray-600">Manage billing, forecasting, and spending for BusinessPoint Law</p>
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
          {financialNavOptions.map((option) => (
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

