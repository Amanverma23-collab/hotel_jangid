/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
        sand: {
          50: '#FDFCF9',
          100: '#F9F5EC',
          200: '#F3EBDD',
          300: '#E7D8C0',
          400: '#D7BF9F',
          500: '#BF9E77',
        },
        ink: {
          950: '#080d17',
          900: '#1C1917',
          850: '#121824',
          800: '#292524',
          700: '#44403C',
          600: '#57534E',
          500: '#78716C',
        },
        terracotta: {
          50: '#FDF5F2',
          100: '#FBE8E2',
          200: '#F7D1C5',
          500: '#C85A32',
          600: '#B24924',
          700: '#923818',
        },
        saffron: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#D97706',
          600: '#B45309',
        },
        gold: {
          50: '#fbf8f0',
          100: '#f5edd7',
          200: '#ebd9ac',
          300: '#dfc580',
          400: '#d2b056',
          500: '#c59b27',
          600: '#af831d',
          luxury: '#dfc59e',
          button: '#c99f5b',
          accent: '#b9935a',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -1px rgba(28, 25, 23, 0.06), 0 1px 3px -1px rgba(28, 25, 23, 0.04)',
        'warm-md': '0 12px 28px -4px rgba(28, 25, 23, 0.08), 0 4px 10px -2px rgba(28, 25, 23, 0.04)',
        'warm-lg': '0 24px 48px -12px rgba(28, 25, 23, 0.12), 0 8px 16px -4px rgba(28, 25, 23, 0.06)',
      }
    },
  },
  plugins: [],
}
