/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["'Poppins'", "sans-serif"],
        openSans: ["'Open Sans'", "sans-serif"],
      },
      colors: {
        searchbarBlue: "#312843",
        red : "#FF0000",
        searchbarcolor: "#FBFBFB",
      }
    },
  },
  plugins: [],
}

