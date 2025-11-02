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
function StackCard({ name, metrics, insight, cta, icon, color, route }) {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
         onClick={() => navigate(route)}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
              {icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900">{name}</h3>
          </div>
          <div className="text-red-500 text-sm font-semibold">
            {cta} →
          </div>
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
        
        {/* Insight */}
        <div className="text-sm text-gray-600 italic">
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

  // 3-Card offense model
  const stackCards = [
    {
      name: "Connect",
      metrics: [
        { label: "Contacts", value: contacts.length.toString() },
        { label: "New This Week", value: newThisWeek.toString() },
        { label: "Emails Sent", value: emailsSent.toString() }
      ],
      insight: "Strong relationship building, ready to scale",
      cta: "Open",
      icon: <Users className="h-6 w-6 text-white" />,
      color: "bg-red-500",
      route: "/relationship"
    },
    {
      name: "Events",
      metrics: [
        { label: "Upcoming Events", value: "4" },
        { label: "This Month", value: "8" },
        { label: "Networking Score", value: "9/10" }
      ],
      insight: "Active event schedule, strong networking",
      cta: "Open",
      icon: <Calendar className="h-6 w-6 text-white" />,
      color: "bg-orange-500",
      route: "/business-development/events"
    },
    {
      name: "Content",
      metrics: [
        { label: "Blog Posts", value: "12" },
        { label: "Social Posts", value: "45" },
        { label: "Content Score", value: "B+" }
      ],
      insight: "Active content creation, strong engagement",
      cta: "Open",
      icon: <FileText className="h-6 w-6 text-white" />,
      color: "bg-purple-500",
      route: "/business-development/content"
    }
  ];

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

      {/* 3-Card Offense Model */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stackCards.map((card, index) => (
          <StackCard key={index} {...card} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/contacts')}
            className="p-4 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors text-left"
          >
            <div className="text-red-600 font-semibold">Add Contact</div>
            <div className="text-sm text-gray-600">Create a new relationship entry</div>
          </button>
          <button
            onClick={() => navigate('/messages')}
            className="p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors text-left"
          >
            <div className="text-blue-600 font-semibold">Send Message</div>
            <div className="text-sm text-gray-600">Compose outreach</div>
          </button>
          <button
            onClick={() => navigate('/business-development/email-campaigns')}
            className="p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors text-left"
          >
            <div className="text-green-600 font-semibold">Review Campaigns</div>
            <div className="text-sm text-gray-600">Check performance metrics</div>
          </button>
        </div>
      </div>
    </div>
  );
}
