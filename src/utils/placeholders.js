/**
 * Placeholder image helpers.
 * Uses ui-avatars.com for user/org initials — works offline, no external dependency required.
 */

const BRAND_ORANGE = 'FF6B35';
const BRAND_DARK   = '1A2A3A';

/**
 * Generate a placeholder avatar URL (initials on a coloured background).
 *
 * @param {'avatar'|'org'|'generic'} type
 * @param {string} text - Name used to generate initials
 * @param {number} [size=128]
 * @returns {string}
 */
export const getPlaceholder = (type, text = 'User', size = 128) => {
  const encoded = encodeURIComponent(text);

  if (type === 'avatar') {
    return `https://ui-avatars.com/api/?name=${encoded}&background=${BRAND_ORANGE}&color=fff&size=${size}&bold=true`;
  }

  if (type === 'org') {
    return `https://ui-avatars.com/api/?name=${encoded}&background=${BRAND_DARK}&color=fff&size=${size}&bold=true&rounded=true`;
  }

  // Generic image placeholder
  return `https://ui-avatars.com/api/?name=${encoded}&background=e2e8f0&color=64748b&size=${size}`;
};

/**
 * Return src for a user avatar: prefer real URL, fall back to initials placeholder.
 */
export const getAvatarSrc = (url, username = 'User') =>
  url || getPlaceholder('avatar', username);

/**
 * Return src for an org logo: prefer real URL, fall back to initials placeholder.
 */
export const getOrgLogoSrc = (url, orgName = 'Org') =>
  url || getPlaceholder('org', orgName);
