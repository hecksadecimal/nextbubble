import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/**/*.tsx",
    "./src/**/*.ts",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        msparp: {
          "primary": "#0072bc",
          "primary-content": "#9ed9ff",
          "secondary": "#4ade80",
          "secondary-content": "#166534",
          "accent": "#67e8f9",
          "accent-content": "#155e75",
          "neutral": "#4b5563",
          "neutral-content": "#9ca3af",
          "base-100": "#aaaaaa",
          "base-200": "#eeeeee",
          "base-300": "#ececec",
          "base-content": "#232323",
          "info": "#67e8f9",
          "info-content": "#0e7490",
          "success": "#bef264",
          "success-content": "#4d7c0f",
          "warning": "#fcd34d",
          "warning-content": "#b45309",
          "error": "#fda4af",
          "error-content": "#9f1239",
        },
        msdark: {
          "primary": "#38bdf8",
          "primary-content": "#075985",
          "secondary": "#14b8a6",
          "secondary-content": "#0f766e",
          "accent": "#06b6d4",
          "accent-content": "#155e75",
          "neutral": "#6b7280",
          "neutral-content": "#d1d5db",
          "base-100": "#535353",
          "base-200": "#474747",
          "base-300": "#3b3b3b",
          "base-content": "#dadada",
          "info": "#0891b2",
          "info-content": "#cffafe",
          "success": "#15803d",
          "success-content": "#a7f3d0",
          "warning": "#ca8a04",
          "warning-content": "#fef08a",
          "error": "#be123c",
          "error-content": "#fecdd3",
        },
        felt: {
          "primary": "#d9f99d",
          "secondary": "#4ade80",
          "accent": "#a3e635",
          "neutral": "#27e100",
          "neutral-text": "#27e100",
          "neutral-content": "#27e100",
          "base-100": "#000000",
          "base-200": "#156704",
          "base-300": "#4d7c0f",
          "base-content": "#27e100",
          "info": "#ecfccb",
          "success": "#84cc16",
          "warning": "#bef264", 
          "error": "#86efac",

          //"fontFamily": "'Alternian CBB', 'alternianFontOne', TrollType, mono",

          "--rounded-box": "0rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "0rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-text-case": "uppercase", // set default text transform for buttons
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0rem", // border radius of tabs

          "--bg-image": "url('/static/images/felt_manor_background.png')",
          "--bg-image-transparent": "opacity 0"
        },
        darkpurble: { // RabidSkullz
          "primary": "#7e22ce",
          "secondary": "#6b21a8",
          "accent": "#4338ca",
          "neutral": "#6d28d9",
          "base-100": "#2B0057",
          "base-200": "#1d013b",
          "base-300": "#140029",
          "info": "#9ca3af",
          "success": "#f3f4f6",
          "warning": "#374151",
          "error": "#111827",
        }
      },
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  }
} satisfies Config;
