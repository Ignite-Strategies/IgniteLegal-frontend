import { Link, useParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const ApprovalFinal = () => {
  const { id } = useParams();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">NDA Approved</h1>
        
        <p className="text-lg text-gray-700 mb-2">
          You've approved this NDA and it will now appear in the queue as approved.
        </p>
        
        <p className="text-lg text-gray-700 mb-8">
          We'll let the drafter know.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/nda/review"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-sm font-medium"
          >
            Back to Review Queue
          </Link>
          <Link
            to="/nda-hub"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded text-sm font-medium"
          >
            NDA Management Hub
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApprovalFinal;

