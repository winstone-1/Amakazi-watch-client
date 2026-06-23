/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#fdf8f6',     // Extremely soft warm cream background
          peach: '#f5e6e1',     // Soft peach secondary color
          primary: '#e0533c',   // Stitch orange-red primary accent
          dark: '#2c2220',      // Deep charcoal/chocolate for text
          muted: '#8e7a76',     // Muted gray-brown for metadata/subtitles
          accent: '#b83b27',    // Darker red for warnings/SOS
          success: '#10b981',   // Emerald green for safety verification
          info: '#3b82f6',      // Blue for info guides
          warning: '#f59e0b',   // Amber for medium risk levels
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(224, 83, 60, 0.08)',
        'glass-hover': '0 12px 40px 0 rgba(224, 83, 60, 0.15)',
      }
    },
  },
  plugins: [],
}
