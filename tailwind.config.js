// Brand colours (gold + sky are sampled from the NEVERSAID logo) + fonts. After changing any Tailwind classes in the HTML/JS, run: npm run build
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0f",
        panel: "#15151c",
        paper: "#f6f1e7",
        gold: { DEFAULT: "#fcbc5c", light: "#fdd391", dark: "#c4841f" },
        sky: "#37b6ff",
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
    },
  },
};
