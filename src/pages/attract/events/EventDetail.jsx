import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, MapPin, Users, Edit, ExternalLink, UserCircle, Building2, ArrowLeft } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

export default function EventDetail() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [events] = useLocalStorage('events', []);
  
  // Mock events for demo (in real app, load from API)
  const mockEvents = [
    {
      id: 1,
      name: 'LSTA Annual Conference',
      date: '2026-03-15',
      location: 'New York, NY',
      attendees: 1200,
      type: 'Conference',
      status: 'upcoming',
      description: 'Loan Syndications and Trading Association annual conference focusing on leveraged loans, debt financing, and credit markets. This event brings together leading capital partners, investment directors, and debt providers to discuss market trends, deal structuring, and portfolio management strategies.',
      registrationLink: 'https://www.lsta.org',
      targetAudience: 'Capital Partners, Investment Directors, Debt Providers',
      targetPersonas: ['Capital Partner', 'Investment Director'],
      ecosystemTypes: ['Partner', 'Collaborator'],
    },
  ];

  const allEvents = events.length > 0 ? events : mockEvents;
  const event = allEvents.find(e => e.id === parseInt(eventId));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          title="Event Not Found"
          subtitle="The event you're looking for doesn't exist"
          backTo="/attract/events"
          backLabel="← Back to Events"
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title={event.name}
        subtitle={formatDate(event.date)}
        backTo="/attract/events"
        backLabel="← Back to Events"
        actions={
          <button
            onClick={() => navigate(`/attract/events/${eventId}/edit`)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit Event
          </button>
        }
      />

      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Event Header */}
        <div className="mb-6">
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
            {event.type}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.name}</h1>
        </div>

        {/* Event Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-semibold text-gray-900">{formatDate(event.date)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <MapPin className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold text-gray-900">{event.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Expected Attendees</p>
              <p className="font-semibold text-gray-900">{event.attendees?.toLocaleString() || 'N/A'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-semibold text-gray-900 capitalize">{event.status || 'upcoming'}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        {event.description && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">About This Event</h2>
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>
        )}

        {/* Target Audience */}
        {event.targetAudience && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Target Audience</h2>
            <p className="text-gray-700">{event.targetAudience}</p>
          </div>
        )}

        {/* Persona Links */}
        {event.targetPersonas && event.targetPersonas.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Target Personas</h2>
            <div className="flex flex-wrap gap-3">
              {event.targetPersonas.map((persona, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate('/personas', { state: { filter: persona } })}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition font-medium"
                >
                  <UserCircle className="h-5 w-5" />
                  {persona}
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Click on a persona to view related contacts and campaigns
            </p>
          </div>
        )}

        {/* Ecosystem Type Links */}
        {event.ecosystemTypes && event.ecosystemTypes.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Ecosystem Types</h2>
            <div className="flex flex-wrap gap-3">
              {event.ecosystemTypes.map((type, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate('/ecosystem', { state: { filter: type } })}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition font-medium"
                >
                  <Building2 className="h-5 w-5" />
                  {type}
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Click on an ecosystem type to view related relationships
            </p>
          </div>
        )}

        {/* Registration */}
        {event.registrationLink && (
          <div className="pt-6 border-t border-gray-200">
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              Register for Event <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

