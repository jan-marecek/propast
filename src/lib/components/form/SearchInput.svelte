<script>
  import { _ } from "svelte-i18n";
  import SearchIcon from "~icons/material-symbols/search";
  // import { page } from "$app/stores";
  // import { goto } from "$app/navigation";
  // import { searchTerm } from "$lib/stores/searchTerm";

  export let value = "";
  export let open = false;

  export let containerClasses = "hidden min-[622px]:inline-block";

  let clazz =
    "input rounded-full input-bordered border border-white placeholder-white bg-white/20 max-w-full w-[10rem] md:w-[16rem] py-2  pr-8 pl-12 h-[42px]";
  // export { clazz as class };

  async function onSearch() {
    open = false;
    // $searchTerm = value;
    // if ($page.url.pathname != "/marketplace/search") {
    //     goto(`/marketplace/search?term=${encodeURIComponent(value)}`);
    // }
  }
</script>

<div class="relative inline-block {containerClasses}">
  <input
    id="mainSearch"
    name="mainSearch"
    type="text"
    bind:value
    on:keypress={(e) => e.key === "Enter" && onSearch()}
    placeholder={$_("", { default: "Hledejte..." })}
    class={clazz}
  />
  <button
    on:click={onSearch}
    class="absolute left-4 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded hover:bg-base-300"
  >
    <SearchIcon class="fill-white" />
  </button>
</div>
