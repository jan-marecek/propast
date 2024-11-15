import {sveltekit} from '@sveltejs/kit/vite';
import {imagetools} from 'vite-imagetools'
import Icons from 'unplugin-icons/vite'
import type {UserConfig} from 'vite';
import { defineConfig } from 'vitest/config';

// This can be used to import e.g. font-awesome 6 icons
import { FileSystemIconLoader } from "unplugin-icons/loaders";


const config: UserConfig = {
    plugins: [imagetools({
        // these widths will be used as default widths for all images
        defaultDirectives: new URLSearchParams("w=618;1280;1920;2560&withoutEnlargement&format=avif;jpg&as=picture")

        // there is a bug with overwriting the default directives, so you can use this as needed
        // defaultDirectives:
        //   (url) => {
        //       if (!url.searchParams.has('url')) {
        //           return new URLSearchParams("format=avif;webp&as=picture")
        //       }
        //       return new URLSearchParams()
        //   }
    }),
        sveltekit(),
        Icons({
            compiler: 'svelte',
            customCollections: {
            //     // a helper to load icons from the file system
            //     // files under `./icons` with `.svg` extension will be loaded as it's file name
            //     // you can also provide a transform callback to change each icon (optional)
            //     'todo-name': FileSystemIconLoader(
            //         './icons/',
            //         svg => {
            //             let result = svg.replace(/fill="[^"]*"/g, 'fill="currentColor"')
            //             result = result.replace(/ (width|height)="[^"]*"/g, ' ')
            //
            //             return result;
            //         },
            //     ),

                // sometimes we don't what to change the colors or size
                // 'todo-name-raw': FileSystemIconLoader(
                //     './icons-raw/',
                // ),


                "font-awesome-solid": FileSystemIconLoader("./src/assets/font-awesome-solid/", (svg) => {
                    let result = svg.replace(/fill="[^"]*"/g, 'fill="currentColor"');
                    result = result.replace(/ (width|height)="[^"]*"/g, " ");

                    return result;
                }),
            },


        }),
    ],
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    }
};

export default defineConfig(config);
