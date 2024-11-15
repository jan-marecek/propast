<script>
  import Image from "$lib/components/images/ImageFromVitePicture.svelte";
  import Hero from "/src/assets/homepage/heroImage.jpg";
</script>

<section class="relative">
  <div class="relative overflow-hidden bg-white py-64">
    <Image
      alt="Hero"
      class="absolute inset-0 hidden h-full w-full object-cover md:block"
      loading="eager"
      pictureData={Hero}
    />
    <div
      class="absolute inset-0 bg-gradient-to-b from-primary to-secondary md:to-transparent"
    ></div>
    <div class="relative z-10 mx-auto flex max-w-content flex-col gap-8 px-mobile">
      <h1 class="h1 text-base-300">Propast</h1>
      <span class="text-base-300 sm:text-xl lg:text-2xl">
        Portál Rozborů a Odborných Podkladů, Archa Scénických Technologií.</span
      >
    </div>
  </div>
</section>
