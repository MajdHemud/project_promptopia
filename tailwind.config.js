/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        barlow: ["Barlow", "sans-serif"],
        monaSans: ["Mona Sans", "sans-serif"],
      },
      colors: {
        "primary-orange": "#FF5722",
        "github-canvas-subtle": "#22272E",
        "subtle-white": "#adbac7",
        "github-canvas-dark": "#0d1117",
        "github-light": "#30363d",
        "github-canvas-inset": "#1c2128",
      },
    },
  },
  plugins: [],
};
