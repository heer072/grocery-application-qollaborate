import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#effaf3",
          100: "#d9f2e3",
          500: "#53B175",
          600: "#429762",
          700: "#35784f",
        },
        ink: {
          900: "#181725",
          700: "#4C4F4D",
          500: "#7C7C7C",
          200: "#E2E2E2",
          100: "#F2F3F2",
        },
      },
      boxShadow: {
        soft: "0 12px 32px rgb(24 23 37 / 0.08)",
      },
    },
  },
  plugins: [],
} satisfies Config;
