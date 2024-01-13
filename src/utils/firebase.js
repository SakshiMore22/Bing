// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtagpyDF0ei9EB_PegZG4uEl-qw3cRl7g",
  authDomain: "bing-3ced5.firebaseapp.com",
  projectId: "bing-3ced5",
  storageBucket: "bing-3ced5.appspot.com",
  messagingSenderId: "1044039684318",
  appId: "1:1044039684318:web:67d6265e56f54d4743b24f",
  measurementId: "G-698ZXSQ425" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Instantiation
export const auth = getAuth();