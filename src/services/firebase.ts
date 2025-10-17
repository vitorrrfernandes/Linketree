// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBJYoYEl-Hm3EsUUlPV-_CMUiN4BedKcEk",
  authDomain: "linktree-5bac1.firebaseapp.com",
  projectId: "linktree-5bac1",
  storageBucket: "linktree-5bac1.firebasestorage.app",
  messagingSenderId: "648813448165",
  appId: "1:648813448165:web:466f4c7b5d0cac59297d0c",
  measurementId: "G-Z8FJ6JV195"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore (app);

export { auth , db };
