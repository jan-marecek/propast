import { browser } from "$app/environment";
import type { User } from "firebase/auth";
import { readable } from "svelte/store";
import { auth } from "$lib/services/firebase";
import { noop } from "../utils";

// the user store reflects the client-side auth state
export const user = readable<User | null>(undefined, (set) => {
  let unsubscribe = noop;

  async function init() {
    const { onAuthStateChanged } = await import("firebase/auth");
    unsubscribe = onAuthStateChanged(auth, set);
  }

  if (browser) init();

  return unsubscribe;
});
