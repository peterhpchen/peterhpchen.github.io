/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      screens: {
        lg: '50em',
      },
      gridTemplateAreas: {
        normal: [
          'header header header header',
          'gallery gallery gallery gallery',
        ],
        cta: ['header header header cta', 'gallery gallery gallery gallery'],
      },
    },
  },
  plugins: [
    require('@savvywombat/tailwindcss-grid-areas'),
    require('tailwind-clip-path'),
  ],
  variants: {
    gridTemplateAreas: ['responsive'],
  },
};
