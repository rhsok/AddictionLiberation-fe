import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/container/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {},
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        partialsans: ['var(--font-partialSans)', 'sans-serif'],
        paperlogy: ['var(--font-paperlogy)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
