import { useState } from 'react';
import { Phone } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { triggerPanic } from '../../api/panic';

function EmergencyButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { success, error } = useToast();

  const handleSOS = async () => {
    setIsLoading(true);
    try {
      // Get user location
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const response = await triggerPanic({ location: `${latitude}, ${longitude}` });
      
      success('Emergency alert sent! Help is on the way.');
    } catch (err) {
      if (err.code === 1) {
        error('Location access denied. Please call 1195 directly.');
      } else {
        error('Failed to send alert. Call 1195 for help.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSOS}
      disabled={isLoading}
      className="fixed bottom-6 right-6 bg-red-500 text-white p-4 rounded-full shadow-2xl font-bold hover:bg-red-600 transition-all animate-pulse z-50 disabled:opacity-50 disabled:animate-none"
    >
      {isLoading ? (
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <Phone className="w-6 h-6" />
      )}
    </button>
  );
}

export default EmergencyButton;
