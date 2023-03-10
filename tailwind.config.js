/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        football: "url('/public/shutterstock_1903442293.jpg')",
      }
    },
  },
  plugins: [],
}
