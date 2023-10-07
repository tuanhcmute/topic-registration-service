/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "#0A4181",
      white: "#FFFFFF",
      athensGray: "#F4F5F7",
      lightGrey: "#D5D5D5",
      black: "#000000",
      red: "#FF0000",
      whiteSmoke: "#F5F5F5",
      alabaster: "#F8F8F8",
    },
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
      },
      backgroundImage: {
        "header-logo": "url('./assets/images/logo-header.svg')",
        "footer-logo": "url('./assets/images/UTE-logo.svg')",
      },
      backgroundColor: {
        transparent: "transparent",
      },
    },
  },
  plugins: [],
};
