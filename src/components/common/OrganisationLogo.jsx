import React from "react";
import { useState } from 'react';
import { getOrgLogoSrc } from '../../utils/placeholders';
import { getOptimizedImage } from '../../utils/cloudinary';

/**
 * OrganisationLogo
 *
 * Shows an org's logo (Cloudinary URL preferred), falls back to initials placeholder.
 *
 * Props:
 *   logo   {string}         – Cloudinary URL or null
 *   name   {string}         – Org name (used for placeholder + alt text)
 *   size   {'sm'|'md'|'lg'} – avatar size  (default 'md')
 *   round  {boolean}        – rounded-full vs rounded-xl (default false)
 */
const SIZE_CLASSES = {
  sm: { container: 'h-12 w-12', text: 'text-sm' },
  md: { container: 'h-16 w-16', text: 'text-lg' },
  lg: { container: 'h-24 w-24', text: 'text-2xl' },
};

export function OrganisationLogo({ logo, name = 'Org', size = 'md', round = false }) {
  const [imgError, setImgError] = useState(false);
  const { container, text } = SIZE_CLASSES[size] || SIZE_CLASSES.md;
  const rounded = round ? 'rounded-full' : 'rounded-xl';

  const optimizedSrc = logo && !imgError
    ? getOptimizedImage(logo, { width: 192, height: 192, crop: 'fill' })
    : null;

  const placeholderSrc = getOrgLogoSrc(null, name);

  return optimizedSrc ? (
    <img
      src={optimizedSrc}
      alt={name}
      onError={() => setImgError(true)}
      className={`${container} ${rounded} object-cover flex-shrink-0`}
    />
  ) : (
    <img
      src={placeholderSrc}
      alt={name}
      className={`${container} ${rounded} object-cover flex-shrink-0`}
    />
  );
}

export default OrganisationLogo;
