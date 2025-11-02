import { useNavigate } from 'react-router-dom';
import { Search, Image, FileText, TrendingUp } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export default function AttractHub() {
  const navigate = useNavigate();

  const attractTools = [
    {
      id: 'ads',
      title: 'Ads',
      description: 'Google Ads management and campaign tracking',
      icon: <Image className="h-8 w-8 text-blue-600" />,
      route: '/business-development/ads',
      color: 'bg-blue-100 text-blue-600',
      stats: {
        label: 'Active Campaigns',
        value: '3'
      }
    },
    {
      id: 'seo',
      title: 'SEO',
      description: 'Search insights, keyword research, and optimization',
      icon: <Search className="h-8 w-8 text-green-600" />,
      route: '/business-development/seo',
      color: 'bg-green-100 text-green-600',
      stats: {
        label: 'Avg Rank',
        value: '12'
      }
    },
    {
      id: 'content',
      title: 'Content',
      description: 'Blog posts, social media, and content hub',
      icon: <FileText className="h-8 w-8 text-purple-600" />,
      route: '/business-development/content',
      color: 'bg-purple-100 text-purple-600',
      stats: {
        label: 'Total Posts',
        value: '45'
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Attract"
        subtitle="Drive visibility through ads, SEO, and content"
        backTo="/growth-dashboard"
        backLabel="Back to Growth Dashboard"
      />

      {/* Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <h3 className="text-sm font-medium text-blue-900">Total Reach</h3>
          </div>
          <p className="text-3xl font-bold text-blue-900">12.5K</p>
          <p className="text-xs text-blue-700 mt-1">Monthly impressions</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center gap-3 mb-2">
            <Search className="h-6 w-6 text-green-600" />
            <h3 className="text-sm font-medium text-green-900">Search Clicks</h3>
          </div>
          <p className="text-3xl font-bold text-green-900">1,234</p>
          <p className="text-xs text-green-700 mt-1">Last 30 days</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-6 w-6 text-purple-600" />
            <h3 className="text-sm font-medium text-purple-900">Content Engagement</h3>
          </div>
          <p className="text-3xl font-bold text-purple-900">8.2%</p>
          <p className="text-xs text-purple-700 mt-1">Average engagement rate</p>
        </div>
      </div>

      {/* Attract Tools Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Attraction Channels</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {attractTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => navigate(tool.route)}
              className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-16 h-16 rounded-lg ${tool.color} flex items-center justify-center`}>
                    {tool.icon}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{tool.stats.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{tool.stats.value}</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                <button className="w-full px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors">
                  Open →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => navigate('/business-development/ads')}
            className="p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors text-left"
          >
            <div className="text-blue-600 font-semibold mb-1">Create Ad Campaign</div>
            <div className="text-sm text-gray-600">Launch new Google Ads campaign</div>
          </button>
          <button
            onClick={() => navigate('/business-development/seo')}
            className="p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors text-left"
          >
            <div className="text-green-600 font-semibold mb-1">Research Keywords</div>
            <div className="text-sm text-gray-600">Find new SEO opportunities</div>
          </button>
          <button
            onClick={() => navigate('/business-development/content')}
            className="p-4 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors text-left"
          >
            <div className="text-purple-600 font-semibold mb-1">Create Content</div>
            <div className="text-sm text-gray-600">Write blog post or social media</div>
          </button>
        </div>
      </div>
    </div>
  );
}

