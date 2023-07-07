const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      text: {
        important: colors.neutral[100],
        DEFAULT: colors.neutral[300],
      },
      background: colors.neutral[900],
      primary: {
        DEFAULT: colors.red[500],
        1: colors.amber[500],
      },
      secondary: colors.neutral[500],
      accent: colors.neutral[800],
    },
    extend: {
      animation: {
        background: 'background 10s ease-in-out infinite'
      },
      keyframes: {
        background: {
          '0%, 100%': {
            transform: 'rotate(0deg) scale(1, 1)',
          },
          '50%': {
            transform: 'rotate(180deg) scale(1, 1.5)',
          },
        }
      }
    },
  },
  plugins: [],
}

