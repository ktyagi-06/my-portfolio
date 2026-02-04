/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",   // ✅ THIS LINE FIXES EVERYTHING

  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],

  theme: {
    extend: {
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.5s ease-out forwards',
      },
    }
  },

  plugins: [],
};
