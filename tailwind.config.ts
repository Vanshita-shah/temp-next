import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "475px",
      },
      colors: {
        primary: "var( --primary-color)",
        "primary-dark": "var( --primary-dark-color)",
        "primary-light": "var( --primary-light-color)",
        "border-color": "var( --border-color)",
        error: "var(--error-color)",
      },
    },
  },
  plugins: [],
};
export default config;
