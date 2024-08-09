import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { DarkModeProvider } from './Pages/Components/DarkModeProvider';

// Import your app.css file
import '../css/app.css';
import './Pages/frontend.css';

createInertiaApp({
    // Below you can see that we are going to get all React components from resources/js/Pages folder
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        createRoot(el).render(
            <DarkModeProvider>
                <App {...props} />
            </DarkModeProvider>
        );
    },
});
