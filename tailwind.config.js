module.exports = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      transform: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      colors: {
        amazon_blue: {
          light: "#232F3E",
          DEFAULT: "#131921",
        },
        bm_teal: {
          DEFAULT: "#3C8F9F",
          light: "#75BDC7",
          dark: "#23666F",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};


