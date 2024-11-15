<script lang="ts">
  import { _ } from "svelte-i18n";

  export let onChange: (isOption1: boolean) => unknown;
  export let option1: string;
  export let option2: string;

  export let isOption1 = true;

  function toggle() {
    isOption1 = !isOption1;
    onChange(isOption1);
  }

  export let labelClass = "";
  let className = `flex-nowrap relative cursor-pointer select-none rounded-[0.625rem] shadow bg-neutral  text-base-100 p-1 mx-auto ${labelClass}`;
</script>

<label class={className}>
  <input class="sr-only" type="checkbox" checked={isOption1} on:change={toggle} />
  <div class="relative grid grid-cols-2">
    <div
      class:translate-x-full={!isOption1}
      class="absolute bottom-0 top-0 w-1/2 rounded-lg border bg-gray-50 transition-transform duration-200"
    />
    <div class="lang" class:text-neutral={isOption1}>{option1}</div>
    <div class="lang" class:text-neutral={!isOption1}>{option2}</div>
  </div>
</label>

<style>
  .lang {
    @apply relative px-7 py-1 text-center font-bold transition-colors duration-300;
  }
</style>
