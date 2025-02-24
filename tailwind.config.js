/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        violet: "#5964e0",
        violetLight: "#939bf4",
        veryDarkBlue: "#19202f",
        midnight: "#121721",
        white: "#fff",
        LightGrey: "#F4F6F8",
        grey: "#9DAEC2",
        darkGrey: "#6E8098",
        midnight: "#121721",
        scootOrange: "#E99210",
      },
      fontFamily: {
        sans: ["Kumbh Sans", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};
