/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark": "#111829"
      },
      backgroundImage: {
        "header": "url('/bg.jpg')"
      }
    },
  },
  plugins: [],
}

