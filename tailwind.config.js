/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      keyframes: {
        scaleUp: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.2)" },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "scale-up": "scaleUp 0.3s forwards",
        "fade-out": "fadeOut 0.5s forwards",
        "fade-in": "fadeIn 0.5s forwards",
      },
    },
    screens: {
      sm: "100px", // Set small breakpoint to 614px
      md: "768px",
      lg: "1280px",
      xl: "1400px",
    },
  },
  plugins: [],
};
