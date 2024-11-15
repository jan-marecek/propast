import { browser } from "$app/environment";
import { readable, type Subscriber } from "svelte/store";
import { throttle } from "../utils";

type ClientData = {
  width: number;
};

function resizeHandler(set: Subscriber<ClientData>) {
  return throttle(function () {
    set({ width: window.innerWidth });
  }, 300);
}

export const clientDimensions = readable<ClientData>(undefined, (set) => {
  let handler: () => void;

  async function init() {
    handler = resizeHandler(set);
    window.addEventListener("resize", handler);
  }

  if (browser) init();
  //default
  set({
    width: 1920,
  });
  return () => {
    if (browser) {
      window.removeEventListener("resize", handler);
    }
  };
});
