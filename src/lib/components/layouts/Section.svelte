<script lang="ts">
  export let sectionClass: string;
  export let id: string;
</script>

<section {id} class="{sectionClass} mx-auto max-w-content px-mobile">
  <slot />
</section>
