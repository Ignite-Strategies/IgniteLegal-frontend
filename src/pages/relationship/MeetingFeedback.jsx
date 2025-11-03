import { useNavigate } from 'react-router-dom';
import { MessageSquare, Tag, ArrowLeft } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { mockFeedbackThemes } from '../../data/mockData';

export default function MeetingFeedback() {
  const navigate = useNavigate();

  // Mock feedback items grouped by theme
  const feedbackByTheme = {
    'Deal Velocity': [
      { id: 1, text: 'Speed up NDA process for portfolio companies', meeting: 'Sara Lee - Ares Capital', date: '2025-01-15' },
      { id: 2, text: 'Need faster turnaround on contract reviews', meeting: 'David Chen - SolarTrust', date: '2025-01-10' },
    ],
    'Due Diligence': [
      { id: 3, text: 'Require more thorough DD on potential deals', meeting: 'Sarah Johnson - TechVentures', date: '2025-01-12' },
    ],
    'Legal Framework': [
      { id: 4, text: 'Clarify regulatory requirements for new markets', meeting: 'Michael Brown - CapitalPartners', date: '2025-01-08' },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Meeting Feedback"
        subtitle="Insights and feedback from your meetings"
        backTo="/meeting-dashboard"
        backLabel="← Back to Meeting Dashboard"
      />

      {/* Feedback Themes */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Tag className="h-6 w-6 text-red-600" />
          <h2 className="text-2xl font-bold">Feedback Themes</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {mockFeedbackThemes.map((theme) => (
            <button
              key={theme.theme}
              onClick={() => navigate(`/meeting-feedback/theme/${encodeURIComponent(theme.theme)}`)}
              className={`${theme.color} px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity`}
            >
              <span>{theme.theme}</span>
              <span className="bg-white bg-opacity-30 px-2 py-0.5 rounded-full text-xs font-bold">
                {theme.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Feedback Items */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Recent Feedback</h2>
        </div>
        <div className="space-y-4">
          {Object.entries(feedbackByTheme).map(([theme, items]) => (
            <div key={theme} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{theme}</h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900 mb-2">{item.text}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{item.meeting}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

