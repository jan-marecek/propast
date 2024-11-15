/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            gridTemplateColumns: {
                'footer': '200px minmax(900px, 1fr) 100px',
                'form': 'repeat(auto-fill, minmax(10rem, 1fr))',
            },
            screens: {
                "menu": "1100px",
            },
            animation: {
                linear: '2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) 0s infinite normal none running loading'
            },
            maxWidth: {
                'content': '86.25rem'
            },
            spacing: {
                    'mobile': '1rem',
                    'appbar': '60px',
            },
            keyframes: {
                loading: {
                    '0%': {left: '-35%', right: '100%'},
                    '60%': {left: '100%', right: '-90%'},
                    '100%': {left: '100%', right: '-90%'}
                }
            }
        }
    },
    plugins: [require("daisyui")],
    daisyui: {
        styled: true,
        themes:
            [{
                propastNameTheme: {
                    "primary": "#547697",
                    "primary-content": "#FFFFFF",
                    // "primary-focus": "#E00A47",
                    "secondary": "#e8bb7a",
                    // "secondary-focus": "#5243AA",
                    // "secondary-content": "#FFFFFF",
                    "accent": "#ffedaa",
                    // "accent-focus": "#FF5630",
                    // "accent-content": "#FFFFFF",
                    "neutral": "#212529",
                    // "neutral-focus": "#1c1c1c",
                    // "neutral-content": "#FFFFFF",
                    "base-content": "#222222",
                    "base-100": "#FFFFFF",
                    "base-200": "#D6D6D6",
                    "base-300": "#A1A1A1",
                    "info": "#1b9ef9",
                    // "info-content": "#FFFFFF",
                    "success": "#40b751",
                    "success-content": "#FFFFFF",
                    "warning": "#f9a41b",
                    // "warning-content": "#FFFFFF",
                    "error": "#ef2931",
                    // "error-content": "#FFFFFF",

                    "--rounded-box": "3px", // border radius rounded-box utility class, used in card and other large boxes
                    "--rounded-btn": "9999px", // border radius rounded-btn utility class, used in buttons and similar element
                    // "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
                    // "--animation-btn": "0.25s", // duration of animation when you click on button
                    // "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
                    "--btn-text-case": "none", // set default text transform for buttons
                    // "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
                    // "--border-btn": "1px", // border width of buttons
                    // "--tab-border": "1px", // border width of tabs
                    // "--tab-radius": "0.5rem", // border radius of tabs
                },
            },
                //"dark",
            ],
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: "",
    },
};
