// Brand colours + fonts for the Tailwind CDN. Loaded right after the Tailwind script on every page.
tailwind.config = {
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0f",
        panel: "#15151c",
        gold: { DEFAULT: "#f2c45a", light: "#f7d88a" },
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
    },
  },
};
