import colors from "./colors.js";
import defaultTheme from "tailwindcss/defaultTheme.js";

const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };
const px0_600 = { ...Array.from(Array(501)).map((_, i) => `${i}px`) };

const generateBoxShadows = (colors) => {
  const boxShadows = {};
  for (const [key, value] of Object.entries(colors)) {
    boxShadows[`inner-${key}`] =
      `inset 0 0 0 1px ${value.replace("<alpha-value>", 1)}`;
  }
  return boxShadows;
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: colors,
    extend: {
      width: {
        ...defaultTheme.spacing,
        px0_600,
      },
      minWidth: {
        ...defaultTheme.spacing,
        px0_100,
      },
      maxHeight: {
        ...defaultTheme.spacing,
        px0_600,
      },
      height: {
        ...defaultTheme.spacing,
        px0_600,
      },
      fontFamily: {
        sans: ["Pretendard", "ui-sans-serif", "system-ui"],
      },

      boxShadow: {
        ...generateBoxShadows(colors),
        "context-menu-shadow": "0px 8px 24px rgba(0, 0, 0, 0.16)",
      },
      userSelect: {
        all: "all",
      },
      padding: {
        ...defaultTheme.spacing,
        s: "4px",
        m: "8px",
        l: "12px",
        xl: "16px",
        xxl: "24px",
        xxxl: "32px",
        px0_100,
      },
      margin: {
        ...defaultTheme.spacing,
        s: "4px",
        m: "8px",
        l: "12px",
        xl: "16px",
        xxl: "24px",
        xxxl: "32px",
        px0_100,
      },
      gap: {
        ...defaultTheme.spacing,
        s: "4px",
        m: "8px",
        l: "12px",
        xl: "16px",
        xxl: "24px",
        xxxl: "32px",
      },
      borderRadius: {
        ...defaultTheme.spacing,
        s: "4px",
        m: "8px",
        l: "12px",
      },
      // spacing: px0_200,
      // fontSize: px0_100,
      // borderWidth: px0_10,
      // borderRadius: px0_100,
      inset: {
        ...defaultTheme.spacing,
        px0_200,
      },
      // lineHeight: px0_100,
      // letterSpacing: px0_100,
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      screens: {
        laptop: "800px",
      },
    },
  },
  plugins: [],
};
