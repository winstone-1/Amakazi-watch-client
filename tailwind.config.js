/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        secondary: '#2C3E50',
        accent: '#27AE60',
        dark: '#1A2A3A',
      },
    },
  },
  plugins: [],
}
