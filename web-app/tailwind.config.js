/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pan-African inspired color palette
        'nukie': {
          'red': '#DC2626',
          'black': '#1F1F1F',
          'green': '#16A34A',
          'gold': '#F59E0B',
          'purple': '#7C3AED',
        },
        'cultural': {
          'sunset': '#FF6B6B',
          'ocean': '#4ECDC4',
          'earth': '#A0522D',
          'sky': '#667EEA',
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}