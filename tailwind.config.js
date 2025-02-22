/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-light-blue": "#D5D6F0",
        "custom-gray-blue": " #8E95B3", //text color
        "custom-color-name": "#4F5268",
        "custom-bg-chat": "#F3F4FD",
        "custom-bg-button-send": "#2B90F1",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        custom: "915px", // Thêm breakpoint tùy chỉnh
      },
    },
  },
  plugins: [daisyui],
};
