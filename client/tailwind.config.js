/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        urdu: ['"Noto Nastaliq Urdu"', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      lineHeight: {
        'urdu': '2.5',
        'urdu-relaxed': '3',
      },
      colors: {
        craft: {
          50: '#fbf7f4',
          100: '#f6ebe3',
          200: '#edd5c4',
          300: '#e1b89d',
          400: '#d19472',
          500: '#c5774e',
          600: '#b6613e',
          700: '#984d33',
          800: '#7b3f2d',
          900: '#643627',
          950: '#361a12',
        },
        indigoCraft: {
          500: '#4338ca',
          600: '#3730a3',
          700: '#312e81',
        }
      },
      keyframes: {
        pulseMic: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.12)', opacity: '0.85' },
        },
        wave: {
          '0%, 100%': { height: '8px' },
          '50%': { height: '32px' },
        }
      },
      animation: {
        'pulse-mic': 'pulseMic 1.4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
