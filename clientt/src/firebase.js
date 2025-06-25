// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyARovJvlIg7LXiC4CIVuQwvZZ9s-ke9Edc",
    authDomain: "topmobile-637a8.firebaseapp.com",
    projectId: "topmobile-637a8",
    storageBucket: "topmobile-637a8.firebasestorage.app",
    messagingSenderId: "399709043312",
    appId: "1:399709043312:web:4cbc149dc8218815add2b5",
    measurementId: "G-GRECF7VBBB"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup };
