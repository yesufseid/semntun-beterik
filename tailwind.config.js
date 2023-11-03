/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:"class",
  theme: {
    extend: {
       colors:{
        'Richblack':'#0B2027',
        "bray":"#080708",
        "semiwhite":"#d0f4de",
        "nav":"#1b2cc1"

       }
    },
  },
  plugins: [],
}