/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./app/**/*.tsx", //this compiles the css code in all the files inside our app directory!
    "./components/**/*.tsx",

    // Or if using `src` directory:
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
