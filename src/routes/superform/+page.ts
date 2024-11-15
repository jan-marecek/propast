// import { error } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/client";
// import { z } from "zod";
import { _userSchema } from "$lib/schemas";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, fetch }) => {
  // const form = await superValidate(userData, _userSchema);
  const form = await superValidate(_userSchema);
  // const form2 = await superValidate(initialData, schema, { errors: false });

  return { form };
};
