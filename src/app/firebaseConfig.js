// ./src/app/firebaseConfig.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnC2xGInV_eU08mEIgx2Ta6XasC8NL9Ic",
  authDomain: "editor-1a339.firebaseapp.com",
  projectId: "editor-1a339",
  storageBucket: "editor-1a339.firebasestorage.app",
  messagingSenderId: "938868004040",
  appId: "1:938868004040:web:bf331a37050e6a76f441fd",
  measurementId: "G-B2JDQ3F3GS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);