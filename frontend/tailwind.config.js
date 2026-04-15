/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#3f51b5',
          dark:    '#24389c',
          light:   '#5c6bc0',
        },
        secondary: {
          DEFAULT: '#009688',
          dark:    '#006a60',
          light:   '#00bcd4',
        },
      },
      borderRadius: {
        'xl':  '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'card':    '0px 4px 16px rgba(26, 27, 34, 0.04)',
        'ambient': '0px 12px 32px rgba(26, 27, 34, 0.06)',
        'glow':    '0 0 40px rgba(63, 81, 181, 0.25)',
      },
      animation: {
        'fade-in':   'fadeIn 0.5s ease-out both',
        'slide-up':  'slideUp 0.6s cubic-bezier(0.4,0,0.2,1) both',
        'scale-in':  'scaleIn 0.4s cubic-bezier(0.4,0,0.2,1) both',
        'float':     'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
