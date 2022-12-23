/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [  './node_modules/tw-elements/dist/js/**/*.js',"./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require('tw-elements/dist/plugin')],
}
