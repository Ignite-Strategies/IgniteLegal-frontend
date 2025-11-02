import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Calendar, CheckCircle, FileText, Clock } from 'lucide-react';
import { mockMeetings } from '../data/mockData';

export default function MeetingPrep() {
  const { id } = useParams();
  const navigate = useNavigate();
  const meeting = mockMeetings.find(m => m.id === parseInt(id));
  const [agendaItems, setAgendaItems] = useState([
    { id: 1, text: 'Discuss current portfolio strategy', completed: false },
    { id: 2, text: 'Review potential deal pipeline', completed: false },
    { id: 3, text: 'Explore collaboration opportunities', completed: false },
  ]);
  const [notes, setNotes] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  if (!meeting) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-gray-600 mb-4">Meeting not found.</p>
        <Link
          to="/growth-dashboard"
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          ← Back to Growth Dashboard
        </Link>
      </div>
    );
  }

  const toggleAgendaItem = (itemId) => {
    setAgendaItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const addAgendaItem = () => {
    const newItem = {
      id: Date.now(),
      text: '',
      completed: false,
      isNew: true,
    };
    setAgendaItems([...agendaItems, newItem]);
  };

  const updateAgendaItem = (itemId, text) => {
    setAgendaItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, text, isNew: false } : item
      )
    );
  };

  const removeAgendaItem = (itemId) => {
    setAgendaItems(items => items.filter(item => item.id !== itemId));
  };

  const handleMarkComplete = () => {
    setIsComplete(true);
    setTimeout(() => {
      navigate('/meeting-dashboard');
    }, 1500);
  };

  const completedCount = agendaItems.filter(item => item.completed).length;
  const progressPercent = agendaItems.length > 0 ? (completedCount / agendaItems.length) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/meeting-dashboard"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to Meeting Dashboard
      </Link>

      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {meeting.avatar}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">{meeting.name}</h1>
              <p className="text-lg text-gray-600">{meeting.company}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{meeting.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{meeting.time}</span>
                </div>
              </div>
            </div>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
            {meeting.status}
          </span>
        </div>

        {/* Progress Indicator */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Agenda Progress</span>
            <span className="text-sm font-bold text-gray-900">
              {completedCount}/{agendaItems.length} completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Agenda Checklist */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-orange-600" />
            Agenda Checklist
          </h2>
          <button
            onClick={addAgendaItem}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            + Add Item
          </button>
        </div>
        <div className="space-y-3">
          {agendaItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <button
                onClick={() => toggleAgendaItem(item.id)}
                className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  item.completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 hover:border-green-400'
                }`}
              >
                {item.completed && <CheckCircle className="h-4 w-4" />}
              </button>
              {item.isNew ? (
                <input
                  type="text"
                  placeholder="Enter agenda item..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  autoFocus
                  onBlur={(e) => {
                    if (e.target.value.trim()) {
                      updateAgendaItem(item.id, e.target.value);
                    } else {
                      removeAgendaItem(item.id);
                    }
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.target.blur();
                    }
                  }}
                />
              ) : (
                <>
                  <p
                    className={`flex-1 text-sm ${
                      item.completed
                        ? 'line-through text-gray-400'
                        : 'text-gray-900'
                    }`}
                  >
                    {item.text}
                  </p>
                  <button
                    onClick={() => removeAgendaItem(item.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="h-6 w-6 text-purple-600" />
          <h2 className="text-2xl font-bold">Meeting Notes</h2>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add your notes, questions, talking points, and key information here..."
          rows="10"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/meeting-dashboard')}
          className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
        >
          Save & Return
        </button>
        <button
          onClick={handleMarkComplete}
          disabled={isComplete}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isComplete ? (
            <span className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Meeting Completed!
            </span>
          ) : (
            'Mark Complete'
          )}
        </button>
      </div>
    </div>
  );
}

