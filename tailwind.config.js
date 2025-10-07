/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00D4FF',
        'neon-purple': '#9B00FF',
        'neon-green': '#00FF9B',
        'dark-bg': '#0A0E2A',
        'darker-bg': '#050817',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'exo': ['Exo 2', 'sans-serif'],
      },
      boxShadow: {
        'neon-blue': '0 0 10px #00D4FF, 0 0 20px #00D4FF',
        'neon-purple': '0 0 10px #9B00FF, 0 0 20px #9B00FF',
        'neon-green': '0 0 10px #00FF9B, 0 0 20px #00FF9B',
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #0A0E2A 0%, #050817 100%)',
        'gradient-neon': 'linear-gradient(45deg, #00D4FF, #9B00FF)',
      },
      animation: {
        'pulse-soft': 'pulse 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        fadeIn: {
          from: { opacity: 0, transform: 'translateY(10px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}