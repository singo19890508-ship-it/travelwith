import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 薩摩藍（Satsuma Indigo）— メインブランドカラー
        satsuma: {
          50: "#EEF2F8",
          100: "#D5DFF0",
          200: "#ABBFE1",
          300: "#7A99CC",
          400: "#4E72B0",
          500: "#2D5090",
          600: "#1B3A5C",
          700: "#142D47",
          800: "#0D1F30",
          900: "#071018",
        },
        // 錦江湾（Kinkowan）— アクセントカラー
        kinko: {
          50: "#E0F7FA",
          100: "#B2EBF2",
          200: "#80DEEA",
          300: "#4DD0E1",
          400: "#26C6DA",
          500: "#0E7490",
          600: "#0B5E75",
          700: "#084A5C",
          800: "#053542",
          900: "#022129",
        },
        // 和の金（Japanese Gold）— ハイライト
        wagold: {
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#D97706",
          600: "#B45309",
        },
        // 砂浜（Beach Beige）— 背景地
        sunaha: {
          50: "#FDFAF5",
          100: "#FAF7F2",
          200: "#F5EFE0",
          300: "#EDE3CB",
        },
        // 既存互換
        primary: {
          50: "#EEF2F8",
          100: "#D5DFF0",
          500: "#2D5090",
          600: "#1B3A5C",
          700: "#142D47",
          900: "#071018",
        },
        accent: {
          50: "#E0F7FA",
          400: "#26C6DA",
          500: "#0E7490",
        },
      },
    },
  },
  plugins: [],
};

export default config;
