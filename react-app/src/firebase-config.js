// src/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAv7ERKDXj_-KYQ77RGmkxrT4LRX1bX7U4",
  authDomain: "cnc-monitor-35c51.firebaseapp.com",
  projectId: "cnc-monitor-35c51",
  storageBucket: "cnc-monitor-35c51.firebasestorage.app",
  messagingSenderId: "1002534462380",
  appId: "1:1002534462380:web:e0d7682b313d5536a79009",
  measurementId: "G-WHK1Y2DJSF"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
