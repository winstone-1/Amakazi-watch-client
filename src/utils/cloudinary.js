/**
 * Cloudinary image utility helpers for AmakaziWatch
 *
 * The Cloudinary cloud name is read from VITE_CLOUDINARY_CLOUD_NAME.
 * Upload preset is read from VITE_CLOUDINARY_UPLOAD_PRESET.
 *
 * Direct browser uploads use unsigned upload presets (configured in Cloudinary dashboard).
 * The backend also handles uploads via django-cloudinary-storage when files are submitted
 * through the API — this util is for direct client-side uploads only.
 */

export const CLOUDINARY_CLOUD_NAME =
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo'; // fallback to Cloudinary demo cloud

export const CLOUDINARY_UPLOAD_PRESET =
  import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_default';

/**
 * Build a Cloudinary upload URL for direct browser → Cloudinary uploads.
 */
export const getCloudinaryUploadUrl = () =>
  `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

/**
 * Apply Cloudinary URL transformations to an existing Cloudinary URL.
 *
 * @param {string|null} url  - Original Cloudinary secure_url
 * @param {object} options   - Transformation options
 * @returns {string|null}
 *
 * @example
 * getOptimizedImage(user.avatar, { width: 96, height: 96, crop: 'thumb', gravity: 'face' })
 */
export const getOptimizedImage = (url, options = {}) => {
  if (!url) return null;

  const {
    width   = 400,
    height  = 400,
    crop    = 'fill',
    gravity = 'auto',
    quality = 'auto',
    format  = 'auto',
  } = options;

  // Only transform Cloudinary URLs
  if (url.includes('res.cloudinary.com') || url.includes('cloudinary.com')) {
    const parts = url.split('/upload/');
    if (parts.length === 2) {
      const t = `w_${width},h_${height},c_${crop},g_${gravity},q_${quality},f_${format}`;
      return `${parts[0]}/upload/${t}/${parts[1]}`;
    }
  }

  // Return non-Cloudinary URLs as-is
  return url;
};

/**
 * Upload a file directly to Cloudinary from the browser.
 * Returns the Cloudinary response object containing secure_url, public_id, etc.
 *
 * @param {File}   file
 * @param {string} [preset] - Override the default upload preset
 * @param {string} [folder] - Cloudinary folder (e.g. 'profiles', 'evidence')
 * @returns {Promise<{secure_url: string, public_id: string, [key: string]: any}>}
 */
export const uploadToCloudinary = async (file, preset, folder) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', preset || CLOUDINARY_UPLOAD_PRESET);
  if (folder) formData.append('folder', folder);

  const res = await fetch(getCloudinaryUploadUrl(), {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Cloudinary upload failed (${res.status})`);
  }

  return res.json();
};
