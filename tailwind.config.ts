import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        slideUp: 'slideUp 0.7s ease-out forwards', // 애니메이션 이름과 속성
        blink: 'blink 1s ease-in-out infinite', // 타이핑 커서 깜빡임
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(25px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        blink: {
          '0%, 20%, 80%, 100%': { borderRight: '1px solid white' }, // 흰색
          '40%, 60%': { borderRight: '1px solid transparent' }, // 투명
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      fontSize: {
        '2xs': '0.625rem',
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        sm: '0 5px 10px rgba(0, 0, 0, 0.12)',
        md: '0 8px 30px rgba(0, 0, 0, 0.12)',
        d: '0 1px 2px 0 #00000080',
      },
      screens: {
        '3xl': '1792px',
      },
    },
  },
  plugins: [],
};
export default config;
