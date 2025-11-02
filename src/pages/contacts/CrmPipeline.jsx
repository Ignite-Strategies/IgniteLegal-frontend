import { Link } from 'react-router-dom';
import { TrendingUp, Users, FileText } from 'lucide-react';

// Mock pipeline data
const pipelineStages = [
  {
    stage: 'Prospect',
    count: 5,
    value: 125000,
    contacts: [
      { name: 'Meridian Partners', company: 'Investment Firm', value: 45000 },
      { name: 'TechVentures Capital', company: 'VC Fund', value: 32000 },
      { name: 'Growth Equity Partners', company: 'PE Firm', value: 48000 },
    ]
  },
  {
    stage: 'Qualified',
    count: 3,
    value: 85000,
    contacts: [
      { name: 'SolarTrust LLC', company: 'Energy Company', value: 35000 },
      { name: 'Ares Capital', company: 'Debt Financing', value: 30000 },
      { name: 'Orion Holdings', company: 'Private Equity', value: 20000 },
    ]
  },
  {
    stage: 'Proposal',
    count: 2,
    value: 95000,
    contacts: [
      { name: 'Capital Partners Fund', company: 'Investment Fund', value: 55000 },
      { name: 'Strategic Ventures', company: 'VC Firm', value: 40000 },
    ]
  },
  {
    stage: 'Negotiation',
    count: 1,
    value: 75000,
    contacts: [
      { name: 'Enterprise Capital Group', company: 'PE Firm', value: 75000 },
    ]
  },
  {
    stage: 'Client',
    count: 8,
    value: 485000,
    contacts: [
      { name: 'Ares Capital', company: 'Debt Financing', value: 120000 },
      { name: 'SolarTrust LLC', company: 'Energy Company', value: 95000 },
      { name: 'Orion Holdings', company: 'Private Equity', value: 80000 },
      { name: 'Meridian Partners', company: 'Investment Firm', value: 65000 },
      { name: 'Capital Ventures', company: 'VC Fund', value: 55000 },
      { name: 'Growth Equity', company: 'PE Firm', value: 40000 },
      { name: 'Strategic Capital', company: 'Investment Firm', value: 20000 },
      { name: 'Tech Partners', company: 'VC Fund', value: 10000 },
    ]
  }
];

export default function CrmPipeline() {
  const totalValue = pipelineStages.reduce((sum, stage) => sum + stage.value, 0);
  const totalContacts = pipelineStages.reduce((sum, stage) => sum + stage.count, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/crm-hub"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to CRM Hub
      </Link>

      {/* Mission Statement */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
        <p className="text-lg text-gray-800 font-medium italic">
          "We're trying to better the world. It starts here."
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Your pipeline represents more than numbers—it's the pathway to building relationships that drive positive change. Every stage moves us closer to meaningful impact.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <p className="text-sm font-medium text-gray-500">Total Pipeline Value</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-5 w-5 text-green-600" />
            <p className="text-sm font-medium text-gray-500">Total Contacts</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalContacts}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-5 w-5 text-purple-600" />
            <p className="text-sm font-medium text-gray-500">Active Stages</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{pipelineStages.length}</p>
        </div>
      </div>

      {/* Pipeline Stages */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {pipelineStages.map((stage, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{stage.stage}</h3>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                  {stage.count}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">${stage.value.toLocaleString()}</p>
            </div>

            <div className="space-y-3">
              {stage.contacts.map((contact, contactIndex) => (
                <div
                  key={contactIndex}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition"
                >
                  <p className="font-medium text-gray-900 text-sm">{contact.name}</p>
                  <p className="text-xs text-gray-500">{contact.company}</p>
                  <p className="text-xs font-semibold text-blue-600 mt-1">
                    ${contact.value.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

