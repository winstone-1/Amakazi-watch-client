import api from './axios';

export const findPeerSession = async (roleType) => {
  const response = await api.post('peer/sessions/find/', { role_type: roleType });
  return response.data;
};

export const sendPeerMessage = async (sessionId, message) => {
  const response = await api.post(`peer/sessions/${sessionId}/message/`, { message });
  return response.data;
};

export const getPeerMessages = async (sessionId) => {
  const response = await api.get(`peer/sessions/${sessionId}/messages/`);
  return response.data;
};

export const endPeerSession = async (sessionId) => {
  const response = await api.post(`peer/sessions/${sessionId}/end/`);
  return response.data;
};

export const getPeerSessions = async () => {
  const response = await api.get('peer/sessions/');
  return response.data;
};
