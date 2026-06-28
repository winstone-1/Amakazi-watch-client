import api from './axios';

export const startSafetyTimer = async (payload) => {
  // payload: { duration_seconds, latitude, longitude }
  const response = await api.post('safety/timer/start/', payload);
  return response.data;
};

export const cancelSafetyTimer = async (payload) => {
  // payload: { safe_word }
  const response = await api.post('safety/timer/cancel/', payload);
  return response.data;
};

export const getSafeWord = async () => {
  const response = await api.get('safety/safe-word/');
  return response.data;
};

export const updateSafeWord = async (safeWord) => {
  const response = await api.post('safety/safe-word/', { safe_word: safeWord });
  return response.data;
};

export const submitRiskAssessment = async (answers) => {
  // answers: key-value pair of questions/answers
  const response = await api.post('safety/risk-assessment/', { answers });
  return response.data;
};

export const getEscapePlan = async (answers) => {
  const response = await api.post('safety/escape-plan/', { answers });
  return response.data;
};

export const checkInTimer = async (safeWord) => {
  const response = await api.post('safety/timer/check-in/', { safe_word: safeWord });
  return response.data;
};

export const getActiveTimer = async () => {
  const response = await api.get('safety/timer/');
  return response.data;
};

export const triggerSafeWordAlert = async () => {
  const response = await api.post('safety/safe-word/trigger/');
  return response.data;
};

export const emergencyExit = async () => {
  const response = await api.post('safety/emergency-exit/');
  return response.data;
};

export const scheduleFakeCall = async (data) => {
  // data: { scheduled_time, phone_number }
  const response = await api.post('safety/schedule-call/', data);
  return response.data;
};
