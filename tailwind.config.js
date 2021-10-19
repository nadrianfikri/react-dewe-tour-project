module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        navbar: "url('./assets/images/bg-navbar.png')",
        hero: "url('./assets/images/hero.png')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
