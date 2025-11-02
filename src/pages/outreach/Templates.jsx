import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Copy, Mail } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export default function Templates() {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(null);

  const templates = [
    {
      id: 'need-nda',
      name: 'Need an NDA?',
      subject: 'Following up on NDA',
      body: `Hi {{name}},

I hope this email finds you well. I wanted to reach out regarding a potential collaboration/partnership opportunity between our organizations.

Before we dive deeper into the details, we'll need to have a Non-Disclosure Agreement (NDA) in place to protect both parties' confidential information.

Would you be available for a brief call this week to discuss the opportunity and next steps for the NDA?

Looking forward to connecting!

Best regards,
{{yourName}}`
    },
    {
      id: 'catching-up',
      name: 'Catching up after awhile',
      subject: 'Catching up',
      body: `Hi {{name}},

It's been a while since we last connected, and I wanted to reach out to catch up.

I've been thinking about our previous conversations regarding {{topic}}, and I'd love to hear how things have been progressing on your end.

Would you be open to a quick call or coffee meeting in the coming weeks? I'd love to hear what you've been working on and see if there are any opportunities for collaboration.

Let me know what works for you!

Best regards,
{{yourName}}`
    },
    {
      id: 'aare-alum',
      name: 'Aare Alum Checking in',
      subject: 'AARE Alum - Checking in',
      body: `Hi {{name}},

I hope this message finds you well! As a fellow AARE alum, I wanted to reach out and reconnect.

It's been great seeing the impact you've been making in {{field/company}}, and I'd love to catch up and hear more about what you're working on.

Would you be interested in connecting for a quick call or meeting? I'd also love to hear your thoughts on how we might collaborate or support each other's initiatives.

Looking forward to reconnecting!

Best regards,
{{yourName}}`
    }
  ];

  const handleCopy = (templateId, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(templateId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUseTemplate = (template) => {
    // Navigate to campaign creator with template pre-filled
    navigate('/outreach/campaign-creator', {
      state: {
        template: template
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Email Templates"
        subtitle="Reusable email templates for your outreach campaigns"
        backTo="/outreach"
        backLabel="Back to Outreach"
      />

      <div className="grid grid-cols-1 gap-6 mt-8">
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{template.name}</h3>
                  </div>
                  <div className="ml-13 mt-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Subject:</span> {template.subject}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopy(template.id, `${template.subject}\n\n${template.body}`)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center gap-2 text-sm"
                  >
                    <Copy className="h-4 w-4" />
                    {copiedId === template.id ? 'Copied!' : 'Copy'}
                  </button>
                  <button
                    onClick={() => handleUseTemplate(template)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 text-sm"
                  >
                    <Mail className="h-4 w-4" />
                    Use Template
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                  {template.body}
                </pre>
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

