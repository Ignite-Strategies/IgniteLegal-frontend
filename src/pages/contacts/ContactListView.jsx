import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function ContactListView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [lists, setLists] = useLocalStorage('contactLists', []);
  const [selectedContacts, setSelectedContacts] = useState(new Set());
  const [listName, setListName] = useState('');
  const [listDescription, setListDescription] = useState('');

  useEffect(() => {
    loadContacts();
  }, [type]);

  const loadContacts = () => {
    // Mock: Load contacts based on type
    // In real app, this would call API
    let filtered = [];
    
    switch (type) {
      case 'all_contacts':
        filtered = contacts;
        break;
      case 'org_members':
        // Mock: filter by some criteria
        filtered = contacts.filter(c => c.company);
        break;
      case 'custom':
        filtered = contacts;
        break;
      default:
        filtered = [];
    }
    
    setContacts(filtered);
  };

  const handleSelectContact = (contactId) => {
    const newSelected = new Set(selectedContacts);
    if (newSelected.has(contactId)) {
      newSelected.delete(contactId);
    } else {
      newSelected.add(contactId);
    }
    setSelectedContacts(newSelected);
  };

  const handleSelectAll = () => {
    const allIds = contacts.map(c => c.id);
    setSelectedContacts(new Set(allIds));
  };

  const handleDeselectAll = () => {
    setSelectedContacts(new Set());
  };

  const handleCreateList = () => {
    if (!listName) {
      alert('Please enter a list name');
      return;
    }

    const contactIds = selectedContacts.size > 0 
      ? Array.from(selectedContacts)
      : contacts.map(c => c.id);

    if (contactIds.length === 0) {
      alert('Please select at least one contact');
      return;
    }

    const newList = {
      id: Date.now().toString(),
      name: listName,
      description: listDescription,
      type: type || 'custom',
      contactIds: contactIds,
      totalContacts: contactIds.length,
      createdAt: new Date().toISOString()
    };

    setLists([...lists, newList]);
    navigate('/contact-list-manager');
  };

  const getListName = () => {
    switch (type) {
      case 'all_contacts': return 'All Contacts';
      case 'org_members': return 'Organization Members';
      case 'custom': return 'Custom Selection';
      default: return 'Contact List';
    }
  };

  const displayedContacts = contacts.length > 0 ? contacts : [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title={getListName()}
        subtitle={`${displayedContacts.length} contacts available`}
        backTo="/contact-list-builder"
        backLabel="Back to Builder"
      />

      {/* List Details Form */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">List Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              List Name *
            </label>
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              placeholder="Enter list name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <input
              type="text"
              value={listDescription}
              onChange={(e) => setListDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Selection Controls */}
      {displayedContacts.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Contacts ({displayedContacts.length})
            </h3>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSelectAll}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
              >
                Select All
              </button>
              <button
                onClick={handleDeselectAll}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm"
              >
                Deselect All
              </button>
              <span className="text-sm text-gray-600">
                {selectedContacts.size} of {displayedContacts.length} selected
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Select</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayedContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedContacts.has(contact.id)}
                        onChange={() => handleSelectContact(contact.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {contact.name || `${contact.firstName} ${contact.lastName}`}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {contact.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {contact.company || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {contact.status && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {contact.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {displayedContacts.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <p className="text-gray-500">No contacts found for this list type</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => navigate('/contact-list-builder')}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleCreateList}
          disabled={!listName || displayedContacts.length === 0}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create List ({selectedContacts.size > 0 ? selectedContacts.size : displayedContacts.length} contacts)
        </button>
      </div>
    </div>
  );
}

