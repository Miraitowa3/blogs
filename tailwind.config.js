/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ['./src/**/*.{html,vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['cccc', ...defaultTheme.fontFamily.sans],
        serif: ['cccc', ...defaultTheme.fontFamily.serif],
        mono: ['cccc', ...defaultTheme.fontFamily.mono]
      }
    }
  },

  plugins: []
};
