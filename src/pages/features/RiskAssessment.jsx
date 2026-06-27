import { useState } from 'react';
import { Shield, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import api from '../../api/axios';

function RiskAssessment() {
  const { darkMode } = useTheme();
  const { success, error } = useToast();
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const questions = [
    { id: 'q1', text: 'Does your partner control your money or access to resources?' },
    { id: 'q2', text: 'Has there been previous physical violence?' },
    { id: 'q3', text: 'Have there been threats with a weapon?' },
    { id: 'q4', text: 'Are your children in danger?' },
    { id: 'q5', text: 'Do you feel unsafe in your home?' },
  ];

  const handleAnswer = (qId, value) => {
    setAnswers({ ...answers, [qId]: value });
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      error('Please answer all questions');
      return;
    }
    setIsLoading(true);
    try {
      const response = await api.post('/safety/risk-assessment/', { answers });
      setResult(response.data);
      success('Risk assessment complete');
    } catch (err) {
      error('Failed to complete assessment');
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
          <div className="p-3 rounded-xl bg-red-500/10">
            <Shield className="w-6 h-6 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-secondary dark:text-white">Risk Assessment</h1>
        </div>

        {!result ? (
          <>
            <div className="space-y-4 mb-6">
              {questions.map((q, idx) => (
                <div key={q.id} className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                  <p className="text-secondary dark:text-white font-medium mb-2">
                    {idx + 1}. {q.text}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAnswer(q.id, true)}
                      className={`px-4 py-2 rounded-lg transition ${
                        answers[q.id] === true
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-red-100'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleAnswer(q.id, false)}
                      className={`px-4 py-2 rounded-lg transition ${
                        answers[q.id] === false
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-green-100'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? 'Analyzing...' : 'Get Risk Score'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </>
        ) : (
          <div className="space-y-4">
            <div className={`p-6 rounded-xl ${result.risk_level === 'high' ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'}`}>
              <div className="flex items-center gap-3 mb-2">
                {result.risk_level === 'high' ? (
                  <AlertCircle className="w-8 h-8 text-red-500" />
                ) : (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                )}
                <div>
                  <h3 className="text-xl font-bold text-secondary dark:text-white">
                    Risk Level: {result.risk_level?.toUpperCase()}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">Score: {result.score}/15</p>
                </div>
              </div>
              <div className="mt-4 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50">
                <h4 className="font-semibold text-secondary dark:text-white mb-2">Safety Plan</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{result.safety_plan}</p>
              </div>
            </div>
            <button
              onClick={() => setResult(null)}
              className="w-full bg-secondary text-white px-6 py-3 rounded-xl font-semibold hover:bg-dark transition"
            >
              Retake Assessment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RiskAssessment;
