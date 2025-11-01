import { Link, useNavigate } from 'react-router-dom';
import { Plus, UserCircle } from 'lucide-react';

// Mock persona data
const personas = [
  {
    id: 1,
    name: 'Sarah the Startup Founder',
    title: 'Startup Founder',
    painPoints: 'Struggling to scale customer acquisition while maintaining quality',
    goals: 'Scale to $1M ARR within 18 months',
    channels: 'LinkedIn, industry events, referrals from VCs',
  },
  {
    id: 2,
    name: 'Mike the Tech Partner',
    title: 'Tech Partner',
    painPoints: 'Looking for strategic partnerships to expand market reach',
    goals: 'Build ecosystem of partners to accelerate growth',
    channels: 'Industry conferences, LinkedIn, direct outreach',
  },
];

const Personas = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Persona Management</h1>
          <p className="text-gray-600">Define and manage buyer/client personas</p>
        </div>
        <button
          onClick={() => navigate('/personas/create')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Persona
        </button>
      </div>

      {/* Persona Cards Grid */}
      {personas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((persona) => (
            <div
              key={persona.id}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/personas/${persona.id}`)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <UserCircle className="h-6 w-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{persona.name}</h3>
                  <p className="text-sm text-gray-500">{persona.title}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">Pain Points</p>
                  <p className="text-sm text-gray-700 line-clamp-2">{persona.painPoints}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">Goals</p>
                  <p className="text-sm text-gray-700">{persona.goals}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">Channels</p>
                  <p className="text-sm text-gray-700">{persona.channels}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <UserCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">No personas yet</p>
          <p className="text-sm text-gray-400 mb-6">Create your first persona to get started</p>
          <button
            onClick={() => navigate('/personas/create')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
          >
            Create Persona
          </button>
        </div>
      )}
    </div>
  );
};

export default Personas;

