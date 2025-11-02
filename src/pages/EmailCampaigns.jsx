import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Plus, Send } from 'lucide-react';

export default function EmailCampaigns() {
  const [activeTab, setActiveTab] = useState('campaigns');

  // Mock campaign data
  const campaigns = [
    {
      id: 1,
      name: 'Q1 Capital Partner Outreach',
      status: 'Sent',
      sentDate: '2025-01-15',
      recipients: 12,
      openRate: 75.0,
      clickRate: 18.5,
      subject: 'Streamlining Legal Operations for Capital Partners'
    },
    {
      id: 2,
      name: 'Portfolio Manager Newsletter',
      status: 'Draft',
      sentDate: null,
      recipients: 8,
      openRate: null,
      clickRate: null,
      subject: 'Monthly Legal Insights for Portfolio Managers'
    },
    {
      id: 3,
      name: 'NDA Services Follow-up',
      status: 'Scheduled',
      sentDate: '2025-01-25',
      recipients: 24,
      openRate: null,
      clickRate: null,
      subject: 'Efficient NDA Management for Your Portfolio Companies'
    }
  ];

  const contactLists = [
    { id: 1, name: 'Capital Partners', contactCount: 12, description: 'Debt financing and capital partners' },
    { id: 2, name: 'Portfolio Managers', contactCount: 8, description: 'Active portfolio managers' },
    { id: 3, name: 'Investment Directors', contactCount: 15, description: 'Investment directors and decision makers' },
    { id: 4, name: 'Legal Decision Makers', contactCount: 20, description: 'General counsel and legal leaders' }
  ];

  const renderCampaigns = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Email Campaigns</h3>
        <button
          onClick={() => setActiveTab('create')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
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
            
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Recipients:</span>
                <span className="font-medium">{campaign.recipients}</span>
              </div>
              {campaign.openRate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Open Rate:</span>
                  <span className="font-medium">{campaign.openRate}%</span>
                </div>
              )}
              {campaign.clickRate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Click Rate:</span>
                  <span className="font-medium">{campaign.clickRate}%</span>
                </div>
              )}
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Subject:</p>
              <p className="text-sm font-medium text-gray-900">{campaign.subject}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCreateCampaign = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Create Email Campaign</h3>
          <p className="text-gray-600">Build and send your outreach campaign</p>
        </div>
        <button
          onClick={() => setActiveTab('campaigns')}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          ← Back to Campaigns
        </button>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-6">
        <p className="text-sm text-blue-800">
          Email campaigns help you maintain relationships with capital partners, portfolio managers, and key decision makers in your network.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Step 1: Select Contact List</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {contactLists.map((list) => (
            <button
              key={list.id}
              className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <h5 className="font-medium text-gray-900">{list.name}</h5>
              <p className="text-sm text-gray-600">{list.contactCount} contacts</p>
              <p className="text-xs text-gray-500">{list.description}</p>
            </button>
          ))}
        </div>

        <h4 className="font-semibold text-gray-900 mb-4">Step 2: Compose Email</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line</label>
            <input
              type="text"
              placeholder="Enter subject line"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              placeholder="Hi {{firstName}},\n\nWrite your message here...\n\nBest regards,\nJoel"
              rows="8"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Use {{firstName}}, {{lastName}}, {{company}} for personalization
            </p>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
              <Send className="h-4 w-4" />
              Send Campaign
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Save as Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/crm-hub"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to CRM Hub
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Campaigns</h1>
        <p className="text-gray-600">Create and manage your email outreach campaigns</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === 'campaigns'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Mail className="h-4 w-4" />
              Campaigns
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === 'create'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Plus className="h-4 w-4" />
              Create Campaign
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        {activeTab === 'campaigns' && renderCampaigns()}
        {activeTab === 'create' && renderCreateCampaign()}
      </div>
    </div>
  );
}
