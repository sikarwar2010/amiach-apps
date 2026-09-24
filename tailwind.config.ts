import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      colors: {
        // Brand navy — sampled from the Maalgodaam logo. Identity, navigation, trust.
        brand: {
          50: "#EEF3FC",
          100: "#DCE6F8",
          200: "#B8CBF0",
          300: "#88A8E4",
          400: "#4C7BDC",
          500: "#2A5FCB",
          600: "#1E4CAA",
          700: "#173C8A",
          800: "#122E6E",
          900: "#0E2354",
          950: "#091733",
        },
        // Leaf green — reserved for sustainability / eco messaging only.
        leaf: {
          50: "#F0F6F2",
          100: "#DBEAE0",
          200: "#B4D3BE",
          500: "#3B7355",
          700: "#1F4D3A",
          800: "#193C2E",
          900: "#132E23",
        },
        // Warm orange — CTAs, price/value, active states, selected filters.
        accent: {
          50: "#FFF4EC",
          100: "#FFE4CC",
          200: "#FFC79A",
          300: "#FFA35F",
          400: "#FA8636",
          500: "#E8722A",
          600: "#CC5D1C",
          700: "#A64817",
          800: "#7E3714",
          900: "#5C2810",
        },
        // Warm neutrals — off-white / warm white / charcoal / soft gray.
        ink: {
          25: "#FDFCFA",
          50: "#FAF8F4",
          100: "#F2EEE6",
          200: "#E4DDD1",
          300: "#CCC2B0",
          400: "#A79C89",
          500: "#7D7362",
          600: "#5A5245",
          700: "#413A31",
          800: "#2B2621",
          900: "#1A1713",
          950: "#100E0B",
        },
        success: {
          50: "#F0F6F2",
          100: "#DBEAE0",
          500: "#3B7355",
          600: "#2A5C42",
          700: "#1F4D3A",
        },
        danger: {
          50: "#FDF2F1",
          500: "#C4432F",
          600: "#A6392A",
        },
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.375rem",
        "4xl": "1.75rem",
        "5xl": "2.25rem",
      },
      boxShadow: {
        "soft-xs": "0 1px 2px 0 rgb(26 23 19 / 0.05)",
        "soft-sm": "0 2px 8px -2px rgb(26 23 19 / 0.07), 0 1px 2px -1px rgb(26 23 19 / 0.05)",
        soft: "0 8px 24px -8px rgb(26 23 19 / 0.11), 0 2px 6px -2px rgb(26 23 19 / 0.06)",
        "soft-lg": "0 16px 40px -12px rgb(26 23 19 / 0.15), 0 4px 12px -4px rgb(26 23 19 / 0.07)",
        "soft-xl": "0 24px 64px -16px rgb(26 23 19 / 0.20), 0 8px 20px -6px rgb(26 23 19 / 0.09)",
        float: "0 8px 30px -8px rgb(26 23 19 / 0.18), 0 2px 8px -2px rgb(26 23 19 / 0.09)",
        "inner-line": "inset 0 0 0 1px rgb(26 23 19 / 0.07)",
      },
      maxWidth: {
        "8xl": "90rem",
      },
      animation: {
        "fade-up": "fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fadeIn 0.3s ease-out both",
        "scale-in": "scaleIn 0.2s cubic-bezier(0.16,1,0.3,1) both",
        shimmer: "shimmer 1.8s ease-in-out infinite",
        "pulse-soft": "pulseSoft 2.4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, rgba(11,29,22,0.9))",
      },
    },
  },
  plugins: [],
};

export default config;
