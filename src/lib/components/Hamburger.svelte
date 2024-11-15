<script lang="ts">
  export let open = false;
</script>

<div class="hamburger-menu">
  <div class="bar" class:animate={open}></div>
</div>

<style>
  .hamburger-menu {
    z-index: 2;
    width: 31px;
    height: 24px;
    cursor: pointer;
    --bar-color-inner: var(--bar-color, rgba(255, 255, 255, 1));
    --bar-color-inner-hidden: var(--bar-color-hidden, rgba(255, 255, 255, 0));
  }

  .bar,
  .bar:after,
  .bar:before {
    width: 100%;
    height: 3px;
    border-radius: 25px;
  }

  .bar {
    position: relative;
    transform: translateY(9px);
    background: var(--bar-color-inner);
    transition: all 0ms 200ms;
  }

  .bar.animate {
    background: var(--bar-color-hidden);
  }

  .bar:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 8px;
    background: var(--bar-color-inner);
    transition:
      bottom 200ms 200ms cubic-bezier(0.23, 1, 0.32, 1),
      transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  .bar:after {
    content: "";
    position: absolute;
    left: 0;
    top: 8px;
    background: var(--bar-color-inner);
    transition:
      top 200ms 200ms cubic-bezier(0.23, 1, 0.32, 1),
      transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  .bar.animate:after {
    top: 0;
    transform: rotate(45deg);
    transition:
      top 200ms cubic-bezier(0.23, 1, 0.32, 1),
      transform 200ms 200ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  .bar.animate:before {
    bottom: 0;
    transform: rotate(-45deg);
    transition:
      bottom 200ms cubic-bezier(0.23, 1, 0.32, 1),
      transform 200ms 200ms cubic-bezier(0.23, 1, 0.32, 1);
  }
</style>
