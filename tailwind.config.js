import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Ubuntu', ...defaultTheme.fontFamily.sans],
                heading: ['ReThink Sans', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                // Light Mode Colors
                'text-light': '#07060f',
                'bg-light': '#e3e3e3',
                'primary-light': '#c53d07',
                'secondary-light': '#8b86ca',
                'accent-light': '#5047ae',
                
                // Dark Mode Colors
                'text-dark': '#f1f0f9',
                'bg-dark': '#1c1c1c',
                'primary-dark': '#f8703a',
                'secondary-dark': '#393579',
                'accent-dark': '#5a51b8',
            },
        },
    },

    plugins: [forms],
};
