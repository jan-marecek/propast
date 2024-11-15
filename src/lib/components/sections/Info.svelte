<script>
  import InfoBox from "../layouts/InfoBox.svelte";
  import Section from "../layouts/Section.svelte";
</script>

<div class="w-full">
  <Section id="aboutus" sectionClass="text-center py-12 md:py-20 flex flex-col items-center gap-10">
    <h1 class="custom-underline text-3xl font-bold text-primary">Dolor laborum</h1>
    <p class="font-medium text-neutral md:w-3/5">
      Reprehenderit ad ex nostrud eiusmod excepteur cupidatat sunt amet sint reprehenderit. Aute
      aliquip nostrud ut cupidatat sit. Consectetur ipsum fugiat exercitation eu duis est incididunt
      adipisicing aliqua aute dolore.
    </p>
    <div class="mt-5 grid gap-5 md:grid-cols-2">
      <InfoBox
        title="Laborum deserunt"
        text="Do exercitation deserunt incididunt ad ex deserunt aliquip exercitation sint in nisi. Fugiat qui incididunt qui nisi esse magna sunt ut. Ad cupidatat proident voluptate commodo enim fugiat eu consectetur. Veniam tempor esse occaecat aliqua mollit ea tempor cillum reprehenderit in fugiat est nisi."
      />
      <InfoBox
        title="Ullamco incididunt "
        text="Adipisicing sit amet enim dolore occaecat ullamco irure exercitation cupidatat qui occaecat tempor consequat qui. Ad Lorem adipisicing id pariatur ullamco mollit Lorem. Non non eu non do veniam aliqua eiusmod aute incididunt elit mollit amet minim mollit. Laborum mollit anim cillum eu tempor est proident culpa dolore tempor sit. Ipsum irure anim culpa consequat id mollit duis non."
      />
    </div>
  </Section>
</div>

<style>
  .custom-underline {
    position: relative;
    display: inline-block;
  }
  .custom-underline::after {
    content: "";
    position: absolute;
    width: 50%;
    height: 2px;
    background-color: currentColor;
    bottom: -10px;
    left: 25%;
  }
</style>
