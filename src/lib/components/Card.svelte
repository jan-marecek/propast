<script lang="ts">
  export let containerClasses;
</script>

<div class="card bg-base-100 shadow-xl {containerClasses}">
  <div class="card-body relative">
    <h2 class="mb-2 text-sm font-bold text-gray-400">
      <slot name="heading" />
    </h2>

    <div class="flex justify-between">
      <slot />
    </div>
    {#if $$slots.footer}
      <slot name="footer" />
    {/if}
  </div>
</div>
