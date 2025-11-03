import { useNavigate } from 'react-router-dom';
import { Users, Mail, FileText, Lightbulb, TrendingUp, Send, BarChart3 } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { mockContacts } from '../../data/mockData';
import PageHeader from '../../components/PageHeader';

export default function Relationship() {
  const navigate = useNavigate();
  const [contacts] = useLocalStorage('contacts', []);

  // Mock engagement metrics
  const engagementMetrics = {
    campaignsSent: 12,
    activeCampaigns: 3,
    openRate: 68,
    responseRate: 24,
  };

  // Action cards focused on engagement activities
  const actionCards = [
    {
      id: 'outreach',
      title: 'Outreach',
      description: 'Send campaigns and engage',
      icon: <Mail className="h-6 w-6" />,
      cta: 'Engage Contacts',
      color: 'bg-orange-500',
      route: '/outreach',
    },
    {
      id: 'campaigns',
      title: 'Campaigns',
      description: 'View and manage campaigns',
      icon: <Send className="h-6 w-6" />,
      cta: 'View Campaigns',
      color: 'bg-blue-500',
      route: '/outreach/email-campaigns',
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Track engagement metrics',
      icon: <BarChart3 className="h-6 w-6" />,
      cta: 'View Analytics',
      color: 'bg-purple-500',
      route: '/outreach/analytics',
    },
    {
      id: 'contacts',
      title: 'Contacts',
      description: 'Manage your contacts',
      icon: <Users className="h-6 w-6" />,
      cta: 'Manage Contacts',
      color: 'bg-green-500',
      route: '/contacts',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Engage"
        subtitle="Let's connect, engage, and win deals"
        backTo="/growth-dashboard"
        backLabel="Back to Growth Dashboard"
      />

      {/* Engagement Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Contacts */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-blue-600" />
            <h3 className="text-sm font-medium text-blue-900">Total Contacts</h3>
          </div>
          <p className="text-2xl font-bold text-blue-900">{mockContacts.total}</p>
        </div>

        {/* Active Campaigns */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
          <div className="flex items-center gap-2 mb-2">
            <Send className="h-5 w-5 text-orange-600" />
            <h3 className="text-sm font-medium text-orange-900">Active Campaigns</h3>
          </div>
          <p className="text-2xl font-bold text-orange-900">{engagementMetrics.activeCampaigns}</p>
        </div>

        {/* Open Rate */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h3 className="text-sm font-medium text-green-900">Open Rate</h3>
          </div>
          <p className="text-2xl font-bold text-green-900">{engagementMetrics.openRate}%</p>
        </div>

        {/* Response Rate */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-5 w-5 text-purple-600" />
            <h3 className="text-sm font-medium text-purple-900">Response Rate</h3>
          </div>
          <p className="text-2xl font-bold text-purple-900">{engagementMetrics.responseRate}%</p>
        </div>
      </div>

      {/* Contact Segments */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Contact Segments</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <h3 className="text-sm font-medium text-blue-900 mb-1">Aware</h3>
            <p className="text-2xl font-bold text-blue-900">{mockContacts.segments.Aware}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
            <h3 className="text-sm font-medium text-yellow-900 mb-1">Warm</h3>
            <p className="text-2xl font-bold text-yellow-900">{mockContacts.segments.Warm}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <h3 className="text-sm font-medium text-green-900 mb-1">Closed</h3>
            <p className="text-2xl font-bold text-green-900">{mockContacts.segments.Closed}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-1">Lost</h3>
            <p className="text-2xl font-bold text-gray-900">{mockContacts.segments.Lost}</p>
          </div>
        </div>
      </div>

      {/* Ecosystem Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Users className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Ecosystem</h2>
            <p className="text-sm text-gray-600">Your business relationships</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Collaborators */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-orange-900">Collaborators</h3>
                <p className="text-xs text-orange-700">Strategic partnerships</p>
              </div>
              <p className="text-2xl font-bold text-orange-900">{mockContacts.ecosystem.Collaborator}</p>
            </div>
          </div>

          {/* Vendors */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-blue-900">Vendors</h3>
                <p className="text-xs text-blue-700">Service providers</p>
              </div>
              <p className="text-2xl font-bold text-blue-900">{mockContacts.ecosystem.Vendor}</p>
            </div>
          </div>

          {/* Partners */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-purple-900">Partners</h3>
                <p className="text-xs text-purple-700">Key relationships</p>
              </div>
              <p className="text-2xl font-bold text-purple-900">{mockContacts.ecosystem.Partner}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/ecosystem')}
          className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium flex items-center justify-center gap-2"
        >
          View Full Ecosystem →
        </button>
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
