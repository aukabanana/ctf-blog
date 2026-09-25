/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: 'var(--cyber-bg, #0a0e17)',
          surface: 'var(--cyber-surface, #111827)',
          card: 'var(--cyber-card, rgba(17, 24, 39, 0.75))',
          border: 'var(--cyber-border, rgba(0, 255, 170, 0.2))',
          accent: 'var(--cyber-accent, #00ffaa)',
          secondary: 'var(--cyber-secondary, #00d4ff)',
          text: 'var(--cyber-text, #e2e8f0)',
          muted: 'var(--cyber-muted, #94a3b8)',
          danger: 'var(--cyber-danger, #ff4757)',
          warning: 'var(--cyber-warning, #ffa502)',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'cyber-glow': 'var(--cyber-glow, 0 0 20px rgba(0, 255, 170, 0.25))',
      },
    },
  },
  plugins: [],
};
