import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Plus } from 'lucide-react';

export default function EmailCampaigns() {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [campaignName, setCampaignName] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [contactList, setContactList] = useState(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dummyLists = [
    { id: 1, name: "Capital Partners", contactCount: 12, description: "Debt financing and capital partners" },
    { id: 2, name: "Portfolio Managers", contactCount: 8, description: "Portfolio management contacts" },
    { id: 3, name: "Active Clients", contactCount: 24, description: "Current legal services clients" },
    { id: 4, name: "Prospects", contactCount: 15, description: "Potential new clients" }
  ];

  const dummyCampaigns = [
    {
      id: 1,
      name: "Q1 Legal Services Update",
      status: "Sent",
      sentDate: "2025-01-15",
      recipients: 24,
      openRate: 68.5,
      clickRate: 12.3,
      subject: "Legal services update and NDA management insights"
    },
    {
      id: 2,
      name: "Portfolio Manager Newsletter",
      status: "Draft",
      sentDate: null,
      recipients: 8,
      openRate: null,
      clickRate: null,
      subject: "Streamline your legal document processes"
    },
    {
      id: 3,
      name: "Capital Partner Outreach",
      status: "Scheduled",
      sentDate: "2025-01-25',
      recipients: 12,
      openRate: null,
      clickRate: null,
      subject: "Legal support for your deal pipeline"
    }
  ];

  const handleCreateCampaign = async () => {
    if (!campaignName.trim()) {
      setError("Please enter a campaign name");
      return;
    }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setError("");
    alert('Campaign created! Complete the steps below to send.');
    setLoading(false);
  };

  const handleSelectList = (list) => {
    setContactList(list);
  };

  const handleSendCampaign = async () => {
    if (!campaignName.trim() || !subject.trim() || !message.trim() || !contactList) {
      setError("Please complete all steps before sending");
      return;
    }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert("Campaign sent successfully!");
    setError("");
    // Reset form
    setCampaignName("");
    setCampaignDescription("");
    setContactList(null);
    setSubject("");
    setMessage("");
    setLoading(false);
  };

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
        {dummyCampaigns.map((campaign) => (
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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Create Email Campaign</h3>
          <p className="text-gray-600">Build and send your email campaign</p>
        </div>
        <button
          onClick={() => setActiveTab('campaigns')}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          ← Back to Campaigns
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Step 1: Campaign Name */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          1. Campaign Name
        </h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Enter campaign name"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={campaignDescription}
            onChange={(e) => setCampaignDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleCreateCampaign}
            disabled={!campaignName.trim() || loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
          >
            {loading ? 'Creating...' : 'Create Campaign'}
          </button>
        </div>
      </div>

      {/* Step 2: Pick List */}
      {campaignName && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            2. Pick a Contact List
          </h2>

          {contactList ? (
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <h4 className="font-medium text-gray-900">{contactList.name}</h4>
                <p className="text-sm text-gray-600">{contactList.contactCount} contacts</p>
              </div>
              <button
                onClick={() => setContactList(null)}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded"
              >
                Change
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-gray-600">Select a contact list to send your campaign to:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dummyLists.map((list) => (
                  <button
                    key={list.id}
                    onClick={() => handleSelectList(list)}
                    className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <h4 className="font-medium text-gray-900">{list.name}</h4>
                    <p className="text-sm text-gray-600">{list.contactCount} contacts</p>
                    <p className="text-xs text-gray-500">{list.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Write Email */}
      {contactList && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            3. Write Your Email
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subject Line</label>
              <input
                type="text"
                placeholder="Enter subject line"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
              <textarea
                placeholder="Hi {{firstName}},\n\nWrite your message here...\n\nBest regards,\nJoel"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="8"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use {{firstName}}, {{lastName}}, {{company}} for personalization
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSendCampaign}
                disabled={!subject.trim() || !message.trim() || loading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
              >
                {loading ? 'Sending...' : 'Send Campaign'}
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Preview
              </button>
            </div>
          </div>
        </div>
      )}
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

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Email Campaigns</h1>
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
              Create
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

