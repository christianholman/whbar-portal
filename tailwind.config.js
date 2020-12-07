module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx','./pages/**/*.ts', './components/**/*.ts' ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      textColor: ['disabled'],
      boxShadow: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
}
