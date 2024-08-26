import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

      },
      colors: {
        pink: { 900: '#FF9FF6' },
        red: { 600: "#FA4343" },
        green: { 1000: "#00ac8c" },
        violet: { 100: "#b3baff" },
        sand: { 100: "#fffaf3" },
      },
    },
  },
  plugins: [
  ],
};
export default config;
