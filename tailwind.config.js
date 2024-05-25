/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{astro,js,jsx,ts,tsx,vue}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
          grey: {
              dark: "#000000",
              light: "#181818",
              mid: "#121212",
          },
      },
      fontFamily: {
          // Archivo: ['Archivo', 'sans-serif'],
      },
      container: {
        center: true,
      },
    },
  },
  variants: {
    extend: {},
  },
	plugins: [
		function ({ addComponents }) {
            addComponents({
                ".container": {
                    maxWidth: "100%",
                    "@screen sm": {
                        maxWidth: "540px",
                    },
                    "@screen md": {
                        maxWidth: "720px",
                    },
                    "@screen lg": {
                        maxWidth: "960px",
                    },
                    "@screen xl": {
                        maxWidth: "1140px",
                    },
                },
            });
        },
	],
}