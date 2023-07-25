const colors = require('tailwindcss/colors');

const glowAmount = 7;

const cardColorsValue = 600;

const customColors = {
  primary: {
    DEFAULT: colors.red[500],
  },
  evidence: {
    DEFAULT: colors.amber[cardColorsValue],
  },
  rebuttal: {
    DEFAULT: colors.teal[cardColorsValue],
  },
  quote: {
    DEFAULT: colors.lime[cardColorsValue],
  },
  statistic: {
    DEFAULT: colors.sky[cardColorsValue],
  },
}

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'quicksand': ['Quicksand', 'sans-serif'],
      },
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
        '28' : '112px',
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

        ...customColors,
        
        secondary: {
          DEFAULT: colors.neutral[500],
        },
        text: {
          dark: colors.neutral[500],
          DEFAULT: colors.neutral[400],
          light: colors.neutral[300],
          extraLight: colors.neutral[100],
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
    require("daisyui"),
    ({ addUtilities }) => {
      addUtilities({
        ".transition": {
          "@apply transition-all duration-300": {}
        },
        ".center": {
          "@apply flex justify-center items-center": {}
        },
        ".rounded": {
          "@apply rounded-xl": {}
        },

        ".glow-primary" : {
          filter: `drop-shadow(0 0 ${glowAmount}px ${customColors.primary.DEFAULT})`,
        },
        ".glow-evidence" : {
          filter: `drop-shadow(0 0 ${glowAmount}px ${customColors.evidence.DEFAULT})`,
        },
        ".glow-rebuttal" : {
          filter: `drop-shadow(0 0 ${glowAmount}px ${customColors.rebuttal.DEFAULT})`,
        },
        ".glow-quote" : {
          filter: `drop-shadow(0 0 ${glowAmount}px ${customColors.quote.DEFAULT})`,
        },
        ".glow-statistic" : {
          filter: `drop-shadow(0 0 ${glowAmount}px ${customColors.statistic.DEFAULT})`,
        },

        ".background": {
          "@apply bg-background/50 rounded border-2 border-background-light outline-none appearance-none backdrop-blur-sm": {}
        },
        ".background-light": {
          "@apply bg-background-light/50 rounded border-2 border-secondary outline-none appearance-none backdrop-blur-3xl": {}
        },
        ".input": {
          "@apply background text-lg p-2 placeholder:text-text-dark hover:border-secondary transition w-full h-12 disabled:opacity-50 hover:bg-background focus:bg-background": {}
        },
        ".input-focus": {
          "@apply focus:border-secondary focus:bg-background hover:bg-background": {}
        },

        ".button-primary": {
          "@apply rounded center !bg-primary input glow-primary !border-transparent hover:!border-text-light": {}
        },
        ".button-evidence": {
          "@apply rounded center !bg-evidence input glow-evidence !border-transparent hover:!border-text-light": {}
        },
        ".button-rebuttal": {
          "@apply rounded center !bg-rebuttal input glow-rebuttal !border-transparent hover:!border-text-light": {}
        },
        ".button-quote": {
          "@apply rounded center !bg-quote input glow-quote !border-transparent hover:!border-text-light": {}
        },
        ".button-statistic": {
          "@apply rounded center !bg-statistic input glow-statistic !border-transparent hover:!border-text-light": {}
        },

        ".full": {
          "@apply w-full h-full": {}
        },
        ".half": {
          "@apply w-1/2 h-1/2": {}
        },
      });
    },
  ],
}

export default config;