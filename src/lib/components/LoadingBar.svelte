<script lang="ts">
  export let loading = true;
</script>

<div class="relative w-full {loading ? 'bg-gray-600' : ''}  h-1 overflow-hidden">
  {#if loading}
    <span class="sr-only">Loading progress</span>
    <span
      class="absolute bottom-0 left-0 top-0 w-auto origin-left transform animate-linear bg-primary"
    ></span>
    <span class="block w-full bg-info"></span>
  {/if}
</div>
