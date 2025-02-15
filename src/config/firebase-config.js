import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAmrE0nAYy5jlREDk4QHm_kbmQVaQBZrlc",
  authDomain: "via-outdoors-d6d97.firebaseapp.com",
  databaseURL: "https://via-outdoors-d6d97-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "via-outdoors-d6d97",
  storageBucket: "via-outdoors-d6d97.firebasestorage.app",
  messagingSenderId: "943670918695",
  appId: "1:943670918695:web:2e589a125a49bc71891802",
  databaseUrl: "https://via-outdoors-d6d97-default-rtdb.europe-west1.firebasedatabase.app/",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
