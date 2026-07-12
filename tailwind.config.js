/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        cream: "#F5EFDD",
        "cream-dim": "#EDE5CC",
        paper: "#FFFDF7",
        ink: "#15130F",
        "ink-soft": "#423E36",

        orange: "#F5841F",
        "orange-dark": "#D9690A",
        "orange-light": "#FCC48C",

        green: "#2BB673",
        "green-dark": "#1E8A57",
        "green-light": "#B7EBD3",

        purple: "#C9AEF5",
        "purple-dark": "#9C7CE0",

        blue: "#A9B8F2",
        "blue-dark": "#7488DE",

        red: "#E5484D",
        "red-dark": "#C1272D",
        yellow: "#F5D949",
      },
      fontFamily: {
        display: ["ArchivoBlack"],
        sans: ["SpaceGrotesk"],
        "sans-bold": ["SpaceGroteskBold"],
        mono: ["JetBrainsMono"],


      },
      borderRadius: {
        "brutal-sm": "6px",
        brutal: "14px",
        "brutal-lg": "28px",
      },
    },
  },
  plugins: [],
};