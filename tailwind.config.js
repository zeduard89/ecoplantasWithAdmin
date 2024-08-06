/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily:{},
      colors: {
        navBarColor:'#525252',
        
      },
      boxShadow: {
        'card-custom': '0 4px 10px -2px rgba(34, 197, 94, 0.5)',
        'card-landing': 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
        'card-history': 'rgba(34, 197, 94, 0.3) 6px 2px 16px 0px, rgba(34, 197, 94, 0.3) -6px -2px 16px 0px',
      },
      animation:{ 
        slideDown: 'slideDown 3s',
        slideLeft: 'slideLeft 2s',
        slide: 'slide 1s ease-in-out',

      },
      keyframes:{
        
        slideDown:{
          '0%':{
            transform: 'translateY(-25rem)',
          },
          '100%':{
            transform: 'translateY(0rem)'
          }
        },
        slideLeft:{
          '0%':{
            transform: 'translatex(-7rem)',
            opacity:'0%'
          },
          '25%':{
            opacity:'0%'
          },
          '55%':{
            opacity:'50%'
          },
          '100%':{
            transform: 'translatex(0rem)',
            opacity:'0%'
          }
        },
        slide: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
  },
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  plugins: [],
}

