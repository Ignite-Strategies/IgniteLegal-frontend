import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, BarChart3, Target } from 'lucide-react';

export default function Seo() {
  const [selectedTab, setSelectedTab] = useState('keywords');

  // Top performing keywords
  const topKeywords = [
    { keyword: "business lawyer", searches: 8900, competition: 'Medium', position: 3, ctr: 12.5 },
    { keyword: "nda drafting services", searches: 3200, competition: 'Low', position: 1, ctr: 28.3 },
    { keyword: "contract review attorney", searches: 2400, competition: 'Medium', position: 5, ctr: 8.2 },
    { keyword: "corporate legal services", searches: 1800, competition: 'High', position: 8, ctr: 4.5 },
    { keyword: "startup legal counsel", searches: 1200, competition: 'Low', position: 2, ctr: 22.1 },
  ];

  // Search trends
  const searchTrends = [
    { term: "legal automation tools", trend: '+45%', period: 'Last 30 days', category: 'Growing' },
    { term: "business contract templates", trend: '+32%', period: 'Last 30 days', category: 'Growing' },
    { term: "nda best practices", trend: '+18%', period: 'Last 30 days', category: 'Growing' },
    { term: "legal tech stack", trend: '+12%', period: 'Last 30 days', category: 'Growing' },
    { term: "startup legal compliance", trend: '-5%', period: 'Last 30 days', category: 'Declining' },
  ];

  // Competitor analysis
  const competitors = [
    { name: 'LegalTech Solutions', domainAuthority: 68, backlinks: 12400, keywords: 890 },
    { name: 'BusinessLaw Pro', domainAuthority: 62, backlinks: 9800, keywords: 650 },
    { name: 'Corporate Counsel Hub', domainAuthority: 59, backlinks: 7600, keywords: 520 },
  ];

  // Content gaps (keywords competitors rank for, but we don't)
  const contentGaps = [
    { keyword: "legal document automation", opportunity: 'High', searchVolume: 2400 },
    { keyword: "contract management software", opportunity: 'High', searchVolume: 3200 },
    { keyword: "legal workflow optimization", opportunity: 'Medium', searchVolume: 890 },
    { keyword: "compliance automation tools", opportunity: 'Medium', searchVolume: 1200 },
  ];

  const tabs = [
    { id: 'keywords', label: 'Keywords', icon: <Search className="h-4 w-4" /> },
    { id: 'trends', label: 'Search Trends', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'competitors', label: 'Competitors', icon: <Target className="h-4 w-4" /> },
    { id: 'opportunities', label: 'Opportunities', icon: <BarChart3 className="h-4 w-4" /> },
  ];

  const renderKeywords = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Keyword Performance</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add Keyword
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keyword</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Searches/Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Competition</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CTR</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topKeywords.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.keyword}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.searches.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.competition === 'Low' ? 'bg-green-100 text-green-800' :
                      item.competition === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.competition}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{item.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{item.ctr}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Keyword Insights */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <Search className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-800">
              <span className="font-medium">Insight:</span> You're ranking in the top 3 for low-competition keywords like "nda drafting services" and "startup legal counsel". Consider creating more content around these high-performing terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTrends = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">What People Are Searching For</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          View Full Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {searchTrends.map((trend, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{trend.term}</h4>
                <p className="text-sm text-gray-500">{trend.period}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                trend.category === 'Growing' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {trend.trend}
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="h-4 w-4" />
                <span>Trending in your industry</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trend Insights */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Search Volume Trends</h4>
        <div className="flex items-end gap-2 h-32 bg-gray-50 rounded p-4">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-blue-500 rounded-t mb-2"
                style={{ height: `${40 + Math.random() * 60}%` }}
              />
              <p className="text-xs text-gray-600">{month}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCompetitors = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Competitor Analysis</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add Competitor
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {competitors.map((competitor, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">{competitor.name}</h4>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                DA: {competitor.domainAuthority}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Domain Authority</p>
                <p className="text-2xl font-bold text-gray-900">{competitor.domainAuthority}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Backlinks</p>
                <p className="text-2xl font-bold text-gray-900">{competitor.backlinks.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Ranking Keywords</p>
                <p className="text-2xl font-bold text-gray-900">{competitor.keywords}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOpportunities = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Content Opportunities</h3>
        <p className="text-sm text-gray-500">Keywords your competitors rank for, but you don't</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keyword</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Search Volume</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opportunity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contentGaps.map((gap, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{gap.keyword}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{gap.searchVolume.toLocaleString()}/month</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      gap.opportunity === 'High' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {gap.opportunity} Opportunity
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      Create Content →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Opportunity Insights */}
      <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <Target className="h-5 w-5 text-green-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-green-800">
              <span className="font-medium">Opportunity:</span> Creating content around "legal document automation" and "contract management software" could capture an additional 5,600+ monthly searches. These topics align with your legal tech expertise.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/bd-central"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to Business Development
      </Link>
      
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center">
              <Search className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SEO & Search Analytics</h1>
              <p className="text-gray-600">Discover what people are searching for and optimize your visibility</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">2.1K</div>
            <div className="text-sm text-gray-500">Monthly Organic Traffic</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  selectedTab === tab.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        {selectedTab === 'keywords' && renderKeywords()}
        {selectedTab === 'trends' && renderTrends()}
        {selectedTab === 'competitors' && renderCompetitors()}
        {selectedTab === 'opportunities' && renderOpportunities()}
      </div>
    </div>
  );
}

