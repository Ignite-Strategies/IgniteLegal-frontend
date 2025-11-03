import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Calendar, 
  FileText, 
  DollarSign, 
  Map,
  Settings,
  Search,
  BarChart3,
  Building2,
  Mail,
  Target,
  Zap
} from 'lucide-react';

const navigationGroups = [
  {
    name: 'Overview',
    items: [
      { name: 'Company Central', path: '/', icon: Home },
      { name: 'Growth Dashboard', path: '/growth-dashboard', icon: TrendingUp },
      { name: 'BD Roadmap', path: '/bd-pipeline-roadmap', icon: Map },
    ]
  },
  {
    name: 'Attract',
    items: [
      { name: 'Attract Hub', path: '/attract', icon: Zap },
      { name: 'Events', path: '/attract/events', icon: Calendar },
      { name: 'Ads & SEO', path: '/attract/ads-seo', icon: Search },
      { name: 'Content', path: '/attract/content', icon: FileText },
    ]
  },
  {
    name: 'Engage',
    items: [
      { name: 'Engage', path: '/engage', icon: Users },
      { name: 'Engagement Insights', path: '/engage/insights', icon: BarChart3 },
      { name: 'Meetings', path: '/meetings', icon: Calendar },
      { name: 'Meeting Analytics', path: '/meetings/analytics', icon: Target },
      { name: 'Ecosystem', path: '/ecosystem', icon: Building2 },
    ]
  },
  {
    name: 'Nurture',
    items: [
      { name: 'Outreach Campaigns', path: '/outreach', icon: MessageSquare }, // Personalized outreach emails
      { name: 'Newsletters', path: '/outreach/newsletters', icon: Mail }, // HTML newsletters (separate from campaigns)
      { name: 'Social Media', path: '/attract/content', icon: FileText },
      { name: 'Campaign Analytics', path: '/outreach/analytics', icon: BarChart3 },
    ]
  },
  {
    name: 'Contacts',
    items: [
      { name: 'Contacts Hub', path: '/contacts', icon: Users },
      { name: 'Contact Lists', path: '/contact-list-manager', icon: FileText },
      { name: 'Companies', path: '/companies', icon: Building2 },
      { name: 'Pipeline', path: '/pipeline', icon: Target },
      { name: 'Deal Pipelines', path: '/deal-pipelines', icon: Target },
    ]
  },
  {
    name: 'Financial',
    items: [
      { name: 'Financial Hub', path: '/financial-hub', icon: DollarSign },
      { name: 'Billing', path: '/financial/billing', icon: FileText },
      { name: 'Forecasting', path: '/financial/forecasting', icon: TrendingUp },
      { name: 'Spends', path: '/financial/spends', icon: DollarSign },
    ]
  },
  {
    name: 'NDA Management',
    items: [
      { name: 'NDA Hub', path: '/nda-hub', icon: FileText },
      { name: 'NDA Dashboard', path: '/nda-dashboard', icon: BarChart3 },
      { name: 'NDA Analytics', path: '/nda-analytics', icon: BarChart3 },
      { name: 'Ingest', path: '/nda/ingest', icon: FileText },
      { name: 'Review Work', path: '/nda/review', icon: Target },
    ]
  },
  {
    name: 'Analytics',
    items: [
      { name: 'Analytics Hub', path: '/bd-central', icon: BarChart3 },
      { name: 'Growth Insights', path: '/bd-insights', icon: TrendingUp },
    ]
  },
  {
    name: 'Settings',
    items: [
      { name: 'Settings', path: '/settings', icon: Settings },
    ]
  },
];

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/BPL_2025.png" 
            alt="BusinessPointLaw" 
            className="h-10 w-auto"
          />
          <span className="text-lg font-semibold text-gray-900 hidden sm:block">
            BusinessPointLaw
          </span>
        </Link>
      </div>

      <nav className="p-4 space-y-6">
        {navigationGroups.map((group) => (
          <div key={group.name}>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {group.name}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        active
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;

