/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      backgroundColor: {
        first: "#3795BD",
        second: "#2F58CD",
        third: "#4E31AA",
        fourth: "#72bdf7",
      },

      colors: {
        first: "#3795BD",
        second: "#2F58CD",
        third: "#4E31AA",
        fourth: "#72bdf7",
      },

      height:{
        100: "400px",
        110: "440px",
      },

      width:{
        100: "400px",
        110: "440px"

      },

      borderWidth: {
        1: "1px"
      },

      boxShadow:{
        "left": "-18px 22px 20px -15px rgba(0, 0, 0, 0.5)"
      },

    },
  },
  plugins: [],
}
