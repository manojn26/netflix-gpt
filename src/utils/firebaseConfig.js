// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1T7a6BhTzrzfXn9xR-BfiKUJ-Vo08Qiw",
  authDomain: "netflix-gpt-7aeb9.firebaseapp.com",
  projectId: "netflix-gpt-7aeb9",
  storageBucket: "netflix-gpt-7aeb9.appspot.com",
  messagingSenderId: "698885628679",
  appId: "1:698885628679:web:cfdb8471665bea55a75ba2",
  measurementId: "G-2523TTDREM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
