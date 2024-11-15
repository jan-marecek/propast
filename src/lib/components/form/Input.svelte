<script lang="ts">
  import FormControl from "./FormControl.svelte";

  export let id;
  export let type = "text";
  export let label;
  export let error;
  export let placeholder;
  export let value;

  let clazz;
  export { clazz as class };
</script>

<FormControl {id} {label} {error}>
  {#if type == "text"}
    <div class="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2">
      <slot name="icon" />
    </div>
    <input
      {...$$props}
      {id}
      name={id}
      type="text"
      bind:value
      class:!input-error={error != null}
      {placeholder}
      class="input input-bordered w-full border p-4 {clazz}"
      class:pl-12={$$slots.icon != null}
    />
  {:else if type == "textarea"}
    <textarea
      {id}
      name={id}
      rows="6"
      class:!input-error={error != null}
      class="textarea textarea-bordered w-full p-4"
      {placeholder}
      {...$$props}
      bind:value
    />
  {:else}
    <div class="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2">
      <slot name="icon" />
    </div>
    <input
      {...$$props}
      {id}
      name={id}
      {type}
      class:!input-error={error != null}
      {placeholder}
      class="input input-bordered w-full border p-4 {clazz}"
      class:pl-12={$$slots.icon != null}
    />
  {/if}
</FormControl>
