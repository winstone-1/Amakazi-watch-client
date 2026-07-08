import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Check } from 'lucide-react';
import { uploadToCloudinary, getOptimizedImage } from '../../utils/cloudinary';
import { getAvatarSrc } from '../../utils/placeholders';

/**
 * AvatarUpload
 *
 * Renders a circular profile picture with an overlay camera button.
 * Clicking the button opens a file picker; on selection the image is
 * uploaded directly to Cloudinary and onUpload(secureUrl) is called.
 *
 * Props:
 *   currentAvatar  {string}   – existing Cloudinary URL or null
 *   username       {string}   – used for initials placeholder
 *   onUpload       {function} – called with the new secure URL
 *   size           {'sm'|'md'|'lg'} – avatar size  (default 'lg')
 *   disabled       {boolean}  – hide the upload button
 */
const SIZE_CLASSES = {
  sm: 'h-12 w-12',
  md: 'h-16 w-16',
  lg: 'h-24 w-24',
};

const TEXT_SIZES = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-3xl',
};

export function AvatarUpload({
  currentAvatar,
  username = 'User',
  onUpload,
  size = 'lg',
  disabled = false,
}) {
  const [preview, setPreview] = useState(
    currentAvatar
      ? getOptimizedImage(currentAvatar, { width: 192, height: 192, crop: 'thumb', gravity: 'face' })
      : null,
  );
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef(null);

  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.lg;
  const textSize  = TEXT_SIZES[size] || TEXT_SIZES.lg;

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type and size
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5 MB.');
      return;
    }

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setError(null);
    setSuccess(false);
    setUploading(true);

    try {
      const data = await uploadToCloudinary(file, undefined, 'profiles');
      const optimized = getOptimizedImage(data.secure_url, {
        width: 192,
        height: 192,
        crop: 'thumb',
        gravity: 'face',
      });
      setPreview(optimized);
      setSuccess(true);
      onUpload?.(data.secure_url);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error('[AvatarUpload]', err);
      setError('Upload failed. Please try again.');
      // Keep local preview so the UI doesn't jump
    } finally {
      setUploading(false);
      URL.revokeObjectURL(localUrl);
      // Reset input so the same file can be re-selected
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const initials = username
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative inline-block">
      {/* Avatar */}
      <div
        className={`${sizeClass} rounded-full border-4 border-primary overflow-hidden bg-primary/10 flex items-center justify-center flex-shrink-0`}
      >
        {preview ? (
          <img
            src={preview}
            alt={username}
            className="h-full w-full object-cover"
            onError={() => setPreview(null)}
          />
        ) : (
          <span className={`${textSize} font-black text-primary select-none`}>
            {initials || 'U'}
          </span>
        )}
      </div>

      {/* Upload / loading indicator */}
      {!disabled && (
        <label
          className={`absolute bottom-0 right-0 flex items-center justify-center rounded-full p-1.5 cursor-pointer transition shadow-md
            ${uploading
              ? 'bg-slate-400 cursor-wait'
              : success
                ? 'bg-emerald-500 hover:bg-emerald-600'
                : 'bg-primary hover:bg-orange-600'
            } text-white`}
          title="Change profile picture"
        >
          <AnimatePresence mode="wait">
            {uploading ? (
              <motion.div
                key="spinner"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"
              />
            ) : success ? (
              <motion.div
                key="check"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
              >
                <Check className="h-4 w-4" />
              </motion.div>
            ) : (
              <motion.div
                key="camera"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
              >
                <Camera className="h-4 w-4" />
              </motion.div>
            )}
          </AnimatePresence>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      )}

      {/* Error tooltip */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 w-48 rounded-xl bg-red-500 px-3 py-2 text-xs font-medium text-white text-center shadow-lg"
          >
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-1.5 opacity-70 hover:opacity-100"
              aria-label="Dismiss error"
            >
              <X className="inline h-3 w-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AvatarUpload;
