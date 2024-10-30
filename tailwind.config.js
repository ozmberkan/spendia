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
    },
  },
  plugins: [require("tailwindcss-animated")],
};
