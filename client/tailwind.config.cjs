module.exports = {
  mode: 'jit',
  content: [
    './index.html',
    './source/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      screens: {
        xs: '425px'
      },
      colors: {
        white: '#ffff'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        drop: {
          '0%': { transform: 'scaleY(0%)' },
          '100%': { transform: 'scaleY(100%)' }
        },
        shake: {
          '0%': { transform: 'translateX(0%)' },
          '25%': { transform: 'translateX(-2%)' },
          '50%': { transform: 'translateX(0%)' },
          '75%': { transform: 'translateX(2%)' },
          '100%': { transform: 'translateX(0%)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 250ms ease-in-out',
        scrollIn: 'fadeIn 1s ease-out',
        drop: 'drop 1s ease-in-out',
        shake: 'shake 200ms ease-in-out'
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        ddjjHistory: '40% 40% 20%'
      },
      transitionProperty: {
        'scroll-opacity': 'opacity',
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require("daisyui")
  ]
}
