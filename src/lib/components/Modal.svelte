<script lang="ts">
  import { fly } from "svelte/transition";
  // import CloseButton from "~icons/todo/close";

  // provided by Modals
  export let isOpen;

  // export let showCloseBtn = false;
  //
  // export let onClose: () => void;
</script>

{#if isOpen}
  <div
    role="dialog"
    class="ma-2 pointer-events-none fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-200 bg-opacity-25 px-mobile"
    transition:fly={{ y: 50 }}
    on:introstart
    on:outroend
  >
    <div
      class="pointer-events-auto relative z-50 flex max-h-[80vh] min-w-[320px] overflow-y-auto rounded-xl bg-base-100 shadow-xl"
    >
      <!--{#if showCloseBtn}-->
      <!--	<div class="absolute right-5 top-5">-->
      <!--		<button class="text-2xl" on:click={onClose}>-->
      <!--			<CloseButton />-->
      <!--		</button>-->
      <!--	</div>-->
      <!--{/if}-->

      <slot />
    </div>
  </div>
{/if}
