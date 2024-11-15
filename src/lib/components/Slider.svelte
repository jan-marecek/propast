<script lang="ts">
  import { type Options, Splide, SplideSlide, SplideTrack } from "@splidejs/svelte-splide";
  import "@splidejs/svelte-splide/css";

  // https://splidejs.com/

  export let events = [{ id: "dum 1" }, { id: "dum 2" }, { id: "dum 3" }];

  let options: Options = {
    updateOnMove: true,
    type: "loop",
    perPage: 3,
    perMove: 3,
    pagination: false,
    drag: true,
    speed: 300,
    gap: "2rem",
    fixedWidth: "20rem",
    focus: "center",
    classes: {
      arrows: "splide__arrows",
      arrow:
        "splide__arrow bg-primary fill-white hover:bg-primary/80 !opacity-100 !h-8 !w-8 md:!h-12 md:!w-12",
      prev: "splide__arrow--prev your-class-prev",
      next: "splide__arrow--next your-class-next",
    },
    breakpoints: {
      640: {
        perPage: 1,
        perMove: 1,
      },
      980: {
        perPage: 2,
        perMove: 2,
      },
    },
  };
</script>

<div class="max-w-full overflow-hidden">
  <div class="relative mx-auto max-w-[106.875rem]">
    <Splide aria-label="My Favorite Images" {options}>
      <!--            <div class="splide__arrows">-->
      <!--                <button class="splide__arrow splide__arrow&#45;&#45;prev btn btn-primary btn-circle">-->
      <!--                    <AngleRightIcon/>-->
      <!--                </button>-->
      <!--                <button class="splide__arrow splide__arrow&#45;&#45;next btn btn-primary btn-circle">-->
      <!--                    <AngleRightIcon/>-->
      <!--                </button>-->
      <!--            </div>-->

      {#each events as event}
        <SplideSlide>
          <article
            class="shadow-card hover:shadow-card-hover relative w-[19.875rem] rounded-sm transition-shadow"
          >
            <a href="#" class="absolute left-0 top-0 h-full w-full"></a>
            <div class="w-full bg-gray-100 pb-[62.893081761%]">
              <!--        <img alt="" class="absolute w-full h-full object-cover"/>-->
            </div>
            <div class="flex flex-col gap-3 bg-white p-5">
              <h2 class="line-clamp-2 font-bold">
                {event.id}
              </h2>

              <div class="flex flex-nowrap items-center gap-2 text-sm">title2</div>
            </div>
          </article>
        </SplideSlide>
      {/each}
    </Splide>
    <!-- Previous button on the left -->
    <!--    <button class="swiper-button-prev absolute top-1/2 left-0 -y-translate-1/2 z-10 w-12 h-12 bg-primary rounded-full flex justify-center items-center">-->
    <!--        <AngleLeftIcon class="fill-white text-2xl"/>-->
    <!--    </button>-->

    <!-- Next button on the right -->

    <!--    <button class="absolute top-1/2 transform -translate-y-1/2 right-0 z-10 swiper-button-next w-12 h-12 bg-primary rounded-full flex justify-center items-center ">-->
    <!--        <AngleRightIcon class="fill-white text-2xl"/>-->
    <!--    </button>-->
  </div>
</div>

<style>
  :global(.splide__arrow) {
    @apply bg-primary fill-white;
    /*opacity: 100 !important;*/
  }

  :global(.splide__arrow svg) {
    @apply fill-white;
  }

  :global(.splide__track) {
    @apply overflow-visible py-12;
  }

  :global(.splide__slide) {
    @apply opacity-40 transition-opacity;
  }

  :global(.splide__slide.is-visible) {
    @apply opacity-100;
  }
</style>
