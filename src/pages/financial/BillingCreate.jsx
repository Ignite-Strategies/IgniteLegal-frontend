import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Mock NDAs data (in real app, this would come from API/localStorage)
const ndas = [
  {
    id: 1,
    dealName: "Ares Capital – SolarTrust Acquisition",
    counterparty: "SolarTrust LLC",
    status: "Approved",
  },
  {
    id: 2,
    dealName: "Orion Holdings – Meridian JV",
    counterparty: "Meridian Partners",
    status: "Approved",
  },
  {
    id: 3,
    dealName: "TechCorp – Innovation Labs Partnership",
    counterparty: "Innovation Labs Inc.",
    status: "Draft Ready",
  },
];

const BillingCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientName: '',
    invoiceNumber: `INV-2025-${String(Date.now()).slice(-3)}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    description: '',
    amount: '',
    ndaCount: ndas.filter(n => n.status === 'Approved').length, // Auto-hydrated
    lineItems: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const invoice = {
      ...formData,
      totalAmount: formData.amount || 0,
    };
    console.log('New Invoice:', invoice);
    navigate('/financial/billing');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/financial/billing"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to Billing
      </Link>

      <h2 className="text-2xl font-medium text-gray-900 mb-6">Create Invoice</h2>

      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Auto-hydrated Info */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-sm font-medium text-blue-900 mb-1">Auto-populated from NDA data:</p>
          <p className="text-sm text-blue-700">
            Number of Approved NDAs: <span className="font-semibold">{formData.ndaCount}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
              Client Name
            </label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Invoice Number
              </label>
              <input
                type="text"
                id="invoiceNumber"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Invoice Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="NDA review and drafting services"
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount ($)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
            >
              Create Invoice
            </button>
            <button
              type="button"
              onClick={() => navigate('/financial/billing')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BillingCreate;

