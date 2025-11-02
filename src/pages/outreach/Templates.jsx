import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export default function Templates() {
  const navigate = useNavigate();

  const templates = [
    {
      id: 'need-nda',
      name: 'Need an NDA?',
      subject: 'Following up on NDA',
      preview: 'I hope this email finds you well. I wanted to reach out regarding a potential collaboration/partnership opportunity...',
      snippet: 'Reaching out about NDA requirements for collaboration'
    },
    {
      id: 'catching-up',
      name: 'Catching up after awhile',
      subject: 'Catching up',
      preview: "It's been a while since we last connected, and I wanted to reach out to catch up...",
      snippet: 'Reconnecting after some time'
    },
    {
      id: 'aare-alum',
      name: 'Aare Alum Checking in',
      subject: 'AARE Alum - Checking in',
      preview: 'I hope this message finds you well! As a fellow AARE alum, I wanted to reach out and reconnect...',
      snippet: 'AARE alumni reconnection message'
    }
  ];

  const handleViewTemplate = (templateId) => {
    navigate(`/outreach/templates/${templateId}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Email Templates"
        subtitle="Reusable email templates for your outreach campaigns"
        backTo="/outreach"
        backLabel="Back to Outreach"
      />

      <div className="space-y-4 mt-8">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleViewTemplate(template.id)}
            className="bg-white rounded-lg border border-gray-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{template.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-medium">Subject:</span> {template.subject}
                      </p>
                    </div>
                  </div>
                  <div className="ml-13 mt-2">
                    <p className="text-sm text-gray-600 line-clamp-2">{template.snippet}</p>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {templates.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No templates available</p>
        </div>
      )}
    </div>
  );
}

