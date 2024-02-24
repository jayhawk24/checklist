import type { Config } from "tailwindcss";

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
                primary: {
                    DEFAULT: "#006494",
                    "200": "#00A6FB",
                    "400": "#0582CA",
                    "600": "#006494",
                    "800": "#003554",
                    "900": "#051923"
                }
            }
        }
    },
    plugins: []
};
export default config;
