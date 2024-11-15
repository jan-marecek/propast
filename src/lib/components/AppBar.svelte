<script lang="ts">
  import { navigating } from "$app/stores";
  import SearchInput from "$lib/components/form/SearchInput.svelte";
  import { user } from "$lib/stores/user";
  import { signOut } from "$lib/services/firebaseAuth";
  import { Route } from "$lib/constants";
  import Hamburger from "$lib/components/Hamburger.svelte";
  import SideMenu from "$lib/components/layouts/SideMenu.svelte";

  $: if ($navigating) {
    open = false;
  }

  let open = false;
</script>

<header class="fixed left-0 right-0 z-30">
  <div class="relative h-appbar bg-primary text-white">
    <div class="max-w-menu mx-auto flex w-full items-center px-mobile py-0">
      <div
        class="inline-flex flex-1 items-center justify-start gap-2 py-2 md:w-1/2 md:flex-initial"
      >
        <a class="menuButton" href="/">
          <img alt="" class="h-6 w-6" src="" />
        </a>
        <!--        <SearchInput />-->
      </div>
      <div class="hidden shrink-0 items-center menu:inline-flex">
        <span>MENU</span>
      </div>
      <div class="inline-flex w-1/2 items-center justify-end gap-2 md:gap-4">
        {#if $user}
          <button
            class="btn btn-square btn-ghost no-animation hidden h-appbar w-appbar rounded-none menu:flex"
            on:click={() => signOut()}
          >
            Odhlásit se
          </button>
        {:else}
          <a href={Route.LOGIN} class="btn btn-primary rounded-full bg-white/20 text-white">
            Sign In/Sign UP
          </a>
        {/if}
        <button
          class="btn btn-square btn-ghost no-animation hidden h-appbar w-appbar rounded-none menu:flex"
          on:click={() => (open = !open)}
        >
          <Hamburger {open} />
        </button>
      </div>
    </div>
  </div>
</header>

<SideMenu bind:open />

<!--Menu open page overlay-->
<div
  class="fixed left-0 top-0 z-10 h-full w-full bg-black opacity-0 transition-opacity duration-300"
  class:h-full={open}
  class:opacity-30={open}
  class:w-full={open}
  on:click={() => (open = false)}
></div>
