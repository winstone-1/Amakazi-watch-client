/**
 * Simulates a file upload to Cloudinary.
 * @param {File} file - The file to upload
 * @param {Function} onProgress - Optional callback for progress (0-100)
 * @returns {Promise<string>} - A promise resolving to a mock image URL
 */
export const mockCloudinaryUpload = (file, onProgress = null) => {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error('No file provided'));

    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      if (onProgress) onProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        // Return a reliable placeholder image URL
        // We use pravatar for profile pics or generic unsplash for others
        const isImage = file.type.startsWith('image/');
        const url = isImage 
          ? `https://i.pravatar.cc/300?u=${Date.now()}` 
          : 'https://via.placeholder.com/150?text=Document';
        
        resolve(url);
      }
    }, 400); // 1.6s total delay
  });
};
