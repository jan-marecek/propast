<script>
  import MenuCategory from "$lib/components/layouts/MenuCategory.svelte";

  import PeopleCarryIcon from "~icons/font-awesome-solid/people-carry";
  import { Route } from "$lib/constants";

  export let open = false;
</script>

<nav
  class="fixed right-0 top-0 z-20 h-full w-0 max-w-full overflow-y-scroll bg-white pt-[120px] transition-all menu:pt-appbar"
  class:w-[333px]={open}
>
  <MenuCategory
    name="Hello"
    items={[
      {
        label: "Superforms",
        url: Route.SUPERFORMS,
        icon: PeopleCarryIcon,
      },
      {
        label: "ld",
        url: "/",
        icon: PeopleCarryIcon,
      },
      {
        label: "!",
        url: "/",
        icon: PeopleCarryIcon,
      },
    ]}
  />
</nav>
