import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyClDOu1uXhZDh-w3q8nHjKZAoip9wXhV98",
  authDomain: "eduplatform-6297f.firebaseapp.com",
  projectId: "eduplatform-6297f",
  storageBucket: "eduplatform-6297f.firebasestorage.app",
  messagingSenderId: "625481974161",
  appId: "1:625481974161:web:fbb5e8fe9978b0a6cd9a30",
  measurementId: "G-MQF003PX52",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
