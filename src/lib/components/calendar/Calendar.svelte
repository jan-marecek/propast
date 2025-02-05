<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";

  // Initialize state variables
  let currentDate = new Date();
  let isOpen = false;
  let selectedOption = "Events";
  let isLoading = false;
  let events = {
    "2025-02-03": "Zápis Tělocviku",
    "2025-02-05": "Zápis Předmětů",
    "2025-02-17": "Začátek Semestru",
  };

  // Displayed month, year, days
  $: displayedMonth = new Intl.DateTimeFormat("cs-CZ", {
    month: "long",
    timeZone: "Europe/Prague",
  }).format(currentDate);
  $: displayedYear = currentDate.toLocaleDateString("cs-CZ", {
    year: "numeric",
    timeZone: "Europe/Prague",
  });
  $: days = getDaysInMonth(currentDate);

  // Const days
  const daysOfWeekFull = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"];
  const daysOfWeekShort = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"];
  let displayedDaysOfWeek = daysOfWeekFull;
  let isSmallScreen = false;

  // Screensize listener
  onMount(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener("resize", checkScreenSize);
    }
  });

  // Screensize check
  function checkScreenSize() {
    isSmallScreen = window.innerWidth < 768;
    displayedDaysOfWeek = isSmallScreen ? daysOfWeekShort : daysOfWeekFull;
  }

  // Array for overflow days
  function getDaysInMonth(date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    let startDayOfWeek = firstDayOfMonth.getDay();
    startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

    let prevMonthOverflow = [];
    for (let i = startDayOfWeek; i > 0; i--) {
      prevMonthOverflow.unshift(new Date(year, month, -i + 1));
    }

    let days = [];
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    let daysToAdd = 7 - ((days.length + prevMonthOverflow.length) % 7);
    if (daysToAdd > 0 && daysToAdd < 7) {
      for (let i = 1; i <= daysToAdd; i++) {
        days.push(new Date(year, month + 1, i));
      }
    }

    return [...prevMonthOverflow, ...days];
  }

  // Format date
  function formatDate(date) {
    return date
      ? date.toLocaleDateString("cs-CZ", { day: "numeric", timeZone: "Europe/Prague" })
      : "";
  }

  // Check if event
  function isEvent(date) {
    const formattedDate = date.toISOString().split("T")[0];
    return events[formattedDate];
  }

  // Next, Previous month
  function goNext() {
    currentDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
  }

  function goPrevious() {
    currentDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
  }

  //Capitalize first letter
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
</script>

<div class="py-7">
  <div class="mb-10 flex w-full items-center justify-between">
    <div class="hidden w-48 md:block"></div>
    <div class=" flex w-full items-center justify-start md:justify-center">
      <button class="focus:outline-none" on:click={goPrevious}>
        <img src="/icons/angle-left.svg" alt="Previous Month" />
      </button>
      <div class="mx-4 max-w-xs text-center md:mx-16 lg:flex-1">
        <h2 class="text-sm text-primary md:text-lg lg:text-3xl">
          {capitalizeFirstLetter(displayedMonth)}
          {displayedYear}
        </h2>
      </div>
      <button class="focus:outline-none" on:click={goNext}>
        <img src="/icons/angle-right.svg" alt="Next Month" />
      </button>
    </div>
  </div>
  <table class="w-full table-fixed">
    <thead>
      <tr>
        {#each displayedDaysOfWeek as dayOfWeek}
          <th class="pb-5 text-primary">{dayOfWeek}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each days as day, index (day.toString())}
        {#if index % 7 === 0}
          <tr></tr>
        {/if}
        <td
          class={`relative h-[96px] w-[182px] border-2 border-gray-300 ${
            isEvent(day) ? "bg-primary text-white" : "bg-[#F2F2F2]"
          }  pl-1 pt-2 text-left align-top font-medium sm:pl-3 ${
            day.getMonth() === currentDate.getMonth()
              ? "text-secondary"
              : "text-[#283618] opacity-50"
          }`}
        >
          <div class="text-xs font-medium sm:text-lg">
            {formatDate(day)}
          </div>
          {#if isEvent(day)}
            <div class="absolute bottom-5 left-1 overflow-hidden text-[6px] sm:left-3 sm:text-xs">
              {isEvent(day)}
            </div>
          {/if}
        </td>
        {#if index % 7 === 6}{/if}
      {/each}
    </tbody>
  </table>
</div>
