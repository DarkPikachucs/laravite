import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php', // สำหรับ Laravel Blade
        './resources/**/*.js',        // สำหรับไฟล์ JavaScript
        './resources/**/*.jsx',       // สำหรับไฟล์ React JSX
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Sarabun', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
};
