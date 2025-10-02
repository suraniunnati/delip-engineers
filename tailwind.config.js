module.exports = {
  content: [
    "./pages/**/*.html",   // ✅ looks in pages folder
    "./*.html",            // root (if you have any)
    "./src/**/*.{js,html}" // scripts/components if you use them
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
