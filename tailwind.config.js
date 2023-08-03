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
                'barlow-condensed': ['Barlow Condensed', 'sans-serif'],
                'monserrat': ['Montserrat', 'sans-serif'],
                'inter': ['Inter', 'sans-serif'],
            },

            colors: {

                "primary": "#FAFAFA",
                "secondary": "#050505",

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
            },

            animation: {
                wiggle: 'wiggle 1s ease-in-out infinite',
            },

            borderWidth: {
                '1': '1px',
                '2': '2px',
                '3': '3px',
                '4': '4px',
                '5': '5px',
                '6': '6px',
                '7': '7px',
                '8': '8px',
                '9': '9px',
                '10': '10px',
                '11': '11px',
                '12': '12px',
            },
        },
    },
    plugins: [
    ],
}