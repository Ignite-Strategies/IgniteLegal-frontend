import { Link, useNavigate } from 'react-router-dom';
import { Users, MessageSquare, FileText, Plus, RefreshCw } from 'lucide-react';

export default function BdCentral() {
  const navigate = useNavigate();

  // Pipeline metrics
  const pipelineMetrics = {
    total: 24,
    warm: 8,
    followUpsDue: 5
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to Company Central
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold mb-2">Business Development</h1>
            <p className="text-gray-600 text-lg">Your relationship management hub</p>
          </div>

          {/* Pipeline Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-sm font-medium text-gray-500 mb-1">Total Contacts</p>
              <p className="text-3xl font-bold text-gray-900">{pipelineMetrics.total}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-sm font-medium text-gray-500 mb-1">Warm</p>
              <p className="text-3xl font-bold text-orange-600">{pipelineMetrics.warm}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-sm font-medium text-gray-500 mb-1">Follow-ups Due</p>
              <p className="text-3xl font-bold text-red-600">{pipelineMetrics.followUpsDue}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => navigate('/crm/create')}
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Plus className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Add Contact</p>
                  <p className="text-sm text-gray-500">Create new entry</p>
                </div>
              </button>
              <button
                onClick={() => navigate('/messages')}
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Send Message</p>
                  <p className="text-sm text-gray-500">Compose outreach</p>
                </div>
              </button>
              <button
                onClick={() => navigate('/nda-hub')}
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Review NDAs</p>
                  <p className="text-sm text-gray-500">Check pending work</p>
                </div>
              </button>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Go To</h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/crm/list')}
                className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
              >
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Contacts</p>
                  <p className="text-sm text-gray-500">View and manage all contacts</p>
                </div>
              </button>
              <button
                onClick={() => navigate('/messages')}
                className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
              >
                <MessageSquare className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Messages</p>
                  <p className="text-sm text-gray-500">View message history and templates</p>
                </div>
              </button>
              <button
                onClick={() => navigate('/bd-insights')}
                className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
              >
                <FileText className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">Insights & Plan</p>
                  <p className="text-sm text-gray-500">View BD summary and follow-ups</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Rail - Integrations */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-gray-400" />
              Integrations
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-gray-600">Google Workspace</span>
                <span className="text-xs text-gray-400">Connected</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-gray-600">Email Templates</span>
                <span className="text-xs text-gray-400">Active</span>
              </div>
              <button className="w-full mt-4 text-xs text-blue-600 hover:text-blue-800">
                Manage Integrations →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
