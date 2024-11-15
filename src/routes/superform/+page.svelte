<script lang="ts">
  import SuperField from "$lib/components/forms/SuperField.svelte";
  import type { PageData } from "./$types";
  import SuperForm from "$lib/components/forms/SuperForm.svelte";
  import { _userSchema } from "$lib/schemas";
  import Spinner from "$lib/components/Spinner.svelte";
  import SuperCheckboxes from "$lib/components/forms/SuperCheckboxes.svelte";
  import SuperSelect from "$lib/components/forms/SuperSelect.svelte";

  export let data: PageData;

  let isSubmitting = false;
  async function handleValidSubmit(form) {
    isSubmitting = true;
    console.log("Submitting data:", form.data);
    setTimeout(() => {
      isSubmitting = false;
    }, 1000);
  }
</script>

<div class="bg-white p-2">
  <h1 class="text-center text-3xl">SuperForm</h1>
  <SuperForm
    data={data?.form}
    invalidateAll={false}
    let:errors
    let:form
    let:message
    let:delayed
    schema={_userSchema}
    onValidUpdated={handleValidSubmit}
  >
    {#if message}
      <div
        class="status"
        class:text-error={message.status >= 400}
        class:text-success={!message.status || message.status < 300}
      >
        {message.text}
      </div>
    {/if}
    <div class="mx-auto flex max-w-xl flex-col items-center gap-3 pt-8">
      <SuperField {form} field="firstName" label="First name" placeholder="Name" type="text" />
      <SuperField {form} field="email" label="Email" type="email" />

      <SuperField {form} field="area" label="Area" type="textarea" />

      <SuperCheckboxes
        {form}
        field="checkboxes"
        label="Checkboxes"
        options={["Cookies", "choc chip", "cream"]}
      />

      <SuperSelect
        {form}
        field="test"
        label="Test"
        placeholder="test"
        options={[
          {
            label: "Option 1",
            value: "option1",
          },
          {
            label: "Option 2",
            value: "option2",
          },
        ]}
      />

      <button
        class="btn btn-primary mt-2 w-full gap-2 rounded-full"
        disabled={isSubmitting}
        type="submit"
      >
        Submit
        {#if isSubmitting || delayed}
          <Spinner />
        {/if}
      </button>
    </div>
  </SuperForm>
</div>
