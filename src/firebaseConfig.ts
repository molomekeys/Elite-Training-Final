// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { env } from "./env.mjs";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_apiKey,
  authDomain: env.NEXT_PUBLIC_authDomain,
  projectId: env.NEXT_PUBLIC_projectId,
  storageBucket: env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: env.NEXT_PUBLIC_messagingSenderId,
  appId: env.NEXT_PUBLIC_appId,
  measurementId: env.NEXT_PUBLIC_measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app)