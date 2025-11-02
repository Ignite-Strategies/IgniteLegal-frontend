import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Bell } from 'lucide-react';

// Mock team members
const teamMembers = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Senior Legal Associate',
    email: 'sarah@businesspointlaw.com',
    avatar: 'SC',
    workload: 'Moderate',
    currentNDAs: 3,
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Legal Associate',
    email: 'michael@businesspointlaw.com',
    avatar: 'MR',
    workload: 'Light',
    currentNDAs: 1,
  },
  {
    id: 3,
    name: 'Jennifer Park',
    role: 'Junior Legal Associate',
    email: 'jennifer@businesspointlaw.com',
    avatar: 'JP',
    workload: 'Heavy',
    currentNDAs: 5,
  },
];

// Mock pending NDAs to assign
const pendingNDAs = [
  {
    id: 1,
    dealName: 'Ares Capital – SolarTrust Acquisition',
    counterparty: 'SolarTrust LLC',
    priority: 'High',
    dueDate: '2025-01-25',
  },
  {
    id: 2,
    dealName: 'Orion Holdings – Meridian JV',
    counterparty: 'Meridian Partners',
    priority: 'Medium',
    dueDate: '2025-02-01',
  },
];

const AssignNdaWork = () => {
  const navigate = useNavigate();

  const handleAssign = (ndaId, memberId) => {
    const nda = pendingNDAs.find(n => n.id === ndaId);
    const member = teamMembers.find(m => m.id === memberId);
    console.log(`Assigning ${nda.dealName} to ${member.name}`);
    // In real app, this would make an API call
    alert(`Assigned ${nda.dealName} to ${member.name}. They will be notified via email and in-app notification.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/nda-hub"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to NDA Management
      </Link>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Assign NDA Work</h1>
        <p className="text-gray-600">Assign NDAs to team members for review and drafting</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending NDAs */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Pending NDAs to Assign</h2>
          <div className="space-y-4">
            {pendingNDAs.map((nda) => (
              <div key={nda.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{nda.dealName}</h3>
                    <p className="text-sm text-gray-500">{nda.counterparty}</p>
                  </div>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      nda.priority === 'High'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {nda.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4">Due: {nda.dueDate}</p>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Assign to:</p>
                  <div className="flex flex-wrap gap-2">
                    {teamMembers.map((member) => (
                      <button
                        key={member.id}
                        onClick={() => handleAssign(nda.id, member.id)}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-lg text-sm transition"
                      >
                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                          {member.avatar}
                        </span>
                        {member.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Team Members</h2>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {member.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {member.email}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Workload</p>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                            member.workload === 'Heavy'
                              ? 'bg-red-100 text-red-800'
                              : member.workload === 'Moderate'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {member.workload}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Current NDAs</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">{member.currentNDAs}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* How Assignment Works */}
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Bell className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">How Assignment Works</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Team member receives email notification</li>
                  <li>• In-app notification appears in their dashboard</li>
                  <li>• NDA appears in their "My Assigned NDAs" queue</li>
                  <li>• They can review and start work immediately</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignNdaWork;

