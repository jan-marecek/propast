<script lang="ts">
  import Image from "./Image.svelte";

  export let alt: string;
  export let pictureData: ImageData;
  export let sizes: string;
  export let importance: "auto" | "high" | "low" | undefined = undefined;
  export let loading: "lazy" | "eager";

  let className: string;
  export { className as class };

  export type ImageData = {
    url: string;
    width?: number;
    height?: number;
    options?: {
      fileName: string;
      dirName: string;
      widths: number[];
      formats: string[];
    };
  };

  let sources: {
    srcset: string;
    type: string;
  }[] = [];
  if (pictureData.options && pictureData.options.formats && pictureData.options.widths) {
    const { dirName, fileName, formats, widths } = pictureData.options;

    // This is from the base url, but that doesn't work with firebase
    // const pathWithoutExt = pictureData.url.replace(/\.[^/.]+$/, "");
    // for (const format of formats ?? []) {
    //   const srcSet = widths
    //     .map((w) => `${pathWithoutExt}-${w}.${format} ${w}w`)
    //     .join(", ");
    //   sources.push({
    //     type: `image/${format}`,
    //     srcset: srcSet,
    //   });
    // }

    for (const format of formats ?? []) {
      const srcSet = widths
        .map((w) => `${getFirebaseLinkForMedia(w, format, dirName, fileName)} ${w}w`)
        .join(", ");
      sources.push({
        type: `image/${format}`,
        srcset: srcSet,
      });
    }
  }

  function getFirebaseLinkForMedia(
    width: number,
    format: string,
    dirPath: string,
    fileName: string,
    bucket = "drive-film-factory.appspot.com",
  ) {
    return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(`${dirPath}/${withoutExtension(fileName)}-${width}.${format}`)}?alt=media`;
  }

  function withoutExtension(path: string) {
    return path.replace(/\.[^/.]+$/, "");
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
  width={Math.round(pictureData.width)}
  height={Math.round(pictureData.height)}
  src={pictureData.url}
/>
