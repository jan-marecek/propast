<script lang="ts">
  import { fade } from "svelte/transition";
  import { sineOut } from "svelte/easing";
  import { closeModal } from "svelte-modals";
  import Input from "$lib/components/form/Input.svelte";
  import { _ } from "svelte-i18n";

  // provided by <Modals />
  export let isOpen;

  export let onChange;
  export let value: string;
  export let label: string;
  export let heading = $_("", { default: "Edit text" });
  export let confirmText = $_("", { default: "Confirm" });

  async function onConfirmButton() {
    onChange(value);
    closeModal();
  }
</script>

{#if isOpen}
  <div
    role="dialog"
    class="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center"
    transition:fade={{ easing: sineOut, duration: 150 }}
    on:introstart
    on:outroend
  >
    <div
      class="pointer-events-auto flex min-w-[240px] flex-col justify-between rounded bg-base-100 p-8"
    >
      <h2 class="mb-4 text-center text-2xl">{heading}</h2>
      <Input bind:value {label} />
      <div class="mt-5 flex justify-center">
        <button on:click={closeModal} class="btn btn-outline mr-2 rounded-full font-normal">
          Cancel
        </button>
        <button on:click={onConfirmButton} class="btn btn-primary font-normal">
          {confirmText}</button
        >
      </div>
    </div>
  </div>
{/if}
