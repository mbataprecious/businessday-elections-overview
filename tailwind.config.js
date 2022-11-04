/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: '#1081E8',
        dark: '#0F1642',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}
