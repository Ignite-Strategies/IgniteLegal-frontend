import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Content() {
  const [activeTab, setActiveTab] = useState('blog');
  const [blogPosts] = useState([
    {
      id: 1,
      title: '5 Legal Document Strategies That Actually Work in 2025',
      status: 'Published',
      date: '2025-01-15',
      views: 1250,
      engagement: 45,
      tags: ['legal-services', 'nda', 'business-law']
    },
    {
      id: 2,
      title: 'How to Build Strong Client Relationships Through NDA Management',
      status: 'Draft',
      date: '2025-01-20',
      views: 0,
      engagement: 0,
      tags: ['nda-management', 'client-relations', 'legal-practice']
    },
    {
      id: 3,
      title: 'The Complete Guide to Business Contract Review',
      status: 'Scheduled',
      date: '2025-01-25',
      views: 0,
      engagement: 0,
      tags: ['contract-review', 'legal-services', 'business']
    }
  ]);

  const [socialPosts] = useState([
    {
      id: 1,
      platform: 'LinkedIn',
      content: 'Just helped a client streamline their NDA process, reducing review time by 60%! Here\'s what we learned about efficient legal document management...',
      status: 'Published',
      date: '2025-01-18',
      likes: 23,
      comments: 8,
      shares: 5
    },
    {
      id: 2,
      platform: 'Twitter',
      content: 'Hot take: Most legal tech implementations fail because they focus on features instead of workflow. Thoughts?',
      status: 'Scheduled',
      date: '2025-01-22',
      likes: 0,
      comments: 0,
      shares: 0
    },
    {
      id: 3,
      platform: 'LinkedIn',
      content: '5 ways to turn your legal practice into a growth engine. Thread 🧵',
      status: 'Draft',
      date: '2025-01-24',
      likes: 0,
      comments: 0,
      shares: 0
    }
  ]);

  const [contentIdeas] = useState([
    {
      id: 1,
      title: 'Legal Automation Tools Comparison',
      type: 'Blog Post',
      priority: 'High',
      estimatedTime: '3 hours',
      status: 'Idea'
    },
    {
      id: 2,
      title: 'LinkedIn Carousel: Legal Metrics That Matter',
      type: 'Social Media',
      priority: 'Medium',
      estimatedTime: '1 hour',
      status: 'Idea'
    },
    {
      id: 3,
      title: 'Video: How to Run Effective Client Consultations',
      type: 'Video Content',
      priority: 'High',
      estimatedTime: '2 hours',
      status: 'Idea'
    }
  ]);

  const renderBlogTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Blog Management</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          + New Post
        </button>
      </div>

      <div className="grid gap-4">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">{post.title}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    post.status === 'Published' ? 'bg-green-100 text-green-800' :
                    post.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {post.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span>📅 {new Date(post.date).toLocaleDateString()}</span>
                  <span>👁️ {post.views} views</span>
                  <span>💬 {post.engagement} engagements</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="ml-4 flex gap-2">
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSocialTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Social Media Management</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          + New Post
        </button>
      </div>

      <div className="grid gap-4">
        {socialPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg">
                    {post.platform === 'LinkedIn' ? '💼' : '🐦'}
                  </span>
                  <span className="font-semibold text-gray-700">{post.platform}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    post.status === 'Published' ? 'bg-green-100 text-green-800' :
                    post.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {post.status}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-3">{post.content}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>📅 {new Date(post.date).toLocaleDateString()}</span>
                  <span>❤️ {post.likes} likes</span>
                  <span>💬 {post.comments} comments</span>
                  <span>🔄 {post.shares} shares</span>
                </div>
              </div>
              
              <div className="ml-4 flex gap-2">
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                  Schedule
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderIdeasTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Content Ideas</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          + New Idea
        </button>
      </div>

      <div className="grid gap-4">
        {contentIdeas.map((idea) => (
          <div key={idea.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">{idea.title}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    idea.priority === 'High' ? 'bg-red-100 text-red-800' :
                    idea.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {idea.priority}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span>📝 {idea.type}</span>
                  <span>⏱️ {idea.estimatedTime}</span>
                  <span>📊 {idea.status}</span>
                </div>
              </div>
              
              <div className="ml-4 flex gap-2">
                <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200">
                  Start
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Content Hub</h1>
        <p className="text-gray-600">Manage your blog posts, social media, and content ideas</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="text-3xl">📝</div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-gray-600">Blog Posts</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="text-3xl">📱</div>
            <div>
              <p className="text-2xl font-bold text-gray-900">28</p>
              <p className="text-gray-600">Social Posts</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="text-3xl">👁️</div>
            <div>
              <p className="text-2xl font-bold text-gray-900">5.2K</p>
              <p className="text-gray-600">Total Views</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="text-3xl">💡</div>
            <div>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-gray-600">Content Ideas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('blog')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'blog'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📝 Blog Posts
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'social'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📱 Social Media
            </button>
            <button
              onClick={() => setActiveTab('ideas')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'ideas'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              💡 Content Ideas
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📊 Analytics
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        {activeTab === 'blog' && renderBlogTab()}
        {activeTab === 'social' && renderSocialTab()}
        {activeTab === 'ideas' && renderIdeasTab()}
        {activeTab === 'analytics' && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Content Analytics</h3>
            <p className="text-gray-600">Track your content performance and engagement metrics</p>
          </div>
        )}
      </div>
    </div>
  );
}

