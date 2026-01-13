/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      backdropBlur: {
        xl: '20px',
        '2xl': '40px',
      }
    }
  },
  plugins: []
};

