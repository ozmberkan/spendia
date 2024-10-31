/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#194939",
        secondary: "#80bd3a",
      },
      backgroundImage: {
        "main-bg": "url('assets/bg.jpeg')",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      dropShadow: {
        custom: "20px 20px 100px rgb(15, 73, 57)",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
