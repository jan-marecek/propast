# Template
This template uses:
- [sveltekit](https://kit.svelte.dev/docs/introduction)
   - framework
- [Typescript](https://www.typescriptlang.org/docs/)
  - language
- [tailwind](https://tailwindcss.com/docs/installation)
    - styling framework
    - we will probably migrate to [WindiCSS](https://windicss.org/)/[UnoCSS](https://github.com/unocss/unocss) later on
- [daisyUI](https://daisyui.com/)
    - UI framework for tailwind
- [Unplugin Icons](https://github.com/antfu/unplugin-icons)
    - plugin for rendering icons
    - uses [iconify](https://iconify.design/)
    - search https://icon-sets.iconify.design/
- [svelte-i18n](https://github.com/kaisermann/svelte-i18n)
    - plugin for languages switching/support
- [firebase](https://firebase.google.com/docs)
    - database/other backend functions

# Package manager
we are using Yarn modern as classic had some problems on first install with `sharp` package.
That means you need to enable corepack:
`corepack enable`

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
