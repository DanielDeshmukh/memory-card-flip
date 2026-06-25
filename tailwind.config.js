module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#60a5fa',
        accent: '#1e40af',
        light: '#f8fafc',
        dark: '#0f172a',
        slate: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          300: '#94a3b8',
          200: '#e2e8f0',
        },
        blue: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },
        purple: {
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        green: {
          400: '#10b981',
        },
        yellow: {
          400: '#f59e0b',
        },
        red: {
          400: '#ef4444',
        },
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'modal': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'lg': '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      transitionProperty: {
        'all': 'all',
      },
      transitionDuration: {
        '600': '600ms',
      },
      transitionTimingFunction: {
        'easeInOut': 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
    },
  },
  plugins: [],
}