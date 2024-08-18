// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxyurNCO5ARnaAuGZhI_g6K10OfJZ2oL4",
  authDomain: "latexify-f2157.firebaseapp.com",
  projectId: "latexify-f2157",
  storageBucket: "latexify-f2157.appspot.com",
  messagingSenderId: "798181456424",
  appId: "1:798181456424:web:ea67db04b69d82af66531d",
  measurementId: "G-ZJV9XYQ59N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getStorage(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
export default {app, db, auth, analytics};