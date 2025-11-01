import { BarChart3, TrendingUp, Clock, FileCheck } from 'lucide-react';

// Mock analytics data
const analyticsData = {
  monthlyTrend: [
    { month: 'Jan', count: 8 },
    { month: 'Feb', count: 12 },
    { month: 'Mar', count: 15 },
    { month: 'Apr', count: 10 },
    { month: 'May', count: 12 },
    { month: 'Jun', count: 12 },
  ],
  approvalRate: 83,
  avgTimeToApproval: 4.2,
  statusBreakdown: {
    approved: 20,
    inReview: 4,
    pending: 2,
  },
};

const NDAAnalytics = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">NDA Analytics</h1>
          <p className="text-gray-600">Insights and performance metrics for BusinessPoint Law NDAs</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <FileCheck className="h-5 w-5 text-blue-600" />
              <p className="text-sm font-medium text-gray-500">Total NDAs</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">26</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <p className="text-sm font-medium text-gray-500">Approval Rate</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{analyticsData.approvalRate}%</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <p className="text-sm font-medium text-gray-500">Avg Time to Approve</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{analyticsData.avgTimeToApproval} days</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <p className="text-sm font-medium text-gray-500">This Month</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">12</p>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Status Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Approved</p>
              <p className="text-2xl font-bold text-green-600">{analyticsData.statusBreakdown.approved}</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">In Review</p>
              <p className="text-2xl font-bold text-yellow-600">{analyticsData.statusBreakdown.inReview}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-2xl font-bold text-gray-600">{analyticsData.statusBreakdown.pending}</p>
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Trend</h2>
          <div className="flex items-end gap-2 h-48">
            {analyticsData.monthlyTrend.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-blue-500 rounded-t mb-2"
                  style={{ height: `${(item.count / 15) * 100}%` }}
                />
                <p className="text-xs text-gray-600">{item.month}</p>
                <p className="text-xs font-semibold text-gray-900">{item.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Placeholder for more analytics */}
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Additional analytics charts and insights coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default NDAAnalytics;

