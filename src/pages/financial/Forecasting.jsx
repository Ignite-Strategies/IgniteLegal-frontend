import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Activity, Building2, DollarSign, BarChart3 } from 'lucide-react';

// Market indicators (would come from external APIs in real app)
const marketIndicators = {
  nationalDealVolume: {
    current: '$185B',
    change: '+12.5%',
    trend: 'up',
    period: 'Last Quarter',
  },
  maActivity: {
    level: 'High',
    count: 1,247,
    change: '+18%',
    trend: 'up',
  },
  startupFunding: {
    amount: '$12.5B',
    change: '+8.2%',
    trend: 'up',
  },
  legalServiceDemand: {
    index: 127,
    change: '+5.3%',
    trend: 'up',
  },
};

// Pipeline-based forecast factors
const pipelineMetrics = {
  activeDeals: 24,
  avgDealValue: 2800,
  historicalCloseRate: 19.0,
  pipelineValue: 67200,
  timeToClose: 45, // days
};

// Calculate forecast based on multiple factors
const calculateForecast = (period, marketIndicators, pipelineMetrics) => {
  const baseRevenue = pipelineMetrics.pipelineValue * (pipelineMetrics.historicalCloseRate / 100);
  
  // Adjust based on market indicators
  const dealVolumeFactor = marketIndicators.nationalDealVolume.trend === 'up' ? 1.12 : 1.0;
  const maFactor = marketIndicators.maActivity.level === 'High' ? 1.08 : 1.0;
  const demandFactor = marketIndicators.legalServiceDemand.index > 120 ? 1.05 : 1.0;
  
  const projected = Math.round(baseRevenue * dealVolumeFactor * maFactor * demandFactor);
  
  return {
    projected,
    factors: {
      pipelineBase: baseRevenue,
      dealVolumeImpact: `${((dealVolumeFactor - 1) * 100).toFixed(1)}%`,
      maImpact: `${((maFactor - 1) * 100).toFixed(1)}%`,
      demandImpact: `${((demandFactor - 1) * 100).toFixed(1)}%`,
    },
  };
};

const forecasts = [
  {
    id: 1,
    period: 'Q1 2025',
    actualRevenue: 48500,
    ...calculateForecast('Q1 2025', marketIndicators, pipelineMetrics),
    status: 'Above Target',
  },
  {
    id: 2,
    period: 'Q2 2025',
    actualRevenue: null,
    ...calculateForecast('Q2 2025', marketIndicators, pipelineMetrics),
    status: 'Projected',
  },
];

const Forecasting = () => {
  const q1Forecast = forecasts.find(f => f.period === 'Q1 2025');
  const q2Forecast = forecasts.find(f => f.period === 'Q2 2025');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/financial-hub"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to Financial Hub
      </Link>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Forecasting</h1>
        <p className="text-gray-600">Revenue projections based on market indicators, deal volume, and pipeline metrics</p>
      </div>

      {/* Market Indicators */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Market Indicators</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="text-xs text-gray-500 mb-1">National Deal Volume</p>
            <p className="text-lg font-bold text-gray-900">{marketIndicators.nationalDealVolume.current}</p>
            <div className="flex items-center gap-1 mt-1">
              {marketIndicators.nationalDealVolume.trend === 'up' ? (
                <TrendingUp className="h-3 w-3 text-green-600" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-600" />
              )}
              <p className="text-xs text-gray-600">{marketIndicators.nationalDealVolume.change}</p>
            </div>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <p className="text-xs text-gray-500 mb-1">M&A Activity</p>
            <p className="text-lg font-bold text-gray-900">{marketIndicators.maActivity.level}</p>
            <p className="text-xs text-gray-600 mt-1">{marketIndicators.maActivity.count} deals ({marketIndicators.maActivity.change})</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <p className="text-xs text-gray-500 mb-1">Startup Funding</p>
            <p className="text-lg font-bold text-gray-900">{marketIndicators.startupFunding.amount}</p>
            <p className="text-xs text-gray-600 mt-1">{marketIndicators.startupFunding.change}</p>
          </div>
          <div className="border-l-4 border-orange-500 pl-4">
            <p className="text-xs text-gray-500 mb-1">Legal Service Demand Index</p>
            <p className="text-lg font-bold text-gray-900">{marketIndicators.legalServiceDemand.index}</p>
            <p className="text-xs text-gray-600 mt-1">{marketIndicators.legalServiceDemand.change}</p>
          </div>
        </div>
      </div>

      {/* Pipeline Metrics */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-indigo-600" />
          <h2 className="text-xl font-semibold">Pipeline-Based Forecast Factors</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Active Deals</p>
            <p className="text-2xl font-bold text-gray-900">{pipelineMetrics.activeDeals}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Avg Deal Value</p>
            <p className="text-2xl font-bold text-gray-900">${pipelineMetrics.avgDealValue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Historical Close Rate</p>
            <p className="text-2xl font-bold text-indigo-600">{pipelineMetrics.historicalCloseRate}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Pipeline Value</p>
            <p className="text-2xl font-bold text-green-600">${pipelineMetrics.pipelineValue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Avg Time to Close</p>
            <p className="text-2xl font-bold text-gray-900">{pipelineMetrics.timeToClose} days</p>
          </div>
        </div>
      </div>

      {/* Forecast Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                  ${forecast.projected.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Based on pipeline + market indicators
                </p>
              </div>
              {forecast.actualRevenue && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Actual</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${forecast.actualRevenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {((forecast.actualRevenue / forecast.projected - 1) * 100).toFixed(1)}% vs. projected
                  </p>
                </div>
              )}
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-700 mb-2">Forecast Factors:</p>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Pipeline Base:</span>
                    <span>${Math.round(forecast.factors.pipelineBase).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deal Volume Impact:</span>
                    <span className="text-green-600">+{forecast.factors.dealVolumeImpact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>M&A Activity Impact:</span>
                    <span className="text-green-600">+{forecast.factors.maImpact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Demand Index Impact:</span>
                    <span className="text-green-600">+{forecast.factors.demandImpact}</span>
                  </div>
                </div>
              </div>
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

