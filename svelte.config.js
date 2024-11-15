//import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// this has some more option, but mostly not needed
// import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    // Optional clickable inspector button on page
    // vitePlugin: {
    //     experimental: {
    //         inspector: {
    //             toggleKeyCombo: 'meta-shift',
    //             holdMode: true,
    //             showToggleButton: 'always',
    //             toggleButtonPos: 'bottom-right'
    //         }
    //     }
    // },

    kit: {
        adapter: adapter()
    }
};

export default config;
