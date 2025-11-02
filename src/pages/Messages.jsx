import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { MessageSquare, Plus, Send, FileText, Clock, CheckCircle } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useMicrosoftGraph } from '../hooks/useMicrosoftGraph';

export default function Messages() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const contactId = searchParams.get('contact');
  const [messages, setMessages] = useLocalStorage('messages', []);
  const [contacts] = useLocalStorage('contacts', []);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [composeData, setComposeData] = useState({
    contactId: contactId || '',
    subject: '',
    body: ''
  });
  const { sendMessage, loading } = useMicrosoftGraph();

  // Quick templates
  const templates = [
    {
      name: 'Intro – NDA Support',
      subject: 'Streamlining NDA Management for Your Portfolio',
      body: `Hi {{firstName}},

I hope this message finds you well. I wanted to introduce our NDA management services that help capital partners and portfolio managers streamline legal document workflows.

Our system can reduce NDA turnaround time by up to 60% while maintaining compliance and quality standards.

Would you be open to a brief conversation about how we can support your portfolio companies?

Best regards,
Joel`
    },
    {
      name: 'Follow-Up – Reminder',
      subject: 'Following up on our conversation',
      body: `Hi {{firstName}},

Just wanted to check in on the legal support we discussed for {{company}}.

Is this still a priority? I'm happy to provide more details or schedule a call at your convenience.

Best regards,
Joel`
    }
  ];

  const handleSend = async () => {
    if (!composeData.contactId || !composeData.subject || !composeData.body) {
      alert('Please fill in all fields');
      return;
    }

    const contact = contacts.find(c => c.id === composeData.contactId);
    if (!contact) {
      alert('Contact not found');
      return;
    }

    try {
      await sendMessage({
        contactId: contact.id,
        contactName: contact.name,
        to: contact.email,
        subject: composeData.subject,
        body: composeData.body
      });

      // Refresh messages
      const updated = JSON.parse(localStorage.getItem('messages') || '[]');
      setMessages(updated);

      alert('Message sent via Microsoft Graph (mocked)!');
      setShowComposeModal(false);
      setComposeData({ contactId: '', subject: '', body: '' });
    } catch (error) {
      alert('Failed to send message');
    }
  };

  const filteredMessages = contactId 
    ? messages.filter(m => m.contactId === contactId)
    : messages;

  const recentMessages = filteredMessages
    .sort((a, b) => new Date(b.sentAt || 0) - new Date(a.sentAt || 0))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/bd-central"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to Business Development
      </Link>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Messages / Activity Feed</h1>
          <p className="text-gray-600">Outlook messages and communication history</p>
        </div>
        <button
          onClick={() => setShowComposeModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Compose Message
        </button>
      </div>

      {/* Quick Templates */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Quick Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {templates.map((template, index) => (
            <button
              key={index}
              onClick={() => {
                setComposeData({
                  ...composeData,
                  subject: template.subject,
                  body: template.body
                });
                setShowComposeModal(true);
              }}
              className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 text-left transition"
            >
              <div className="flex items-center gap-2 mb-1">
                <FileText className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-gray-900">{template.name}</span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-1">{template.subject}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Messages Timeline */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Recent Messages</h2>
        <div className="space-y-4">
          {recentMessages.length > 0 ? (
            recentMessages.map((message) => (
              <div key={message.id} className="border-l-2 border-blue-200 pl-4 py-2">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-900">{message.contactName}</p>
                    <p className="text-sm text-gray-600">{message.to}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-green-600">Sent</span>
                  </div>
                </div>
                <p className="font-semibold text-gray-900 mb-1">{message.subject}</p>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">{message.body}</p>
                {message.sentAt && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(message.sentAt).toLocaleString()}</span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">No messages yet. Send your first message to get started.</p>
          )}
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <tr key={message.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{message.contactName}</p>
                        <p className="text-xs text-gray-500">{message.to}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{message.subject}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-600">Sent</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {message.sentAt ? new Date(message.sentAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => navigate(`/messages/${message.id}`)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No messages yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compose Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Compose Message</h2>
              <button
                onClick={() => setShowComposeModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To (Contact)</label>
                <select
                  value={composeData.contactId}
                  onChange={(e) => setComposeData({ ...composeData, contactId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select contact...</option>
                  {contacts.map(contact => (
                    <option key={contact.id} value={contact.id}>
                      {contact.name} - {contact.email}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={composeData.subject}
                  onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
                  placeholder="Enter subject line"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={composeData.body}
                  onChange={(e) => setComposeData({ ...composeData, body: e.target.value })}
                  placeholder="Write your message here..."
                  rows="10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use {{firstName}}, {{lastName}}, {{company}} for personalization
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowComposeModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                {loading ? 'Sending...' : 'Send via Outlook'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
