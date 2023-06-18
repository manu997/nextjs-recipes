// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCUzcKIAxEgIMy5sTm3iZc4X56lystTMk",
  authDomain: "recipes-web-app-fbc1f.firebaseapp.com",
  databaseURL: "https://recipes-web-app-fbc1f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "recipes-web-app-fbc1f",
  storageBucket: "recipes-web-app-fbc1f.appspot.com",
  messagingSenderId: "769820562426",
  appId: "1:769820562426:web:09ae91df2287f3574e0a43",
  measurementId: "G-NMMRWSD88B"
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
export const db = getFirestore(firebase_app);