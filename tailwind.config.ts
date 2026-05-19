import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Sidebar ──────────────────────────────────────────────
        sidebar: {
          bg: '#1C2333',        // deep navy-slate
          hover: '#263044',     // hover state
          active: '#2F3D5C',    // active state
          border: '#2D3A52',    // dividers
          muted: '#8B9BB4',     // secondary text
          text: '#E8ECF4',      // primary text
        },
        // ── Content area ────────────────────────────────────────
        content: {
          bg: '#F9F7F3',        // warm parchment
          card: '#FFFFFF',
          border: '#E6E2D9',
        },
        // ── Primary accent: forest green (知识感 · 成长) ───────
        sage: {
          DEFAULT: '#2D6A4F',
          light: '#40916C',
          dark: '#1B4332',
          50:  '#E9F5EF',
          100: '#D4EBDE',
          200: '#A9D7BD',
          300: '#7EC39C',
          400: '#53AF7B',
          500: '#2D6A4F',
          600: '#245440',
          700: '#1B4332',
          800: '#123224',
          900: '#091116',
        },
        // ── Secondary accent: warm amber ────────────────────────
        amber: {
          DEFAULT: '#B45309',
          light: '#D97706',
          dark: '#92400E',
          50:  '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#B45309',
          600: '#92400E',
          700: '#78350F',
          800: '#451A03',
          900: '#1C0A00',
        },
        // ── Text ────────────────────────────────────────────────
        ink: {
          DEFAULT: '#18181B',    // headings
          body: '#3F3F46',      // body text
          muted: '#71717A',      // secondary text
          faint: '#A1A1AA',      // tertiary
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      maxWidth: {
        'reading': '720px',
        'content': '1200px',
        'prose': '72ch',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '72ch',
            color: '#3F3F46',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            lineHeight: '1.8',
            'h1, h2, h3, h4': {
              fontFamily: 'var(--font-playfair), Georgia, serif',
              color: '#18181B',
            },
            a: {
              color: '#2D6A4F',
              textDecoration: 'underline',
            },
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
