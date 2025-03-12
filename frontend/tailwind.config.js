/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-pink': '#ff00ff',
        'cyber-blue': '#00ffff',
        'xhs-pink': '#FF2442',
        'xhs-light-pink': '#FFF0F2',
        'xhs-black': '#1C1C1E',
        'xhs-gray': '#666666',
        'pixel-purple': '#B24592',
        'pixel-blue': '#4568DC',
      },
      fontFamily: {
        pixel: ['Press Start 2P', 'system-ui'],
      },
      animation: {
        'pixel-float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
} 