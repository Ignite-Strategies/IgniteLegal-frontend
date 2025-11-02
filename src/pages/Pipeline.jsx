import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { User, Building2 } from 'lucide-react';

const stages = [
  { id: 'prospect', name: 'Prospect', color: 'bg-gray-100' },
  { id: 'warm', name: 'Warm', color: 'bg-orange-100' },
  { id: 'engaged', name: 'Engaged', color: 'bg-blue-100' },
  { id: 'client', name: 'Client', color: 'bg-green-100' }
];

export default function Pipeline() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [draggedContact, setDraggedContact] = useState(null);

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

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStage) => {
    e.preventDefault();
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

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Pipeline</h1>
        <p className="text-gray-600">Drag and drop contacts between stages</p>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((stage) => {
          const stageContacts = contactsByStage[stage.id] || [];
          
          return (
            <div
              key={stage.id}
              className="bg-gray-50 rounded-lg p-4 min-h-[500px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.id)}
            >
              <div className={`${stage.color} rounded-lg p-3 mb-4`}>
                <h3 className="font-semibold text-gray-900">{stage.name}</h3>
                <p className="text-sm text-gray-600">{stageContacts.length} contacts</p>
              </div>

              <div className="space-y-3">
                {stageContacts.map((contact) => (
                  <div
                    key={contact.id}
                    draggable
                    onDragStart={() => handleDragStart(contact)}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-move hover:shadow-md transition"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      {contact.photoUrl ? (
                        <img src={contact.photoUrl} alt={contact.name} className="h-8 w-8 rounded-full" />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <Building2 className="h-3 w-3" />
                          <span>{contact.company || '-'}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(contact.status)}`}>
                      {contact.status}
                    </span>
                    {contact.nextTouch && (
                      <p className="text-xs text-orange-600 mt-2">
                        Next: {contact.nextTouch}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

