<script lang="ts">
  import Slider from "$lib/components/Slider.svelte";
  export let title;
  export let containerClass;
</script>

<div class="px-mobile">
  <div class="mx-auto max-w-content bg-secondary p-8">hello world</div>

  <section class="pb-12 pt-20 {containerClass}">
    <h2 class="text-center text-xl font-bold md:text-2xl">Slider</h2>
    <Slider />
  </section>
</div>
