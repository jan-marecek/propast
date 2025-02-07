<script lang="ts">
  import Calendar from "../calendar/Calendar.svelte";
</script>

<section id="rezervace" class="relative w-full overflow-hidden bg-primary px-mobile pb-14 lg:pb-32">
  <div class="relative">
    <h2 class="h1 px-mobile py-14 text-center text-base-300 lg:pb-20 lg:pt-32">Kalendář</h2>
    <div class="mx-auto max-w-content overflow-x-auto rounded-3xl bg-white px-3 md:px-12">
      <div class="">
        <!-- Adjust the min-width as needed -->
        <Calendar />
      </div>
    </div>
  </div>
</section>
