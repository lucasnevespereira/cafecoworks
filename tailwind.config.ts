import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        cafeco: {
          "primary": "#2d2d2d",           // Dark coffee brown/black
          "primary-content": "#ffffff",
          "secondary": "#f5e6a3",         // Warm yellow from logo
          "secondary-content": "#2d2d2d",
          "accent": "#e8d5a3",            // Muted yellow accent
          "accent-content": "#2d2d2d",
          "neutral": "#3d3d3d",
          "neutral-content": "#ffffff",
          "base-100": "#fefcf7",          // Very light cream/off-white
          "base-200": "#f8f4ec",          // Light cream
          "base-300": "#f0eadb",          // Slightly darker cream
          "base-content": "#2d2d2d",
          "info": "#67a3c1",
          "success": "#84cc16",
          "warning": "#eab308",
          "error": "#ef4444",
        },
      },
    ],
  },
} satisfies Config;
