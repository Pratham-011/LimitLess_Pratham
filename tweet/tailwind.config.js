          /** @type {import('tailwindcss').Config} */
          export default {
            content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
            theme: {
              extend: {
                colors: {
                  'jet-black': '#121212',
                  'dark-jet': '#1E1E1E',
                  'pale-taupe': '#C2B6AB',
                  'light-taupe': '#E5DFD9',
                  'accent': '#F97316',
                },
                fontFamily: {
                  sans: ['Inter', 'sans-serif'],
                },
              },
            },
            plugins: [],
          };