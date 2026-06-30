import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        "border-strong": "hsl(var(--border-strong))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        "surface-elevated": "hsl(var(--surface-elevated))",
        brand: {
          "50": "hsl(var(--brand-50))",
          "100": "hsl(var(--brand-100))",
          "200": "hsl(var(--brand-200))",
          "300": "hsl(var(--brand-300))",
          "400": "hsl(var(--brand-400))",
          "500": "hsl(var(--brand-500))",
          "600": "hsl(var(--brand-600))",
          "700": "hsl(var(--brand-700))",
          "800": "hsl(var(--brand-800))",
          "900": "hsl(var(--brand-900))",
          "950": "hsl(var(--brand-950))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
          soft: "hsl(var(--success-soft))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
          soft: "hsl(var(--warning-soft))",
        },
        danger: {
          DEFAULT: "hsl(var(--danger))",
          foreground: "hsl(var(--danger-foreground))",
          soft: "hsl(var(--danger-soft))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
          soft: "hsl(var(--info-soft))",
        },
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
        rr: {
          bg: "hsl(var(--rr-bg))",
          "bg-elevated": "hsl(var(--rr-bg-elevated))",
          card: "hsl(var(--rr-card))",
          "card-elevated": "hsl(var(--rr-card-elevated))",
          border: "hsl(var(--rr-border))",
          "border-muted": "hsl(var(--rr-border-muted))",
          text: {
            DEFAULT: "hsl(var(--rr-text))",
            secondary: "hsl(var(--rr-text-secondary))",
            muted: "hsl(var(--rr-text-muted))",
          },
          accent: {
            DEFAULT: "hsl(var(--rr-accent))",
            hover: "hsl(var(--rr-accent-hover))",
            light: "hsl(var(--rr-accent-light))",
          },
          success: "hsl(var(--rr-success))",
          warning: "hsl(var(--rr-warning))",
          danger: "hsl(var(--rr-danger))",
          info: "hsl(var(--rr-info))",
        },
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
      },
      boxShadow: {
        xs: "0 1px 2px hsl(240 24% 10% / 0.04)",
        sm: "0 1px 3px hsl(240 24% 10% / 0.06), 0 1px 2px hsl(240 24% 10% / 0.04)",
        md: "0 4px 12px -2px hsl(240 24% 10% / 0.08), 0 2px 6px -2px hsl(240 24% 10% / 0.05)",
        lg: "0 12px 28px -6px hsl(240 24% 10% / 0.12), 0 6px 12px -6px hsl(240 24% 10% / 0.08)",
        xl: "0 24px 48px -12px hsl(240 24% 10% / 0.16)",
        glow: "0 0 0 4px hsl(var(--brand-600) / 0.12)",
      },
      fontSize: {
        "display-2xl": ["4.5rem", { lineHeight: "1", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-xl": ["3.75rem", { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "700" }],
        "display-lg": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-md": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" }],
        eyebrow: ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.08em", fontWeight: "600" }],
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.2, 0, 0, 1)",
      },
      zIndex: {
        dropdown: "1000",
        sticky: "1020",
        overlay: "1030",
        modal: "1040",
        popover: "1050",
        toast: "1060",
        tooltip: "1070",
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
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "mesh-drift": {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(0,-2%,0) scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.5s cubic-bezier(0.2,0,0,1) both",
        "mesh-drift": "mesh-drift 30s ease-in-out infinite",
        shimmer: "shimmer 2s infinite linear",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
