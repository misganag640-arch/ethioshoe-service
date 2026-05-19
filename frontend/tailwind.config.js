export default {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ethio: { green:'#078930', yellow:'#FCDD09', red:'#DA121A' },
        night: '#0b0b0f',
        glass: 'rgba(255,255,255,0.06)',
      },
      fontFamily: { display: ['Sora','sans-serif'], body: ['Inter','sans-serif'] },
      backgroundImage: {
        'hero': 'radial-gradient(1200px 600px at 10% 10%, rgba(7,137,48,0.25), transparent), radial-gradient(1000px 500px at 90% 30%, rgba(252,221,9,0.18), transparent), radial-gradient(800px 400px at 50% 100%, rgba(218,18,26,0.18), transparent)'
      }
    }
  },
  plugins: []
};
