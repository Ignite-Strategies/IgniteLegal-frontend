import { Link, useNavigate } from 'react-router-dom';
import { Users, Calendar, FileText, MessageSquare, TrendingUp } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Header Summary Component
function HeaderSummary({ targetRevenue, currentRevenue, timeHorizon }) {
  const progressPercent = targetRevenue > 0 ? (currentRevenue / targetRevenue) * 100 : 0;
  const remaining = Math.max(0, targetRevenue - currentRevenue);
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Growth Dashboard</h1>
          <p className="text-gray-600">Your command center for business development</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {progressPercent.toFixed(1)}% to goal
          </div>
          <div className="text-sm text-gray-500">
            ${remaining.toLocaleString()} remaining
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Current: ${currentRevenue.toLocaleString()}</span>
          <span>Target: ${targetRevenue.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-500"
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
    'bg-blue-500': 'hover:border-blue-400 hover:bg-blue-50',
    'bg-orange-500': 'hover:border-orange-400 hover:bg-orange-50',
    'bg-purple-500': 'hover:border-purple-400 hover:bg-purple-50',
  };
  
  return (
    <div 
      className={`bg-white rounded-xl shadow-md border border-gray-200 ${hoverColors[color]} transition-all duration-300 cursor-pointer`}
      onClick={() => navigate(route)}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
            {icon}
          </div>
          <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        </div>
        
        {/* Metrics */}
        <div className="mb-4">
          {metrics.map((metric, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm">{metric.label}</span>
              <span className="font-semibold text-gray-900">{metric.value}</span>
            </div>
          ))}
        </div>
        
        {/* Insight Quote */}
        <div className="text-sm text-gray-600 italic border-t border-gray-100 pt-4">
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

  // Dashboard data
  const dashboardData = {
    targetRevenue: 500000,
    currentRevenue: 185000,
    timeHorizon: 12
  };

  // Calculate Connect metrics
  const newThisWeek = contacts.filter(c => {
    const contactDate = new Date(c.lastTouch || c.createdAt || Date.now());
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return contactDate >= weekAgo;
  }).length;
  const emailsSent = messages.filter(m => m.status === 'sent').length;

  // 3-Card offense model - Attract, Engage, Nurture
  const stackCards = [
    {
      name: "Attract",
      metrics: [
        { label: "Ads Active", value: "3" },
        { label: "SEO Rank", value: "12" },
        { label: "Content Posts", value: "45" }
      ],
      insight: "Strong acquisition channels, ready to scale",
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      color: "bg-blue-500",
      route: "/attract"
    },
    {
      name: "Engage",
      metrics: [
        { label: "Contacts", value: contacts.length.toString() },
        { label: "Events This Month", value: "8" },
        { label: "Meetings Scheduled", value: "4" }
      ],
      insight: "Active relationship building, strong networking",
      icon: <Users className="h-6 w-6 text-white" />,
      color: "bg-orange-500",
      route: "/engage"
    },
    {
      name: "Nurture",
      metrics: [
        { label: "Campaigns Active", value: "3" },
        { label: "Emails Sent", value: emailsSent.toString() },
        { label: "Response Rate", value: "18.5%" }
      ],
      insight: "Effective email marketing, strong engagement",
      icon: <MessageSquare className="h-6 w-6 text-white" />,
      color: "bg-purple-500",
      route: "/outreach"
    }
  ];

  // Quick access to Ecosystem (optional addition)
  const ecosystemCard = {
    name: "Ecosystem",
    metrics: [
      { label: "Partners Mapped", value: "0" },
      { label: "Influence Score", value: "0/10" }
    ],
    insight: "Map your business ecosystem and relationships",
    icon: "🌐",
    color: "bg-blue-500",
    route: "/ecosystem"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to Company Central
      </Link>

      {/* Header Summary */}
      <HeaderSummary 
        targetRevenue={dashboardData.targetRevenue}
        currentRevenue={dashboardData.currentRevenue}
        timeHorizon={dashboardData.timeHorizon}
      />

      {/* Growth Drivers Banner */}
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
          Growth Drivers
        </h2>
        <p className="text-xs text-gray-400">
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
      <section className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => navigate('/contacts/upload')}
            className="p-4 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 hover:border-red-300 transition-colors text-left"
          >
            <div className="text-red-600 font-semibold mb-1">Add Contact</div>
            <div className="text-sm text-gray-600">Create a new relationship entry</div>
          </button>
          <button
            onClick={() => navigate('/outreach/personal-email')}
            className="p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 hover:border-blue-300 transition-colors text-left"
          >
            <div className="text-blue-600 font-semibold mb-1">Send Message</div>
            <div className="text-sm text-gray-600">Compose outreach</div>
          </button>
          <button
            onClick={() => navigate('/outreach')}
            className="p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 hover:border-green-300 transition-colors text-left"
          >
            <div className="text-green-600 font-semibold mb-1">Review Campaigns</div>
            <div className="text-sm text-gray-600">Check performance metrics</div>
          </button>
        </div>
      </section>
    </div>
  );
}
