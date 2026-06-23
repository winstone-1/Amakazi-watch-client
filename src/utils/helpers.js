/**
 * Redirects the browser immediately to a neutral website for safety.
 */
export const quickExit = () => {
  window.location.replace('https://www.google.com/search?q=weather+today');
};

/**
 * Generates an Idempotency-Key header value.
 * Format: {user_id}_{timestamp}_{uuid}
 * @param {string|number} userId 
 */
export const generateIdempotencyKey = (userId = 'anonymous') => {
  const timestamp = Date.now();
  const uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return `${userId}_${timestamp}_${uuid}`;
};

/**
 * Helper to fetch GPS coordinates
 * @returns {Promise<{latitude: number, longitude: number}>}
 */
export const getGPSLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  });
};

/**
 * Format timestamp to user friendly format
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('en-KE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};
