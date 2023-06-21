/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.js', './**/*.html'],
  theme: {
    fontWeight: {
      thin: '100',
      hairline: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      'extra-bold': '800',
      black: '900',
    },
    screens:{
      sm: "480px",
      md:"768px",
      lg:"976px",
      xl:"1440px",
    },
    extend: {
      colors: {
        red: 'hsla(9, 74%, 23%, 1)',
        cream: 'hsla(42, 100%, 97%, 1)',
      },
    },    
  },
  plugins: [],
}

