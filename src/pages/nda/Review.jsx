import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const ndas = [
  {
    id: 1,
    dealName: "Ares Capital – SolarTrust Acquisition",
    counterparty: "SolarTrust LLC",
    purpose: "Due diligence data room access",
    scope: "Financials only",
    expiration: "2025-12-31",
    status: "In Review",
  },
  {
    id: 2,
    dealName: "Orion Holdings – Meridian JV",
    counterparty: "Meridian Partners",
    purpose: "Strategic partnership evaluation",
    scope: "IP roadmap + financial summaries",
    expiration: "2026-03-15",
    status: "Approved",
  },
];

const Review = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const nda = ndas.find(n => n.id === parseInt(id));

  const [scope, setScope] = useState(nda?.scope || '');

  if (!nda) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-gray-600">NDA not found.</p>
        <Link
          to="/nda-dashboard"
          className="text-sm text-blue-600 hover:text-blue-700 mt-4 inline-block"
        >
          ← Back to NDA Dashboard
        </Link>
      </div>
    );
  }

  const handleApprove = () => {
    console.log(`Approved NDA ID: ${nda.id}`);
    navigate(`/approval-final/${nda.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/nda-dashboard"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to NDA Dashboard
      </Link>

      <h2 className="text-2xl font-medium text-gray-900 mb-6">Review NDA</h2>

      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deal Name
          </label>
          <p className="text-sm text-gray-900">{nda.dealName}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Counterparty
          </label>
          <p className="text-sm text-gray-900">{nda.counterparty}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Purpose
          </label>
          <p className="text-sm text-gray-900">{nda.purpose}</p>
        </div>

        <div>
          <label htmlFor="scope" className="block text-sm font-medium text-gray-700 mb-1">
            Scope
          </label>
          <textarea
            id="scope"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expiration
          </label>
          <p className="text-sm text-gray-900">{nda.expiration}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              nda.status === "Approved"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {nda.status}
          </span>
        </div>

        <div className="flex gap-4 pt-4 border-t">
          <button
            onClick={handleApprove}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
          >
            Approve
          </button>
          <button
            onClick={() => navigate('/nda-dashboard')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-medium"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;

