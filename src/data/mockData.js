// Mock data for Relationship and Meeting Dashboards

export const mockMeetings = [
  {
    id: 1,
    name: 'Sara Lee',
    company: 'Ares Capital',
    date: '2025-01-25',
    time: '2:00 PM',
    datetime: 'Jan 25, 2:00 PM',
    status: 'Scheduled',
    avatar: 'SL',
    type: 'Portfolio Manager',
    segment: 'Warm',
  },
  {
    id: 2,
    name: 'David Chen',
    company: 'SolarTrust LLC',
    date: '2025-01-22',
    time: '10:00 AM',
    datetime: 'Jan 22, 10:00 AM',
    status: 'Scheduled',
    avatar: 'DC',
    type: 'Capital Partner',
    segment: 'Warm',
  },
  {
    id: 3,
    name: 'Sarah Martinez',
    company: 'Meridian Partners',
    date: '2025-01-20',
    time: '3:30 PM',
    datetime: 'Jan 20, 3:30 PM',
    status: 'Completed',
    avatar: 'SM',
    type: 'Portfolio Manager',
    segment: 'Closed',
  },
  {
    id: 4,
    name: 'Michael Rodriguez',
    company: 'Orion Holdings',
    date: '2025-01-18',
    time: '11:00 AM',
    datetime: 'Jan 18, 11:00 AM',
    status: 'Completed',
    avatar: 'MR',
    type: 'Capital Partner',
    segment: 'Aware',
  },
  {
    id: 5,
    name: 'Jennifer Park',
    company: 'Innovation Labs Inc.',
    date: '2025-01-15',
    time: '1:00 PM',
    datetime: 'Jan 15, 1:00 PM',
    status: 'Completed',
    avatar: 'JP',
    type: 'Vendor',
    segment: 'Warm',
  },
];

export const mockContacts = {
  total: 87,
  segments: {
    Aware: 12,
    Warm: 24,
    Closed: 5,
    Lost: 3,
  },
  ecosystem: {
    Collaborator: 6,
    Vendor: 4,
    Partner: 3,
  },
};

export const mockMeetingMetrics = {
  weeklyGoal: 5,
  scheduled: 4,
  completed: 2,
  past30Days: 18,
};

export const mockPersonTypes = [
  { type: 'Capital Partner', count: 32, color: 'bg-red-500' },
  { type: 'Portfolio Manager', count: 28, color: 'bg-orange-500' },
  { type: 'Vendor', count: 15, color: 'bg-purple-500' },
  { type: 'Collaborator', count: 12, color: 'bg-blue-500' },
];

export const mockCompanyTypes = [
  { type: 'Capital Firm', count: 45 },
  { type: 'Portfolio Company', count: 32 },
  { type: 'Service Provider', count: 10 },
];

export const mockFeedbackThemes = [
  { theme: 'Deal Velocity', count: 12, color: 'bg-red-100 text-red-800' },
  { theme: 'Due Diligence', count: 9, color: 'bg-orange-100 text-orange-800' },
  { theme: 'Legal Framework', count: 7, color: 'bg-purple-100 text-purple-800' },
  { theme: 'Portfolio Strategy', count: 6, color: 'bg-blue-100 text-blue-800' },
  { theme: 'Risk Assessment', count: 5, color: 'bg-green-100 text-green-800' },
  { theme: 'Market Trends', count: 4, color: 'bg-indigo-100 text-indigo-800' },
];

export const mockBdLoopMetrics = {
  outreach: {
    emailsSent: 45,
    replies: 12,
    openRate: 28,
  },
  prep: {
    upcoming: 4,
    prepared: 3,
  },
  postMeeting: {
    logged: 18,
    insights: 32,
  },
  iterate: {
    personasUpdated: 2,
    messagesRefined: 5,
  },
  message: {
    templates: 8,
    followUps: 6,
  },
};

