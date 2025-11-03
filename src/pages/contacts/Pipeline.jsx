import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { User, Building2, Plus, Inbox } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

const stages = [
  { id: 'prospect', name: 'Prospect', color: 'bg-gray-100', borderColor: 'border-gray-300', textColor: 'text-gray-700' },
  { id: 'warm', name: 'Warm', color: 'bg-orange-100', borderColor: 'border-orange-300', textColor: 'text-orange-700' },
  { id: 'engaged', name: 'Engaged', color: 'bg-blue-100', borderColor: 'border-blue-300', textColor: 'text-blue-700' },
  { id: 'client', name: 'Client', color: 'bg-green-100', borderColor: 'border-green-300', textColor: 'text-green-700' }
];

export default function Pipeline() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [draggedContact, setDraggedContact] = useState(null);
  const [draggedOverStage, setDraggedOverStage] = useState(null);

  // Group contacts by stage
  const contactsByStage = {
    prospect: contacts.filter(c => (c.stage || 'Prospect').toLowerCase() === 'prospect'),
    warm: contacts.filter(c => (c.stage || '').toLowerCase() === 'warm'),
    engaged: contacts.filter(c => (c.stage || '').toLowerCase() === 'engaged'),
    client: contacts.filter(c => (c.stage || '').toLowerCase() === 'client')
  };

  const handleDragStart = (contact) => {
    setDraggedContact(contact);
  };

  const handleDragOver = (e, stageId) => {
    e.preventDefault();
    setDraggedOverStage(stageId);
  };

  const handleDragLeave = () => {
    setDraggedOverStage(null);
  };

  const handleDrop = (e, targetStage) => {
    e.preventDefault();
    setDraggedOverStage(null);
    if (!draggedContact) return;

    // Update contact stage
    const updated = contacts.map(c => {
      if (c.id === draggedContact.id) {
        const updatedContact = {
          ...c,
          stage: targetStage.charAt(0).toUpperCase() + targetStage.slice(1)
        };
        
        // Log activity
        const activities = JSON.parse(localStorage.getItem('activities') || '[]');
        activities.unshift({
          id: `activity-${Date.now()}`,
          contactId: c.id,
          contactName: c.name,
          type: 'stage_change',
          message: `${c.name} moved to ${targetStage}`,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('activities', JSON.stringify(activities));

        return updatedContact;
      }
      return c;
    });

    setContacts(updated);
    setDraggedContact(null);
  };

  const handleDragEnd = () => {
    setDraggedContact(null);
    setDraggedOverStage(null);
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

  // Filter by stage
  const [selectedStage, setSelectedStage] = useState('all');

  const filteredContacts = selectedStage === 'all' 
    ? contacts 
    : contacts.filter(c => (c.stage || 'Prospect').toLowerCase() === selectedStage);

  const totalByStage = stages.reduce((acc, stage) => {
    acc[stage.id] = contactsByStage[stage.id]?.length || 0;
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Pipeline"
        subtitle="Manage contacts across pipeline stages"
        backTo="/contacts"
        backLabel="← Back to Contacts"
      />

      {/* Stage Filters */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedStage('all')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              selectedStage === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({contacts.length})
          </button>
          {stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => setSelectedStage(stage.id)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedStage === stage.id
                  ? `${stage.color} ${stage.textColor} border-2 ${stage.borderColor}`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {stage.name} ({totalByStage[stage.id] || 0})
            </button>
          ))}
        </div>
      </div>

      {/* Contacts List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {filteredContacts.length === 0 ? (
          <div className="text-center py-12">
            <Inbox className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No contacts in this stage</p>
            <button
              onClick={() => navigate('/contacts')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Add Contacts
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredContacts.map((contact) => {
              const contactStage = (contact.stage || 'Prospect').toLowerCase();
              const stageInfo = stages.find(s => s.id === contactStage) || stages[0];
              
              return (
                <div
                  key={contact.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      {contact.photoUrl ? (
                        <img src={contact.photoUrl} alt={contact.name} className="h-10 w-10 rounded-full" />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <p className="font-semibold text-gray-900">{contact.name}</p>
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${stageInfo.color} ${stageInfo.textColor}`}>
                            {stageInfo.name}
                          </span>
                          {contact.status && (
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(contact.status)}`}>
                              {contact.status}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          {contact.company && (
                            <div className="flex items-center gap-1">
                              <Building2 className="h-4 w-4" />
                              <span>{contact.company}</span>
                            </div>
                          )}
                          {contact.email && (
                            <span>{contact.email}</span>
                          )}
                          {contact.nextTouch && (
                            <span className="text-orange-600">Next: {contact.nextTouch}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={contactStage}
                        onChange={(e) => {
                          const updated = contacts.map(c => 
                            c.id === contact.id 
                              ? { ...c, stage: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1) }
                              : c
                          );
                          setContacts(updated);
                        }}
                        className={`px-3 py-1 rounded-lg text-sm font-medium border-2 ${stageInfo.borderColor} ${stageInfo.color} ${stageInfo.textColor} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      >
                        {stages.map(stage => (
                          <option key={stage.id} value={stage.id}>
                            {stage.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

