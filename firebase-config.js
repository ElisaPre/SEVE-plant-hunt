// firebase-config.js

const firebaseConfig = {
  apiKey: "AIzaSyBSHfjUjc9nTaZW2NwMC8PxeQgJNWpxVio",
  authDomain: "seve-plant-hunt.firebaseapp.com",
  projectId: "seve-plant-hunt",
  storageBucket: "seve-plant-hunt.appspot.com",
  messagingSenderId: "791467451009",
  appId: "1:791467451009:web:9f92aae2784f62cb6f6380",
  measurementId: "G-0383K60P1K"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
