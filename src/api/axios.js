import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://amakazi-watch.onrender.com/api';
const IS_MOCK = import.meta.env.VITE_ENABLE_MOCK_DATA === 'true';

// ─── Connection state ────────────────────────────────────────────────────────
let isOnline = navigator.onLine;
window.addEventListener('online',  () => { isOnline = true;  });
window.addEventListener('offline', () => { isOnline = false; });

export const getConnectionStatus = () => isOnline;

// ─── Axios instance ──────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false, // adjust if backend uses cookies
});

// ─── Request interceptor: attach token ───────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Let caller override Content-Type (e.g. multipart)
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Token refresh state ─────────────────────────────────────────────────────
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) =>
    error ? reject(error) : resolve(token),
  );
  failedQueue = [];
};

// ─── Response interceptor: handle errors & auto-refresh ──────────────────────
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ── Network / CORS / server-down ──────────────────────────────────────────
    if (!error.response) {
      const code = error.code;
      if (
        code === 'ERR_NETWORK' ||
        code === 'ECONNREFUSED' ||
        code === 'ERR_FAILED' ||
        code === 'ECONNABORTED'
      ) {
        console.warn('[API] Network error — backend may be unreachable:', API_URL);
        // Throw a consistent object so callers can detect offline state
        return Promise.reject(
          Object.assign(error, { isNetworkError: true, userMessage: 'Cannot reach the server. Please check your connection.' }),
        );
      }
      return Promise.reject(error);
    }

    // ── 401 → attempt token refresh ──────────────────────────────────────────
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refresh = localStorage.getItem('refresh');
      if (!refresh) {
        isRefreshing = false;
        // No refresh token → clear auth and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(
          `${API_URL}/auth/token/refresh/`,
          { refresh },
          { headers: { 'Content-Type': 'application/json' } },
        );
        const newToken = data.access;
        localStorage.setItem('token', newToken);
        api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // ── 403 → forbidden (role mismatch etc.) ─────────────────────────────────
    if (error.response.status === 403) {
      console.warn('[API] 403 Forbidden — insufficient permissions');
      return Promise.reject(
        Object.assign(error, { userMessage: "You don't have permission to perform this action." }),
      );
    }

    // ── 429 → rate limited ────────────────────────────────────────────────────
    if (error.response.status === 429) {
      return Promise.reject(
        Object.assign(error, { userMessage: 'Too many requests. Please slow down and try again.' }),
      );
    }

    // ── 5xx → server error ────────────────────────────────────────────────────
    if (error.response.status >= 500) {
      return Promise.reject(
        Object.assign(error, { userMessage: 'Server error. Our team has been notified. Please try again shortly.' }),
      );
    }

    return Promise.reject(error);
  },
);

// ─── Helper: extract a human-readable error message ──────────────────────────
export const getErrorMessage = (error) => {
  if (error?.userMessage) return error.userMessage;
  if (error?.isNetworkError) return 'Cannot reach the server. Please check your connection.';

  const data = error?.response?.data;
  if (!data) return 'An unexpected error occurred.';

  // Django REST Framework shapes
  if (typeof data === 'string') return data;
  if (data.detail) return data.detail;
  if (data.message) return data.message;
  if (data.non_field_errors) return data.non_field_errors.join(' ');

  // Field-level errors → join all
  const fieldErrors = Object.entries(data)
    .filter(([k]) => k !== 'status_code')
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
    .join(' | ');
  if (fieldErrors) return fieldErrors;

  return 'An unexpected error occurred.';
};

export { IS_MOCK };
export default api;
