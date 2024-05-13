const colors = require('tailwindcss/colors')

const toRgba = (hexCode, opacity = 50) => {
    let hex = hexCode.replace('#', '');

    if (hex.length === 3) {
        hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r},${g},${b},${opacity / 100})`;
};

const flattenColorPalette = (obj, sep = '-') => Object.assign(
    {},
    ...function _flatten(o, p = '') {
        return [].concat(...Object.keys(o)
            .map(k =>
                typeof o[k] === 'object' ?
                    _flatten(o[k], k + sep) :
                    ({ [p + k]: o[k] })
            )
        );
    }(obj)
);

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}"
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1800px"
            }
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))"
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))"
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))"
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))"
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))"
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))"
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))"
                }
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)"
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" }
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" }
                }
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out"
            },
            fontFamily: {
                sans: ["var(--font-gilroy)"]
            }
        }
    },
    plugins: [
        require("tailwindcss-animate"),
        function ({ addUtilities, theme }) {
            const utilities = {
                '.bg-stripes': {
                    backgroundImage:
                        'linear-gradient(45deg, var(--stripes-color) 12.50%, transparent 12.50%, transparent 50%, var(--stripes-color) 50%, var(--stripes-color) 62.50%, transparent 62.50%, transparent 100%)',
                    backgroundSize: '5.66px 5.66px',
                },
            }

            const addColor = (name, color) =>
                (utilities[`.bg-stripes-${name}`] = { '--stripes-color': color })

            const colors = flattenColorPalette(theme('backgroundColor'))
            for (let name in colors) {
                try {
                    const [r, g, b, a] = toRgba(colors[name])
                    if (a !== undefined) {
                        addColor(name, colors[name])
                    } else {
                        addColor(name, `rgba(${r}, ${g}, ${b}, 0.4)`)
                    }
                } catch (_) {
                    addColor(name, colors[name])
                }
            }

            addUtilities(utilities)
        },
    ]
};

export default config;
