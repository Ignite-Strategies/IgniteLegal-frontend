import { Link } from 'react-router-dom';
import { FileText, UserPlus, ClipboardCheck, List } from 'lucide-react';

const ndaWorkflowOptions = [
  {
    title: 'Ingest Party/Deal Data',
    description: 'Enter counterparty and deal information',
    icon: <UserPlus className="h-8 w-8" />,
    path: '/nda/ingest',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Assign NDA Work',
    description: 'Assign NDA tasks to team members',
    icon: <ClipboardCheck className="h-8 w-8" />,
    path: '/nda/assign',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    title: 'Review NDA Work',
    description: 'Review and approve NDAs',
    icon: <FileText className="h-8 w-8" />,
    path: '/nda/review',
    color: 'bg-green-100 text-green-600'
  },
  {
    title: 'See All NDA Drafts',
    description: 'View all NDAs and their status',
    icon: <List className="h-8 w-8" />,
    path: '/nda-dashboard',
    color: 'bg-orange-100 text-orange-600'
  },
];

export default function NDAHub() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <div>
          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-gray-900 mb-4 inline-block"
          >
            ← Back to Company Central
          </Link>
          <h1 className="text-3xl font-bold mb-2">NDA Management</h1>
          <p className="text-gray-600">Manage the complete NDA workflow</p>
        </div>

        {/* Workflow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ndaWorkflowOptions.map((option) => (
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
      </div>
    </div>
  );
}

