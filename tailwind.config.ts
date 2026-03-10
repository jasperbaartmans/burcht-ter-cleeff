import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black:   '#262628',
        white:   '#FFFFFF',
        grey:    '#E0E1DA',
        ivory:   '#F3EEE2',
        forest:  '#789928',
        moss:    '#8D9462',
        sienna:  '#853F21',
        caramel: '#B07826',
      },
      fontFamily: {
        walsheim: ['var(--font-walsheim)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        helvetica: ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'h1':    ['72px', { lineHeight: '70px', letterSpacing: '-0.03em', fontWeight: '400' }],
        'h2':    ['56px', { lineHeight: '60px', letterSpacing: '-0.03em', fontWeight: '400' }],
        'h3':    ['40px', { lineHeight: '44px', letterSpacing: '-0.02em', fontWeight: '500' }],
        'h4':    ['29px', { lineHeight: '30px', letterSpacing: '-0.01em', fontWeight: '500' }],
        'sub1':  ['20px', { lineHeight: '20px', letterSpacing: '-0.01em', fontWeight: '500' }],
        'sub2':  ['18px', { lineHeight: '20px', letterSpacing: '-0.01em', fontWeight: '500' }],
        'sub3':  ['16px', { lineHeight: '20px', letterSpacing: '-0.01em', fontWeight: '500' }],
        'body1': ['20px', { lineHeight: '26px', letterSpacing: '-0.03em', fontWeight: '400' }],
        'body2': ['17px', { lineHeight: '23px', letterSpacing: '-0.03em', fontWeight: '400' }],
        'body3': ['14px', { lineHeight: '20px', letterSpacing: '-0.01em', fontWeight: '500' }],
      },
    },
  },
  plugins: [],
}

export default config
