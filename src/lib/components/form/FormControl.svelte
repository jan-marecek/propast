<script lang="ts">
  export let label: string;
  export let id: string;
  export let error: string;
  export let noMargins: string;
  export let containerClass: string;
</script>

<div class="form-control relative w-full {noMargins ? 'mb-0' : 'mb-2 '} {containerClass}">
  {#if label}
    <label for={id} class="label pb-1 pl-0">
      <span class="label-text text-sm font-bold uppercase text-gray-600">{label}</span>
    </label>
  {/if}
  <div class="relative w-full">
    <slot />
  </div>
  {#if error}
    <div class="absolute -bottom-4 text-xs text-error">
      {error}
    </div>
  {/if}
</div>
