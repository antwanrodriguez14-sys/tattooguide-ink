/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          black: '#0A0A0A',
          card: '#111111',
          border: '#1E1E1E',
          muted: '#2A2A2A',
          white: '#F5F0E8',
          red: '#C13B2A',
          'red-dark': '#9B2D1F',
          gray: '#8A8A8A',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
