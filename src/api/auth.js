import api from './axios';

export const login = async (credentials) => {
  // credentials: { username, password }
  const response = await api.post('auth/token/', credentials);
  return response.data; // Expected: { access, refresh, user: { id, username, email, role } }
};

export const register = async (userData) => {
  // userData: { username, email, password, role }
  const response = await api.post('auth/register/', userData);
  return response.data;
};

export const resetPassword = async (data) => {
  // data: { email }
  const response = await api.post('auth/password-reset/', data);
  return response.data;
};

export const changePassword = async (data) => {
  // data: { old_password, new_password }
  const response = await api.post('auth/password-change/', data);
  return response.data;
};

export const verify2FA = async (code) => {
  const response = await api.post('auth/2fa/verify/', { code });
  return response.data;
};

export const enable2FA = async () => {
  const response = await api.post('auth/2fa/enable/');
  return response.data;
};

export const get2FASetup = async () => {
  const response = await api.get('auth/2fa/setup/');
  return response.data;
};

export const setup2FA = async (code) => {
  const response = await api.post('auth/2fa/setup/', { code });
  return response.data;
};

export const disable2FA = async () => {
  const response = await api.post('auth/2fa/disable/');
  return response.data;
};

export const refreshToken = async (refresh) => {
  const response = await api.post('auth/token/refresh/', { refresh });
  return response.data;
};

export const confirmResetPassword = async (data) => {
  // data: { uid, token, new_password }
  const response = await api.post('auth/password-reset/confirm/', data);
  return response.data;
};
