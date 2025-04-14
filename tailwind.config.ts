import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
      colors: {
        'brand': {
          'primary': '#333357',
          'secondary': '#40205A',
          'light': '#5B5B7B',
          'lighter': '#8484A3',
          'dark': '#292944',
          'accent': '#6C63FF'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: '#333357',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#333357',
          foreground: '#FFFFFF',
          light: '#5B5B7B',
          dark: '#292944'
        },
        secondary: {
          DEFAULT: '#40205A',
          foreground: '#FFFFFF',
          light: '#522875',
          dark: '#2E1841'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: '#F4F4F8',
          foreground: '#666687'
        },
        accent: {
          DEFAULT: '#6C63FF',
          foreground: '#FFFFFF'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        'deep-blue': '#333357',
        'light-blue': '#E6F0FF', 
        'soft-gray': '#F5F7FA',
        'dark-gray': '#333333',
        'medium-gray': '#757575',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-right': {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'scale-up': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.4s ease-out',
        'fade-out': 'fade-out 0.4s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-right': 'slide-right 0.5s ease-out',
        'scale-up': 'scale-up 0.4s ease-out',
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'strong': '0 10px 30px rgba(0, 0, 0, 0.12)',
        'inner-light': 'inset 0 2px 4px rgba(0, 0, 0, 0.02)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
