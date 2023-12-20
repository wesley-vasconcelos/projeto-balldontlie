import { fontFamily as _fontFamily } from "tailwindcss/defaultTheme";
export const content = ["../index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"];
export const darkMode = "class";
export const theme = {
  extend: {
    screens: {
      short: { max: "1280px" },
      normal: { min: "1281px" },
    },
    fontFamily: {
      sans: ["Inter", ..._fontFamily.sans],
    },
  },
};
export const variants = {
  extend: {},
};
export const plugins = [
  require("@tailwindcss/forms"),
  require("tailwind-scrollbar"),
];
