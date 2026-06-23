import api from './axios';

export const askLegalQuestion = async (question) => {
  const response = await api.post('legal/ask/', { question });
  return response.data;
};

export const getLegalReferences = async (topic) => {
  const response = await api.get('legal/reference/', { params: { topic } });
  return response.data;
};
