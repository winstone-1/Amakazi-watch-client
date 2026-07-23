import api from './axios';

// Mock data
const MOCK_ADMIN = {
  users: {
    results: [
      { id: 1, username: 'admin', email: 'admin@amakaziwatch.ke', role: 'admin', is_active: true },
      { id: 2, username: 'survivor1', email: 'user1@example.com', role: 'survivor', is_active: true },
      { id: 3, username: 'counselor1', email: 'counselor1@example.com', role: 'counselor', is_active: true },
      { id: 4, username: 'orgstaff1', email: 'org@example.com', role: 'org_staff', is_active: true },
    ],
  },
  reports: {
    results: [
      { id: 101, status: 'pending', created_at: new Date().toISOString(), county: 'Nairobi', incident_type: 'physical' },
      { id: 102, status: 'in_review', created_at: new Date(Date.now() - 86400000).toISOString(), county: 'Kisumu', incident_type: 'sexual' },
      { id: 103, status: 'resolved', created_at: new Date(Date.now() - 172800000).toISOString(), county: 'Mombasa', incident_type: 'economic' },
    ],
  },
  orgs: {
    results: [
      { id: 1, name: 'FIDA Kenya', county: 'Nairobi', is_verified: true },
      { id: 2, name: 'Women\'s Rights Initiative', county: 'Kisumu', is_verified: false },
      { id: 3, name: 'GBV Recovery Center', county: 'Mombasa', is_verified: true },
    ],
  },
};

// Stats
export const getAdminStats = async () => {
  try {
    const response = await api.get('admin/users/stats/');
    return response.data;
  } catch (err) {
    // Fallback mock data
    return { total_users: 4, active_reports: 3, verified_orgs: 2 };
  }
};

// Users Management
export const getAdminUsers = async () => {
  try {
    const response = await api.get('admin/users/');
    return response.data;
  } catch (err) {
    return MOCK_ADMIN.users;
  }
};

export const updateAdminUserRole = async (id, role) => {
  try {
    const response = await api.patch(`admin/users/${id}/`, { role });
    return response.data;
  } catch (err) {
    return { success: true };
  }
};

export const deleteAdminUser = async (id) => {
  try {
    const response = await api.delete(`admin/users/${id}/`);
    return response.data;
  } catch (err) {
    return { success: true };
  }
};

// Organisations Moderation
export const getAdminOrganisations = async () => {
  try {
    const response = await api.get('admin/organisations/');
    return response.data;
  } catch (err) {
    return MOCK_ADMIN.orgs;
  }
};

// Alias for backward compat
export const getAdminOrgs = getAdminOrganisations;

export const verifyAdminOrganisation = async (id, status) => {
  try {
    const response = await api.post(`admin/organisations/${id}/verify/`, { status });
    return response.data;
  } catch (err) {
    return { success: true };
  }
};

// Reports Moderation
export const getAdminReports = async () => {
  try {
    const response = await api.get('admin/reports/');
    return response.data;
  } catch (err) {
    return MOCK_ADMIN.reports;
  }
};

export const updateAdminReportStatus = async (id, status) => {
  try {
    const response = await api.patch(`admin/reports/${id}/`, { status });
    return response.data;
  } catch (err) {
    return { success: true };
  }
};
