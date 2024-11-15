<script lang="ts">
  import { formFieldProxy, type SuperForm } from "sveltekit-superforms/client";
  import type { FormPathLeaves, ZodValidation } from "sveltekit-superforms";
  import { type AnyZodObject, z } from "zod";

  export let options = [];

  type T = $$Generic<AnyZodObject>;

  export let form: SuperForm<ZodValidation<T>, unknown>;
  export let field: FormPathLeaves<z.infer<T>>;

  export let label: string;

  // Use this to change column size / gaps
  export let gridClass = "grid grid-cols-form gap-5";

  const { value, errors, constraints } = formFieldProxy(form, field);
  // works same with radio
</script>

<fieldset class="form-control relative w-full max-w-full items-start overflow-hidden">
  {#if label}
    <legend class="label flex justify-center pb-1 pl-4">
      <span class="label-text text-base font-bold">{label}</span>
    </legend>
  {/if}
  <div class="relative w-full rounded-[25px] border border-neutral/20 p-4 {gridClass}">
    {#each options as option}
      <label class="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap">
        <input
          type="checkbox"
          class="checkbox-secondary checkbox rounded-lg"
          bind:group={$value}
          name="flavours"
          value={option}
        />
        <span>
          {option}
        </span>
      </label>
    {/each}
  </div>
  {#if $errors?._errors}
    <div
      class="w-full overflow-hidden text-ellipsis whitespace-nowrap pl-4 pt-1 text-xs text-error hover:overflow-visible hover:whitespace-normal hover:bg-base-100"
    >
      {$errors?._errors}
    </div>
  {/if}
</fieldset>
