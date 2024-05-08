/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    screens: {
      'sm': '100px', // Set small breakpoint to 614px
      'md': '768px',
      'lg': '1280px',
      'xl': '1400px',
    },
  },
  plugins: [],
};
