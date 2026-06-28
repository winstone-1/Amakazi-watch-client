import api from './axios';

export const triggerPanic = async (data) => {
  const response = await api.post('/panic/', data);
  return response.data;
};

export const addEmergencyContact = async (data) => {
  const response = await api.post('/panic/contacts/', data);
  return response.data;
};

export const getEmergencyContacts = async () => {
  const response = await api.get('/panic/contacts/');
  return response.data;
};
