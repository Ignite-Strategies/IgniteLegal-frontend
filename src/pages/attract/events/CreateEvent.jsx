import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Save, X, UserCircle, Building2 } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

export default function CreateEvent() {
  const navigate = useNavigate();
  const [events, setEvents] = useLocalStorage('events', []);
  
  // Mock personas and ecosystem types (in real app, fetch from their respective hooks/stores)
  const availablePersonas = ['Capital Partner', 'Portfolio Manager', 'Investment Director', 'Tech Partner'];
  const ecosystemTypes = ['Partner', 'Collaborator', 'Vendor', 'Client'];

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    attendees: '',
    type: 'Conference',
    description: '',
    registrationLink: '',
    targetAudience: '',
    targetPersonas: [],
    ecosystemTypes: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newEvent = {
      id: Date.now(),
      ...formData,
      attendees: parseInt(formData.attendees) || 0,
      status: new Date(formData.date) >= new Date() ? 'upcoming' : 'past',
      createdAt: new Date().toISOString(),
    };

    setEvents([...events, newEvent]);
    navigate(`/attract/events/${newEvent.id}`);
  };

  const togglePersona = (persona) => {
    setFormData(prev => ({
      ...prev,
      targetPersonas: prev.targetPersonas.includes(persona)
        ? prev.targetPersonas.filter(p => p !== persona)
        : [...prev.targetPersonas, persona]
    }));
  };

  const toggleEcosystemType = (type) => {
    setFormData(prev => ({
      ...prev,
      ecosystemTypes: prev.ecosystemTypes.includes(type)
        ? prev.ecosystemTypes.filter(t => t !== type)
        : [...prev.ecosystemTypes, type]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Create Event"
        subtitle="Add a new event, conference, or networking opportunity"
        backTo="/attract/events"
        backLabel="← Back to Events"
      />

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
        <div className="space-y-6">
          {/* Basic Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., LSTA Annual Conference"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., New York, NY"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Attendees
              </label>
              <input
                type="number"
                value={formData.attendees}
                onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="Conference">Conference</option>
                <option value="Webinar">Webinar</option>
                <option value="Networking">Networking Event</option>
                <option value="Workshop">Workshop</option>
                <option value="Summit">Summit</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Describe the event, its purpose, and key topics..."
            />
          </div>

          {/* Registration Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Registration Link
            </label>
            <input
              type="url"
              value={formData.registrationLink}
              onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://..."
            />
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Audience
            </label>
            <input
              type="text"
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Capital Partners, Investment Directors"
            />
          </div>

          {/* Target Personas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Personas
            </label>
            <div className="flex flex-wrap gap-2">
              {availablePersonas.map((persona) => (
                <button
                  key={persona}
                  type="button"
                  onClick={() => togglePersona(persona)}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                    formData.targetPersonas.includes(persona)
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                      : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  <UserCircle className="h-4 w-4" />
                  {persona}
                  {formData.targetPersonas.includes(persona) && (
                    <X className="h-3 w-3" />
                  )}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Link this event to personas for better targeting
            </p>
          </div>

          {/* Ecosystem Types */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ecosystem Types
            </label>
            <div className="flex flex-wrap gap-2">
              {ecosystemTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleEcosystemType(type)}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                    formData.ecosystemTypes.includes(type)
                      ? 'bg-orange-100 text-orange-700 border-2 border-orange-300'
                      : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  <Building2 className="h-4 w-4" />
                  {type}
                  {formData.ecosystemTypes.includes(type) && (
                    <X className="h-3 w-3" />
                  )}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Link this event to ecosystem types for relationship mapping
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate('/attract/events')}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
          >
            <Save className="h-4 w-4" />
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
}

