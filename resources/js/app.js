
import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { route } from 'ziggy-js';
import { Ziggy } from './ziggy.generated.js';
import '../css/app.css';


createInertiaApp({
  resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
  setup({ el, App, props, plugin }) {
    const app = createApp({ render: () => h(App, props) });
    app.use(plugin);
    // Provide route helper globally
    app.config.globalProperties.route = (...args) => route(...args, Ziggy);
    app.mount(el);
  },
});
