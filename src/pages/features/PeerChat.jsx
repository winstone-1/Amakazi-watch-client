import { useState } from 'react';
import { Users, Send, MessageCircle, UserPlus } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import api from '../../api/axios';

function PeerChat() {
  const { darkMode } = useTheme();
  const { success, error } = useToast();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(null);

  const findSupporter = async () => {
    try {
      const response = await api.post('/peer/sessions/find/', {
        language: 'en',
        county: 'Nairobi'
      });
      setSessionId(response.data.id);
      success('Peer supporter found!');
    } catch (err) {
      error('No supporters available right now');
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !sessionId) return;
    try {
      await api.post(`/peer/sessions/${sessionId}/message/`, { message: input });
      setMessages([...messages, { text: input, sent: true }]);
      setInput('');
    } catch (err) {
      error('Failed to send message');
    }
  };

  return (
    <div className="transition-colors duration-300">
      <div className={`rounded-2xl p-8 backdrop-blur-xl border ${
        darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/70 border-white/20 shadow-xl'
      }`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-pink-500/10">
            <Users className="w-6 h-6 text-pink-500" />
          </div>
          <h1 className="text-2xl font-bold text-secondary dark:text-white">Peer Support Chat</h1>
        </div>

        {!sessionId ? (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">Connect with a trained peer supporter</p>
            <button
              onClick={findSupporter}
              className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition flex items-center justify-center gap-2 mx-auto"
            >
              <UserPlus className="w-5 h-5" />
              Find Supporter
            </button>
          </div>
        ) : (
          <div>
            <div className={`h-96 overflow-y-auto mb-4 p-4 rounded-xl ${
              darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sent ? 'justify-end' : 'justify-start'} mb-3`}>
                  <div className={`max-w-[70%] p-3 rounded-xl ${
                    msg.sent 
                      ? 'bg-primary text-white' 
                      : darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className={`flex-1 px-4 py-2 rounded-xl border ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder="Type your message..."
              />
              <button
                onClick={sendMessage}
                className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PeerChat;
