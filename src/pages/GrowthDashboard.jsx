import { useNavigate } from 'react-router-dom';
import { Users, Calendar, FileText, MessageSquare, TrendingUp, Map } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { dashboardConfig } from '../config/dashboardConfig';

// Helper function to get upcoming events count
function getUpcomingEventsCount() {
  // TODO: Replace with actual events data from localStorage or API
  // For now, using the hardcoded events from Events.jsx
  const mockEvents = [
    { id: 1, date: '2026-03-15', status: 'upcoming' },
    { id: 2, date: '2026-04-22', status: 'upcoming' },
    { id: 3, date: '2025-12-10', status: 'upcoming' },
    { id: 4, date: '2026-06-18', status: 'upcoming' },
    { id: 5, date: '2026-02-12', status: 'upcoming' },
  ];
  const now = new Date();
  return mockEvents.filter(e => {
    const eventDate = new Date(e.date);
    return e.status === 'upcoming' && eventDate >= now;
  }).length;
}

// Helper function to calculate events this month
function getEventsThisMonth() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
  // TODO: Replace with actual events data
  const mockEvents = [
    { id: 1, date: '2026-03-15' },
    { id: 2, date: '2026-04-22' },
    { id: 3, date: '2025-12-10' },
  ];
  
  return mockEvents.filter(e => {
    const eventDate = new Date(e.date);
    return eventDate >= startOfMonth && eventDate <= endOfMonth;
  }).length;
}

// Helper function to calculate meetings scheduled
function getMeetingsScheduled(contacts) {
  // Count contacts with upcoming meetings or scheduled events
  // This is a simplified calculation - can be enhanced with actual meeting data
  return contacts.filter(c => {
    if (c.nextMeeting) {
      const meetingDate = new Date(c.nextMeeting);
      return meetingDate >= new Date();
    }
    return false;
  }).length;
}

// Helper function to calculate response rate
function calculateResponseRate(messages) {
  if (!messages || messages.length === 0) return 0;
  const sentMessages = messages.filter(m => m.status === 'sent');
  const repliedMessages = messages.filter(m => m.replied === true);
  if (sentMessages.length === 0) return 0;
  return ((repliedMessages.length / sentMessages.length) * 100).toFixed(1);
}

// Header Summary Component
function HeaderSummary({ targetRevenue, currentRevenue, timeHorizon, onRoadmapClick }) {
  const progressPercent = targetRevenue > 0 ? (currentRevenue / targetRevenue) * 100 : 0;
  const remaining = Math.max(0, targetRevenue - currentRevenue);
  const progressColor = progressPercent >= 75 ? 'from-green-500 to-green-600' : 
                         progressPercent >= 50 ? 'from-yellow-500 to-yellow-600' :
                         'from-red-500 to-red-600';
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Growth Dashboard</h1>
          <p className="text-gray-600">Your command center for business development</p>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {progressPercent.toFixed(1)}% to goal
            </div>
            <div className="text-sm text-gray-500">
              ${remaining.toLocaleString()} remaining
            </div>
          </div>
          {onRoadmapClick && (
            <button
              onClick={onRoadmapClick}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 shadow-md whitespace-nowrap"
            >
              <Map className="h-4 w-4" />
              BD Roadmap
            </button>
          )}
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Current: ${currentRevenue.toLocaleString()}</span>
          <span>Target: ${targetRevenue.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className={`bg-gradient-to-r ${progressColor} h-3 rounded-full transition-all duration-500`}
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          ></div>
        </div>
      </div>
      
      <div className="text-sm text-gray-500">
        Target: ${targetRevenue.toLocaleString()} in {timeHorizon} months
      </div>
    </div>
  );
}

// Stack Card Component
function StackCard({ name, metrics, insight, icon, color, route }) {
  const navigate = useNavigate();
  
  // Get hover color based on base color
  const hoverColors = {
    'bg-blue-500': 'hover:border-blue-400 hover:bg-blue-50 hover:shadow-lg',
    'bg-orange-500': 'hover:border-orange-400 hover:bg-orange-50 hover:shadow-lg',
    'bg-purple-500': 'hover:border-purple-400 hover:bg-purple-50 hover:shadow-lg',
  };
  
  return (
    <div 
      className={`bg-white rounded-xl shadow-md border-2 border-gray-200 ${hoverColors[color]} transition-all duration-300 cursor-pointer group`}
      onClick={() => navigate(route)}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        </div>
        
        {/* Metrics */}
        <div className="mb-5 space-y-2.5">
          {metrics.map((metric, index) => (
            <div key={index} className="flex justify-between items-center py-1">
              <span className="text-gray-600 text-sm font-medium">{metric.label}</span>
              <span className="font-bold text-gray-900 text-base">{metric.value}</span>
            </div>
          ))}
        </div>
        
        {/* Insight Quote */}
        <div className="text-sm text-gray-600 italic border-t border-gray-200 pt-4 bg-gray-50 -mx-6 px-6 pb-6 rounded-b-xl">
          "{insight}"
        </div>
      </div>
    </div>
  );
}

export default function GrowthDashboard() {
  const navigate = useNavigate();
  const [contacts] = useLocalStorage('contacts', []);
  const [messages] = useLocalStorage('messages', []);
  const [campaigns] = useLocalStorage('campaigns', []);

  // Dashboard data from config
  const dashboardData = {
    targetRevenue: dashboardConfig.revenue.target,
    currentRevenue: dashboardConfig.revenue.target * 0.37, // TODO: Calculate from actual revenue data
    timeHorizon: dashboardConfig.revenue.timeHorizon
  };

  // Calculate metrics dynamically
  const upcomingEvents = getUpcomingEventsCount();
  const eventsThisMonth = getEventsThisMonth();
  const meetingsScheduled = getMeetingsScheduled(contacts);
  const emailsSent = messages.filter(m => m.status === 'sent').length;
  const activeCampaigns = campaigns.filter(c => c.status === 'active' || c.status === 'sent').length;
  const responseRate = calculateResponseRate(messages);
  
  // Calculate contacts added this week
  const newThisWeek = contacts.filter(c => {
    const contactDate = new Date(c.lastTouch || c.createdAt || Date.now());
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return contactDate >= weekAgo;
  }).length;

  // Generate insights based on actual data
  const getAttractInsight = () => {
    if (upcomingEvents >= 5) return "Strong acquisition channels with events, ready to scale";
    if (upcomingEvents > 0) return "Events pipeline active, consider expanding";
    return "Start planning events to attract new prospects";
  };

  const getEngageInsight = () => {
    if (contacts.length > 50) return "Active relationship building, strong networking";
    if (contacts.length > 20) return "Building momentum with key relationships";
    return "Focus on connecting with target personas";
  };

  const getNurtureInsight = () => {
    const rate = parseFloat(responseRate);
    if (rate >= 15) return "Strong campaign response rates, warm leads engaging";
    if (rate >= 10) return "Good response rates on outreach campaigns";
    if (activeCampaigns > 0 || emailsSent > 0) return "Track campaign and newsletter performance";
    return "Start with outreach campaigns and newsletters to nurture relationships";
  };

  // 3-Card offense model - Attract, Engage, Nurture
  const stackCards = [
    {
      name: "Attract",
      metrics: [
        { label: "Upcoming Events", value: (upcomingEvents || dashboardConfig.defaults.attract.upcomingEvents).toString() },
        { label: "Ads & SEO Active", value: dashboardConfig.defaults.attract.activeAdsSeo.toString() },
        { label: "Content Posts", value: dashboardConfig.defaults.attract.contentPosts.toString() }
      ],
      insight: getAttractInsight(),
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      color: "bg-blue-500",
      route: "/attract"
    },
    {
      name: "Engage",
      metrics: [
        { label: "Contacts", value: contacts.length.toString() },
        { label: "Events This Month", value: (eventsThisMonth || dashboardConfig.defaults.engage.eventsThisMonth).toString() },
        { label: "Meetings Scheduled", value: (meetingsScheduled || dashboardConfig.defaults.engage.meetingsScheduled).toString() }
      ],
      insight: getEngageInsight(),
      icon: <Users className="h-6 w-6 text-white" />,
      color: "bg-orange-500",
      route: "/engage"
    },
    {
      name: "Nurture",
      metrics: [
        { label: "Campaigns Active", value: (activeCampaigns || dashboardConfig.defaults.nurture.campaignsActive).toString() },
        { label: "Newsletters Sent", value: dashboardConfig.defaults.nurture.newslettersSent.toString() },
        { label: "Response Rate", value: parseFloat(responseRate) > 0 ? `${responseRate}%` : dashboardConfig.defaults.nurture.responseRate + '%' }
      ],
      insight: getNurtureInsight(),
      icon: <MessageSquare className="h-6 w-6 text-white" />,
      color: "bg-purple-500",
      route: "/outreach" // Campaigns (outreach emails) managed here
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Summary */}
      <HeaderSummary 
        targetRevenue={dashboardData.targetRevenue}
        currentRevenue={dashboardData.currentRevenue}
        timeHorizon={dashboardData.timeHorizon}
        onRoadmapClick={() => navigate('/bd-pipeline-roadmap')}
      />

      {/* Growth Drivers Banner */}
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Growth Drivers
        </h2>
        <p className="text-xs text-gray-400 text-center max-w-2xl">
          Attract (Ads, SEO, Content) • Engage (Connect, Events) • Nurture (Email Marketing)
        </p>
      </div>

      {/* 3-Card Offense Model */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {stackCards.map((card, index) => (
          <StackCard key={index} {...card} />
        ))}
      </div>

      {/* Quick Actions */}
      <section className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/contacts/upload')}
            className="p-5 bg-red-50 border-2 border-red-200 rounded-xl hover:bg-red-100 hover:border-red-300 transition-all text-left shadow-sm hover:shadow-md"
          >
            <div className="text-red-600 font-semibold mb-1 text-base">Add Contact</div>
            <div className="text-sm text-gray-600">Create a new relationship entry</div>
          </button>
          <button
            onClick={() => navigate('/outreach/personal-email')}
            className="p-5 bg-blue-50 border-2 border-blue-200 rounded-xl hover:bg-blue-100 hover:border-blue-300 transition-all text-left shadow-sm hover:shadow-md"
          >
            <div className="text-blue-600 font-semibold mb-1 text-base">Send Message</div>
            <div className="text-sm text-gray-600">Compose outreach</div>
          </button>
          <button
            onClick={() => navigate('/outreach')}
            className="p-5 bg-green-50 border-2 border-green-200 rounded-xl hover:bg-green-100 hover:border-green-300 transition-all text-left shadow-sm hover:shadow-md"
          >
            <div className="text-green-600 font-semibold mb-1 text-base">Review Campaigns</div>
            <div className="text-sm text-gray-600">Check performance metrics</div>
          </button>
        </div>
      </section>
    </div>
  );
}
