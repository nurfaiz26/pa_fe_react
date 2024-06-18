/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
    colors: {
      "primary": "#FFD3CE",
      "primary-dark": "#DFD3CE",
      "secondary": "#FF423D",
      "secondary-dark": "#DF423D",
      "tersier": "#7F211E",
      "tersier-dark": "#5F211E"
    }
  },
  plugins: [
    flowbite.plugin()
  ],
}