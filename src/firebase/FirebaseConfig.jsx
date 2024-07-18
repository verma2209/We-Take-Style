// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmQg4jnRhhA-7Co_u7W9uVYOo--fzGk-E",
  authDomain: "myecom-1c659.firebaseapp.com",
  projectId: "myecom-1c659",
  storageBucket: "myecom-1c659.appspot.com",
  messagingSenderId: "473490357505",
  appId: "1:473490357505:web:0048bf613d57a71c9b2f00",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
