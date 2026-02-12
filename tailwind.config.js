/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'valentine-red': '#ff4d6d',
                'valentine-pink': '#ffa3b5',
            },
            fontFamily: {
                'sans': ['Comic Sans MS', 'Verdana', 'sans-serif'], // Cute font for now
            }
        },
    },
    plugins: [],
}
