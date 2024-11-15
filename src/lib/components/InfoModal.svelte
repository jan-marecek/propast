<script lang="ts">
  import { closeModal } from "svelte-modals";
  import CloseButton from "./CloseButton.svelte";
  import Modal from "./Modal.svelte";

  // provided by <Modals />
  export let isOpen: boolean;
  export let onAction: () => unknown;
  export let actionText: string;
  export let text: string;
  export let heading: string;
</script>

<Modal {isOpen}>
  <div class="w-full p-5">
    <img src="/logos/govidigo-black.svg" class="mx-auto h-12" alt="GoVidiGo" />
    <CloseButton onClick={closeModal} />
    <h2 class="mb-4 text-center text-2xl">{heading}</h2>
    <p>{text}</p>
    <button on:click={onAction} class="btn btn-primary mt-8 w-full rounded-full" type="submit"
      >{actionText}</button
    >
  </div>
</Modal>
