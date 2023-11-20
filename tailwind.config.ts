import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary': '#38252B',
        'secondary': '#9E2D2F',
        'primary-1': '#807478',
        'grey-1': '#687481',
        'grey-2': '#738290',
        'grey-3': '#F9FAFC',
        'grey-4': '#A2AEB8',
        'grey-5': '#2D3748',
        'border-color': '#E7EAF0',
        'main-bg-color': '#F9FAFC'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
export default config
