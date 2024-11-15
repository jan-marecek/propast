<script lang="ts">
  import FormControl from "./FormControl.svelte";
  import type { z, AnyZodObject } from "zod";
  import type { ZodValidation, FormPathLeaves } from "sveltekit-superforms";
  import { formFieldProxy, type SuperForm } from "sveltekit-superforms/client";
  import type { HTMLInputAttributes, HTMLTextareaAttributes } from "svelte/elements";
  interface $$Props extends HTMLInputAttributes, HTMLTextareaAttributes {
    myCustomProp: string;
  }

  type T = $$Generic<AnyZodObject>;

  export let form: SuperForm<ZodValidation<T>, unknown>;
  export let field: FormPathLeaves<z.infer<T>>;
  export let label: string;
  export let placeholder: string;

  let _class = "";
  export { _class as class };

  const { value, errors, constraints } = formFieldProxy(form, field);

  $: id = field;
</script>

<FormControl {id} {label} error={$errors}>
  {#if $$props.type == "textarea"}
    <textarea
      {id}
      name={id}
      rows="6"
      class:!input-error={$errors}
      class="textarea textarea-bordered w-full rounded-[25px] p-4"
      bind:value={$value}
      {placeholder}
      {...$constraints}
      {...$$restProps}
    />
  {:else}
    <div class="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2">
      <slot name="icon" />
    </div>
    <input
      id={field}
      name={field}
      bind:value={$value}
      class:!input-error={$errors}
      aria-invalid={$errors ? "true" : undefined}
      {placeholder}
      class="input input-bordered w-full border p-4 {_class}"
      class:pl-12={$$slots.icon != null}
      {...$constraints}
      {...$$restProps}
    />
    {#if $constraints?.maxlength}
      <div class="absolute right-3 top-1/2 h-6 -translate-y-1/2 overflow-hidden bg-white">
        {$value?.length}/{$constraints.maxlength}
        <!--                <slot name="trailing" />-->
      </div>
    {/if}
  {/if}
</FormControl>
