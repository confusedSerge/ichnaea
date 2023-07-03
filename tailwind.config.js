/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'monserrat': ['Montserrat', 'sans-serif'],
                'inter': ['Inter', 'sans-serif'],
            },

            colors: {

                "primary": "#F6F6F6",
                "secondary": "#1A1E24",
                "accent": "#EE6352", // summer-red





            },

            screens: {
                'xs': '320px',    // phones
                'sm': '640px',    // phones
                'md': '768px',    // tablets, small laptops
                'lg': '1000px',   // tablets, small laptops
                'xl': '1200px',   // laptops, desktops and upwards
            },

            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },

                jump: {
                    '0%, 100%': { transform: 'translateY(1px)' },
                    '50%': { transform: 'translateY(-1px)' },
                },

                swirly: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },

                spinshrink: {
                    '0%': { transform: 'rotate(0deg) scale(1)' },
                    '100%': { transform: 'rotate(360deg) scale(0)' },
                },

                flip: {
                    '0%': { transform: 'rotateY(0deg)' },
                    '100%': { transform: 'rotateY(180deg)' },
                },

                collapse: {
                    '0%': { height: '100%' },
                    '100%': { height: '0%' },
                },

                fadein: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },

                fadeout: {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },

            },

            animation: {
                wiggle: 'wiggle 1s ease-in-out infinite',
                jump: 'jump 1s ease-in-out infinite',
                swirly: 'swirly 1s ease-in-out infinite',
                spinshrink: 'spinshrink 0.35s ease-in-out forwards',
                flip: 'flip 0.35s ease-in-out infinite',
                collapse: 'collapse 0.2s ease-in-out',

                fadein: 'fadein 0.5s ease-in-out forwards',
                fadeout: 'fadeout 0.5s ease-in-out forwards',

            },
        },
    },
    plugins: [
    ],
}