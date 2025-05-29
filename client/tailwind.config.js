module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a1a2e",
        accent: "#ffff00"
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}