import { Link, useNavigate } from 'react-router-dom';
import { Users, Target, DollarSign, FileText, Mail, Calendar, Search } from 'lucide-react';

// Header Summary Component
function HeaderSummary({ targetRevenue, currentRevenue, timeHorizon }) {
  const progressPercent = targetRevenue > 0 ? (currentRevenue / targetRevenue) * 100 : 0;
  const remaining = Math.max(0, targetRevenue - currentRevenue);
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Development Dashboard</h1>
          <p className="text-gray-600">Your command center for client growth and revenue expansion</p>
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
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
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
          <div className="text-blue-500 text-sm font-semibold">
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

export default function BdCentral() {
  const navigate = useNavigate();
  
  // Static dashboard data
  const dashboardData = {
    targetRevenue: 500000,
    currentRevenue: 185000,
    timeHorizon: 12
  };

  // Stack cards matching ignitebd-frontend pattern
  const stackCards = [
    {
      name: "Ad Spend & Targeting",
      metrics: [
        { label: "Monthly Spend", value: "$2,400" },
        { label: "ROI", value: "340%" }
      ],
      insight: "Strong ad performance, ready to scale",
      cta: "Open",
      icon: <Target className="h-6 w-6 text-white" />,
      color: "bg-orange-500",
      route: "/business-development/ads"
    },
    {
      name: "SEO & Search Analytics",
      metrics: [
        { label: "Organic Traffic", value: "2.1K" },
        { label: "Top Keywords", value: "45" }
      ],
      insight: "Strong keyword performance, opportunities identified",
      cta: "Open",
      icon: <Search className="h-6 w-6 text-white" />,
      color: "bg-teal-500",
      route: "/business-development/seo"
    },
    {
      name: "Content Hub",
      metrics: [
        { label: "Blog Posts", value: "12" },
        { label: "Social Posts", value: "45" }
      ],
      insight: "Active content creation, strong engagement",
      cta: "Open",
      icon: <FileText className="h-6 w-6 text-white" />,
      color: "bg-indigo-500",
      route: "/business-development/content"
    },
    {
      name: "Persona Development",
      metrics: [
        { label: "Buyer Personas", value: "3" },
        { label: "Engagement Rate", value: "24%" }
      ],
      insight: "Well-defined personas driving engagement",
      cta: "Open",
      icon: <Users className="h-6 w-6 text-white" />,
      color: "bg-green-500",
      route: "/personas"
    },
    {
      name: "Contact Management",
      metrics: [
        { label: "Total Contacts", value: "24" },
        { label: "Active Clients", value: "8" }
      ],
      insight: "Growing contact base, strong client relationships",
      cta: "Open",
      icon: <Users className="h-6 w-6 text-white" />,
      color: "bg-blue-500",
      route: "/crm-hub"
    },
    {
      name: "Email Campaigns",
      metrics: [
        { label: "Open Rate", value: "18.5%" },
        { label: "Active Campaigns", value: "3" }
      ],
      insight: "Strong email engagement, ready to scale",
      cta: "Open",
      icon: <Mail className="h-6 w-6 text-white" />,
      color: "bg-cyan-500",
      route: "/business-development/email-campaigns"
    },
    {
      name: "Event Tracker",
      metrics: [
        { label: "Upcoming Events", value: "4" },
        { label: "Networking Score", value: "9/10" }
      ],
      insight: "Active event schedule, strong networking",
      cta: "Open",
      icon: <Calendar className="h-6 w-6 text-white" />,
      color: "bg-red-500",
      route: "/business-development/events"
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

      {/* Functional Stack Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {stackCards.map((card, index) => (
          <StackCard key={index} {...card} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/crm-hub')}
            className="p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors text-left"
          >
            <div className="text-blue-600 font-semibold">Add New Contact</div>
            <div className="text-sm text-gray-600">Create a new CRM entry</div>
          </button>
          <button
            onClick={() => navigate('/business-development/content')}
            className="p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors text-left"
          >
            <div className="text-green-600 font-semibold">Create Content</div>
            <div className="text-sm text-gray-600">Draft a new blog post or social media content</div>
          </button>
          <button
            onClick={() => navigate('/personas')}
            className="p-4 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors text-left"
          >
            <div className="text-purple-600 font-semibold">Define Persona</div>
            <div className="text-sm text-gray-600">Create a new buyer/client persona</div>
          </button>
        </div>
      </div>

      {/* Contact Sales */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 border border-blue-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Scale Your Growth?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get personalized insights and strategic guidance to accelerate your business development. 
            Our team can help you implement these systems and achieve your growth targets.
          </p>
          <button
            onClick={() => window.open('mailto:joel@businesspointlaw.com?subject=Business Development Inquiry', '_blank')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-bold rounded-xl shadow-xl hover:shadow-blue-500/50 transition-all hover:scale-105"
          >
            Contact Business Development Team →
          </button>
        </div>
      </div>
    </div>
  );
}

