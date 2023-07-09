const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '17' : '68px',
        '18' : '72px',
        '19' : '76px',
        '20' : '80px',
        '21' : '84px',
        '22' : '88px',
        '23' : '92px',
        '25' : '100px',
        '26' : '104px',
        '34' : '136px',
        '68' : '272px',
        '90' : '360px',
        '100' : '400px',
        '104' : '416px',
        '106' : '424px',
        '108' : '432px',
      },
      colors: {
        background: {
          dark: colors.neutral[900],
          DEFAULT: colors.neutral[800],
          light: colors.neutral[700],
        },
        primary: {
          DEFAULT: colors.red[500],
        },
        secondary: {
          DEFAULT: colors.neutral[500],
        },
        text: {
          dark: colors.neutral[500],
          DEFAULT: colors.neutral[300],
          light: colors.neutral[100],
        },
      },
      animation: {
        background: 'background 10s ease-in-out infinite'
      },
      keyframes: {
        background: {
          '0%': {
            transform: 'rotate(0deg) scale(1, 1)',
          },
          '50%': {
            transform: 'rotate(180deg) scale(0.5, 1.5)',
          },
          '100%': {
            transform: 'rotate(360deg) scale(1, 1)',
          },
        }
      }
    },
  },
  plugins: [
    ({ addUtilities, addComponents }) => {
      addUtilities({
        ".border": {
          "@apply border-2 border-background-light rounded hover:border-primary transition": {},
        },
        ".borderless": {
          "@apply border-2 border-transparent rounded": {},
        },
        ".transition": {
          "@apply transition-all duration-300": {}
        },
        ".center": {
          "@apply flex justify-center items-center": {}
        },
        ".rounded": {
          "@apply rounded-xl": {}
        },
        ".glow" : {
          filter: `drop-shadow(0 0 12px ${colors.red[500]})`,
        }
      });
    },
  ],
}

