import api from './axios';

export const getDocuments = async () => {
  const response = await api.get('vault/documents/');
  return response.data;
};

export const uploadDocument = async (formData) => {
  // formData includes document file and metadata
  const response = await api.post('vault/documents/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteDocument = async (id) => {
  const response = await api.delete(`vault/documents/${id}/`);
  return response.data;
};
