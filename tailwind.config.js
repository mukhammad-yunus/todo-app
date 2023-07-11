/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primaryColor: "#fff",
        secondaryBg: "#f7f3fb",
        lightBlack: "#050208",
        darkGrey: "#212529",
        buttonBg: "#050208",
        buttonHoverBg:"#a3a3a3",
        inputBg: "#f6f9f8"
      }
    },
    screens: {
      'sm': '400px',
      'md': '640px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
  },
  plugins: [],
}

