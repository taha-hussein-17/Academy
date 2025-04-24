// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKeWshUtdh-ZYp5o-kv_e89sLrxqwZQgA",
  authDomain: "academybackend-24f29.firebaseapp.com",
  projectId: "academybackend-24f29",
 storageBucket: "academybackend-24f29.appspot.com", // صح

  messagingSenderId: "258810800387",
  appId: "1:258810800387:web:42d75abcfed90c5b046136",
  measurementId: "G-T45EDKQ19J"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // <-- ده مهم
