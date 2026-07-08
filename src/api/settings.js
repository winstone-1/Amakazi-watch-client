import api from './index';

// Request user data export
export const exportUserData = async () => {
  const response = await api.post('/users/export/');
  return response.data;
};

// Toggle 2FA setting
export const toggle2FA = async (enabled) => {
  const response = await api.patch('/users/me/', { two_factor_enabled: enabled });
  return response.data;
};

// Get user settings (e.g., to initialize 2FA status)
export const getUserSettings = async () => {
  const response = await api.get('/users/me/');
  return response.data;
};
