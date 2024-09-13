/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'poppins': ["Poppins", "sans-serif"]
    },
    extend: {
      backgroundImage: {
        'signup': 'url("/src/assets/signup.jpg")',
        'blk': 'url("/src/assets/bg.jpg")',
      }
    },
  },
  plugins: [],
}

