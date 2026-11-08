/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#1E3FE0',
        indigo: '#0B1F8F',
        carve: {
          blue: '#1E3FE0',
          indigo: '#0B1F8F',
          muted: '#8E8E93',
          soft: '#F2F2F7',
          chip: '#E8E8ED',
        },
      },
      borderRadius: {
        card: '24px',
        pill: '999px',
      },
    },
  },
  plugins: [],
};
