import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'light': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'dark': '0 20px 25px -5px rgba(255, 255, 255, 0.05), 0 8px 10px -6px rgba(255, 255, 255, 0.05)',
        'hover-light': '0 25px 35px -5px rgba(0, 0, 0, 0.2), 0 12px 15px -5px rgba(0, 0, 0, 0.2)',
        'hover-dark': '0 25px 35px -5px rgba(255, 255, 255, 0.1), 0 12px 15px -5px rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
};
export default config;
