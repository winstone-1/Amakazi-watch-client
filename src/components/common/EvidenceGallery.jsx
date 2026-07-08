import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, FileText, Image as ImageIcon, Video } from 'lucide-react';
import { getOptimizedImage } from '../../utils/cloudinary';

/**
 * EvidenceGallery
 *
 * Displays a responsive grid of evidence images/files with a lightbox on click.
 * Non-image files (PDF, doc, video) show an icon tile instead.
 *
 * Props:
 *   images   {string[]}  - Array of URLs (Cloudinary or any)
 *   max      {number}    - Max tiles to show before "+N more" (default 6)
 */
function isImageUrl(url = '') {
  return /\.(jpe?g|png|gif|webp|avif|svg)(\?.*)?$/i.test(url) ||
    url.includes('cloudinary') && !url.includes('.pdf');
}

function TileIcon({ url }) {
  if (/\.pdf$/i.test(url)) return <FileText className="h-8 w-8 text-red-400" />;
  if (/\.(mp4|mov|avi|webm)$/i.test(url)) return <Video className="h-8 w-8 text-blue-400" />;
  return <ImageIcon className="h-8 w-8 text-slate-400" />;
}

export function EvidenceGallery({ images = [], max = 6 }) {
  const [lightbox, setLightbox] = useState(null); // index
  const shown = images.slice(0, max);
  const overflow = images.length - max;

  const close = () => setLightbox(null);
  const prev = () => setLightbox(i => (i - 1 + images.length) % images.length);
  const next = () => setLightbox(i => (i + 1) % images.length);

  if (!images.length) return null;

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-3 gap-1.5">
        {shown.map((url, i) => {
          const isImg = isImageUrl(url);
          const thumb = isImg
            ? getOptimizedImage(url, { width: 200, height: 150, crop: 'fill' }) || url
            : url;

          const isLast = i === max - 1 && overflow > 0;

          return (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className="relative aspect-video overflow-hidden rounded-xl border border-slate-200/70 dark:border-white/10 bg-slate-100 dark:bg-slate-800 hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={`View evidence ${i + 1}`}
            >
              {isImg ? (
                <img src={thumb} alt={`Evidence ${i + 1}`} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <TileIcon url={url} />
                </div>
              )}
              {isLast && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">+{overflow + 1}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="relative max-h-[90vh] max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              {isImageUrl(images[lightbox]) ? (
                <img
                  src={getOptimizedImage(images[lightbox], { width: 1200, height: 900, crop: 'limit' }) || images[lightbox]}
                  alt={`Evidence ${lightbox + 1}`}
                  className="max-h-[80vh] w-full object-contain rounded-2xl"
                />
              ) : (
                <div className="flex h-64 items-center justify-center rounded-2xl bg-slate-800">
                  <TileIcon url={images[lightbox]} />
                  <p className="ml-3 text-white text-sm">File preview not available</p>
                </div>
              )}

              {/* Controls */}
              <button onClick={close} className="absolute -top-4 -right-4 rounded-full bg-white/20 backdrop-blur p-2 text-white hover:bg-white/40 transition" aria-label="Close lightbox">
                <X className="h-5 w-5" />
              </button>
              {images.length > 1 && (
                <>
                  <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 backdrop-blur p-2 text-white hover:bg-white/40 transition" aria-label="Previous">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 backdrop-blur p-2 text-white hover:bg-white/40 transition" aria-label="Next">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
              <p className="mt-2 text-center text-xs text-white/60">{lightbox + 1} / {images.length}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default EvidenceGallery;
