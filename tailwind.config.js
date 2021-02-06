module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'display': ['"PT Serif"', 'Serif'],
      'body': ['Roboto', 'San-serif'],
    },
    extend: {
      spacing: {
        '6.25': '1.5625rem',
        '12.5': '3.125rem',
      },
      colors: {
        red: {
          '200': '#FF7C83'
        },
        primary: '#18B157',
        'primary-light': '#CEFAD8',
        black: '#1C2D41'
      },
      fontSize: {
        'pre-xs': '0.8125rem',
        md: "0.9375rem",

      },
      gridTemplateColumns: {
       'pick-meals': 'minmax(auto, 68%) minmax(300px, 32%)'
      },
      borderRadius: {
        'md-md': '0.3125rem',
      },
      minWidth: {
        '30': '7.5rem',
      },
      maxWidth: {
        '75': '18.75rem',
      },
      boxShadow: {
        'custom-negative-sm': '0px -5px 15px rgba(0,0,0,.05)'
      }
    },
  },
  variants: {
    extend: {
      borderWidth: ['last'],
      opacity: ['disabled'],
      cursor: ['disabled']
    }
  },
  plugins: [],
}
