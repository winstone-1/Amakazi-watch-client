import api from './axios';

export const triggerPanic = async (data) => {
  const response = await api.post('/panic/', data);
  return response.data;
};
