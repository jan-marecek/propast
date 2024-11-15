import { auth } from "$lib/services/firebase";

export async function providerFor(name: string) {
  const { GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } = await import("firebase/auth");

  switch (name) {
    case "google":
      return new GoogleAuthProvider();
    case "facebook":
      return new FacebookAuthProvider();
    case "apple":
      return new OAuthProvider("apple.com");
    // provider.addScope('email');
    // provider.addScope('name');
    // provider.setCustomParameters({
    //     // Localize the Apple authentication screen in French.
    //     locale: 'fr'
    // });
    default:
      throw "unknown provider " + name;
  }
}

export async function signInWith(name: string) {
  const { signInWithPopup } = await import("firebase/auth");
  const provider = await providerFor(name);
  return await signInWithPopup(auth, provider);
  // return getAdditionalUserInfo(result);
}

export async function signOut() {
  const { signOut } = await import("firebase/auth");
  await signOut(auth);
}

export async function createUserWithEmailAndPassword(email: string, password: string) {
  const { createUserWithEmailAndPassword } = await import("firebase/auth");
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function signInWithEmailAndPassword(email: string, password: string) {
  const { signInWithEmailAndPassword } = await import("firebase/auth");
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function sendPasswordResetEmail(email: string): Promise<void> {
  const { sendPasswordResetEmail } = await import("firebase/auth");
  return await sendPasswordResetEmail(auth, email);
}
