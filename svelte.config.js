import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: [
        preprocess({
            postcss: true
        })
    ],

    kit: {
        files: {
            hooks: 'client/hooks',
            lib: 'client/lib',
            params: 'client/params',
            routes: 'client/routes',
            serviceWorker: 'client/service-worker',
            template: 'client/app.html'
        },
        adapter: adapter(),
        vite: {
            server: {
                fs: ['shared', 'client']
            },
            resolve: {
                alias: {
                    $shared: path.resolve('./shared')
                }
            }
        }
    }
};

export default config;
