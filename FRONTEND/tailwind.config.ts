import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#070a0c",
        surface: "#0d1410",
        "surface-2": "#16382c",
        border: "#1e3d2f",
        primary: "#00e5ff",
        "primary-dark": "#00b8cc",
        accent: "#00ffaa",
        "accent-dark": "#00cc88",
        foreground: "#e2e8f0",
        muted: "#a3b8cc",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-hero":
          "radial-gradient(circle at 50% 30%, #12191d 0%, #070a0c 100%)",
        "gradient-metallic":
          "linear-gradient(135deg, #16382c 0%, #2a6f56 50%, #112920 100%)",
        "gradient-metallic-bright":
          "linear-gradient(135deg, #2a6f56 0%, #3d9b79 50%, #16382c 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
