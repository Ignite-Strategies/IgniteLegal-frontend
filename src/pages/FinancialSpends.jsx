import { Link, useNavigate } from 'react-router-dom';
import { Plus, Wallet } from 'lucide-react';

// Mock spending data
const transactions = [
  {
    id: 1,
    vendor: 'Office Supplies Co.',
    amount: 450,
    category: 'Office Supplies',
    date: '2025-01-10',
    description: 'Printer paper, pens, folders',
  },
  {
    id: 2,
    vendor: 'Cloud Services Inc.',
    amount: 1200,
    category: 'Software',
    date: '2025-01-05',
    description: 'Monthly SaaS subscription',
  },
  {
    id: 3,
    vendor: 'Legal Research Platform',
    amount: 800,
    category: 'Legal Services',
    date: '2025-01-03',
    description: 'Research database access',
  },
];

const FinancialSpends = () => {
  const navigate = useNavigate();

  const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
  const thisMonthSpent = transactions
    .filter(t => t.date.startsWith('2025-01'))
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/financial-hub"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to Financial Hub
      </Link>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Spending</h1>
          <p className="text-gray-600">Track expenses and transactions</p>
        </div>
        <button
          onClick={() => navigate('/financial/spends/create')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Transaction
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm font-medium text-gray-500 mb-1">This Month</p>
          <p className="text-3xl font-bold text-gray-900">${thisMonthSpent.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Tracked</p>
          <p className="text-3xl font-bold text-gray-900">${totalSpent.toLocaleString()}</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.vendor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ${transaction.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinancialSpends;

