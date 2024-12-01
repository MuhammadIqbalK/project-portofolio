// Import file CSS utama untuk styling aplikasi.
import '../css/app.css';

// Import konfigurasi global seperti Axios atau CSRF token.
import './bootstrap';

// Import fungsi utama dari Inertia.js untuk membuat aplikasi React.
import { createInertiaApp } from '@inertiajs/react';

// Import fungsi untuk memuat komponen halaman secara dinamis.
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

// Import fungsi React untuk rendering ke DOM.
import { createRoot, hydrateRoot } from 'react-dom/client';

// Ambil nama aplikasi dari file .env atau gunakan "Laravel" sebagai default.
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Membuat aplikasi Inertia menggunakan konfigurasi berikut.
createInertiaApp({
    // Fungsi untuk mengatur judul halaman (browser tab title).
    // Format: "{title halaman} - {nama aplikasi}"
    title: (title) => `${title} - ${appName}`,

    // Fungsi untuk memuat komponen halaman berdasarkan nama.
    // Misalnya, jika Laravel mengarahkan ke halaman "Dashboard",
    // maka file yang dicari adalah "./Pages/Dashboard.jsx".
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`, // Path ke file halaman berdasarkan nama.
            import.meta.glob('./Pages/**/*.jsx'), // Daftar semua file halaman dalam folder Pages.
        ),

    // Fungsi untuk mengatur bagaimana aplikasi React dirender.
    setup({ el, App, props }) {
        // Jika menggunakan Server-Side Rendering (SSR), gunakan `hydrateRoot`.
        if (import.meta.env.SSR) {
            hydrateRoot(el, <App {...props} />);
            return;
        }

        // Jika tidak menggunakan SSR, gunakan `createRoot` untuk rendering.
        createRoot(el).render(<App {...props} />);
    },

    // Konfigurasi progress bar yang muncul saat navigasi halaman.
    progress: {
        color: '#4B5563', // Warna progress bar (abu-abu gelap).
    },
});
