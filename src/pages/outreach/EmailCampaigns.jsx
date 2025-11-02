import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Plus, Send, Users, FileText, List, Sparkles, Building2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { mockContacts } from '../data/mockData';

export default function EmailCampaigns() {
  const navigate = useNavigate();
  const [showPersonaModal, setShowPersonaModal] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);

  // Mock metrics
  const metrics = {
    activeCampaigns: 3,
    responseRate: 18.5,
    meetingsBooked: 4,
    newTemplates: 8,
    activePersonas: 3,
  };

  // Mock personas with contact counts
  const personas = [
    {
      id: 1,
      name: 'Venture Investor',
      contactCount: 12,
      type: 'Investor',
      goals: 'Accelerate deal execution',
      painPoints: 'Rapid legal document turnaround',
    },
    {
      id: 2,
      name: 'Startup Founder',
      contactCount: 20,
      type: 'Partner',
      goals: 'Scale legal operations',
      painPoints: 'Streamlined NDA processes',
    },
    {
      id: 3,
      name: 'Law Partner',
      contactCount: 8,
      type: 'Partner',
      goals: 'Reduce time-to-close',
      painPoints: 'Fast legal support',
    },
  ];

  // Mock campaigns
  const campaigns = [
    {
      id: 1,
      name: 'Q1 Capital Partner Outreach',
      status: 'Sent',
      personaId: 1,
      personaName: 'Venture Investor',
      sentDate: '2025-01-15',
      recipients: 12,
      openRate: 75.0,
      clickRate: 18.5,
      responseRate: 18.5,
      subject: 'Streamlining Legal Operations for Capital Partners',
    },
    {
      id: 2,
      name: 'Portfolio Manager Newsletter',
      status: 'Draft',
      personaId: 1,
      personaName: 'Venture Investor',
      sentDate: null,
      recipients: 8,
      openRate: null,
      clickRate: null,
      responseRate: null,
      subject: 'Monthly Legal Insights for Portfolio Managers',
    },
    {
      id: 3,
      name: 'NDA Services Follow-up',
      status: 'Scheduled',
      personaId: 2,
      personaName: 'Startup Founder',
      sentDate: '2025-01-25',
      recipients: 24,
      openRate: null,
      clickRate: null,
      responseRate: null,
      subject: 'Efficient NDA Management for Your Portfolio Companies',
    },
  ];

  const handlePersonaClick = (personaId) => {
    navigate(`/outreach/personas/${personaId}`);
  };

  const handleBuildPersona = () => {
    setShowPersonaModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Outreach Workspace"
        subtitle="Build and manage your outreach campaigns"
        backTo="/growth-dashboard"
        backLabel="Back to Growth Dashboard"
      />

      {/* Header Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <p className="text-xs font-medium text-blue-900 mb-1">Active Campaigns</p>
          <p className="text-2xl font-bold text-blue-900">{metrics.activeCampaigns}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
          <p className="text-xs font-medium text-green-900 mb-1">Response Rate</p>
          <p className="text-2xl font-bold text-green-900">{metrics.responseRate}%</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
          <p className="text-xs font-medium text-orange-900 mb-1">Meetings Booked</p>
          <p className="text-2xl font-bold text-orange-900">{metrics.meetingsBooked}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
          <p className="text-xs font-medium text-purple-900 mb-1">New Templates</p>
          <p className="text-2xl font-bold text-purple-900">{metrics.newTemplates}</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
          <p className="text-xs font-medium text-red-900 mb-1">Active Personas</p>
          <p className="text-2xl font-bold text-red-900">{metrics.activePersonas}</p>
        </div>
      </div>

      {/* "Who" Section - Personas + Ecosystem */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Personas Panel */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-bold">Personas</h2>
            </div>
            <button
              onClick={handleBuildPersona}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Build New
            </button>
          </div>
          <div className="space-y-3">
            {personas.map((persona) => (
              <div
                key={persona.id}
                onClick={() => handlePersonaClick(persona.id)}
                className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors border border-gray-200 hover:border-blue-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{persona.name}</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {persona.contactCount} contacts
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-500">Type:</span>
                  <span className="text-xs font-medium text-gray-700">{persona.type}</span>
                </div>
                <p className="text-xs text-gray-600 line-clamp-1">{persona.goals}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ecosystem Panel */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-5 w-5 text-orange-600" />
            <h2 className="text-xl font-bold">Ecosystem</h2>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Collaborators</h3>
                  <p className="text-xs text-gray-600">Strategic partnerships</p>
                </div>
                <span className="text-2xl font-bold text-orange-900">{mockContacts.ecosystem.Collaborator}</span>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Vendors</h3>
                  <p className="text-xs text-gray-600">Service providers</p>
                </div>
                <span className="text-2xl font-bold text-blue-900">{mockContacts.ecosystem.Vendor}</span>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Partners</h3>
                  <p className="text-xs text-gray-600">Key relationships</p>
                </div>
                <span className="text-2xl font-bold text-purple-900">{mockContacts.ecosystem.Partner}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate('/growth-dashboard')}
            className="mt-4 w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            View Full Ecosystem →
          </button>
        </div>
      </div>

      {/* "How" Section - Campaign Control */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Campaigns</h2>
          <div className="flex items-center gap-3">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
              <option>All Personas</option>
              {personas.map(p => <option key={p.id}>{p.name}</option>)}
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
              <option>All Types</option>
              <option>Collaborator</option>
              <option>Vendor</option>
              <option>Partner</option>
            </select>
            <button
              onClick={() => navigate('/outreach/create')}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Campaign
            </button>
          </div>
        </div>

        {/* Campaign Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all cursor-pointer"
              onClick={() => navigate(`/outreach/campaigns/${campaign.id}`)}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">{campaign.name}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  campaign.status === 'Sent' ? 'bg-green-100 text-green-800' :
                  campaign.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {campaign.status}
                </span>
              </div>

              {/* Persona Badge */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                  <Users className="h-3 w-3" />
                  {campaign.personaName}
                </span>
              </div>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Recipients:</span>
                  <span className="font-medium">{campaign.recipients}</span>
                </div>
                {campaign.responseRate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Rate:</span>
                    <span className="font-medium text-green-600">{campaign.responseRate}%</span>
                  </div>
                )}
                {campaign.openRate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Open Rate:</span>
                    <span className="font-medium">{campaign.openRate}%</span>
                  </div>
                )}
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Subject:</p>
                <p className="text-sm font-medium text-gray-900 line-clamp-2">{campaign.subject}</p>
              </div>

              <button className="mt-4 w-full px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors">
                Open Campaign
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Building Blocks Shortcuts */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Building Blocks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/contacts')}
            className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <List className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Lists</h3>
            </div>
            <p className="text-sm text-gray-600">Manage audience groups</p>
          </button>
          <button
            onClick={() => alert('Templates page - to be built')}
            className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Templates</h3>
            </div>
            <p className="text-sm text-gray-600">Refine messages</p>
          </button>
          <button
            onClick={() => navigate('/outreach')}
            className="p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <Send className="h-5 w-5 text-orange-600" />
              <h3 className="font-semibold text-gray-900">Campaigns</h3>
            </div>
            <p className="text-sm text-gray-600">Launch + track</p>
          </button>
        </div>
      </div>

      {/* Build New Persona Modal */}
      {showPersonaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold mb-4">Build New Persona</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="e.g., Venture Investor"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Investor</option>
                  <option>Partner</option>
                  <option>Vendor</option>
                  <option>Collaborator</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pain Points</label>
                <textarea
                  placeholder="Key pain points..."
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Goals</label>
                <textarea
                  placeholder="Primary goals..."
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Segment Tags</label>
                <input
                  type="text"
                  placeholder="e.g., Warm, Active, Capital Partner"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPersonaModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Persona created! (Mock - integrate with backend)');
                  setShowPersonaModal(false);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Persona
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
