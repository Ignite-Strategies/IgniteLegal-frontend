import { Link, useNavigate } from 'react-router-dom';
import { Plus, TrendingUp } from 'lucide-react';

// Mock forecasting data
const forecasts = [
  {
    id: 1,
    period: 'Q1 2025',
    projectedRevenue: 45000,
    actualRevenue: 48500,
    status: 'Above Target',
  },
  {
    id: 2,
    period: 'Q2 2025',
    projectedRevenue: 50000,
    actualRevenue: null,
    status: 'Projected',
  },
];

const Forecasting = () => {
  const navigate = useNavigate();

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
          <h1 className="text-3xl font-bold mb-2">Forecasting</h1>
          <p className="text-gray-600">Revenue and cash flow projections</p>
        </div>
        <button
          onClick={() => navigate('/financial/forecasting/create')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Forecast
        </button>
      </div>

      {/* Forecast Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {forecasts.map((forecast) => (
          <div key={forecast.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{forecast.period}</h3>
                <p className="text-sm text-gray-500 mt-1">Revenue Forecast</p>
              </div>
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  forecast.status === 'Above Target'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {forecast.status}
              </span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 mb-1">Projected</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${forecast.projectedRevenue.toLocaleString()}
                </p>
              </div>
              {forecast.actualRevenue && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Actual</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${forecast.actualRevenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {((forecast.actualRevenue / forecast.projectedRevenue - 1) * 100).toFixed(1)}% vs. target
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Cash Flow Chart Placeholder */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Cash Flow Projection</h2>
        <div className="flex items-end gap-2 h-48 bg-gray-50 rounded p-4">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-500 rounded-t mb-2"
                style={{ height: `${60 + Math.random() * 40}%` }}
              />
              <p className="text-xs text-gray-600">{month}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forecasting;

