import api from './axios';

// Users Management
export const getAdminUsers = async () => {
  const response = await api.get('admin/users/');
  return response.data;
};

export const updateAdminUserRole = async (id, role) => {
  const response = await api.patch(`admin/users/${id}/`, { role });
  return response.data;
};

export const deleteAdminUser = async (id) => {
  const response = await api.delete(`admin/users/${id}/`);
  return response.data;
};

// Organisations Moderation
export const getAdminOrganisations = async () => {
  const response = await api.get('admin/organisations/');
  return response.data;
};

export const verifyAdminOrganisation = async (id, status) => {
  const response = await api.post(`admin/organisations/${id}/verify/`, { status });
  return response.data;
};

// Reports Moderation
export const getAdminReports = async () => {
  const response = await api.get('admin/reports/');
  return response.data;
};

export const updateAdminReportStatus = async (id, status) => {
  const response = await api.patch(`admin/reports/${id}/`, { status });
  return response.data;
};
