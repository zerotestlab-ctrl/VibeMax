import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        border: '#334155',
        input: '#334155',
        ring: '#14b8a6',
        background: '#0f172a',
        foreground: '#f1f5f9',
        primary: {
          DEFAULT: '#14b8a6',
          foreground: '#0f172a',
        },
        secondary: {
          DEFAULT: '#1e2937',
          foreground: '#94a3b8',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#f1f5f9',
        },
        muted: {
          DEFAULT: '#1e2937',
          foreground: '#64748b',
        },
        accent: {
          DEFAULT: '#14b8a6',
          foreground: '#0f172a',
        },
        popover: {
          DEFAULT: '#1e2937',
          foreground: '#f1f5f9',
        },
        card: {
          DEFAULT: '#1e2937',
          foreground: '#f1f5f9',
        },
        slate: {
          850: '#172033',
          950: '#0a0f1e',
        },
        teal: {
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
        },
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', ...fontFamily.sans],
        mono: ['JetBrains Mono', 'Fira Code', ...fontFamily.mono],
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
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
