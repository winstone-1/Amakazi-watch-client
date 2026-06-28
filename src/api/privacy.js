import api from './axios';

export const getPrivacyPolicy = async () => {
  const response = await api.get('privacy-policy/current/');
  return response.data;
};

export const acceptPrivacyPolicy = async () => {
  const response = await api.post('user-consent/accept/');
  return response.data;
};

export const getTerms = async (language = 'en') => {
  const response = await api.get('terms/', {
    headers: { 'Accept-Language': language }
  });
  return response.data;
};

export const acceptTerms = async () => {
  const response = await api.post('terms/accept/');
  return response.data;
};
