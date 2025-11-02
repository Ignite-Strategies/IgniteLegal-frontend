import { useNavigate } from 'react-router-dom';
import { Users, Mail, Calendar, FileText, Lightbulb, TrendingUp } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { mockMeetings, mockContacts, mockMeetingMetrics } from '../../data/mockData';
import PageHeader from '../../components/PageHeader';

export default function Relationship() {
  const navigate = useNavigate();
  const [contacts] = useLocalStorage('contacts', []);
  const upcomingMeetings = mockMeetings.filter(m => m.status === 'Scheduled').slice(0, 5);

  // Calculate today's progress (mock: 2/5 completed)
  const todaysProgress = 2;
  const todaysTarget = 5;
  const progressPercent = (todaysProgress / todaysTarget) * 100;

  // Action cards (simplified, no KPIs) - Outreach first
  const actionCards = [
    {
      id: 'outreach',
      title: 'Outreach',
      description: 'Send campaigns',
      icon: <Mail className="h-6 w-6" />,
      cta: 'Send Campaign',
      color: 'bg-orange-500',
      route: '/outreach',
    },
    {
      id: 'meetings',
      title: 'Meetings',
      description: 'Schedule and prep',
      icon: <Calendar className="h-6 w-6" />,
      cta: 'Prep or Add Meeting',
      color: 'bg-green-500',
      route: '/meeting-dashboard',
    },
    {
      id: 'feedback',
      title: 'Feedback',
      description: 'Capture insights',
      icon: <FileText className="h-6 w-6" />,
      cta: 'Log Insights',
      color: 'bg-purple-500',
      route: '/engage-dashboard',
    },
    {
      id: 'analyze',
      title: 'Analyze',
      description: 'Review learnings',
      icon: <Lightbulb className="h-6 w-6" />,
      cta: 'Review Learnings',
      color: 'bg-red-500',
      route: '/personas',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Connect"
        subtitle="Your daily business-development loop"
        backTo="/growth-dashboard"
        backLabel="Back to Growth Dashboard"
      />

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Today's Progress</span>
          <span className="text-sm font-bold text-gray-900">
            {todaysProgress}/{todaysTarget} ({progressPercent.toFixed(0)}%)
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {/* Total Contacts */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-blue-600" />
            <h3 className="text-sm font-medium text-blue-900">Total Contacts</h3>
          </div>
          <p className="text-2xl font-bold text-blue-900">{mockContacts.total}</p>
        </div>

        {/* Segments */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
          <h3 className="text-sm font-medium text-purple-900 mb-2">Segments</h3>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <div>
              <span className="text-purple-700 font-semibold">Aware:</span> {mockContacts.segments.Aware}
            </div>
            <div>
              <span className="text-purple-700 font-semibold">Warm:</span> {mockContacts.segments.Warm}
            </div>
            <div>
              <span className="text-purple-700 font-semibold">Closed:</span> {mockContacts.segments.Closed}
            </div>
            <div>
              <span className="text-purple-700 font-semibold">Lost:</span> {mockContacts.segments.Lost}
            </div>
          </div>
        </div>

        {/* Ecosystem */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
          <h3 className="text-sm font-medium text-orange-900 mb-2">Ecosystem</h3>
          <div className="space-y-1 text-xs">
            <div>
              <span className="text-orange-700 font-semibold">Collaborator:</span> {mockContacts.ecosystem.Collaborator}
            </div>
            <div>
              <span className="text-orange-700 font-semibold">Vendor:</span> {mockContacts.ecosystem.Vendor}
            </div>
            <div>
              <span className="text-orange-700 font-semibold">Partner:</span> {mockContacts.ecosystem.Partner}
            </div>
          </div>
        </div>

        {/* Meeting Goal */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-5 w-5 text-green-600" />
            <h3 className="text-sm font-medium text-green-900">Meeting Goal</h3>
          </div>
          <p className="text-2xl font-bold text-green-900">{mockMeetingMetrics.weeklyGoal}</p>
        </div>

        {/* Scheduled */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
          <h3 className="text-sm font-medium text-red-900 mb-2">Scheduled</h3>
          <p className="text-2xl font-bold text-red-900">{mockMeetingMetrics.scheduled}</p>
        </div>
      </div>

      {/* Upcoming Meetings */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Upcoming Meetings</h2>
          <button
            onClick={() => navigate('/meeting-dashboard')}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            View All →
          </button>
        </div>
        {upcomingMeetings.length > 0 ? (
          <div className="space-y-3">
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

      {/* 4-Card Action Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actionCards.map((card) => (
          <div
            key={card.id}
            onClick={() => navigate(card.route)}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
          >
            <div className={`${card.color} p-6 text-white rounded-t-xl`}>
              <div className="flex items-center gap-3 mb-2">
                {card.icon}
                <h3 className="text-lg font-bold">{card.title}</h3>
              </div>
              <p className="text-sm text-white/90">{card.description}</p>
            </div>
            <div className="p-6">
              <button className="w-full px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors">
                {card.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
