<script lang="ts">
  export let alt: string;
  export let height: number; // needed to reduce CLS
  export let width: number; // needed to reduce CLS
  export let src: string;
  export let sources: { srcset: string; type: string }[] = [];
  // export let maxWidth: string = '1280px';
  export let sizes: string = `(max-width: ${width}px) 100vw, ${width}px}`;
  export let importance: "auto" | "high" | "low" | undefined = undefined;
  export let loading: "lazy" | "eager" = "lazy";

  let className;
  export { className as class };
</script>

<picture>
  {#each sources as { srcset, type }}
    <source {srcset} {sizes} {type} />
  {/each}
  <img {alt} {importance} {loading} decoding="async" {width} {height} {src} class={className} />
</picture>
