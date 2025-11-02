import { Link } from 'react-router-dom';
import { TrendingUp, Clock, Users, Calendar } from 'lucide-react';

export default function BdInsights() {
  // Mock insights data
  const insights = {
    firmsContactedThisWeek: 8,
    averageTurnaround: 4.5,
    nextFollowUps: [
      { name: 'David Chen', firm: 'Ares Capital', dueDate: '2025-01-22', status: 'Warm' },
      { name: 'Sarah Martinez', firm: 'Orion Holdings', dueDate: '2025-01-25', status: 'Active' },
      { name: 'Michael Thompson', firm: 'Meridian Partners', dueDate: '2025-01-20', status: 'Cold' }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/bd-central"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to Business Development
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">BD Insights & Plan</h1>
        <p className="text-gray-600">Summary of your business development activity</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Firms Contacted</p>
              <p className="text-3xl font-bold text-gray-900">{insights.firmsContactedThisWeek}</p>
              <p className="text-xs text-gray-500">This week</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            You've contacted <span className="font-semibold">{insights.firmsContactedThisWeek} firms</span> this week.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Turnaround</p>
              <p className="text-3xl font-bold text-gray-900">{insights.averageTurnaround}</p>
              <p className="text-xs text-gray-500">Days</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Average NDA turnaround is <span className="font-semibold">{insights.averageTurnaround} days</span>.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Follow-ups Due</p>
              <p className="text-3xl font-bold text-gray-900">{insights.nextFollowUps.length}</p>
              <p className="text-xs text-gray-500">Next 3</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            You have <span className="font-semibold">{insights.nextFollowUps.length} follow-ups</span> due soon.
          </p>
        </div>
      </div>

      {/* Next Follow-ups */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Next 3 Follow-ups Due</h2>
        <div className="space-y-3">
          {insights.nextFollowUps.map((followUp, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-gray-900">{followUp.name}</p>
                <p className="text-sm text-gray-600">{followUp.firm}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Due: {followUp.dueDate}</p>
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full mt-1 ${
                    followUp.status === 'Warm' ? 'bg-orange-100 text-orange-800' :
                    followUp.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {followUp.status}
                  </span>
                </div>
                <Link
                  to={`/messages?contact=${index + 1}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                  Message
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

