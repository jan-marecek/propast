<script lang="ts">
  import { page } from "$app/stores";

  export let href;
</script>

<li class:bg-gray-200={$page.url.pathname === href}>
  <a class="px-7" {href}>
    <slot />
  </a>
</li>
