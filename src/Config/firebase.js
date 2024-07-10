import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA85RbZ4hpReN0SndD3v7oi0allIdAjYCA",
  authDomain: "fir-1-f4d7f.firebaseapp.com",
  projectId: "fir-1-f4d7f",
  storageBucket: "fir-1-f4d7f.appspot.com",
  messagingSenderId: "1029743740300",
  appId: "1:1029743740300:web:9df84e516ab260a955c2a9",
  measurementId: "G-4MMKR6362M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider()
export const db= getFirestore(app)
export const storage=getStorage(app)