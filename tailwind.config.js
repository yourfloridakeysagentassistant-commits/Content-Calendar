/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#1C1C1A',
          soft: '#3F3F3D',
        },
        paper: {
          DEFAULT: '#FAFAF8',
          raised: '#FFFFFF',
        },
        line: '#E7E5E0',
        harbor: {
          DEFAULT: '#1F3A4D',
          soft: '#E7EEF2',
          dark: '#152A38',
        },
        coral: {
          DEFAULT: '#F2795F',
          dark: '#E0684E',
          soft: '#FCE3DB',
        },
        mint: {
          DEFAULT: '#4FAF8F',
          dark: '#3D8E73',
          soft: '#DDF2EA',
        },
      },
      borderRadius: {
        xl: '14px',
        '2xl': '20px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(28,28,26,0.04), 0 4px 16px rgba(28,28,26,0.04)',
      },
    },
  },
  plugins: [],
}
