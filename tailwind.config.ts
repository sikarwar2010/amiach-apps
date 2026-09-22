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
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#EEF1FF",
          100: "#E0E4FF",
          200: "#C3CAFF",
          300: "#9CA8FF",
          400: "#7180FA",
          500: "#4C58F0",
          600: "#3A3FD8",
          700: "#2E2FAD",
          800: "#262689",
          900: "#1F206E",
          950: "#14154A",
        },
        ink: {
          25: "#FCFCFD",
          50: "#F8F9FB",
          100: "#F1F2F5",
          200: "#E4E6EB",
          300: "#D1D5DC",
          400: "#9AA1AE",
          500: "#6E7482",
          600: "#4F5561",
          700: "#383D47",
          800: "#23262E",
          900: "#15171C",
          950: "#0B0C0F",
        },
        success: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
        },
        urgent: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        },
        danger: {
          50: "#FEF2F2",
          500: "#EF4444",
          600: "#DC2626",
        },
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
        "3xl": "1.5rem",
        "4xl": "1.875rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "soft-xs": "0 1px 2px 0 rgb(15 17 21 / 0.04)",
        "soft-sm": "0 2px 8px -2px rgb(15 17 21 / 0.06), 0 1px 2px -1px rgb(15 17 21 / 0.04)",
        soft: "0 8px 24px -8px rgb(15 17 21 / 0.10), 0 2px 6px -2px rgb(15 17 21 / 0.05)",
        "soft-lg": "0 16px 40px -12px rgb(15 17 21 / 0.14), 0 4px 12px -4px rgb(15 17 21 / 0.06)",
        "soft-xl": "0 24px 64px -16px rgb(15 17 21 / 0.18), 0 8px 20px -6px rgb(15 17 21 / 0.08)",
        float: "0 8px 30px -8px rgb(15 17 21 / 0.16), 0 2px 8px -2px rgb(15 17 21 / 0.08)",
        "inner-line": "inset 0 0 0 1px rgb(15 17 21 / 0.06)",
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
          "linear-gradient(to bottom, transparent, rgba(11,12,15,0.85))",
      },
    },
  },
  plugins: [],
};

export default config;
