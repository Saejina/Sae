module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or false
  theme: {
    extend: {
      width: {
        '1/30': '3.5%',
      }
    },
    colors: {
      'primary': '#f180f8',
      'secondary': '#1f51ff',
      'success': '#bc2cbc',
      'warning': '#1f51ff',
      'danger': '#54254e',
      'light': '#d9c4d1',
      'lighter': '#d8d0d5',
      'dark': '#393b63',
      'info': '#b026ff',
      'darker': '#31334d'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
