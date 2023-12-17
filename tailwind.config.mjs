import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
    colors: {
      siren: {
        50: "#fef1f9",
        100: "#fee5f5",
        200: "#ffcaed",
        300: "#ff9fdc",
        400: "#ff64c2",
        500: "#fe36a7",
        600: "#ef1384",
        700: "#d00668",
        800: "#ac0856",
        900: "#760a3d",
        950: "#580028",
      },

      monsoon: {
        50: "#f8f7f8",
        100: "#f2f1f2",
        200: "#e6e4e5",
        300: "#d3ced1",
        400: "#b7afb3",
        500: "#9f959a",
        600: "#8d8287",
        700: "#70666a",
        800: "#5e5659",
        900: "#514a4d",
        950: "#2e292b",
      },
    },
  },
  plugins: [typography],
};
