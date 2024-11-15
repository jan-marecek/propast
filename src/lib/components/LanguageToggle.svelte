<script>
  import { locale } from "svelte-i18n";

  $: isEn = $locale.startsWith("en");

  function toggle() {
    locale.set(isEn ? "cs" : "en");
  }
</script>

<label
  class="relative inline-flex cursor-pointer select-none flex-nowrap rounded-full bg-base-100 text-gray-700 shadow"
>
  <input class="sr-only" type="checkbox" checked={isEn} on:change={toggle} />
  <div
    class:translate-x-full={!isEn}
    class="absolute bottom-0 top-0 w-1/2 rounded-full border bg-gray-50 transition-transform duration-200"
  ></div>
  <div class="lang" class:text-blue-600={isEn} id="en">EN</div>
  <div class="lang" class:text-blue-600={!isEn} id="cs">CZ</div>
</label>

<style>
  .lang {
    @apply relative p-3 transition-colors duration-300;
  }
</style>
