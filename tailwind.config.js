/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/index.html",
    "./src/ts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'base': 'var(--color-base)',
        'surface': 'var(--color-surface)',
      },
    },
  },
  plugins: [],
}
