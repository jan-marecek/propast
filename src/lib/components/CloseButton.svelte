<script lang="ts">
  import { noop } from "../utils";

  export let onClick = noop;
</script>

<button class="btn btn-circle btn-ghost btn-xs absolute right-4 top-7" on:click={onClick}>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 6L12 12M12 12L18 18M12 12L18 6M12 12L6 18"
      stroke="black"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</button>
