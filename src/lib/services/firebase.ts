// import { initializeApp } from "firebase/app";
// import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
// import {
//   browserLocalPersistence,
//   browserSessionPersistence,
//   connectAuthEmulator,
//   indexedDBLocalPersistence,
//   initializeAuth,
// } from "firebase/auth";
// import firebaseConfig from "./firebaseConfig";

// export const app = initializeApp(firebaseConfig);

// export const auth = initializeAuth(app, {
//   persistence: [indexedDBLocalPersistence, browserLocalPersistence, browserSessionPersistence],
// });
// if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === "true") {
//   connectAuthEmulator(auth, "http://localhost:9099");
// }

// export const firestore = getFirestore(app);
// if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === "true") {
//   connectFirestoreEmulator(firestore, "127.0.0.1", 8080);
// }

// // export const firebaseDatabase = getDatabase(app);
// // if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
// //   connectDatabaseEmulator(firebaseDatabase, "127.0.0.1", 9000);
// // }
