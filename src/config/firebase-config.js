import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBp9nwJvAKyLer4xPeNCKr2J4rIDbblXg8",
    authDomain: "via-outdoors.firebaseapp.com",
    projectId: "via-outdoors",
    storageBucket: "via-outdoors.firebasestorage.app",
    messagingSenderId: "182572807658",
    appId: "1:182572807658:web:4a7f66b019f4e43035ee93",
    databaseUrl: "https://via-outdoors-default-rtdb.europe-west1.firebasedatabase.app/",
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);