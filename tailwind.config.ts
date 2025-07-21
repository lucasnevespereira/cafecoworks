import type { Config } from "tailwindcss";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const daisyui = require("daisyui");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        'display': ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'coffee': {
          50: '#fffef9',   // Warm off-white (paper/cream)
          100: '#faf7f0',  // Light cream
          200: '#f0ead8',  // Café au lait
          300: '#e6d5b7',  // Light latte
          400: '#d4a574',  // Creamy latte brown
          500: '#b8956a',  // Medium latte
          600: '#8b6f47',  // Medium coffee brown
          700: '#6b5635',  // Dark roast
          800: '#4a3c28',  // Espresso
          900: '#2c1810',  // Rich coffee brown (darkest)
          950: '#1a0f08',  // Almost black coffee
        },
        'cream': {
          50: '#fffef9',
          100: '#faf7f0',
          200: '#f0ead8',
          300: '#e6d5b7',
          400: '#d9c7a3',
          500: '#c9b892',
          600: '#b8a082',
          700: '#9d8a73',
          800: '#7d6c5b',
          900: '#5d5346',
        },
        'golden': {
          50: '#fefdf0',
          100: '#fcf7d4',
          200: '#f8ec9f',
          300: '#f4d03f',  // Main golden yellow
          400: '#efc12a',
          500: '#e6b017',
          600: '#d49d0f',
          700: '#b8870d',
          800: '#8f6a0b',
          900: '#6b4f08',
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'coffee': '0.75rem',
      },
      boxShadow: {
        'coffee': '0 4px 6px -1px rgba(44, 24, 16, 0.1), 0 2px 4px -1px rgba(44, 24, 16, 0.06)',
        'coffee-lg': '0 10px 15px -3px rgba(44, 24, 16, 0.1), 0 4px 6px -2px rgba(44, 24, 16, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        cafeco: {
          "primary": "#2c1810",           // Rich coffee brown
          "primary-focus": "#1a0f08",     // Darker coffee
          "primary-content": "#ffffff",
          "secondary": "#f4d03f",         // Warm golden yellow
          "secondary-focus": "#efc12a",   // Slightly darker golden
          "secondary-content": "#2c1810",
          "accent": "#d4a574",            // Creamy latte brown
          "accent-focus": "#b8956a",      // Darker latte
          "accent-content": "#2c1810",
          "neutral": "#8b6f47",           // Medium coffee brown
          "neutral-focus": "#6b5635",     // Darker neutral
          "neutral-content": "#ffffff",
          "base-100": "#fffef9",          // Warm off-white (paper/cream)
          "base-200": "#faf7f0",          // Light cream
          "base-300": "#f0ead8",          // Café au lait
          "base-content": "#2c1810",      // Dark coffee text
          "info": "#8b6f47",              // Coffee brown for info
          "info-content": "#ffffff",
          "success": "#8b6f47",           // Coffee brown instead of green
          "success-content": "#ffffff",
          "warning": "#f4d03f",           // Golden yellow
          "warning-content": "#2c1810",
          "error": "#8b6f47",             // Coffee brown instead of red
          "error-content": "#ffffff",
          "--rounded-box": "0.75rem",
          "--rounded-btn": "0.75rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.2s",
          "--animation-input": "0.2s",
          "--btn-text-case": "none",
          "--btn-focus-scale": "0.98",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.75rem",
        },
      }
    ],
  },
} satisfies Config;

export default config;