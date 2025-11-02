import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Ingest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dealName: '',
    counterparty: '',
    purpose: '',
    scope: '',
    expiration: '',
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
    const newNDA = {
      id: Date.now(), // Simple ID generation
      ...formData,
      status: "In Review",
    };
    console.log('New NDA:', newNDA);
    // Reset form after submission
    setFormData({
      dealName: '',
      counterparty: '',
      purpose: '',
      scope: '',
      expiration: '',
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/nda-hub"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to NDA Management
      </Link>

      <h2 className="text-2xl font-medium text-gray-900 mb-6">Ingest Party/Deal Data</h2>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="dealName" className="block text-sm font-medium text-gray-700 mb-1">
              Deal Name
            </label>
            <input
              type="text"
              id="dealName"
              name="dealName"
              value={formData.dealName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="counterparty" className="block text-sm font-medium text-gray-700 mb-1">
              Counterparty
            </label>
            <input
              type="text"
              id="counterparty"
              name="counterparty"
              value={formData.counterparty}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
              Purpose
            </label>
            <input
              type="text"
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="scope" className="block text-sm font-medium text-gray-700 mb-1">
              Scope
            </label>
            <textarea
              id="scope"
              name="scope"
              value={formData.scope}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="expiration" className="block text-sm font-medium text-gray-700 mb-1">
              Expiration Date
            </label>
            <input
              type="date"
              id="expiration"
              name="expiration"
              value={formData.expiration}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => navigate('/nda-hub')}
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

export default Ingest;

