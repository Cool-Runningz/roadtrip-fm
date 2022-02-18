module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        drive: "drive 2s ease-out forwards",
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
      height: {
        screen80: "80vh",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
