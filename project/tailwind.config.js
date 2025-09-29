/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // GitHub dark theme colors
        'gh-bg': '#0d1117',
        'gh-bg-secondary': '#161b22',
        'gh-bg-tertiary': '#21262d',
        'gh-border': '#30363d',
        'gh-border-muted': '#21262d',
        'gh-text': '#f0f6fc',
        'gh-text-secondary': '#8b949e',
        'gh-text-muted': '#7d8590',
        'gh-blue': '#1f6feb',
        'gh-blue-hover': '#388bfd',
        'gh-green': '#238636',
        'gh-green-hover': '#2ea043',
        'gh-accent': '#58a6ff',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 2s linear infinite',
      },
    },
  },
  plugins: [],
}