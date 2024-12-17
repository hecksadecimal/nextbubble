import type { Config } from "tailwindcss";
import daisyui from 'daisyui'
import { themes } from "./src/lib/shared/themes";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      extend: {
        backgroundColor: ['even'],
      },
    },
  },
  daisyui: {
    themes,
  },
  plugins: [daisyui],
} satisfies Config;
