// tailwind.config.js

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'background': 'var(--color-background)',
        'foreground': 'var(--color-foreground)',
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)',
        'accent': 'var(--color-accent)',
      },
      fontFamily: {
        sans: ['var(--font-primary)'],
      },
      transitionTimingFunction: {
        'custom': 'var(--transition-normal)',
      },
      boxShadow: {
        'custom': 'var(--shadow-md)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}