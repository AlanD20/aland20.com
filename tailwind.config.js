module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#F3EAFC',
          200: '#E8D5F9',
          300: '#DCBFF6',
          400: '#D0AAF3',
          500: '#C595F1',
          600: '#B980EE',
          700: '#AD6BEB',
          800: '#A155E8',
          light: '#a92be2',
          normal: '#8a2be2',
          dark: '#4a1e9e',
        },
        cBlack: {
          // 'black-100': '#E7E7E9',
          // 'black-200': '#CFCED3',
          100: '#DCDCDD',
          200: '#BABABA',
          300: '#6e6d7a',
          400: '#0d0c22',
        },
        cWhite: {
          100: '#fff',
          200: '#F5F5F6',
          300: '#f3f3f4',
          400: '#eaeaea',
        }
      },
      animation: {
        'open-details': 'open 450ms linear forwards',
        'close-details': 'close 450ms linear forwards',
        'open-dialog': 'open 250ms linear',
        'close-dialog': 'close 250ms linear',
        'open-navbar': 'open-navigation 250ms linear',
        'close-navbar': 'close-navigation 250ms linear',
      },
      keyframes: {
        'open-navigation': {
          '0%': {
            opacity: 0,
            visibility: 'invisible',
            transform: 'translateY(-5%)',
            // backgroundColor: '#f3f3f4'
          },
          '100%': {
            opacity: 1,
            visibility: 'visible',
            transform: 'translateY(0)',
            // backgroundColor: '#fff'
          },
        },
        'close-navigation': {
          '0%': {
            opacity: 1,
            visibility: 'visible',
            transform: 'translateY(0)',
            // backgroundColor: '#f3f3f4'
          },
          '100%': {
            opacity: 0,
            visibility: 'hidden',
            transform: 'translateY(-15%)',
            // backgroundColor: '#fff'
          },
        },
        'open': {
          '0%': {
            opacity: 0,
            visibility: 'hidden',
          },
          '100%': {
            opacity: 1,
            visibility: 'visible',
          }
        },
        'close': {
          '0%': {
            opacity: 1,
            visibility: 'visible',
          },
          '100%': {
            opacity: 0,
            visibility: 'hidden',
          },
        },
      }
    }
  },
  plugins: [],
}
