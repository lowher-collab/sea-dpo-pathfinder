import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ['Noto Serif SC', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Custom brand colors
        klein: {
          DEFAULT: "hsl(var(--klein-blue))",
          light: "hsl(224 100% 45%)",
          dark: "hsl(224 100% 25%)",
        },
        cyan: {
          electric: "hsl(var(--electric-cyan))",
        },
        coral: {
          DEFAULT: "hsl(var(--warm-coral))",
          light: "hsl(16 100% 70%)",
          dark: "hsl(16 100% 50%)",
        },
        navy: {
          deep: "hsl(var(--deep-navy))",
        },
        frost: {
          white: "hsl(var(--frost-white))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "slide-in": {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "slide-in": "slide-in 0.5s ease-out forwards",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, hsl(224 100% 20%) 0%, hsl(220 30% 6%) 50%, hsl(190 60% 15%) 100%)",
        "card-gradient": "linear-gradient(180deg, hsl(220 30% 12%) 0%, hsl(220 30% 8%) 100%)",
        "cta-gradient": "linear-gradient(135deg, hsl(16 100% 60%) 0%, hsl(25 100% 55%) 100%)",
        "glow-gradient": "radial-gradient(ellipse at center, hsl(224 100% 50% / 0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        "glass": "0 8px 32px hsl(0 0% 0% / 0.3)",
        "glow-blue": "0 0 60px hsl(224 100% 50% / 0.3)",
        "glow-orange": "0 4px 20px hsl(16 100% 50% / 0.4)",
        "glow-cyan": "0 0 40px hsl(190 100% 50% / 0.2)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
