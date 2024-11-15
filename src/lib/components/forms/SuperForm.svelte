<script lang="ts">
  import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte";

  import { setError, setMessage, superForm } from "sveltekit-superforms/client";

  export let data;
  export let dataType;
  export let schema;
  export let invalidateAll; // set to false to keep form data using muliple forms on a page

  export let onValidUpdated: (form: any) => void;

  export const _form = superForm(data, {
    dataType: dataType,
    invalidateAll: invalidateAll,
    SPA: true,
    validators: schema,
    // Disable confirm on leave
    // taintedMessage: false,
    // Submit states
    // delayMs: 500,
    // timeoutMs: 8000,
    // Sever only??
    // onError({result}) {
    //     $message = {
    //         text: result?.error?.message,
    //         status: 500
    //     }
    // },
    onSubmit({ action, formData, formElement, controller, submitter, cancel }) {
      console.log("submitting form", formData);
    },
    onUpdated({ form }) {
      if (form.valid) {
        // https://superforms.rocks/concepts/client-validation
        onValidUpdated(form);
      }
    },
  });

  const { form, message, tainted, submitting, delayed, errors, allErrors, enhance } = _form;
</script>

<form {...$$restProps} method="POST" use:enhance novalidate>
  <slot
    submitting={$submitting}
    allErrors={$allErrors}
    delayed={$delayed}
    errors={$errors}
    form={_form}
    message={$message}
  />
</form>

<!--<SuperDebug data={$form}></SuperDebug>-->
