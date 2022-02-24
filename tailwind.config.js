module.exports = {
  content: ["./src/**/*.{html,js}"],
  // purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      minWidth: theme => ({
        11: theme('spacing[11]'),
        20: theme('spacing[20]'),
      })
    },
  },
  plugins: [],
}
