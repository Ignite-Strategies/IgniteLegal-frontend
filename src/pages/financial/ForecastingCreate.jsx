import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

// Mock macro-economic data (in real app, this would come from API)
const macroEconomicData = {
  gdpGrowth: 2.8,
  interestRates: 5.25,
  marketVolatility: 'Moderate',
  mnaActivity: 'High', // M&A activity
  startupFunding: '$12.5B',
};

// Historical NDA throughput correlation (mock data)
const historicalCorrelation = [
  { quarter: 'Q1 2024', ndas: 24, gdpGrowth: 2.5, mnaActivity: 'Moderate' },
  { quarter: 'Q2 2024', ndas: 28, gdpGrowth: 3.1, mnaActivity: 'High' },
  { quarter: 'Q3 2024', ndas: 31, gdpGrowth: 2.9, mnaActivity: 'High' },
  { quarter: 'Q4 2024', ndas: 35, gdpGrowth: 3.2, mnaActivity: 'High' },
];

const ForecastingCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    period: 'Q2 2025',
    projectedRevenue: '',
    confidence: 'Medium',
  });

  // Calculate projected NDAs based on macro factors
  const calculateProjectedNDAs = () => {
    const baseNDAs = 30; // Base average
    const gdpFactor = macroEconomicData.gdpGrowth > 3 ? 1.15 : 1.0;
    const mnaFactor = macroEconomicData.mnaActivity === 'High' ? 1.2 : 1.0;
    return Math.round(baseNDAs * gdpFactor * mnaFactor);
  };

  const projectedNDAs = calculateProjectedNDAs();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const forecast = {
      ...formData,
      projectedNDAs,
      macroFactors: macroEconomicData,
    };
    console.log('New Forecast:', forecast);
    navigate('/financial/forecasting');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/financial/forecasting"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to Forecasting
      </Link>

      <h2 className="text-2xl font-medium text-gray-900 mb-6">Create Forecast</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Forecast Details</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="period" className="block text-sm font-medium text-gray-700 mb-1">
                  Period
                </label>
                <select
                  id="period"
                  name="period"
                  value={formData.period}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Q1 2025">Q1 2025</option>
                  <option value="Q2 2025">Q2 2025</option>
                  <option value="Q3 2025">Q3 2025</option>
                  <option value="Q4 2025">Q4 2025</option>
                </select>
              </div>

              <div>
                <label htmlFor="projectedRevenue" className="block text-sm font-medium text-gray-700 mb-1">
                  Projected Revenue ($)
                </label>
                <input
                  type="number"
                  id="projectedRevenue"
                  name="projectedRevenue"
                  value={formData.projectedRevenue}
                  onChange={handleChange}
                  required
                  min="0"
                  step="1000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="confidence" className="block text-sm font-medium text-gray-700 mb-1">
                  Confidence Level
                </label>
                <select
                  id="confidence"
                  name="confidence"
                  value={formData.confidence}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
                >
                  Create Forecast
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/financial/forecasting')}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Macro Economic Factors Sidebar */}
        <div className="space-y-6">
          {/* Macro Economic Data */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Macro-Economic Factors</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">GDP Growth</p>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <p className="text-sm font-semibold text-gray-900">{macroEconomicData.gdpGrowth}%</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Interest Rates</p>
                <p className="text-sm font-semibold text-gray-900">{macroEconomicData.interestRates}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">M&A Activity</p>
                <p className="text-sm font-semibold text-gray-900">{macroEconomicData.mnaActivity}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Market Volatility</p>
                <p className="text-sm font-semibold text-gray-900">{macroEconomicData.marketVolatility}</p>
              </div>
            </div>
          </div>

          {/* Projected NDA Impact */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Projected NDA Impact</h3>
            <p className="text-sm text-blue-700 mb-3">
              Based on current macro-economic factors:
            </p>
            <div className="bg-white rounded p-3">
              <p className="text-2xl font-bold text-blue-900">{projectedNDAs}</p>
              <p className="text-xs text-blue-600 mt-1">Projected NDAs this period</p>
            </div>
            <p className="text-xs text-blue-600 mt-3">
              {macroEconomicData.gdpGrowth > 3 && macroEconomicData.mnaActivity === 'High' 
                ? 'Strong economic indicators suggest increased deal activity'
                : 'Moderate economic conditions expected'}
            </p>
          </div>

          {/* Historical Correlation */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Historical Correlation</h3>
            <div className="space-y-2">
              {historicalCorrelation.map((item, idx) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{item.quarter}</span>
                    <span className="font-semibold text-gray-900">{item.ndas} NDAs</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>GDP: {item.gdpGrowth}%</span>
                    <span>M&A: {item.mnaActivity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastingCreate;

