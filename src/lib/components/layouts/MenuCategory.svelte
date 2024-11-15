<script lang="ts">
  import type { SvelteComponent } from "svelte";

  export let name: string;
  export let items: {
    label: string;
    url: string;
    icon: SvelteComponent;
  }[] = [];
</script>

<div class="pt-5">
  <h2 class="px-4 pb-2 font-bold uppercase text-base-300">{name}</h2>
  <ul>
    {#each items as item}
      <li>
        <a href={item.url} class="flex items-center gap-2 px-4 py-3 hover:bg-base-200">
          <svelte:component this={item.icon} class="h-5 w-5 fill-primary" />
          {item.label}
        </a>
      </li>
    {/each}
  </ul>
</div>
