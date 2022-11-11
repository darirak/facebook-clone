// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC62u42R1Q-aGfBD1louziG64Dn4rjdjCc",
  authDomain: "facebook-clone-ea387.firebaseapp.com",
  projectId: "facebook-clone-ea387",
  storageBucket: "facebook-clone-ea387.appspot.com",
  messagingSenderId: "556585853090",
  appId: "1:556585853090:web:aeaaecd5af10f160e677fb",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
