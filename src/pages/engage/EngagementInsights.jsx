import { useNavigate } from 'react-router-dom';
import { MessageSquare, TrendingUp, Users, AlertCircle, Target, PieChart, BarChart3, CheckCircle, XCircle } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export default function EngagementInsights() {
  const navigate = useNavigate();

  // Mock meeting/engagement data
  const meetingStats = {
    totalMeetings: 42,
    totalCloses: 8,
    closeRate: 19.0,
  };

  // "People said..." feedback themes
  const peopleSaid = [
    {
      statement: 'Not needed right now',
      percentage: 58,
      count: 24,
      sentiment: 'neutral',
      icon: AlertCircle,
      color: 'yellow',
    },
    {
      statement: 'Would be helpful',
      percentage: 28,
      count: 12,
      sentiment: 'positive',
      icon: CheckCircle,
      color: 'green',
    },
    {
      statement: 'Not a fit',
      percentage: 14,
      count: 6,
      sentiment: 'negative',
      icon: XCircle,
      color: 'red',
    },
  ];

  // Insights by persona
  const personaInsights = [
    {
      persona: 'Capital Partner',
      meetings: 12,
      closes: 3,
      closeRate: 25.0,
      topFeedback: 'NDA automation would save time on deal structuring',
      mentionRate: 75,
    },
    {
      persona: 'Portfolio Manager',
      meetings: 18,
      closes: 4,
      closeRate: 22.2,
      topFeedback: 'Need both NDA management and ongoing contract support',
      mentionRate: 83,
    },
    {
      persona: 'Investment Director',
      meetings: 8,
      closes: 1,
      closeRate: 12.5,
      topFeedback: 'Small firm with no in-house - perfect fit for automation',
      mentionRate: 100,
    },
    {
      persona: 'Tech Partner',
      meetings: 4,
      closes: 0,
      closeRate: 0,
      topFeedback: 'Exploring partnerships, not direct legal services',
      mentionRate: 25,
    },
  ];

  // Pain Point Nexus (patterns)
  const painPointNexus = [
    {
      pattern: 'Small Firm',
      attributes: ['No in-house legal', 'Limited budget', 'High volume needs'],
      count: 15,
      percentage: 36,
      needs: ['NDA Automation', 'Contract Review', 'Compliance'],
      icon: Target,
      color: 'blue',
    },
    {
      pattern: 'Mid-Size Growth',
      attributes: ['Some in-house', 'Scaling operations', 'Deal-heavy'],
      count: 18,
      percentage: 43,
      needs: ['NDA + Contract Suite', 'Due Diligence Support', 'Portfolio Management'],
      icon: TrendingUp,
      color: 'orange',
    },
    {
      pattern: 'Enterprise',
      attributes: ['Full in-house team', 'Complex structures', 'Strategic partnerships'],
      count: 9,
      percentage: 21,
      needs: ['Integration Support', 'Custom Workflows', 'Scalable Solutions'],
      icon: BarChart3,
      color: 'purple',
    },
  ];

  // NDA Automation mentions
  const ndaAutomationMentions = {
    totalMentions: 36,
    percentage: 86,
    breakdown: [
      { persona: 'Capital Partner', mentions: 9, outOf: 12 },
      { persona: 'Portfolio Manager', mentions: 15, outOf: 18 },
      { persona: 'Investment Director', mentions: 8, outOf: 8 },
      { persona: 'Tech Partner', mentions: 1, outOf: 4 },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Engagement Insights"
        subtitle="What people actually said — insights from your meetings"
        backTo="/engage"
        backLabel="← Back to Engage"
      />

      {/* Total Meetings / Closes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-6 w-6 text-blue-600" />
            <h3 className="text-sm font-medium text-gray-600">Total Meetings</h3>
          </div>
          <p className="text-4xl font-bold text-gray-900">{meetingStats.totalMeetings}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <h3 className="text-sm font-medium text-gray-600">Total Closes</h3>
          </div>
          <p className="text-4xl font-bold text-gray-900">{meetingStats.totalCloses}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-6 w-6 text-purple-600" />
            <h3 className="text-sm font-medium text-gray-600">Close Rate</h3>
          </div>
          <p className="text-4xl font-bold text-gray-900">{meetingStats.closeRate}%</p>
        </div>
      </div>

      {/* "People Said..." Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold">People Said...</h2>
        </div>
        <p className="text-gray-600 mb-6">When asked if they needed your services, here's what they told you:</p>
        <div className="space-y-4">
          {peopleSaid.map((item, idx) => {
            const Icon = item.icon;
            const colorClasses = {
              yellow: 'bg-yellow-100 text-yellow-700 border-yellow-300',
              green: 'bg-green-100 text-green-700 border-green-300',
              red: 'bg-red-100 text-red-700 border-red-300',
            };
            
            return (
              <div
                key={idx}
                className={`border-2 rounded-lg p-4 ${colorClasses[item.color]}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <p className="font-semibold text-lg">"{item.statement}"</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">{item.percentage}%</p>
                    <p className="text-sm opacity-75">{item.count} people</p>
                  </div>
                </div>
                <div className="w-full bg-white/50 rounded-full h-3">
                  <div
                    className={`bg-current h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How It Matches By Persona */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <PieChart className="h-6 w-6 text-purple-600" />
          <h2 className="text-2xl font-bold">By Persona</h2>
        </div>
        <p className="text-gray-600 mb-6">Here's how engagement and feedback varies by persona:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {personaInsights.map((persona, idx) => (
            <div
              key={idx}
              className="border-2 border-gray-200 rounded-lg p-5 hover:border-purple-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">{persona.persona}</h3>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Close Rate</p>
                  <p className="text-xl font-bold text-purple-600">{persona.closeRate}%</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Meetings:</span>
                  <span className="font-medium">{persona.meetings}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Closes:</span>
                  <span className="font-medium text-green-600">{persona.closes}</span>
                </div>
              </div>
              <div className="border-t pt-3">
                <p className="text-xs font-semibold text-gray-500 mb-1">Top Feedback:</p>
                <p className="text-sm text-gray-700 italic">"{persona.topFeedback}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pain Point Nexus */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Target className="h-6 w-6 text-orange-600" />
          <h2 className="text-2xl font-bold">Pain Point Nexus</h2>
        </div>
        <p className="text-gray-600 mb-6">Common patterns and what they actually need:</p>
        <div className="space-y-6">
          {painPointNexus.map((pattern, idx) => {
            const Icon = pattern.icon;
            const colorClasses = {
              blue: 'border-blue-300 bg-blue-50',
              orange: 'border-orange-300 bg-orange-50',
              purple: 'border-purple-300 bg-purple-50',
            };
            
            return (
              <div
                key={idx}
                className={`border-2 rounded-lg p-6 ${colorClasses[pattern.color]}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-gray-700" />
                    <h3 className="text-xl font-bold text-gray-900">{pattern.pattern}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{pattern.percentage}%</p>
                    <p className="text-sm text-gray-600">{pattern.count} meetings</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2">Attributes:</p>
                    <ul className="space-y-1">
                      {pattern.attributes.map((attr, i) => (
                        <li key={i} className="text-sm text-gray-700">• {attr}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs font-semibold text-gray-500 mb-2">They Need:</p>
                    <div className="flex flex-wrap gap-2">
                      {pattern.needs.map((need, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700"
                        >
                          {need}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* NDA Automation Mentions */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-lg p-6 border-2 border-green-300">
        <div className="flex items-center gap-3 mb-4">
          <MessageSquare className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold text-green-900">Mention of NDA Automation</h2>
        </div>
        <div className="mb-6">
          <div className="flex items-baseline gap-3 mb-2">
            <p className="text-5xl font-bold text-green-700">{ndaAutomationMentions.percentage}%</p>
            <p className="text-gray-600">of meetings mentioned NDA automation</p>
          </div>
          <p className="text-sm text-gray-600">
            That's {ndaAutomationMentions.totalMentions} out of {meetingStats.totalMeetings} meetings where 
            they specifically talked about needing or wanting NDA automation.
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-4 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">Breakdown by Persona:</p>
          <div className="space-y-2">
            {ndaAutomationMentions.breakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{item.persona}:</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(item.mentions / item.outOf) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-16 text-right">
                    {item.mentions}/{item.outOf}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-100 border border-green-300 rounded-lg p-4">
          <p className="text-sm text-green-900">
            <strong>Bottom line:</strong> When {ndaAutomationMentions.percentage}% of the people 
            you meet with are talking about NDA automation, that's not a coincidence. 
            That's what the market is telling you.
          </p>
        </div>
      </div>
    </div>
  );
}

