// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#8CA566',
          secondary: '#9DD549',
          background: 'white',
          black: '#000000',
          active: '#4C862D',
          activebg: '#E3FFB9',
        },
        fontFamily: {
          heading: ['Poppins', 'sans-serif'],
          body: ['Lexend', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  