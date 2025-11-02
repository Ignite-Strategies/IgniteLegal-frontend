import { Link, useNavigate } from 'react-router-dom';
import { Users, UserPlus, Mail, Phone, Building2 } from 'lucide-react';

const stats = [
  { label: 'Total Contacts', value: 24 },
  { label: 'Prospects', value: 5 },
  { label: 'Active Clients', value: 8 },
  { label: 'This Month', value: 12 },
];

const crmNavOptions = [
  {
    title: 'Contact List',
    description: 'View and manage all contacts',
    icon: <Users className="h-8 w-8" />,
    path: '/crm/list',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Add Contact',
    description: 'Create new contact entry',
    icon: <UserPlus className="h-8 w-8" />,
    path: '/crm/create',
    color: 'bg-green-100 text-green-600'
  },
  {
    title: 'Pipeline',
    description: 'View sales and client pipeline',
    icon: <Building2 className="h-8 w-8" />,
    path: '/crm/pipeline',
    color: 'bg-purple-100 text-purple-600'
  },
];

// Mock recent activity
const recentActivity = [
  {
    id: 1,
    contact: 'SolarTrust LLC',
    action: 'Email sent',
    time: '2 hours ago',
    type: 'email'
  },
  {
    id: 2,
    contact: 'Meridian Partners',
    action: 'Status updated to Client',
    time: '1 day ago',
    type: 'update'
  },
  {
    id: 3,
    contact: 'Ares Capital',
    action: 'Phone call scheduled',
    time: '2 days ago',
    type: 'call'
  },
];

export default function CrmHub() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to Company Central
      </Link>

      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">CRM & Contact Management</h1>
          <p className="text-gray-600 text-lg">Manage your contacts, pipeline, and client relationships</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {crmNavOptions.map((option) => (
            <Link key={option.path} to={option.path}>
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition cursor-pointer">
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${option.color} mb-4`}>
                  {option.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                <p className="text-gray-600 text-sm">{option.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {activity.type === 'email' && <Mail className="h-5 w-5 text-blue-600" />}
                  {activity.type === 'update' && <Users className="h-5 w-5 text-green-600" />}
                  {activity.type === 'call' && <Phone className="h-5 w-5 text-purple-600" />}
                  <div>
                    <p className="font-medium text-gray-900">{activity.contact}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
