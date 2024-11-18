/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Add paths to your Vue.js components or HTML files here
    './public/index.html', // Example: index.html file in public folder
    './src/**/*.{vue,js,ts,jsx,tsx}', // Example: All Vue.js components in the src folder and its subdirectories
  ],
  theme: {
    extend: {
      colors: {
        blue: '#35c0cc',
        tahiti: {
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
      },
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {},
  },
  plugins: ['tailwindcss, autoprefixer'],
};
