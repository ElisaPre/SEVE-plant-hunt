// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSHfjUjc9nTaZW2NwMC8PxeQgJNWpxVio",
  authDomain: "seve-plant-hunt.firebaseapp.com",
  projectId: "seve-plant-hunt",
  storageBucket: "seve-plant-hunt.firebasestorage.app",
  messagingSenderId: "791467451009",
  appId: "1:791467451009:web:9f92aae2784f62cb6f6380",
  measurementId: "G-0383K60P1K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
