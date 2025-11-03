import { Link, useNavigate } from 'react-router-dom';
import { Calendar, TrendingUp, Users, Building2, Tag, BarChart3, MessageSquare } from 'lucide-react';
import { mockMeetings, mockMeetingMetrics, mockPersonTypes, mockCompanyTypes, mockFeedbackThemes } from '../../data/mockData';

export default function MeetingDashboard() {
  const navigate = useNavigate();
  const upcomingMeetings = mockMeetings.filter(m => m.status === 'Scheduled');
  const pastMeetings = mockMeetings.filter(m => m.status === 'Completed');
  const progressPercent = (mockMeetingMetrics.completed / mockMeetingMetrics.weeklyGoal) * 100;

  // Calculate max count for bar chart scaling
  const maxPersonCount = Math.max(...mockPersonTypes.map(p => p.count));
  const maxCompanyCount = Math.max(...mockCompanyTypes.map(c => c.count));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/growth-dashboard"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to Growth Dashboard
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Meeting Dashboard</h1>
        <p className="text-gray-600 text-lg">Review and learn from your conversations</p>
      </div>

      {/* Upcoming Meetings */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Upcoming Meetings</h2>
        {upcomingMeetings.length > 0 ? (
          <div className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {meeting.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{meeting.name}</h3>
                    <p className="text-sm text-gray-600">{meeting.company}</p>
                    <p className="text-xs text-gray-500 mt-1">{meeting.datetime}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/meeting-prep/${meeting.id}`)}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Prep
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No upcoming meetings scheduled</p>
          </div>
        )}
      </div>

      {/* Past 30 Days Overview */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Past 30 Days Overview</h2>
          <TrendingUp className="h-6 w-6 text-green-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Meetings</p>
            <p className="text-3xl font-bold text-gray-900">{mockMeetingMetrics.past30Days}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Weekly Goal Progress</p>
            <p className="text-3xl font-bold text-gray-900">
              {mockMeetingMetrics.completed}/{mockMeetingMetrics.weeklyGoal}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Completion Rate</p>
            <p className="text-3xl font-bold text-green-600">{progressPercent.toFixed(0)}%</p>
          </div>
        </div>
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Weekly Goal: {mockMeetingMetrics.weeklyGoal} meetings</span>
            <span>{mockMeetingMetrics.completed} completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Person Type Breakdown */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Users className="h-6 w-6 text-purple-600" />
          <h2 className="text-2xl font-bold">Person Type Breakdown</h2>
        </div>
        <div className="space-y-4">
          {mockPersonTypes.map((person) => (
            <div
              key={person.type}
              className="cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
              onClick={() => navigate(`/meeting-analytics/person-type/${encodeURIComponent(person.type)}`)}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">{person.type}</span>
                <span className="text-sm font-bold text-gray-900">{person.count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`${person.color} h-3 rounded-full transition-all duration-500`}
                  style={{ width: `${(person.count / maxPersonCount) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Company Type Breakdown */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Company Type Breakdown</h2>
        </div>
        <div className="space-y-4">
          {mockCompanyTypes.map((company) => (
            <div
              key={company.type}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => navigate(`/meeting-analytics/company-type/${encodeURIComponent(company.type)}`)}
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">{company.type}</span>
              </div>
              <span className="text-lg font-bold text-gray-900">{company.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Themes */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Tag className="h-6 w-6 text-red-600" />
          <h2 className="text-2xl font-bold">Feedback Themes</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {mockFeedbackThemes.map((theme) => (
            <button
              key={theme.theme}
              onClick={() => navigate(`/meeting-feedback/theme/${encodeURIComponent(theme.theme)}`)}
              className={`${theme.color} px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity`}
            >
              <span>{theme.theme}</span>
              <span className="bg-white bg-opacity-30 px-2 py-0.5 rounded-full text-xs font-bold">
                {theme.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* CTA Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => navigate('/meeting-analytics')}
          className="p-6 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
        >
          <BarChart3 className="h-6 w-6" />
          <span className="text-lg font-semibold">Open Analytics</span>
        </button>
        <button
          onClick={() => navigate('/meeting-feedback')}
          className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="text-lg font-semibold">View Feedback</span>
        </button>
      </div>
    </div>
  );
}

