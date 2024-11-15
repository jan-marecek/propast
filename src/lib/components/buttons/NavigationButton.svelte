<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let label: string;
  export let alt: string;
  export let href: string;

  const dispatch = createEventDispatcher();

  function handleClick(event: Event) {
    dispatch("click", event);
  }
</script>

<a
  class="navbarunderline font uppercase text-secondary duration-300 ease-in-out hover:text-secondary"
  aria-label={alt}
  {href}
  on:click={handleClick}
>
  {label}
  <span class="underline-animation"></span>
</a>

<style>
  .navbarunderline {
    position: relative;
    text-decoration: none;
  }
  .navbarunderline::after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -3px;
    left: 50%;
    background-color: currentColor;
    transition:
      width 0.3s ease,
      left 0.3s ease;
  }
  .navbarunderline:hover::after {
    width: 100%;
    left: 0;
  }
</style>
