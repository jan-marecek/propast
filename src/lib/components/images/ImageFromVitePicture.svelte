<script lang="ts">
  import Image from "./Image.svelte";

  export let alt: string;
  export let pictureData: {
    sources: { [format: string]: ImagetoolsPictureData };
    img: ImagetoolsPictureData;
  };
  export let sizes: string;
  export let importance: "auto" | "high" | "low" | undefined = undefined;
  export let loading: "lazy" | "eager";

  let className;
  export { className as class };

  interface ImagetoolsPictureData {
    src: string;
    w: number;
    h: number;
  }

  let sources = [];
  for (const [format, srcSet]: [string, ImagetoolsPictureData[]] of Object.entries(
    pictureData.sources,
  )) {
    sources.push({
      type: `image/${format}`,
      srcset: srcSet,
    });
  }

  // We use rounding because image tools return float numbers depending on demanded width
  // resulting in invalid html
</script>

<Image
  {alt}
  {sizes}
  {importance}
  {loading}
  {sources}
  class={className}
  width={Math.round(pictureData.img.w)}
  height={Math.round(pictureData.img.h)}
  src={pictureData.img.src}
/>
