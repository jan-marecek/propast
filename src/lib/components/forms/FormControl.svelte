<script lang="ts">
  export let label: string;
  export let id: string;
  export let error: string;

  export let labelClass = "label pl-0 pb-1 flex justify-center pl-4";
  export let labelTextClass = "label-text font-bold text-base";
  export let withMargins = true;

  export let inputContainerClass = "";
</script>

<div class="form-control relative w-full items-start">
  {#if label}
    <label for={id} class={labelClass}>
      <span class={labelTextClass}>{label}</span>
    </label>
  {/if}
  <div class="relative w-full {inputContainerClass}">
    <slot />
  </div>
  {#if error}
    <div
      class="w-full overflow-hidden text-ellipsis whitespace-nowrap pl-4 pt-1 text-xs text-error hover:overflow-visible hover:whitespace-normal hover:bg-base-100"
    >
      {error}
    </div>
  {/if}
</div>
