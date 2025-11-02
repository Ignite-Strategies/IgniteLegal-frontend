import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Calendar, FileText, Lightbulb, MessageSquare, Plus, CheckCircle, Clock } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Connect() {
  const navigate = useNavigate();
  const [contacts] = useLocalStorage('contacts', []);
  const [messages] = useLocalStorage('messages', []);
  const [meetings, setMeetings] = useLocalStorage('meetings', [
    { id: 1, contactName: 'David Chen', company: 'SolarTrust LLC', date: '2025-01-20', time: '2:00 PM', status: 'upcoming', notes: '' },
    { id: 2, contactName: 'Sarah Martinez', company: 'Meridian Partners', date: '2025-01-22', time: '10:00 AM', status: 'upcoming', notes: '' },
  ]);
  const [insights, setInsights] = useLocalStorage('insights', [
    { id: 1, date: '2025-01-15', theme: 'Capital Partners', keyTakeaway: 'Interested in renewable energy deals', source: 'David Chen' },
    { id: 2, date: '2025-01-10', theme: 'Portfolio Managers', keyTakeaway: 'Focus on deal velocity, not just size', source: 'Sarah Martinez' },
  ]);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showPostMeetingModal, setShowPostMeetingModal] = useState(false);
  const [showInsightModal, setShowInsightModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [postMeetingData, setPostMeetingData] = useState({
    meetingId: '',
    keyTakeaways: '',
    painPoints: '',
    nextSteps: '',
  });
  const [insightData, setInsightData] = useState({
    theme: '',
    keyTakeaway: '',
    source: '',
  });

  // Calculate metrics
  const emailsSent = messages.filter(m => m.status === 'sent').length;
  const repliesReceived = messages.filter(m => m.status === 'replied').length;
  const upcomingMeetings = meetings.filter(m => m.status === 'upcoming').length;
  const meetingsThisWeek = meetings.filter(m => {
    const meetingDate = new Date(m.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return meetingDate >= weekAgo && m.status === 'completed';
  }).length;
  const insightsLogged = insights.length;
  const themesDiscovered = new Set(insights.map(i => i.theme)).size;
  const templatesUpdated = 8; // Mock
  const followUpsDue = contacts.filter(c => {
    if (!c.nextTouch) return false;
    const nextDate = new Date(c.nextTouch);
    return nextDate <= new Date();
  }).length;

  // Calculate today's progress (mock: 2/5 completed)
  const todaysProgress = 2;
  const todaysTarget = 5;
  const progressPercent = (todaysProgress / todaysTarget) * 100;

  const handleMeetingPrep = () => {
    const nextMeeting = meetings.find(m => m.status === 'upcoming');
    if (nextMeeting) {
      setSelectedMeeting(nextMeeting);
      setShowMeetingModal(true);
    } else {
      alert('No upcoming meetings found. Add one to get started.');
    }
  };

  const handlePostMeeting = () => {
    const recentMeeting = meetings.find(m => m.status === 'upcoming');
    if (recentMeeting) {
      setPostMeetingData({ ...postMeetingData, meetingId: recentMeeting.id });
      setShowPostMeetingModal(true);
    }
  };

  const handleSavePostMeeting = () => {
    // Mark meeting as completed and save insights
    const updatedMeetings = meetings.map(m => 
      m.id === parseInt(postMeetingData.meetingId)
        ? { ...m, status: 'completed', notes: postMeetingData.keyTakeaways }
        : m
    );
    setMeetings(updatedMeetings);

    // Create insight if takeaways provided
    if (postMeetingData.keyTakeaways) {
      const newInsight = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        theme: 'Meeting Insight',
        keyTakeaway: postMeetingData.keyTakeaways,
        source: meetings.find(m => m.id === parseInt(postMeetingData.meetingId))?.contactName || 'Meeting',
      };
      setInsights([...insights, newInsight]);
    }

    setShowPostMeetingModal(false);
    setPostMeetingData({ meetingId: '', keyTakeaways: '', painPoints: '', nextSteps: '' });
  };

  const handleAddInsight = () => {
    if (insightData.theme && insightData.keyTakeaway) {
      const newInsight = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        ...insightData,
      };
      setInsights([...insights, newInsight]);
      setInsightData({ theme: '', keyTakeaway: '', source: '' });
      setShowInsightModal(false);
    }
  };

  // Stage Cards
  const stages = [
    {
      id: 'outreach',
      title: 'Outreach',
      icon: <Mail className="h-6 w-6" />,
      color: 'from-blue-500 to-blue-600',
      kpi: `${emailsSent} sent / ${repliesReceived} replies`,
      primaryCta: 'Send Outreach',
      primaryAction: () => navigate('/messages'),
      secondaryCta: 'View Contacts',
      secondaryAction: () => navigate('/contacts'),
      subtext: 'Reach out to 5 warm or adjacent contacts today.',
      active: todaysProgress < 1,
    },
    {
      id: 'meeting-prep',
      title: 'Meeting Prep',
      icon: <Calendar className="h-6 w-6" />,
      color: 'from-orange-500 to-orange-600',
      kpi: `${upcomingMeetings} upcoming`,
      primaryCta: 'Review Agenda',
      primaryAction: handleMeetingPrep,
      secondaryCta: 'Add Meeting',
      secondaryAction: () => alert('Add meeting functionality - integrate with calendar'),
      subtext: 'Know who you\'re meeting and why it matters.',
      active: todaysProgress >= 1 && todaysProgress < 2,
    },
    {
      id: 'post-meeting',
      title: 'Post-Meeting',
      icon: <FileText className="h-6 w-6" />,
      color: 'from-green-500 to-green-600',
      kpi: `${meetingsThisWeek} logged / ${upcomingMeetings} remaining`,
      primaryCta: 'Add Shakedown Notes',
      primaryAction: handlePostMeeting,
      secondaryCta: 'View Past Meetings',
      secondaryAction: () => alert('View past meetings'),
      subtext: 'Capture insights while they\'re fresh.',
      active: todaysProgress >= 2 && todaysProgress < 3,
    },
    {
      id: 'iterate',
      title: 'Iterate',
      icon: <Lightbulb className="h-6 w-6" />,
      color: 'from-purple-500 to-purple-600',
      kpi: `${insightsLogged} insights / ${themesDiscovered} themes`,
      primaryCta: 'Review Learnings',
      primaryAction: () => setShowInsightModal(true),
      secondaryCta: 'Refine Persona / Message',
      secondaryAction: () => navigate('/personas'),
      subtext: 'Update your target list and language from what you\'ve learned.',
      active: todaysProgress >= 3 && todaysProgress < 4,
    },
    {
      id: 'message',
      title: 'Message',
      icon: <MessageSquare className="h-6 w-6" />,
      color: 'from-red-500 to-red-600',
      kpi: `${templatesUpdated} templates / ${followUpsDue} follow-ups due`,
      primaryCta: 'Open Template Library',
      primaryAction: () => alert('Template library - integrate with email campaigns'),
      secondaryCta: 'Schedule Follow-up',
      secondaryAction: () => navigate('/messages'),
      subtext: 'Sharpen your message and stay consistent.',
      active: todaysProgress >= 4,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/relationship-dashboard"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to Relationship Dashboard
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Connect</h1>
            <p className="text-gray-600 text-lg">Your daily business-development loop</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {progressPercent.toFixed(0)}% Complete
            </div>
            <div className="text-sm text-gray-500">
              {todaysProgress} of {todaysTarget} stages today
            </div>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* 5-Stage Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
              stage.active ? 'ring-4 ring-blue-400 ring-opacity-50' : ''
            }`}
          >
            {/* Card Header */}
            <div className={`bg-gradient-to-r ${stage.color} p-6 text-white rounded-t-xl`}>
              <div className="flex items-center gap-3 mb-2">
                {stage.icon}
                <h2 className="text-xl font-bold">{stage.title}</h2>
              </div>
              {stage.active && (
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <Clock className="h-4 w-4" />
                  <span>Active Stage</span>
                </div>
              )}
            </div>

            {/* Card Body */}
            <div className="p-6">
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">KPI</p>
                <p className="text-lg font-semibold text-gray-900">{stage.kpi}</p>
              </div>

              <div className="space-y-2 mb-4">
                <button
                  onClick={stage.primaryAction}
                  className="w-full px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  {stage.primaryCta}
                </button>
                <button
                  onClick={stage.secondaryAction}
                  className="w-full px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  {stage.secondaryCta}
                </button>
              </div>

              <p className="text-xs text-gray-500 italic">{stage.subtext}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stages.map((stage) => (
          <div key={stage.id} className="bg-white rounded-lg shadow-sm p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">{stage.title}</p>
            <div className={`w-3 h-3 rounded-full mx-auto ${
              stage.active ? 'bg-green-500' : 'bg-gray-300'
            }`}></div>
          </div>
        ))}
      </div>

      {/* Meeting Prep Modal */}
      {showMeetingModal && selectedMeeting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Meeting Agenda</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm font-medium text-gray-700">Contact</label>
                <p className="text-lg text-gray-900">{selectedMeeting.contactName}</p>
                <p className="text-sm text-gray-600">{selectedMeeting.company}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Date & Time</label>
                <p className="text-lg text-gray-900">{selectedMeeting.date} at {selectedMeeting.time}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Meeting Purpose</label>
                <textarea
                  placeholder="Add agenda items, talking points, and key questions..."
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Key Topics</label>
                <textarea
                  placeholder="What do you want to discuss?"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowMeetingModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('Agenda saved!');
                  setShowMeetingModal(false);
                }}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Save Agenda
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post-Meeting Modal */}
      {showPostMeetingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Post-Meeting Notes</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Key Takeaways</label>
                <textarea
                  value={postMeetingData.keyTakeaways}
                  onChange={(e) => setPostMeetingData({ ...postMeetingData, keyTakeaways: e.target.value })}
                  placeholder="What were the main points discussed?"
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pain Points Identified</label>
                <textarea
                  value={postMeetingData.painPoints}
                  onChange={(e) => setPostMeetingData({ ...postMeetingData, painPoints: e.target.value })}
                  placeholder="What challenges or pain points did they mention?"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Next Steps</label>
                <textarea
                  value={postMeetingData.nextSteps}
                  onChange={(e) => setPostMeetingData({ ...postMeetingData, nextSteps: e.target.value })}
                  placeholder="What are the agreed-upon next steps?"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowPostMeetingModal(false);
                  setPostMeetingData({ meetingId: '', keyTakeaways: '', painPoints: '', nextSteps: '' });
                }}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePostMeeting}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Insights Modal */}
      {showInsightModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Review Learnings & Insights</h2>
            
            {/* Existing Insights */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Recent Insights</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {insights.map((insight) => (
                  <div key={insight.id} className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-purple-900">{insight.theme}</span>
                      <span className="text-xs text-gray-500">{insight.date}</span>
                    </div>
                    <p className="text-sm text-gray-700">{insight.keyTakeaway}</p>
                    <p className="text-xs text-gray-500 mt-1">Source: {insight.source}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Add New Insight */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-3">Add New Insight</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                  <input
                    type="text"
                    value={insightData.theme}
                    onChange={(e) => setInsightData({ ...insightData, theme: e.target.value })}
                    placeholder="e.g., Capital Partners, Portfolio Managers"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Key Takeaway</label>
                  <textarea
                    value={insightData.keyTakeaway}
                    onChange={(e) => setInsightData({ ...insightData, keyTakeaway: e.target.value })}
                    placeholder="What did you learn?"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                  <input
                    type="text"
                    value={insightData.source}
                    onChange={(e) => setInsightData({ ...insightData, source: e.target.value })}
                    placeholder="Contact name or meeting"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowInsightModal(false);
                  setInsightData({ theme: '', keyTakeaway: '', source: '' });
                }}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
              <button
                onClick={handleAddInsight}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Add Insight
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

