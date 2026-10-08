/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gridText: '#192837',
        gridAccent: '#7342E2',
        gridLoginBg: '#F2F2EE',
        gridSurface: '#FFFFFF',
        gridSheet: '#CFC8C5',
        gridBorder: 'rgba(25, 40, 55, 0.12)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Helvetica Now Display Bold', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
