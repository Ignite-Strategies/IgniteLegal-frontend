import { Link, useNavigate } from 'react-router-dom';
import { Plus, UserCircle } from 'lucide-react';

// Mock persona data - focused on debt-financing capital partners and portfolio managers
const personas = [
  {
    id: 1,
    name: 'David Chen - Capital Partner',
    title: 'Debt Financing Capital Partner',
    company: 'Ares Capital',
    painPoints: 'Managing complex deal structures requires rapid legal document turnaround. Need efficient NDA and contract review processes for portfolio company transactions.',
    goals: 'Accelerate deal execution while maintaining compliance and risk management',
    channels: 'Industry conferences (ACLI, BDC forums), LinkedIn, direct referrals from portfolio companies',
  },
  {
    id: 2,
    name: 'Sarah Martinez - Portfolio Manager',
    title: 'Portfolio Manager',
    company: 'Orion Holdings',
    painPoints: 'Overseeing multiple portfolio companies means constant legal document review. Looking for streamlined processes for NDA intake, contract negotiation, and compliance monitoring.',
    goals: 'Scale legal operations across portfolio without proportional cost increase',
    channels: 'Private equity networking events, portfolio company connections, industry associations',
  },
  {
    id: 3,
    name: 'Michael Thompson - Investment Director',
    title: 'Investment Director',
    company: 'Meridian Partners',
    painPoints: 'Due diligence processes require extensive legal document management. Need reliable, fast legal support for transaction documentation and ongoing portfolio company legal needs.',
    goals: 'Reduce time-to-close on deals while maintaining thorough legal oversight',
    channels: 'Deal sourcing networks, industry conferences, partner referrals',
  },
];

const Personas = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/bd-central"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to Business Development
      </Link>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Client Personas</h1>
          <p className="text-gray-600">Key client profiles: Capital partners and portfolio managers</p>
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
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{persona.name}</h3>
                  <p className="text-sm text-gray-500">{persona.title}</p>
                  <p className="text-xs text-gray-400">{persona.company}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">Pain Points</p>
                  <p className="text-sm text-gray-700 line-clamp-3">{persona.painPoints}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">Goals</p>
                  <p className="text-sm text-gray-700">{persona.goals}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">Channels</p>
                  <p className="text-sm text-gray-700 line-clamp-2">{persona.channels}</p>
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
