import { useState } from 'react';
import { Scale, Search, Send, BookOpen } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import api from '../../api/axios';

function LegalQA() {
  const { darkMode } = useTheme();
  const { success, error } = useToast();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) {
      error('Please enter a question');
      return;
    }
    setIsLoading(true);
    try {
      const response = await api.post('/legal/ask/', {
        question: question,
        session_id: 'user_' + Date.now()
      });
      setAnswer(response.data);
      success('Answer received!');
    } catch (err) {
      error('Failed to get answer');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="transition-colors duration-300">
      <div className={`rounded-2xl p-8 backdrop-blur-xl border ${
        darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/70 border-white/20 shadow-xl'
      }`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-blue-500/10">
            <Scale className="w-6 h-6 text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold text-secondary dark:text-white">Legal Rights Bot</h1>
        </div>

        <div className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className={`flex-1 px-4 py-3 rounded-xl border ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-primary`}
              placeholder="Ask about your legal rights..."
              onKeyPress={(e) => e.key === 'Enter' && askQuestion()}
            />
            <button
              onClick={askQuestion}
              disabled={isLoading}
              className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            {['Domestic Violence', 'Protection Order', 'Sexual Offences', 'Child Rights'].map(tag => (
              <button
                key={tag}
                onClick={() => setQuestion(`What is ${tag} under Kenyan law?`)}
                className={`text-sm px-3 py-1 rounded-full ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                } hover:bg-primary/20 transition`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {answer && (
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <h3 className="font-semibold text-secondary dark:text-white mb-2">Answer</h3>
            <p className="text-gray-700 dark:text-gray-300">{answer.answer}</p>
            {answer.law && (
              <div className="mt-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm text-primary font-medium">📚 {answer.law}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default LegalQA;
