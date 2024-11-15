<script lang="ts">
  import FormControl from "$lib/components/forms/FormControl.svelte";
  import { formFieldProxy, type SuperForm } from "sveltekit-superforms/client";
  import type { FormPathLeaves, ZodValidation } from "sveltekit-superforms";
  import { type AnyZodObject, z } from "zod";

  type T = $$Generic<AnyZodObject>;
  export let form: SuperForm<ZodValidation<T>, unknown>;
  export let field: FormPathLeaves<z.infer<T>>;
  export let label: string;
  export let placeholder: string;

  export let options: {
    value: string;
    label: string;
  }[] = [];

  const { value, errors, constraints } = formFieldProxy(form, field);
  // export let multiple = false;
</script>

<FormControl id={field} {label} error={$errors}>
  <select
    name={field}
    bind:value={$value}
    class="select select-bordered w-full text-base font-normal"
    class:text-base-300={$value == ""}
  >
    <option value="" disabled selected>{placeholder}</option>
    {#each options as option, i}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
</FormControl>
