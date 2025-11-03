import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, CreditCard, Link2, Building2, Mail, CheckCircle, RefreshCw, Calendar } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Settings = () => {
  const [microsoftConnected, setMicrosoftConnected] = useLocalStorage('microsoft365Connected', true);
  const [dynamicsSync, setDynamicsSync] = useLocalStorage('dynamicsSyncEnabled', true);
  const [calendlyConnected, setCalendlyConnected] = useLocalStorage('calendlyConnected', false);
  const [calendlyApiKey, setCalendlyApiKey] = useLocalStorage('calendlyApiKey', '');
  const [lastSync] = useLocalStorage('lastSync', new Date().toISOString());
  const [showOAuthModal, setShowOAuthModal] = useState(false);
  const [showCalendlyModal, setShowCalendlyModal] = useState(false);
  const [oauthStep, setOAuthStep] = useState('connect');

  const handleMicrosoftConnect = () => {
    setShowOAuthModal(true);
    setOAuthStep('connect');
  };

  const handleOAuthComplete = () => {
    setOAuthStep('success');
    setTimeout(() => {
      setMicrosoftConnected(true);
      setShowOAuthModal(false);
      localStorage.setItem('microsoft365Connected', 'true');
      localStorage.setItem('microsoftToken', 'mock-token-' + Date.now());
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to Company Central
      </Link>

      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        {/* Personal Details */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Personal Details</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Joel [Last Name]"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                defaultValue="joel@businesspointlaw.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                defaultValue="(555) 123-4567"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <input
                type="text"
                defaultValue="Principal"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium">
              Save Changes
            </button>
          </div>
        </div>

        {/* Microsoft 365 Integration */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Microsoft 365 Integration</h2>
          </div>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Microsoft 365</p>
                    <p className="text-sm text-gray-500">Connect to Microsoft Graph for contacts and email</p>
                  </div>
                </div>
                {microsoftConnected ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">Connected</span>
                  </div>
                ) : (
                  <button
                    onClick={handleMicrosoftConnect}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
                  >
                    Connect
                  </button>
                )}
              </div>
              {microsoftConnected && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>Token: mock-token-{localStorage.getItem('microsoftToken')?.slice(-8) || '********'}</p>
                    <p>Last sync: {new Date(lastSync).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Dynamics 365 Sync Toggle */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <RefreshCw className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Sync with Dynamics 365 CRM</p>
                    <p className="text-sm text-gray-500">Automatically sync companies and opportunities</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dynamicsSync}
                    onChange={(e) => setDynamicsSync(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              {dynamicsSync && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">Sync enabled. Companies and opportunities will sync automatically.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bank & Financial Integrations */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="h-5 w-5 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Bank & Financial Integrations</h2>
          </div>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Business Bank Account</p>
                    <p className="text-sm text-gray-500">Connect your primary business checking account</p>
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium">
                  Connect Bank
                </button>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Business Credit Card</p>
                    <p className="text-sm text-gray-500">Sync credit card transactions automatically</p>
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium">
                  Connect Card
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Other Integrations */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Link2 className="h-5 w-5 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">Other Integrations</h2>
          </div>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Calendly Integration</p>
                    <p className="text-sm text-gray-500">Connect your Calendly account to sync scheduled meetings</p>
                  </div>
                </div>
                {calendlyConnected ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">Connected</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowCalendlyModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
                  >
                    Connect
                  </button>
                )}
              </div>
              {calendlyConnected && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>API Key: {calendlyApiKey ? calendlyApiKey.slice(0, 12) + '...' : 'Not set'}</p>
                    <p>Connected to Calendly account</p>
                  </div>
                  <button
                    onClick={() => {
                      setCalendlyConnected(false);
                      setCalendlyApiKey('');
                    }}
                    className="mt-2 text-xs text-red-600 hover:text-red-700"
                  >
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* OAuth Modal */}
      {showOAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            {oauthStep === 'connect' && (
              <>
                <h2 className="text-2xl font-bold mb-4">Connect Microsoft 365</h2>
                <p className="text-gray-600 mb-6">
                  Authorize access to your Microsoft 365 account to sync contacts, emails, and calendar.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 mb-2">This will grant access to:</p>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Read contacts from Microsoft Graph</li>
                    <li>Send emails via Outlook</li>
                    <li>Read calendar events</li>
                  </ul>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowOAuthModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleOAuthComplete}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Authorize
                  </button>
                </div>
              </>
            )}
            {oauthStep === 'success' && (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Connected!</h2>
                <p className="text-gray-600">Microsoft 365 has been successfully connected.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Calendly Connection Modal */}
      {showCalendlyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Connect Calendly</h2>
            <p className="text-gray-600 mb-6">
              Connect your Calendly account to automatically sync scheduled meetings into your meeting dashboard.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm font-medium text-gray-900 mb-2">How to get your API key:</p>
              <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                <li>Go to your Calendly account settings</li>
                <li>Navigate to Integrations → API</li>
                <li>Generate a Personal Access Token</li>
                <li>Paste it below</li>
              </ol>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calendly Personal Access Token
              </label>
              <input
                type="password"
                value={calendlyApiKey}
                onChange={(e) => setCalendlyApiKey(e.target.value)}
                placeholder="cal_xxxxxxxxxxxxxxxx"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Your API key is stored securely and used only to sync meetings
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCalendlyModal(false);
                  setCalendlyApiKey('');
                }}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (calendlyApiKey.trim()) {
                    setCalendlyConnected(true);
                    setShowCalendlyModal(false);
                  }
                }}
                disabled={!calendlyApiKey.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
