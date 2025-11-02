import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, MessageSquare, Sparkles, Building2 } from 'lucide-react';

// Mock contact data with enhanced fields
const contacts = [
  {
    id: 1,
    name: 'David Chen',
    firm: 'Ares Capital',
    type: 'Capital Partner',
    status: 'Warm',
    lastTouch: '2025-01-15',
    nextTouch: '2025-01-22',
    email: 'dchen@arescapital.com',
    phone: '(555) 123-4567',
  },
  {
    id: 2,
    name: 'Sarah Martinez',
    firm: 'Orion Holdings',
    type: 'Portfolio Manager',
    status: 'Active',
    lastTouch: '2025-01-18',
    nextTouch: '2025-01-25',
    email: 'smartinez@orionholdings.com',
    phone: '(555) 234-5678',
  },
  {
    id: 3,
    name: 'Michael Thompson',
    firm: 'Meridian Partners',
    type: 'Investment Director',
    status: 'Cold',
    lastTouch: '2024-12-10',
    nextTouch: '2025-01-20',
    email: 'mthompson@meridianpartners.com',
    phone: '(555) 345-6789',
  },
  {
    id: 4,
    name: 'Jennifer Park',
    firm: 'SolarTrust LLC',
    type: 'General Counsel',
    status: 'Signed',
    lastTouch: '2025-01-12',
    nextTouch: null,
    email: 'jpark@solartrust.com',
    phone: '(555) 456-7890',
  },
];

export default function CrmList() {
  const navigate = useNavigate();
  const [selectedContact, setSelectedContact] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState({});

  const handleUpdate = (contact) => {
    setSelectedContact(contact);
    setFormData({
      status: contact.status,
      lastTouch: contact.lastTouch,
      nextTouch: contact.nextTouch || '',
      notes: ''
    });
    setShowUpdateModal(true);
  };

  const handleHydrate = (contact) => {
    // Mock hydration - prefills sector, LinkedIn, source
    alert(`Hydrating ${contact.name}...\n\nSector: Private Equity\nLinkedIn: linkedin.com/in/${contact.name.toLowerCase().replace(' ', '-')}\nSource: Industry Conference`);
  };

  const getStatusColor = (status) => {
    const colors = {
      Cold: 'bg-gray-100 text-gray-800',
      Warm: 'bg-orange-100 text-orange-800',
      Active: 'bg-blue-100 text-blue-800',
      Signed: 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/bd-central"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to Business Development
      </Link>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Contacts</h1>
          <p className="text-gray-600">Your main working screen for relationship management</p>
        </div>
        <button
          onClick={() => navigate('/crm/create')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Contact
        </button>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{contact.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Building2 className="h-4 w-4" />
                  <span>{contact.firm}</span>
                </div>
                <p className="text-sm text-gray-500">{contact.type}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contact.status)}`}>
                {contact.status}
              </span>
            </div>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Last Touch:</span>
                <span className="font-medium text-gray-900">{contact.lastTouch}</span>
              </div>
              {contact.nextTouch && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Touch:</span>
                  <span className="font-medium text-orange-600">{contact.nextTouch}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <button
                onClick={() => handleUpdate(contact)}
                className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm font-medium flex items-center justify-center gap-1"
              >
                <Edit className="h-4 w-4" />
                Update
              </button>
              <button
                onClick={() => navigate(`/messages?contact=${contact.id}`)}
                className="flex-1 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm font-medium flex items-center justify-center gap-1"
              >
                <MessageSquare className="h-4 w-4" />
                Message
              </button>
              <button
                onClick={() => handleHydrate(contact)}
                className="px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded text-sm font-medium"
                title="Hydrate with sector/LinkedIn/source"
              >
                <Sparkles className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Contact Modal */}
      {showUpdateModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Update Contact</h2>
            <p className="text-sm text-gray-600 mb-6">{selectedContact.name} - {selectedContact.firm}</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Cold">Cold</option>
                  <option value="Warm">Warm</option>
                  <option value="Active">Active</option>
                  <option value="Signed">Signed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Touch</label>
                <input
                  type="date"
                  value={formData.lastTouch}
                  onChange={(e) => setFormData({ ...formData, lastTouch: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Next Touch</label>
                <input
                  type="date"
                  value={formData.nextTouch}
                  onChange={(e) => setFormData({ ...formData, nextTouch: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Activity Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Add notes about this interaction..."
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('Updated contact:', selectedContact.id, formData);
                  alert('Contact updated successfully!');
                  setShowUpdateModal(false);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
