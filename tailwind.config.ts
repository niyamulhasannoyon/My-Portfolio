/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx,md,mdx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        // Unified accent scale — emerald/mint is the single brand color.
        // (Previously a blue scale that clashed with the rest of the UI.)
        brand: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        // Semantic tokens for one-line branding updates.
        "brand-accent": "#10b981",
        "brand-bg": "#09090b",
        "brand-surface": "#030712",
        ink: {
          DEFAULT: "#0b0f1a",
          muted: "#5b6478",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
        "3xl": "2rem",
      },
      letterSpacing: {
        "brand-wide": "0.25em",
        "brand-wider": "0.35em",
        "brand-widest": "0.3em",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,15,26,0.04), 0 8px 24px rgba(11,15,26,0.06)",
        glow: "0 0 0 1px rgba(16,185,129,0.12), 0 12px 40px rgba(16,185,129,0.18)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.2)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.2)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
