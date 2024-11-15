<script lang="ts">
  import { fade } from "svelte/transition";
  import { sineOut } from "svelte/easing";
  import { closeModal } from "svelte-modals";

  // provided by <Modals />
  export let isOpen;

  export let title: string;
  export let message: string;

  export let onConfirm: () => void;

  async function onConfirmButton() {
    closeModal();
    await onConfirm();
  }
</script>

{#if isOpen}
  <div
    role="dialog"
    class="pointer-events-none fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center"
    transition:fade={{ easing: sineOut, duration: 150 }}
    on:introstart
    on:outroend
  >
    <div
      class="pointer-events-auto flex min-w-[240px] flex-col justify-between rounded bg-base-100 p-8"
    >
      <h2 class="mb-4 text-center text-2xl">{title}</h2>
      <p class="text-center">{message}</p>
      <div class="mt-5 flex justify-end">
        <button on:click={closeModal} class="btn btn-outline mr-2"> Cancel </button>
        <button on:click={onConfirmButton} class="btn btn-error"> Confirm </button>
      </div>
    </div>
  </div>
{/if}
