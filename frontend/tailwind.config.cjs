/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#c96a2a",
        secondary: "#fff3e8",
        background: "#fff9f5",
        border: "#e8d7cc",
        logo: "#019b86",
        warning: "#f97316",
        destructive: "#ef4444",
        accent: "#f59e0b",
        success: "#16a34a",
        sidebar: "#8a4b2a",
      },
      fontFamily: {
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
