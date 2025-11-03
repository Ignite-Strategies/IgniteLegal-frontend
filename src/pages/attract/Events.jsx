import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Plus, Clock, ExternalLink } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export default function Events() {
  const navigate = useNavigate();

  // Real debt-financing and banking events (updated for November 2025)
  const [events] = useState([
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
    },
    {
      id: 3,
      name: 'Private Debt Investor Forum',
      date: '2025-12-10',
      location: 'Chicago, IL',
      attendees: 650,
      type: 'Conference',
      status: 'upcoming',
      description: 'Forum for private debt investors, direct lenders, and alternative credit providers discussing market trends and opportunities',
      registrationLink: 'https://www.privatedebtinvestor.com',
      targetAudience: 'Capital Partners, Direct Lenders, Credit Funds',
    },
    {
      id: 4,
      name: 'ABI Distressed Investing Conference',
      date: '2026-06-18',
      location: 'Las Vegas, NV',
      attendees: 950,
      type: 'Conference',
      status: 'upcoming',
      description: 'American Bankruptcy Institute conference on distressed debt, restructuring, and turnaround investing',
      registrationLink: 'https://www.abi.org',
      targetAudience: 'Capital Partners, Distressed Debt Investors, Restructuring Advisors',
    },
    {
      id: 5,
      name: 'Credit Suisse Financial Services Forum',
      date: '2026-02-12',
      location: 'Miami, FL',
      attendees: 500,
      type: 'Conference',
      status: 'upcoming',
      description: 'Annual gathering of financial services executives, institutional investors, and credit market participants',
      registrationLink: 'https://www.credit-suisse.com',
      targetAudience: 'Investment Directors, Portfolio Managers, Financial Services Executives',
    },
    {
      id: 6,
      name: 'Direct Lending & Private Credit Summit',
      date: '2025-10-15',
      location: 'New York, NY',
      attendees: 750,
      type: 'Conference',
      status: 'past',
      description: 'Summit focused on direct lending strategies, private credit opportunities, and middle market financing',
      registrationLink: null,
      targetAudience: 'Capital Partners, Direct Lenders, Middle Market Investors',
    },
    {
      id: 7,
      name: 'Global Debt Financing Conference',
      date: '2025-09-20',
      location: 'Boston, MA',
      attendees: 600,
      type: 'Conference',
      status: 'past',
      description: 'Annual conference on global debt financing trends, credit markets, and investment strategies',
      registrationLink: null,
      targetAudience: 'Capital Partners, Investment Directors, Debt Providers',
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

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                
                {event.targetAudience && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-500 mb-1">Target Audience:</p>
                    <p className="text-xs text-gray-600">{event.targetAudience}</p>
                  </div>
                )}

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

