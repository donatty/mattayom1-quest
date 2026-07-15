import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0F172A",
        panel: "#1E293B",
        panelLight: "#28374B",
        gold: "#F5B841",
        teal: "#2DD4BF",
        ink: "#F1F5F9",
        muted: "#94A3B8",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      borderRadius: {
        card: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
