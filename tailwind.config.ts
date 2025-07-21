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
          "primary": "#2d2d2d",           // Dark coffee brown from logo
          "primary-content": "#ffffff",
          "secondary": "#f5e6a3",         // Warm yellow from logo
          "secondary-content": "#2d2d2d",
          "accent": "#d4af37",            // Gold accent
          "accent-content": "#2d2d2d",
          "neutral": "#4a4a4a",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",          // Clean white
          "base-200": "#fefcf7",          // Very light cream
          "base-300": "#f8f6f0",          // Light cream
          "base-content": "#2d2d2d",
          "info": "#8b9dc3",
          "success": "#22c55e",
          "warning": "#f5e6a3",
          "error": "#ef4444",
        },
      },
    ],
  },
} satisfies Config;
