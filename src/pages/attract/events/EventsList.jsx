import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Plus, Clock, ExternalLink, Search, UserCircle, Building2 } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

export default function EventsList() {
  const navigate = useNavigate();
  const [events] = useLocalStorage('events', []);

  // Mock events data (in real app, load from API or localStorage)
  const mockEvents = [
    {
      id: 1,
      name: 'LSTA Annual Conference',
      date: '2026-03-15',
      location: 'New York, NY',
      attendees: 1200,
      type: 'Conference',
      status: 'upcoming',
      description: 'Loan Syndications and Trading Association annual conference focusing on leveraged loans, debt financing, and credit markets',
      registrationLink: 'https://www.lsta.org',
      targetAudience: 'Capital Partners, Investment Directors, Debt Providers',
      targetPersonas: ['Capital Partner', 'Investment Director'],
      ecosystemTypes: ['Partner', 'Collaborator'],
    },
    {
      id: 2,
      name: 'ACLI Annual Conference',
      date: '2026-04-22',
      location: 'Washington, DC',
      attendees: 800,
      type: 'Conference',
      status: 'upcoming',
      description: 'American Council of Life Insurers annual meeting featuring sessions on institutional investing, debt instruments, and portfolio management',
      registrationLink: 'https://www.acli.com',
      targetAudience: 'Portfolio Managers, Investment Directors, Insurance Executives',
      targetPersonas: ['Portfolio Manager', 'Investment Director'],
      ecosystemTypes: ['Partner'],
    },
    // Add more events...
  ];

  const allEvents = events.length > 0 ? events : mockEvents;
  const [searchTerm, setSearchTerm] = useState('');

  // Filter events
  const filteredEvents = allEvents.filter(event => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      event.name?.toLowerCase().includes(search) ||
      event.location?.toLowerCase().includes(search) ||
      event.targetAudience?.toLowerCase().includes(search)
    );
  });

  // Sort events by date - upcoming first (chronological), then past (reverse chronological)
  const upcomingEvents = filteredEvents
    .filter(e => {
      const eventDate = new Date(e.date);
      return eventDate >= new Date();
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  
  const pastEvents = filteredEvents
    .filter(e => {
      const eventDate = new Date(e.date);
      return eventDate < new Date();
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

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
            onClick={() => navigate('/attract/events/create')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Event
          </button>
        }
      />

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search events by name, location, or audience..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

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
            {upcomingEvents.reduce((sum, e) => sum + (e.attendees || 0), 0).toLocaleString()}
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
            <div 
              key={event.id} 
              onClick={() => navigate(`/attract/events/${event.id}`)}
              className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all cursor-pointer"
            >
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
                    <span className="text-sm">{event.attendees?.toLocaleString() || 0} attendees</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                
                {/* Persona & Ecosystem Links */}
                {(event.targetPersonas?.length > 0 || event.ecosystemTypes?.length > 0) && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {event.targetPersonas?.map((persona, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/personas', { state: { filter: persona } });
                        }}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-100 transition"
                      >
                        <UserCircle className="h-3 w-3" />
                        {persona}
                      </button>
                    ))}
                    {event.ecosystemTypes?.map((type, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/ecosystem', { state: { filter: type } });
                        }}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium hover:bg-orange-100 transition"
                      >
                        <Building2 className="h-3 w-3" />
                        {type}
                      </button>
                    ))}
                  </div>
                )}
                
                {event.registrationLink && (
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
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
              <div 
                key={event.id}
                onClick={() => navigate(`/attract/events/${event.id}`)}
                className="bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition cursor-pointer"
              >
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
                      <span className="text-sm">{event.attendees?.toLocaleString() || 0} attendees</span>
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

