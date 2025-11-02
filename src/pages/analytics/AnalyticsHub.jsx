import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Users, MessageSquare, FileText, Plus, RefreshCw, CheckCircle } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useMicrosoftGraph } from '../../hooks/useMicrosoftGraph';
import { useDynamics } from '../../hooks/useDynamics';

export default function AnalyticsHub() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [contacts] = useLocalStorage('contacts', []);
  const [companies] = useLocalStorage('companies', []);
  const [microsoftConnected] = useLocalStorage('microsoft365Connected', true);
  const { hydrateContacts, loading: graphLoading } = useMicrosoftGraph();
  const { syncAccounts, loading: dynamicsLoading } = useDynamics();
  const [toast, setToast] = useState(null);

  // Handle sync from query param
  useEffect(() => {
    if (searchParams.get('sync') === 'true') {
      handleSync();
      searchParams.delete('sync');
    }
  }, []);

  const handleSync = async () => {
    const graphResult = await hydrateContacts();
    const dynamicsResult = await syncAccounts();
    
    if (graphResult.success) {
      setToast({
        type: 'success',
        message: `Contacts synced from Microsoft Graph — ${graphResult.count} new entries.`
      });
      setTimeout(() => setToast(null), 5000);
    }
    
    if (dynamicsResult.success) {
      setToast({
        type: 'success',
        message: `Companies synced from Dynamics 365 — ${dynamicsResult.count} new entries.`
      });
      setTimeout(() => setToast(null), 5000);
    }

    // Update last sync time
    localStorage.setItem('lastSync', new Date().toISOString());
  };

  // Calculate pipeline metrics
  const warmCount = contacts.filter(c => c.status === 'Warm').length;
  const followUpsDue = contacts.filter(c => {
    if (!c.nextTouch) return false;
    return new Date(c.nextTouch) <= new Date();
  }).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to Company Central
      </Link>

      {/* Toast Notification */}
      {toast && (
        <div className={`mb-6 p-4 rounded-lg border ${
          toast.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <p className="font-medium">{toast.message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header with Microsoft 365 Status */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Business Development</h1>
              <p className="text-gray-600 text-lg">Your relationship management hub</p>
            </div>
            {microsoftConnected && (
              <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">Connected to Microsoft 365</span>
              </div>
            )}
          </div>

          {/* Pipeline Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-sm font-medium text-gray-500 mb-1">Total Contacts</p>
              <p className="text-3xl font-bold text-gray-900">{contacts.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-sm font-medium text-gray-500 mb-1">Warm</p>
              <p className="text-3xl font-bold text-orange-600">{warmCount}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-sm font-medium text-gray-500 mb-1">Follow-ups Due</p>
              <p className="text-3xl font-bold text-red-600">{followUpsDue}</p>
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

          {/* Sync with Microsoft 365 */}
          {microsoftConnected && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm p-6 border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <RefreshCw className={`h-5 w-5 text-blue-600 ${graphLoading || dynamicsLoading ? 'animate-spin' : ''}`} />
                  <div>
                    <p className="font-medium text-gray-900">Sync with Microsoft 365</p>
                    <p className="text-sm text-gray-600">Pull latest contacts from Graph and companies from Dynamics</p>
                  </div>
                </div>
                <button
                  onClick={handleSync}
                  disabled={graphLoading || dynamicsLoading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg text-sm font-medium"
                >
                  {graphLoading || dynamicsLoading ? 'Syncing...' : 'Sync Now'}
                </button>
              </div>
            </div>
          )}

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
                onClick={() => navigate('/companies')}
                className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
              >
                <FileText className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="font-medium text-gray-900">Companies</p>
                  <p className="text-sm text-gray-500">View companies from Dynamics 365</p>
                </div>
              </button>
              <button
                onClick={() => navigate('/pipeline')}
                className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
              >
                <FileText className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Pipeline</p>
                  <p className="text-sm text-gray-500">Kanban view of stages</p>
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
              <div className="flex items-center justify-between p-2 bg-green-50 rounded border border-green-200">
                <span className="text-gray-900 font-medium">Microsoft 365</span>
                <span className="text-xs text-green-600 font-medium">Connected</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-green-50 rounded border border-green-200">
                <span className="text-gray-900 font-medium">Dynamics 365 CRM</span>
                <span className="text-xs text-green-600 font-medium">Synced</span>
              </div>
              <button 
                onClick={() => navigate('/settings')}
                className="w-full mt-4 text-xs text-blue-600 hover:text-blue-800"
              >
                Manage Integrations →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
