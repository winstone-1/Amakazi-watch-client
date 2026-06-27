import { useState } from 'react';
import { Clock, Play, Pause, RotateCcw, CheckCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import api from '../../api/axios';

function SafetyTimer() {
  const { darkMode } = useTheme();
  const { success, error } = useToast();
  const [duration, setDuration] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isLoading, setIsLoading] = useState(false);

  const startTimer = async () => {
    setIsLoading(true);
    try {
      const response = await api.post('/safety/timer/start/', {
        duration_minutes: duration
      });
      setIsActive(true);
      setTimeLeft(duration);
      success('Safety timer started!');
      
      // Countdown logic
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 60000);
    } catch (err) {
      error('Failed to start timer. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const checkIn = async () => {
    try {
      await api.post('/safety/timer/check-in/');
      setIsActive(false);
      setTimeLeft(0);
      success('Check-in successful! You are safe.');
    } catch (err) {
      error('Check-in failed. Please try again.');
    }
  };

  return (
    <div className="transition-colors duration-300">
      <div className={`rounded-2xl p-8 backdrop-blur-xl border ${
        darkMode 
          ? 'bg-gray-800/50 border-gray-700' 
          : 'bg-white/70 border-white/20 shadow-xl'
      }`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-primary/10">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-secondary dark:text-white">Safety Timer</h1>
        </div>

        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-primary mb-2">
            {timeLeft}:00
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            {isActive ? 'Timer running...' : 'Set your safety timer'}
          </p>
        </div>

        {!isActive && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Duration (minutes)
            </label>
            <div className="flex gap-2 flex-wrap">
              {[15, 30, 45, 60].map((mins) => (
                <button
                  key={mins}
                  onClick={() => setDuration(mins)}
                  className={`px-4 py-2 rounded-lg transition ${
                    duration === mins
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary/20'
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 flex-wrap">
          {!isActive ? (
            <button
              onClick={startTimer}
              disabled={isLoading}
              className="flex-1 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Play className="w-5 h-5" />
              Start Timer
            </button>
          ) : (
            <button
              onClick={checkIn}
              className="flex-1 bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Check In (I'm Safe)
            </button>
          )}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-700 dark:text-amber-400">
            ⚠️ If you don't check in, emergency contacts will be notified.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SafetyTimer;
