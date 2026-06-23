import React, { useState, useRef, useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';
import { message } from 'antd';
import { getGPSLocation } from '../../utils/helpers';
import api from '../../api/axios';
import { useTranslation } from '../../context/LanguageContext';

export const EmergencyButton = () => {
  const { t } = useTranslation();
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const startHold = () => {
    setHolding(true);
    setProgress(0);

    // Setup visual progress increment
    const intervalTime = 30; // ms
    const totalTime = 2000;  // 2 seconds for quick response but safety
    const steps = totalTime / intervalTime;
    let currentStep = 0;

    progressIntervalRef.current = setInterval(() => {
      currentStep++;
      const p = Math.min((currentStep / steps) * 100, 100);
      setProgress(p);

      if (p >= 100) {
        clearInterval(progressIntervalRef.current);
      }
    }, intervalTime);

    timerRef.current = setTimeout(async () => {
      triggerSOS();
      resetHold();
    }, totalTime);
  };

  const resetHold = () => {
    setHolding(false);
    setProgress(0);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  const triggerSOS = async () => {
    try {
      message.loading({ content: 'Retrieving GPS Location & Alerting Responders...', key: 'sos' });
      let coords = { latitude: 0, longitude: 0 };
      
      try {
        coords = await getGPSLocation();
      } catch (err) {
        console.warn('GPS location retrieval failed/denied, sending alert without coords', err);
      }

      await api.post('safety/timer/start/', {
        duration_seconds: 0, // 0 signifies immediate emergency trigger
        latitude: coords.latitude,
        longitude: coords.longitude,
        is_sos: true,
      });

      message.success({ content: 'SOS ALERT BROADCASTED SUCCESSFULLY! Responders are notified.', key: 'sos', duration: 8 });
      
      // Vibrate if mobile device
      if (navigator.vibrate) {
        navigator.vibrate([500, 200, 500, 200, 500]);
      }
    } catch (error) {
      message.error({ content: 'Failed to send SOS. Check internet connection.', key: 'sos', duration: 5 });
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
      {holding && (
        <div className="mb-2 bg-brand-dark/90 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-sm animate-pulse">
          {t('instantSosDesc') || 'Keep holding...'}
        </div>
      )}
      <button
        onMouseDown={startHold}
        onMouseUp={resetHold}
        onMouseLeave={resetHold}
        onTouchStart={startHold}
        onTouchEnd={resetHold}
        className={`relative w-18 h-18 rounded-full flex items-center justify-center text-white font-bold transition-all transform active:scale-95 shadow-2xl focus:outline-none select-none cursor-pointer ${
          holding ? 'bg-red-700 scale-105' : 'bg-red-600 hover:bg-red-700 hover:shadow-red-600/30'
        }`}
        style={{
          boxShadow: holding 
            ? '0 0 30px #dc2626, inset 0 0 15px rgba(0,0,0,0.2)' 
            : '0 10px 25px rgba(220, 38, 38, 0.4), inset 0 4px 6px rgba(255,255,255,0.25)'
        }}
      >
        {/* Animated Radial Border Progress */}
        {holding && (
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="36"
              cy="36"
              r="33"
              className="stroke-red-900 fill-none"
              strokeWidth="5"
            />
            <circle
              cx="36"
              cy="36"
              r="33"
              className="stroke-white fill-none transition-all duration-75"
              strokeWidth="5"
              strokeDasharray={`${2 * Math.PI * 33}`}
              strokeDashoffset={`${2 * Math.PI * 33 * (1 - progress / 100)}`}
            />
          </svg>
        )}

        <div className="flex flex-col items-center justify-center pointer-events-none">
          <ShieldAlert className={`w-8 h-8 ${holding ? 'animate-bounce' : 'animate-pulse'}`} />
          <span className="text-[10px] uppercase tracking-wider font-extrabold mt-0.5">SOS</span>
        </div>
      </button>
    </div>
  );
};

export default EmergencyButton;
