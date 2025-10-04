// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth'; 

const firebaseConfig = {
  apiKey: "AIzaSyC2lsyGPAsQnFpK7A1GQaT0qW6-DG3VwMw",
  authDomain: "thatumei-portals.firebaseapp.com",
  databaseURL: "https://thatumei-portals-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "thatumei-portals",
  storageBucket: "thatumei-portals.firebasestorage.app",
  messagingSenderId: "951780186243",
  appId: "1:951780186243:web:c165895d9a98030d3e63b6",
  measurementId: "G-T3GBLJH0MP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); // エクスポート