import { useNavigate, Link } from 'react-router-dom';
import { Users } from 'lucide-react';

const ndas = [
  {
    id: 1,
    dealName: "Ares Capital – SolarTrust Acquisition",
    counterparty: "SolarTrust LLC",
    contactId: 1,
    contactName: "David Chen",
    purpose: "Due diligence data room access",
    scope: "Financials only",
    expiration: "2025-12-31",
    status: "In Review",
    turnaroundStatus: "In Progress",
    daysSinceSubmission: 3,
    signedDate: null,
  },
  {
    id: 2,
    dealName: "Orion Holdings – Meridian JV",
    counterparty: "Meridian Partners",
    contactId: 2,
    contactName: "Sarah Martinez",
    purpose: "Strategic partnership evaluation",
    scope: "IP roadmap + financial summaries",
    expiration: "2026-03-15",
    status: "Approved",
    turnaroundStatus: "Completed",
    daysSinceSubmission: 12,
    signedDate: "2025-01-10",
  },
];

const NDADashboard = () => {
  const navigate = useNavigate();

  const totalNDAs = ndas.length;
  const inReview = ndas.filter(nda => nda.status === "In Review").length;
  const approved = ndas.filter(nda => nda.status === "Approved").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-medium text-gray-900 mb-6">NDA Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm font-medium text-gray-500">Total NDAs</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{totalNDAs}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm font-medium text-gray-500">In Review</p>
          <p className="text-2xl font-semibold text-yellow-600 mt-1">{inReview}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm font-medium text-gray-500">Approved</p>
          <p className="text-2xl font-semibold text-green-600 mt-1">{approved}</p>
        </div>
      </div>

      {/* NDA Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deal Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Counterparty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Turnaround
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Signed Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ndas.map((nda) => (
                <tr key={nda.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {nda.dealName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {nda.counterparty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {nda.contactName ? (
                      <Link
                        to={`/contacts`}
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <Users className="h-3 w-3" />
                        {nda.contactName}
                      </Link>
                    ) : (
                      <span className="text-sm text-gray-400">No contact</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      nda.turnaroundStatus === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {nda.turnaroundStatus} ({nda.daysSinceSubmission} days)
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {nda.signedDate || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        nda.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {nda.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => navigate(`/review/${nda.id}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NDADashboard;

