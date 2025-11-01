import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const mainNavOptions = [
  {
    title: 'NDA Management',
    description: 'Manage NDA intake and review',
    icon: <FileText className="h-8 w-8" />,
    path: '/nda-dashboard',
    color: 'bg-blue-100 text-blue-600'
  },
];

export default function CompanyCentral() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Company Central</h1>
          <p className="text-gray-600">Manage company operations and legal processes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mainNavOptions.map((option) => (
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

