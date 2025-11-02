import { Link, useParams } from 'react-router-dom';
import { Printer, Download } from 'lucide-react';

// Mock invoice data
const invoices = [
  {
    id: 1,
    client: 'SolarTrust LLC',
    amount: 5500,
    status: 'Paid',
    dueDate: '2025-01-15',
    invoiceDate: '2025-01-01',
    invoiceNumber: 'INV-2025-001',
    description: 'NDA review and drafting services - Ares Capital – SolarTrust Acquisition',
    paidDate: '2025-01-12',
  },
  {
    id: 2,
    client: 'Meridian Partners',
    amount: 3200,
    status: 'Pending',
    dueDate: '2025-01-20',
    invoiceDate: '2025-01-05',
    invoiceNumber: 'INV-2025-002',
    description: 'NDA review and drafting services - Orion Holdings – Meridian JV',
  },
  {
    id: 3,
    client: 'Ares Capital',
    amount: 8600,
    status: 'Overdue',
    dueDate: '2024-12-31',
    invoiceDate: '2024-12-15',
    invoiceNumber: 'INV-2024-045',
    description: 'NDA review and drafting services - Multiple NDAs',
  },
];

const BillingDetail = () => {
  const { id } = useParams();
  const invoice = invoices.find(inv => inv.id === parseInt(id));

  if (!invoice) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-gray-600">Invoice not found.</p>
        <Link
          to="/financial/billing"
          className="text-sm text-blue-600 hover:text-blue-700 mt-4 inline-block"
        >
          ← Back to Billing
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/financial/billing"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to Billing
      </Link>

      <div className="bg-white rounded-lg shadow-sm p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Invoice {invoice.invoiceNumber}</h1>
            <p className="text-gray-600">BusinessPoint Law</p>
          </div>
          <div className="text-right">
            <span
              className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                invoice.status === 'Paid'
                  ? 'bg-green-100 text-green-800'
                  : invoice.status === 'Overdue'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {invoice.status}
            </span>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-2">Bill To:</h3>
            <p className="text-gray-900 font-medium">{invoice.client}</p>
          </div>
          <div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Invoice Date:</span>
                <span className="text-gray-900">{invoice.invoiceDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Due Date:</span>
                <span className="text-gray-900">{invoice.dueDate}</span>
              </div>
              {invoice.paidDate && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Paid Date:</span>
                  <span className="text-gray-900">{invoice.paidDate}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div className="border-t border-b border-gray-200 py-6 mb-6">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900">{invoice.description}</p>
              </div>
              <p className="text-gray-900 font-semibold">${invoice.amount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-end mb-8">
          <div className="w-64">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Subtotal:</span>
              <span className="text-gray-900">${invoice.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Tax:</span>
              <span className="text-gray-900">$0.00</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-lg font-bold text-gray-900">${invoice.amount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 border-t border-gray-200 pt-6">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm font-medium">
            <Printer className="h-4 w-4" />
            Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm font-medium">
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingDetail;

