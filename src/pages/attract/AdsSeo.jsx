import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, Search, TrendingUp, DollarSign, Eye, MousePointerClick } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export default function AdsSeo() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ads'); // 'ads' or 'seo'

  // Mock data
  const adsData = {
    activeCampaigns: 3,
    totalSpend: 12500,
    impressions: 245000,
    clicks: 1820,
    ctr: 0.74,
    avgCpc: 6.87,
    conversions: 42,
  };

  const seoData = {
    avgRank: 12,
    totalKeywords: 45,
    topKeywords: [
      { keyword: 'NDA automation', rank: 3, searches: 1200 },
      { keyword: 'legal document management', rank: 8, searches: 890 },
      { keyword: 'contract review services', rank: 15, searches: 650 },
    ],
    organicClicks: 3240,
    impressions: 12800,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Ads & SEO"
        subtitle="Manage paid advertising and search engine optimization"
        backTo="/attract"
        backLabel="← Back to Attract"
      />

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('ads')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'ads'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Image className="h-4 w-4 inline mr-2" />
          Google Ads
        </button>
        <button
          onClick={() => setActiveTab('seo')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'seo'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Search className="h-4 w-4 inline mr-2" />
          SEO
        </button>
      </div>

      {/* Ads Tab */}
      {activeTab === 'ads' && (
        <div>
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center gap-3 mb-2">
                <Image className="h-6 w-6 text-blue-600" />
                <h3 className="text-sm font-medium text-gray-600">Active Campaigns</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{adsData.activeCampaigns}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="h-6 w-6 text-green-600" />
                <h3 className="text-sm font-medium text-gray-600">Total Spend</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">${adsData.totalSpend.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center gap-3 mb-2">
                <Eye className="h-6 w-6 text-purple-600" />
                <h3 className="text-sm font-medium text-gray-600">Impressions</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{adsData.impressions.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
              <div className="flex items-center gap-3 mb-2">
                <MousePointerClick className="h-6 w-6 text-orange-600" />
                <h3 className="text-sm font-medium text-gray-600">Clicks</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{adsData.clicks.toLocaleString()}</p>
            </div>
          </div>

          {/* Campaign Performance */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Campaign Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">CTR</p>
                <p className="text-2xl font-bold text-indigo-600">{adsData.ctr}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Avg CPC</p>
                <p className="text-2xl font-bold text-gray-900">${adsData.avgCpc}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Conversions</p>
                <p className="text-2xl font-bold text-green-600">{adsData.conversions}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                Create New Campaign
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                View All Campaigns
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SEO Tab */}
      {activeTab === 'seo' && (
        <div>
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                <h3 className="text-sm font-medium text-gray-600">Avg Rank</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{seoData.avgRank}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
              <div className="flex items-center gap-3 mb-2">
                <Search className="h-6 w-6 text-green-600" />
                <h3 className="text-sm font-medium text-gray-600">Total Keywords</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{seoData.totalKeywords}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center gap-3 mb-2">
                <MousePointerClick className="h-6 w-6 text-purple-600" />
                <h3 className="text-sm font-medium text-gray-600">Organic Clicks</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{seoData.organicClicks.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
              <div className="flex items-center gap-3 mb-2">
                <Eye className="h-6 w-6 text-orange-600" />
                <h3 className="text-sm font-medium text-gray-600">Impressions</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{seoData.impressions.toLocaleString()}</p>
            </div>
          </div>

          {/* Top Keywords */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Top Keywords</h3>
            <div className="space-y-4">
              {seoData.topKeywords.map((keyword, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{keyword.keyword}</p>
                    <p className="text-sm text-gray-600">{keyword.searches.toLocaleString()} searches/month</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-indigo-600">#{keyword.rank}</p>
                    <p className="text-xs text-gray-500">Current Rank</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                Research Keywords
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                View Full Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

