import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Plus, Clock, ExternalLink } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export default function Events() {
  const navigate = useNavigate();

  // Mock events data
  const [events] = useState([
    {
      id: 1,
      name: 'Legal Tech Summit 2025',
      date: '2025-03-15',
      location: 'San Francisco, CA',
      attendees: 450,
      type: 'Conference',
      status: 'upcoming',
      description: 'Annual legal technology conference featuring networking opportunities and industry insights',
      registrationLink: 'https://legaltechsummit.com',
    },
    {
      id: 2,
      name: 'NDA Automation Workshop',
      date: '2025-02-20',
      location: 'Virtual',
      attendees: 120,
      type: 'Webinar',
      status: 'upcoming',
      description: 'Learn how to streamline NDA processes with automation',
      registrationLink: 'https://workshop.example.com',
    },
    {
      id: 3,
      name: 'Business Development Networking Mixer',
      date: '2025-01-25',
      location: 'New York, NY',
      attendees: 85,
      type: 'Networking',
      status: 'upcoming',
      description: 'Connect with business development professionals and potential clients',
      registrationLink: 'https://networking.example.com',
    },
    {
      id: 4,
      name: 'Legal Innovation Forum',
      date: '2024-12-10',
      location: 'Chicago, IL',
      attendees: 320,
      type: 'Conference',
      status: 'past',
      description: 'Annual forum on legal industry innovation and technology',
      registrationLink: null,
    },
  ]);

  const upcomingEvents = events.filter(e => e.status === 'upcoming');
  const pastEvents = events.filter(e => e.status === 'past');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Events"
        subtitle="Manage events, conferences, and networking opportunities"
        backTo="/attract"
        backLabel="← Back to Attract"
        actions={
          <button
            onClick={() => {/* TODO: Navigate to create event */}}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Event
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-6 w-6 text-blue-600" />
            <h3 className="text-sm font-medium text-gray-600">Upcoming Events</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{upcomingEvents.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-6 w-6 text-green-600" />
            <h3 className="text-sm font-medium text-gray-600">Total Attendees</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {upcomingEvents.reduce((sum, e) => sum + e.attendees, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-6 w-6 text-purple-600" />
            <h3 className="text-sm font-medium text-gray-600">Past Events</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{pastEvents.length}</p>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold mb-2">
                      {event.type}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{event.attendees.toLocaleString()} attendees</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                {event.registrationLink && (
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                  >
                    Register <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <div key={event.id} className="bg-gray-50 rounded-xl border border-gray-200 opacity-75">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-semibold mb-2">
                        {event.type}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{event.attendees.toLocaleString()} attendees</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

