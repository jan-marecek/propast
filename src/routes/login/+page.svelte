<script lang="ts">
  import { closeModal, openModal } from "svelte-modals";
  import { _ } from "svelte-i18n";
  import Input from "$lib/components/form/Input.svelte";
  import {
    signInWith,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    // signOut
  } from "$lib/services/firebaseAuth";
  import { blur, slide } from "svelte/transition";

  import GoogleIcon from "~icons/logos/google-icon";
  import AppleIcon from "~icons/logos/apple";
  import FacebookIcon from "~icons/logos/facebook";
  import TextToggle from "$lib/components/TextToggle.svelte";
  import { goto } from "$app/navigation";
  import { Route } from "$lib/constants";
  import Spinner from "$lib/components/Spinner.svelte";
  import { noop } from "$lib/utils";
  import type { UserCredential } from "@firebase/auth";
  import TextEditModal from "$lib/components/TextEditModal.svelte";
  import InfoModal from "$lib/components/InfoModal.svelte";

  export let loginView = true;
  export let withRedirect = true;
  export let onLoginFinish: (user: UserCredential) => void = noop;

  let errorMessage = "";
  let isProcessing = false;

  // async function handleRedirectAfterLoginLoaded() {
  //     // fixme
  //     // We have to ensure the userData has been loaded
  //     // this si basically 'once', might be some nicer way to do this
  //     // should probably include timeout as well
  //     let unsubscribe;
  //     unsubscribe = userData.subscribe(async (userDataValue) => {
  //         if (userDataValue != null) {
  //             console.log("userDataValue", userDataValue);
  //             await goto(Route.HOME);
  //
  //             unsubscribe();
  //         }
  //     });
  // }

  async function submitForm(e) {
    isProcessing = true;
    // as this is async process user might change setup in between
    // this is to prevent weird states on processing
    let loginViewSnap = loginView;

    const formData = new FormData(e.target);
    let email = formData.get("email") as string;
    let password = formData.get("password") as string;

    if (loginViewSnap) {
      try {
        const userCredential = await signInWithEmailAndPassword(email, password);
        closeModal();
        onLoginFinish(userCredential);
        await redirectAfterLogin(loginViewSnap);
      } catch (e) {
        // FirebaseError
        switch (e.code) {
          case "auth/user-not-found":
            errorMessage = $_("login.user_not_found", {
              default:
                "There was a problem logging in. Check your email and password or create an account.",
            });
            break;
          case "auth/wrong-password":
            errorMessage = $_("login.wrong_password", {
              default:
                "There was a problem logging in. Check your email and password or create an account.",
            });
            break;
          case "auth/invalid-email":
            errorMessage = $_("login.invalid_email", {
              default:
                "There was a problem logging in. Check your email and password or create an account.",
            });
            break;
          case "auth/user-disabled":
            errorMessage = $_("login.user_disabled", { default: "User disabled" });
            break;
          case "auth/too-many-requests":
            errorMessage = $_("login.too_may_requests", {
              default: "Too many requests, try later.",
            });
            break;
          default:
            // Some other error occurred
            console.error(e);
            errorMessage = $_("login.unknown_error", {
              default: "Server error, please try again later",
            });
        }
      }
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(email, password);
        onLoginFinish(userCredential);
        await redirectAfterLogin(loginViewSnap);
      } catch (e) {
        switch (e.code) {
          case "auth/email-already-in-use":
            errorMessage = $_("register.email_already_in_use", { default: "Email already in use" });
            break;
          case "auth/invalid-email":
            errorMessage = $_("register.invalid_email", { default: "Invalid email" });
            break;
          case "auth/operation-not-allowed":
            errorMessage = $_("register.operation_not_allowed", {
              default: "Operation not allowed",
            });
            break;
          case "auth/weak-password":
            errorMessage = $_("register.weak_password", { default: "Weak password" });
            break;
          default:
            // Some other error occurred
            console.error(e);
            errorMessage = $_("register.unknown_error", { default: "An unknown error occurred" });
        }
      }
    }
    isProcessing = false;
  }

  async function redirectAfterLogin(loginViewSnap) {
    if (withRedirect) {
      if (loginViewSnap) {
        // We have to ensure the userData has been loaded
        // as otherwise on login there is no info whether the user is creator or not
        // handleRedirectAfterLoginLoaded().catch((e) => {
        //     console.error(e);
        // });

        await goto(Route.HOME);
      } else {
        await goto(Route.HOME);
      }
    }
  }

  async function signInWithGoogle() {
    isProcessing = true;
    let loginViewSnap = loginView;

    try {
      const userCredentials = await signInWith("google");
      // todo check for new users
      // if(userInfo?.isNewUser)
      onLoginFinish(userCredentials);
      await redirectAfterLogin(loginViewSnap);
    } catch (e) {
      console.error(e);
    }
    isProcessing = false;
  }

  async function signInWithFacebook() {
    isProcessing = true;
    let loginViewSnap = loginView;

    try {
      const userInfo = await signInWith("facebook");
      // todo check for new users
      // if(userInfo?.isNewUser)
      await redirectAfterLogin(loginViewSnap);
    } catch (e) {
      console.error(e);
    }
    isProcessing = false;
  }

  async function signInWithApple() {
    isProcessing = true;
    let loginViewSnap = loginView;

    try {
      const userInfo = await signInWith("apple");
      // todo check for new users
      // if(userInfo?.isNewUser)
      await redirectAfterLogin(loginViewSnap);
    } catch (e) {
      console.error(e);
    }
    isProcessing = false;
  }

  function openResetPasswordModal(propName, label) {
    const email = "";
    openModal(TextEditModal, {
      value: email,
      heading: $_("login.reset_password", { default: "Enter your email" }),
      confirmText: $_("login.reset_password", { default: "Reset" }),
      onChange: async (value) => {
        try {
          await sendPasswordResetEmail(value);
          openModal(InfoModal, {
            heading: $_("login.reset_password", { default: "Reset submitted" }),
            text: $_("login.reset_password_email_sent", {
              default: "An email with instructions has been sent to your email address.",
            }),
            actionText: $_("login.ok", { default: "OK" }),
            onAction: closeModal,
          });
        } catch (e) {
          errorMessage = $_("login.reset_password_error", { default: "Error resetting password" });
        }
      },
      label: label,
    });
  }
</script>

<div class="flex justify-center">
  <div
    class="pointer-events-auto relative flex max-h-screen w-full min-w-[240px] max-w-[500px] flex-col justify-between overflow-y-scroll rounded-lg bg-base-100 p-8"
  >
    <h2 class="font-secondary mb-4 px-4 text-center text-xl font-bold">
      {$_("login.modal.heading", { default: "Login or register" })}
    </h2>

    <div class="flex">
      <TextToggle
        isOption1={loginView}
        option1={$_("login.modal.log_in", { default: "Log in" })}
        option2={$_("login.modal.register", { default: "Register" })}
        onChange={(isOpt1) => {
          loginView = isOpt1;
        }}
      />
    </div>
    <div class="relative my-5 flex w-full justify-center gap-8">
      <button
        class="btn btn-circle btn-outline h-12 w-12 !border-base-200 bg-base-200 hover:bg-base-300"
        on:click={signInWithGoogle}
      >
        <GoogleIcon class="h-8 w-8" />
      </button>
      <button
        class="btn btn-circle btn-outline h-12 w-12 !border-base-200 bg-base-200 hover:bg-base-300"
        on:click={signInWithApple}
      >
        <AppleIcon class="h-8 w-8" />
      </button>
      <button class="h-12 w-12 hover:brightness-90" on:click={signInWithFacebook}>
        <FacebookIcon class="h-12 w-12" />
      </button>
    </div>
    <div class="text-center">
      {$_("login.modal.email_and_pass_heading", { default: "Or use your email account login" })}
    </div>

    <div class="flex flex-col gap-2" in:blur>
      <form id="form" ref="form" action="/static" on:submit|preventDefault={submitForm}>
        <Input
          id="email"
          type="email"
          label={$_("login.form.email.label", { default: "Email" })}
          placeholder={$_("login.form.email.placeholder", { default: "Email address" })}
          required
        >
          <svg
            slot="icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            class="w- pl-1 text-gray-300"
            stroke="currentcolor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.4724 4H4.52761C3.13391 4 2 5.23841 2 6.76055V17.2394C2 18.7616 3.13391 20 4.52761 20H19.4724C20.8661 20 22 18.7616 22 17.2394V6.76055C22 5.23841 20.8661 4 19.4724 4ZM19.0775 5.78069L12 11.7518L4.9225 5.78069H19.0775ZM19.4724 18.2194H4.52761C4.03293 18.2194 3.63043 17.7798 3.63043 17.2396V6.94075L11.5016 13.5816C11.6484 13.7054 11.8242 13.7672 12 13.7672C12.1758 13.7672 12.3516 13.7054 12.4984 13.5816L20.3696 6.94075V17.2394C20.3696 17.7798 19.9671 18.2194 19.4724 18.2194Z"
              fill="currentcolor"
            />
          </svg>
        </Input>
        <div class="mt-8" />
        <Input
          id="password"
          type="password"
          label={$_("login.card.password", { default: "Password" })}
          minlength="6"
          placeholder={$_("login.card.password_placeholder", { default: "Enter password" })}
          required
        >
          <svg
            slot="icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            class="pl-1 text-gray-300"
            stroke="currentcolor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.625 9.34375H16.2173V6.13164C16.2173 3.85344 14.3248 2 11.9986 2C9.67234 2 7.7798 3.85344 7.7798 6.13164V9.34375H6.375C5.08266 9.34375 4.03125 10.3952 4.03125 11.6875V19.6562C4.03125 20.9486 5.08266 22 6.375 22H17.625C18.9173 22 19.9688 20.9486 19.9688 19.6562V11.6875C19.9688 10.3952 18.9173 9.34375 17.625 9.34375ZM9.3423 6.13164C9.3423 4.715 10.5339 3.5625 11.9986 3.5625C13.4632 3.5625 14.6548 4.715 14.6548 6.13164V9.34375H9.3423V6.13164ZM18.4062 19.6562C18.4062 20.087 18.0558 20.4375 17.625 20.4375H6.375C5.94422 20.4375 5.59375 20.087 5.59375 19.6562V11.6875C5.59375 11.2567 5.94422 10.9062 6.375 10.9062H17.625C18.0558 10.9062 18.4062 11.2567 18.4062 11.6875V19.6562Z"
              fill="currentcolor"
            />
            <path
              d="M12 13.1719C11.2018 13.1719 10.5547 13.8189 10.5547 14.6172C10.5547 15.1269 10.8187 15.5746 11.2173 15.832V17.5469C11.2173 17.9783 11.5671 18.3281 11.9986 18.3281C12.43 18.3281 12.7798 17.9783 12.7798 17.5469V15.8338C13.18 15.5768 13.4453 15.1281 13.4453 14.6172C13.4453 13.8189 12.7982 13.1719 12 13.1719Z"
              fill="currentcolor"
            />
          </svg>
        </Input>

        <div class="min-h-6 text-error">
          {#if errorMessage && errorMessage !== ""}
            <div transition:slide>
              {errorMessage}
            </div>
          {/if}
        </div>
        {#if loginView}
          <div class="text-gray-500">
            <button type="button" on:click={openResetPasswordModal}>
              {$_("login.card.forgot_password", { default: "Forgot password?" })}
            </button>
          </div>
        {/if}
        {#key loginView}
          <button
            class="btn btn-primary mt-2 w-full gap-2 rounded-full"
            disabled={isProcessing}
            type="submit"
          >
            {#if isProcessing}
              <Spinner />
            {/if}
            {!loginView
              ? $_("register.card.submit", { default: "Register" })
              : $_("login.card.login", { default: "Login" })}
          </button>
        {/key}
      </form>
    </div>
  </div>
</div>
