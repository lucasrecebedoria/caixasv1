// js/firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Config Firebase (mantendo seu projeto)
const firebaseConfig = {
  apiKey: "AIzaSyBdmIYK4Zy6MbEsT3pc5W_YkbdKtOUOzto",
  authDomain: "caixas-b09fb.firebaseapp.com",
  projectId: "caixas-b09fb",
  storageBucket: "caixas-b09fb.appspot.com",
  messagingSenderId: "93898531144",
  appId: "1:93898531144:web:d62e34c97865133644137d",
  measurementId: "G-SSWHWFZ7FT"
};

// Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Expor globalmente para uso em scripts não-modulares
window.db = db;
window._fs = { doc, getDoc, setDoc, collection, addDoc };

console.log("✅ Firebase inicializado e exposto: window.db + window._fs");
