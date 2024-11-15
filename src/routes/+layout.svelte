<script lang="ts">
  // TODO this or in app.css import fonts
  // import '@fontsource/poppins/400.css';
  import "../app.css";
  import { initi18n } from "$lib/services/i18n";
  import AppBar from "$lib/components/AppBar.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { closeModal, Modals } from "svelte-modals";
  import { fade } from "svelte/transition";

  initi18n();
</script>

<svelte:head>
  <title>TODO</title>
</svelte:head>

<AppBar />
<main class="flex-1 bg-white menu:pt-appbar">
  <slot />
</main>
<Footer />

<Modals>
  <div
    class="fixed bottom-0 left-0 right-0 top-0 z-10 bg-neutral/50 backdrop-blur"
    on:click={closeModal}
    slot="backdrop"
    transition:fade={{ duration: 200 }}
  />
</Modals>
