import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      inter: ['var(--font-inter)', 'sans-serif'],
      balthazar: ['var(--font-balthazar)', 'sans-serif'],
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#D09E04',
        secondary: '#1A171A',
        accent: '#79590C',
        dark: '#322F35',
        light: '#FCFAF8',
        danger: '#B9463D'
      },
    },
  },
  plugins: [],
};
export default config;
