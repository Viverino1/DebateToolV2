const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "text-primary": colors.neutral[100],
      "text-secondary": colors.neutral[300],
      background: colors.neutral[900],
      primary: colors.red[500],
      secondary: colors.neutral[500],
      accent: colors.neutral[800],
    },
    extend: {
      animation: {
        background: 'background 10s ease-in-out infinite'
      },
      keyframes: {
        background: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        }
      }
    },
  },
  plugins: [],
}

