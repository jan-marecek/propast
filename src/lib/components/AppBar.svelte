<script lang="ts">
  import Hamburger from "$lib/components/Hamburger.svelte";
  import { slide } from "svelte/transition";
  import NavigationButton from "./buttons/NavigationButton.svelte";

  let open = true;
  function handleClick() {
    open = false;
  }
</script>

<header class="fixed left-0 right-0 z-30">
  <div class="relative h-appbar bg-primary text-primary">
    <div class="mx-auto flex h-full max-w-content justify-between pl-mobile menu:px-mobile">
      <div class="inline-flex items-center justify-start gap-2 py-2">
        <a class="menuButton flex-none" href="/">
          <img alt="logo Propast" class="h-[60px] w-[60px]" src="/logo/logoOrange.png" />
        </a>
      </div>
      <div class="hidden items-center gap-12 text-base font-bold menu:inline-flex">
        <NavigationButton label="1. ročník" alt="první ročník" href="/prvnirocnik" />
        <NavigationButton label="2. ročník" alt="druhý ročník" href="/druhyrocnik" />
        <!-- <NavigationButton label="3. ročník" alt="třetí ročníík" href="/" /> -->
        <NavigationButton label="Disk" alt="disk" href="/disk" />
        <NavigationButton label="Kontakt" alt="Kontakt" href="" />
      </div>
      <div class="flex w-full flex-row justify-end menu:hidden">
        <button
          class="btn btn-square btn-ghost no-animation h-appbar w-appbar rounded-none"
          aria-label="Otevřít menu"
          on:click={() => (open = !open)}
        >
          <Hamburger {open} />
        </button>
      </div>
      {#if open}
        <div
          class="absolute left-0 right-0 top-[80px] z-10 flex-col items-center gap-4 bg-primary pb-10 menu:hidden
          {open ? 'flex' : 'hidden'}"
          transition:slide
        >
          <div
            class="h-content mt-8 flex w-full flex-col items-center justify-center gap-8 bg-primary text-base font-bold menu:hidden"
          >
            <NavigationButton
              label="1. ročník"
              alt="první ročník"
              href="/"
              on:click={handleClick}
            />
            <NavigationButton
              label="2. ročník"
              alt="druhý ročník"
              href="/"
              on:click={handleClick}
            />
            <!-- <NavigationButton label="3. ročník" alt="třetí ročníík" href="/" on:click={handleClick} /> -->
            <NavigationButton label="Disk" alt="disk" href="/" on:click={handleClick} />
            <NavigationButton label="Kontakt" alt="kontakt" href="/" on:click={handleClick} />
          </div>
        </div>
      {/if}
    </div>
  </div>
</header>
