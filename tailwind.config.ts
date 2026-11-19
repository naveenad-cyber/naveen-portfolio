import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#030806',
          900: '#050D0A',
          800: '#08130F',
          700: '#0E1F19',
          600: '#163026',
        },
        line: 'rgba(120, 255, 200, 0.16)',
        accent: {
          DEFAULT: '#00FF9C',
          soft: '#9DFFD2',
          deep: '#00B36B',
        },
        fog: {
          DEFAULT: '#E7ECF5',
          muted: '#98A3B8',
          dim: '#64708A',
        },
      },
      fontFamily: {
        display: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        orbit: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glitch: {
          '0%, 92%, 100%': { transform: 'translate(0)', clipPath: 'inset(0 0 0 0)' },
          '93%': { transform: 'translate(-3px, 1px)', clipPath: 'inset(20% 0 55% 0)' },
          '95%': { transform: 'translate(3px, -1px)', clipPath: 'inset(60% 0 10% 0)' },
          '97%': { transform: 'translate(-2px, 0)', clipPath: 'inset(35% 0 40% 0)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        blink: { '0%, 49%': { opacity: '1' }, '50%, 100%': { opacity: '0' } },
        pulseSoft: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
      },
      animation: {
        glitch: 'glitch 6s infinite steps(1)',
        scan: 'scan 4s linear infinite',
        blink: 'blink 1.1s step-end infinite',
        marquee: 'marquee 40s linear infinite',
        'orbit-slow': 'orbit 60s linear infinite',
        'orbit-slower': 'orbit 90s linear infinite reverse',
        float: 'float 7s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 1.5s infinite',
        'pulse-soft': 'pulseSoft 3.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
