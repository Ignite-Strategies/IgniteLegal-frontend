import { Link, useNavigate } from 'react-router-dom';
import { Users, FileText, Calendar } from 'lucide-react';

export default function BdCentral() {
  const navigate = useNavigate();

  const mainCards = [
    {
      name: "Leads & Connections",
      description: "Manage contacts, pipeline, and outreach campaigns",
      icon: <Users className="h-12 w-12 text-white" />,
      color: "bg-blue-500",
      route: "/crm-hub"
    },
    {
      name: "Content",
      description: "Blog posts, social media, SEO, and content marketing",
      icon: <FileText className="h-12 w-12 text-white" />,
      color: "bg-indigo-500",
      route: "/business-development/content"
    },
    {
      name: "Event Tracker",
      description: "Track networking events, conferences, and meetings",
      icon: <Calendar className="h-12 w-12 text-white" />,
      color: "bg-green-500",
      route: "/business-development/events"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to Company Central
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Business Development</h1>
        <p className="text-gray-600 text-lg">Grow your practice and acquire new clients</p>
      </div>

      {/* Main Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mainCards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.route)}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <div className="p-8">
              <div className={`w-20 h-20 rounded-lg ${card.color} flex items-center justify-center mb-6`}>
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{card.name}</h3>
              <p className="text-gray-600">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
