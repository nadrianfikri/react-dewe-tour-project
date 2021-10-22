module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      padding: '3rem',
    },
    extend: {
      backgroundImage: {
        navbar: "url('./assets/images/bg-navbar.png')",
        hero: "url('./assets/images/hero.png')",
      },
      fontSize: {
        '6xl': '4rem',
      },
      width: {
        350: '350px',
        1080: '1080px',
      },
      height: {
        350: '350px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
