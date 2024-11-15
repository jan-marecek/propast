<script lang="ts">
  export let title: string;
  export let text: string;
</script>

<div class="flex flex-col gap-5 rounded-sm border bg-primary-content p-8 shadow-lg">
  <h2 class="h2 font-bold text-secondary">{title}</h2>
  <p class="font-medium text-neutral">{@html text}</p>
</div>
