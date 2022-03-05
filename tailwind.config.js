module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        drive: "drive 1.5s ease-out forwards",
      },
      keyframes: {
        drive: {
          from: {
            left: "-1000px",
          },
          to: {
            left: "0",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
