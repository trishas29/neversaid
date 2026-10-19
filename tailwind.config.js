// Brand colours + fonts. After changing any Tailwind classes in the HTML/JS, run: npm run build
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0f",
        panel: "#15151c",
        paper: "#f6f1e7",
        gold: { DEFAULT: "#f2c45a", light: "#f7d88a", dark: "#b8862b" },
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
    },
  },
};
