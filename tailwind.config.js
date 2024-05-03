/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.liquid'],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        // Define a custom name for your font
        custom: ['WindsorEF', 'sans-serif'],
      },
    },
  },
};
