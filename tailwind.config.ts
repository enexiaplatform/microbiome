import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./content/**/*.mdx"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF8F4",
        ink: "#1C2B23",
        hairline: "#E5E1D8",
        pine: {
          50: "#EEF4F0",
          100: "#DCE9DF",
          200: "#B9D3C3",
          300: "#8FAF9B",
          400: "#5E9473",
          500: "#3D7A57",
          600: "#2E6847",
          700: "#245A3C",
          800: "#1D4830",
          900: "#163726",
          DEFAULT: "#245A3C",
        },
        sage: {
          100: "#EAF2EC",
          200: "#DCE9DF",
          300: "#C4DACB",
          400: "#A8C6B2",
          500: "#8FAF9B",
          600: "#74967F",
          700: "#5C7A66",
          DEFAULT: "#8FAF9B",
        },
        clay: {
          100: "#F5E8DC",
          200: "#EAD2BC",
          300: "#DDAE8A",
          400: "#D08E60",
          500: "#C2713B",
          600: "#A85E30",
          700: "#864B27",
          DEFAULT: "#C2713B",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      maxWidth: {
        article: "48rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(28, 43, 35, 0.05), 0 4px 16px rgba(28, 43, 35, 0.06)",
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "#1C2B23",
            "--tw-prose-headings": "#1C2B23",
            "--tw-prose-lead": "#3B4B42",
            "--tw-prose-links": "#245A3C",
            "--tw-prose-bold": "#1C2B23",
            "--tw-prose-counters": "#5C7A66",
            "--tw-prose-bullets": "#8FAF9B",
            "--tw-prose-hr": "#E5E1D8",
            "--tw-prose-quotes": "#1C2B23",
            "--tw-prose-quote-borders": "#8FAF9B",
            "--tw-prose-captions": "#5C7A66",
            "--tw-prose-code": "#1C2B23",
            "--tw-prose-pre-code": "#FAF8F4",
            "--tw-prose-pre-bg": "#1C2B23",
            "--tw-prose-th-borders": "#E5E1D8",
            "--tw-prose-td-borders": "#E5E1D8",
            maxWidth: "48rem",
            h2: {
              scrollMarginTop: "6rem",
            },
            h3: {
              scrollMarginTop: "6rem",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
