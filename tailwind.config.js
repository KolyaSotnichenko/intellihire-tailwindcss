/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/@uc-react-ui/multiselect/**/*.{js,ts,jsx,tsx}'
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
