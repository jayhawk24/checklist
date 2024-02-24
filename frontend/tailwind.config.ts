import type { Config } from "tailwindcss";

export const primaryColors = {
    DEFAULT: "#006494",
    "200": "#00A6FB",
    "400": "#0582CA",
    "600": "#006494",
    "800": "#003554",
    "900": "#051923"
};

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-gilroy)"]
            },
            colors: {
                primary: primaryColors
            }
        }
    },
    plugins: []
};
export default config;
