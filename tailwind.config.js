/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0d2643",
        secondary: "#f4c60c",
        title: "#5e5873",
        subTitle: "#6e6b7b",
        textMenu: "#d0d0d0",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
