import { create } from 'zustand';

const getInitialAuth = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const role = localStorage.getItem('role') || 'Survivor';
  const is2faVerified = localStorage.getItem('is2faVerified') === 'true';

  return { token, refreshToken, user, role, is2faVerified };
};

const getInitialOfflineQueue = () => {
  try {
    return JSON.parse(localStorage.getItem('offlineQueue') || '[]');
  } catch {
    return [];
  }
};

export const useStore = create((set, get) => ({
  // Authentication State
  ...getInitialAuth(),
  
  // Language State
  language: localStorage.getItem('language') || 'en',

  // Offline queue state
  offlineQueue: getInitialOfflineQueue(),

  // Actions
  setAuth: (user, token, refreshToken, role, is2faVerified = false) => {
    localStorage.setItem('token', token || '');
    localStorage.setItem('refreshToken', refreshToken || '');
    localStorage.setItem('user', JSON.stringify(user || null));
    localStorage.setItem('role', role || 'Survivor');
    localStorage.setItem('is2faVerified', String(is2faVerified));
    set({ user, token, refreshToken, role, is2faVerified });
  },

  clearAuth: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('is2faVerified');
    set({ user: null, token: null, refreshToken: null, role: 'Survivor', is2faVerified: false });
  },

  set2faVerified: (is2faVerified) => {
    localStorage.setItem('is2faVerified', String(is2faVerified));
    set({ is2faVerified });
  },

  setLanguage: (language) => {
    localStorage.setItem('language', language);
    set({ language });
  },

  enqueueOfflineReport: (report) => {
    const queue = [...get().offlineQueue, { ...report, id: `offline-${Date.now()}` }];
    localStorage.setItem('offlineQueue', JSON.stringify(queue));
    set({ offlineQueue: queue });
  },

  removeOfflineReport: (id) => {
    const queue = get().offlineQueue.filter(item => item.id !== id);
    localStorage.setItem('offlineQueue', JSON.stringify(queue));
    set({ offlineQueue: queue });
  },

  clearOfflineQueue: () => {
    localStorage.removeItem('offlineQueue');
    set({ offlineQueue: [] });
  }
}));
