/**
 * AmakaziWatch API Service Layer
 *
 * Single source-of-truth for all API calls.
 * Provides:
 *  • Typed wrappers around every endpoint
 *  • Automatic mock-data fallback (when VITE_ENABLE_MOCK_DATA=true or backend unreachable)
 *  • Consistent error surface using getErrorMessage()
 */

import api, { IS_MOCK, getErrorMessage } from '../api/axios';

// ─── Mock Data ───────────────────────────────────────────────────────────────
const MOCK = {
  profile: {
    id: 1, username: 'demo_user', email: 'demo@amakaziwatch.ke',
    role: 'survivor', county: 'Nairobi', phone: '0712345678', bio: 'Demo account',
  },
  reports: {
    count: 3,
    results: [
      { id: 101, incident_type: 'physical', county: 'Nairobi', status: 'pending',   created_at: new Date().toISOString(), anonymous: false },
      { id: 102, incident_type: 'sexual',   county: 'Kisumu',  status: 'in_review', created_at: new Date(Date.now() - 86400000).toISOString(), anonymous: true },
      { id: 103, incident_type: 'economic', county: 'Mombasa', status: 'resolved',  created_at: new Date(Date.now() - 172800000).toISOString(), anonymous: false },
    ],
  },
  reportStats: { total: 3, pending: 1, in_review: 1, resolved: 1 },
  organisations: {
    results: [
      { id: 1, name: 'FIDA Kenya',                 type: 'Legal Aid',   county: 'Nairobi',  phone: '0800 720 999', rating: 4.8, is_verified: true,  description: 'Free legal aid for women and girls.' },
      { id: 2, name: "Women's Rights Initiative",  type: 'NGO',         county: 'Kisumu',   phone: '0711 234 567', rating: 4.5, is_verified: true,  description: 'Community-based advocacy in Western Kenya.' },
      { id: 3, name: 'GBV Recovery Center',        type: 'Shelter',     county: 'Mombasa',  phone: '0722 345 678', rating: 4.7, is_verified: true,  description: 'Safe shelter and psychosocial support.' },
      { id: 4, name: 'Nairobi Womens Hospital',    type: 'Medical',     county: 'Nairobi',  phone: '0800 723 253', rating: 4.9, is_verified: true,  description: 'GBV medical care and post-rape care kits.' },
      { id: 5, name: 'Nakuru GBV Response',        type: 'Counseling',  county: 'Nakuru',   phone: '0734 456 789', rating: 4.6, is_verified: true,  description: 'Professional counseling and trauma recovery.' },
    ],
  },
  notifications: {
    results: [
      { id: 1, title: 'Safety check-in due',   detail: 'Your timer window ends in 10 minutes.',             time: '5 min ago', type: 'alert',   read: false },
      { id: 2, title: 'New resource added',     detail: 'A verified shelter was added near Nairobi West.',   time: '1h ago',    type: 'info',    read: false },
      { id: 3, title: 'Legal bot reply',        detail: 'Your legal question has been answered.',            time: 'Today',     type: 'info',    read: false },
      { id: 4, title: 'Organisation response',  detail: 'Hope Center responded to your referral.',           time: 'Yesterday', type: 'success', read: true  },
    ],
  },
  adminUsers: {
    results: [
      { id: 1, username: 'admin',     email: 'admin@demo.ke',      role: 'admin',            is_active: true },
      { id: 2, username: 'jane_d',    email: 'jane@demo.ke',       role: 'survivor',         is_active: true },
      { id: 3, username: 'dr_njeri',  email: 'njeri@demo.ke',      role: 'counselor',        is_active: true },
      { id: 4, username: 'org_staff', email: 'staff@hopecenter.ke',role: 'org_staff',        is_active: true },
      { id: 5, username: 'county1',   email: 'county@nairobi.go.ke',role:'county_official',  is_active: false },
    ],
  },
  adminReports: { results: [] },
  adminOrgs: {
    results: [
      { id: 1, name: 'Hope Center Nairobi', county: 'Nairobi', is_verified: false },
      { id: 2, name: 'FIDA Kenya',          county: 'Nairobi', is_verified: true  },
    ],
  },
  peerSessions: { results: [], active: 0, pending: 0, completed: 0 },
  inventory:    { beds: 12, legal_slots: 5, counselors: 8 },
  caseMatches:  { results: [] },
  hotspots:     { results: [] },
  scorecardRankings: { results: [] },
  vaultDocuments: { results: [] },
};

// ─── Utility ─────────────────────────────────────────────────────────────────
const withMockFallback = async (fn, mockData) => {
  if (IS_MOCK) return mockData;
  try {
    return await fn();
  } catch (err) {
    if (err?.isNetworkError || !navigator.onLine) {
      console.warn('[API] Offline — returning mock data');
      return mockData;
    }
    throw err;
  }
};

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authService = {
  login: (credentials) => api.post('auth/token/', credentials).then(r => r.data),
  register: (data) => api.post('auth/register/', data).then(r => r.data),
  refreshToken: (refresh) => api.post('auth/token/refresh/', { refresh }).then(r => r.data),
  resetPassword: (data) => api.post('auth/password-reset/', data).then(r => r.data),
  confirmReset: (data) => api.post('auth/password-reset/confirm/', data).then(r => r.data),
  changePassword: (data) => api.post('auth/password-change/', data).then(r => r.data),
};

// ─── Profile ──────────────────────────────────────────────────────────────────
export const profileService = {
  get: () => withMockFallback(
    () => api.get('profile/').then(r => r.data),
    MOCK.profile,
  ),
  update: (data) => api.patch('profile/', data).then(r => r.data),
};

// ─── Reports ─────────────────────────────────────────────────────────────────
export const reportService = {
  list: (params) => withMockFallback(
    () => api.get('reports/', { params }).then(r => r.data),
    MOCK.reports,
  ),
  create: (data) => {
    const isForm = data instanceof FormData;
    return api.post('reports/', data, {
      headers: isForm ? { 'Content-Type': 'multipart/form-data' } : {},
    }).then(r => r.data);
  },
  stats: () => withMockFallback(
    () => api.get('reports/stats/').then(r => r.data),
    MOCK.reportStats,
  ),
  getStatus: (ref) => api.get(`reports/status/${ref}/`).then(r => r.data),
  addFollowUp: (ref, message) => api.post(`reports/status/${ref}/follow-up/`, { message }).then(r => r.data),
};

// ─── Organisations ────────────────────────────────────────────────────────────
export const orgService = {
  list: (params) => withMockFallback(
    () => api.get('organisations/', { params }).then(r => r.data),
    MOCK.organisations,
  ),
  register: (data) => api.post('organisations/', data).then(r => r.data),
  bookmark: (id) => api.post(`organisations/${id}/bookmark/`).then(r => r.data),
  review: (id, data) => api.post(`organisations/${id}/reviews/`, data).then(r => r.data),

  // Org staff
  getInventory: () => withMockFallback(
    () => api.get('org/inventory/').then(r => r.data),
    MOCK.inventory,
  ),
  updateInventory: (items) => api.post('org/inventory/', { items }).then(r => r.data),
  getCaseMatches: () => withMockFallback(
    () => api.get('org/case-matching/').then(r => r.data),
    MOCK.caseMatches,
  ),
  getHotspots: () => withMockFallback(
    () => api.get('org/hotspots/').then(r => r.data),
    MOCK.hotspots,
  ),
  getMessages: () => api.get('org/messages/').then(r => r.data),
  sendMessage: (data) => api.post('org/messages/', data).then(r => r.data),
};

// ─── Safety ───────────────────────────────────────────────────────────────────
export const safetyService = {
  startTimer: (data) => api.post('safety/timer/start/', data).then(r => r.data),
  checkIn: (safeWord) => api.post('safety/timer/check-in/', { safe_word: safeWord }).then(r => r.data),
  getActiveTimer: () => api.get('safety/timer/').then(r => r.data),
  getSafeWord: () => api.get('safety/safe-word/').then(r => r.data),
  setSafeWord: (word) => api.post('safety/safe-word/', { safe_word: word }).then(r => r.data),
  triggerSafeWord: () => api.post('safety/safe-word/trigger/').then(r => r.data),
  riskAssessment: (answers) => api.post('safety/risk-assessment/', { answers }).then(r => r.data),
  escapePlan: (data) => api.post('safety/escape-plan/', data).then(r => r.data),
};

// ─── Vault ────────────────────────────────────────────────────────────────────
export const vaultService = {
  list: () => withMockFallback(
    () => api.get('vault/documents/').then(r => r.data),
    MOCK.vaultDocuments,
  ),
  upload: (formData) => api.post('vault/documents/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(r => r.data),
  delete: (id) => api.delete(`vault/documents/${id}/`).then(r => r.data),
  download: (id) => api.get(`vault/documents/${id}/download/`, { responseType: 'blob' }).then(r => r.data),
};

// ─── Peer Support ─────────────────────────────────────────────────────────────
export const peerService = {
  getSessions: () => withMockFallback(
    () => api.get('peer/sessions/').then(r => r.data),
    MOCK.peerSessions,
  ),
  findSession: (data) => api.post('peer/sessions/find/', data).then(r => r.data),
  sendMessage: (sessionId, message) => api.post(`peer/sessions/${sessionId}/message/`, { message }).then(r => r.data),
  getMessages: (sessionId) => api.get(`peer/sessions/${sessionId}/messages/`).then(r => r.data),
  endSession: (sessionId) => api.post(`peer/sessions/${sessionId}/end/`).then(r => r.data),
};

// ─── Legal Bot ────────────────────────────────────────────────────────────────
export const legalService = {
  ask: (question) => api.post('legal/ask/', { question }).then(r => r.data),
  getReferences: (topic) => api.get('legal/reference/', { params: { topic } }).then(r => r.data),
};

// ─── Panic / SOS ─────────────────────────────────────────────────────────────
export const panicService = {
  trigger: (data) => api.post('panic/', data).then(r => r.data),
  addContact: (data) => api.post('panic/contacts/', data).then(r => r.data),
  getContacts: () => api.get('panic/contacts/').then(r => r.data),
};

// ─── Notifications ────────────────────────────────────────────────────────────
export const notificationService = {
  list: () => withMockFallback(
    () => api.get('notifications/').then(r => r.data),
    MOCK.notifications,
  ),
  markRead: (id) => api.patch(`notifications/${id}/`, { read: true }).then(r => r.data),
};

// ─── Scorecards ───────────────────────────────────────────────────────────────
export const scorecardService = {
  getRankings: () => withMockFallback(
    () => api.get('scorecard/rankings/').then(r => r.data),
    MOCK.scorecardRankings,
  ),
};

// ─── Admin ────────────────────────────────────────────────────────────────────
export const adminService = {
  getUsers: () => withMockFallback(
    () => api.get('admin/users/').then(r => r.data),
    MOCK.adminUsers,
  ),
  deleteUser: (id) => api.delete(`admin/users/${id}/`).then(r => r.data),
  updateUserRole: (id, role) => api.patch(`admin/users/${id}/`, { role }).then(r => r.data),
  getReports: () => withMockFallback(
    () => api.get('admin/reports/').then(r => r.data),
    MOCK.adminReports,
  ),
  updateReportStatus: (id, status) => api.patch(`admin/reports/${id}/`, { status }).then(r => r.data),
  getOrgs: () => withMockFallback(
    () => api.get('admin/organisations/').then(r => r.data),
    MOCK.adminOrgs,
  ),
  verifyOrg: (id, status) => api.post(`admin/organisations/${id}/verify/`, { status }).then(r => r.data),
};

// ─── Chat (AI chatbot) ────────────────────────────────────────────────────────
export const chatService = {
  send: (message, sessionId) => api.post('chat/', { message, session_id: sessionId }).then(r => r.data),
};

// ─── Education Content ────────────────────────────────────────────────────────
export const educationService = {
  list: (params) => api.get('content/articles/', { params }).then(r => r.data),
  get: (id) => api.get(`content/articles/${id}/`).then(r => r.data),
  getVideos: () => api.get('content/videos/').then(r => r.data),
};

// ─── Re-export for convenience ────────────────────────────────────────────────
export { getErrorMessage };
export default api;
