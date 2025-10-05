/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light mode
        "primary": "#c96a2a",
        "secondary": "#fff3e8",
        "background": "#fff9f5",
        "border": "#e8d7cc",
        "logo": "#019b86",
        "warning": "#f97316",
        "destructive": "#ef4444",
        "accent": "#f59e0b",
        "success": "#16a34a",
        "sidebar": "#8a4b2a",

        // Dark mode aliases
        "primary-dark": "#e07b3d",
        "secondary-dark": "#2a1d16",
        "background-dark": "#1a1411",
        "border-dark": "#3b2e27",
        "logo-dark": "#22d3a9",
        "warning-dark": "#fb923c",
        "destructive-dark": "#f87171",
        "accent-dark": "#fbbf24",
        "success-dark": "#22c55e",
        "sidebar-dark": "#1f0f07",
      },
    },
  },
  plugins: [],
};
