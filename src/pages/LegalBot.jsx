import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { Scale, MessageCircle, BookOpen } from 'lucide-react';

function LegalBot() {
  const { darkMode } = useTheme();

  return (
    <div className="transition-colors duration-300">
      <div className="bg-white dark:bg-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <Scale className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-secondary dark:text-white">Legal Rights Bot</h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-4">Ask questions about Kenyan GBV laws.</p>
        
        <Link
          to="/legal/ask"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          <MessageCircle className="w-5 h-5" />
          Ask a Question
        </Link>

        <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Common Topics
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-blue-600 dark:text-blue-300">
            <li>• Protection Against Domestic Violence Act</li>
            <li>• Sexual Offences Act</li>
            <li>• Marriage Act (Matrimonial Property)</li>
            <li>• Children's Act</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LegalBot;
