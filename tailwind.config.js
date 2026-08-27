/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sapphire: {
          950: '#030810',
          900: '#07111F', // Primary dark background
          850: '#0B1F3A', // Card background
          800: '#123B70', // Accent blue
          700: '#1B4D8E',
          600: '#2662AB',
          500: '#387BCB',
        },
        gold: {
          300: '#E8D49B',
          400: '#DAB87A',
          500: '#C8A96B', // Sapphire Gold primary
          600: '#A68848',
          700: '#856A31',
        },
        cream: {
          50: '#FAF8F5',
          100: '#F5F1E8', // Soft warm cream text
          200: '#E8E1D3',
          300: '#D5C9B3',
        },
        muted: {
          400: '#8B96A8',
          500: '#64748B',
        }
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'Manrope', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
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
