import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Calendar, Search, RefreshCw, Upload, Users } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useMicrosoftGraph } from '../../hooks/useMicrosoftGraph';

export default function ContactManageHome() {
  const navigate = useNavigate();
  const [contacts] = useLocalStorage('contacts', []);
  const { hydrateContacts, loading } = useMicrosoftGraph();

  const handleHydrateFromEmail = async () => {
    const result = await hydrateContacts();
    if (result.success) {
      alert(`✅ Synced ${result.count} contacts from Microsoft 365 / Email`);
    } else {
      alert('❌ Error syncing contacts: ' + result.error);
    }
  };

  const options = [
    {
      id: 'org_members',
      title: '🏢 Organization Members',
      description: 'View and manage all org members - your core team',
      icon: <Building2 className="h-8 w-8" />,
      color: 'from-blue-500 to-blue-600',
      features: [
        'Board members & staff',
        'Core volunteers',
        'Committee members',
        'Engagement tracking'
      ],
      route: '/contacts/org-members'
    },
    {
      id: 'event_contacts',
      title: '📅 Event Contacts',
      description: 'Manage contacts for specific events - attendees and participants',
      icon: <Calendar className="h-8 w-8" />,
      color: 'from-indigo-500 to-purple-600',
      features: [
        'Event attendees',
        'Pipeline stages',
        'Form submissions',
        'Elevate to org member'
      ],
      route: '/contacts/events'
    },
    {
      id: 'all_contacts',
      title: '🔍 All Contacts',
      description: 'Search and manage anyone across your entire database',
      icon: <Search className="h-8 w-8" />,
      color: 'from-green-500 to-emerald-600',
      features: [
        'Universal search',
        'Cross-reference data',
        'Edit any contact',
        'Find duplicates'
      ],
      route: '/contacts/all'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Contact Management"
        subtitle="Manage your contacts with auto-sync, manual updates, and CSV uploads"
        backTo="/"
        backLabel="Back to Company Central"
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Contacts</p>
              <p className="text-3xl font-bold text-gray-900">{contacts.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Auto-Sync Status</p>
              <p className="text-lg font-semibold text-green-600">Active</p>
            </div>
            <RefreshCw className={`h-8 w-8 text-green-600 ${loading ? 'animate-spin' : ''}`} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Last Sync</p>
              <p className="text-lg font-semibold text-gray-900">
                {new Date().toLocaleDateString()}
              </p>
            </div>
            <Upload className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleHydrateFromEmail}
            disabled={loading}
            className="flex items-center gap-3 px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition text-left"
          >
            <RefreshCw className={`h-5 w-5 text-blue-600 ${loading ? 'animate-spin' : ''}`} />
            <div>
              <p className="font-medium text-gray-900">Sync from Email</p>
              <p className="text-sm text-gray-600">Microsoft 365 / Outlook</p>
            </div>
          </button>
          <button
            onClick={() => navigate('/contacts/upload')}
            className="flex items-center gap-3 px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition text-left"
          >
            <Upload className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-gray-900">Upload CSV</p>
              <p className="text-sm text-gray-600">Import contacts from file</p>
            </div>
          </button>
          <button
            onClick={() => navigate('/contact-list-manager')}
            className="flex items-center gap-3 px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition text-left"
          >
            <Users className="h-5 w-5 text-purple-600" />
            <div>
              <p className="font-medium text-gray-900">Manage Lists</p>
              <p className="text-sm text-gray-600">Create contact segments</p>
            </div>
          </button>
        </div>
      </div>

      {/* Contact Type Selection */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Which contacts do you want to manage?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => navigate(option.route)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 text-left group border-2 border-transparent hover:border-gray-300"
            >
              <div className="flex flex-col h-full">
                {/* Icon */}
                <div className={`w-20 h-20 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition text-white`}>
                  {option.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {option.description}
                  </p>
                  
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arrow */}
                <div className={`flex items-center justify-end font-semibold group-hover:translate-x-2 transition ${
                  option.id === 'org_members' ? 'text-blue-600' :
                  option.id === 'event_contacts' ? 'text-indigo-600' :
                  'text-green-600'
                }`}>
                  View {option.title.split(' ')[1]} →
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Info Footer */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> Contacts auto-sync from email. You can also manually upload CSV files or update individual contacts.
        </p>
      </div>
    </div>
  );
}

