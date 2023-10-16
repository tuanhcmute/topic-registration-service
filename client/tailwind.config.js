/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
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
      green: "#008000",
      orange: "#FFA500",
      slate: "#0f172a",
    },
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
      },
      backgroundImage: {
        "header-logo": "url('./assets/images/logo-header.svg')",
        "footer-logo": "url('./assets/images/UTE-logo.svg')",
        banner: "url('./assets/images/banner.svg')",
      },
      backgroundColor: {
        transparent: "transparent",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
