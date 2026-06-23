import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { generateIdempotencyKey } from '../utils/helpers';
import { useStore } from '../store/store';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const { token, language, user } = useStore.getState();

    // Set Authorization header if token exists and it's not a public auth route
    if (token && !config.url.includes('/auth/')) {
      if (config.url.includes('/intelligence/')) {
        // Intelligence endpoint uses X-API-Key instead of Bearer
        config.headers['X-API-Key'] = import.meta.env.VITE_INTELLIGENCE_API_KEY || 'amakazi-intel-sec-key';
      } else {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    // Set Accept-Language header
    config.headers['Accept-Language'] = language || 'en';

    // Add Idempotency-Key header for POST/PUT requests
    if (['post', 'put', 'patch'].includes(config.method?.toLowerCase())) {
      const userId = user?.id || 'anonymous';
      config.headers['Idempotency-Key'] = generateIdempotencyKey(userId);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for handling Token Refresh (401) and Rate Limiting (429)
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized (Token Expiration)
    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/auth/token/')) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const { refreshToken, setAuth, clearAuth } = useStore.getState();

      if (!refreshToken) {
        clearAuth();
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${API_BASE_URL}auth/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = response.data.access;
        const newRefreshToken = response.data.refresh || refreshToken;

        // Retrieve existing user and role to preserve details
        const { user, role } = useStore.getState();
        setAuth(user, newAccessToken, newRefreshToken, role, true);

        processQueue(null, newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        isRefreshing = false;

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearAuth();
        isRefreshing = false;
        return Promise.reject(refreshError);
      }
    }

    // Handle 429 Rate Limiting
    if (error.response?.status === 429) {
      const retryAfter = parseInt(error.response.headers['retry-after'] || '2', 10);
      console.warn(`Rate limited (429). Retrying after ${retryAfter} seconds...`);
      
      // Delay before retrying
      await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
