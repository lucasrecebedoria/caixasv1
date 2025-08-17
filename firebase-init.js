// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBdmIYK4Zy6MbEsT3pc5W_YkbdKtOUOzto",
  authDomain: "caixas-b09fb.firebaseapp.com",
  projectId: "caixas-b09fb",
  storageBucket: "caixas-b09fb.firebasestorage.app",
  messagingSenderId: "93898531144",
  appId: "1:93898531144:web:d62e34c97865133644137d",
  measurementId: "G-SSWHWFZ7FT"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Tornar db acessível globalmente
window.db = db;

console.log("[Firebase] Inicializado com sucesso e 'db' exposto globalmente.");


console.log('✅ Firebase carregado com sucesso');


/* Expor helpers do Firestore globalmente para scripts não-module */
try {
  if (typeof doc !== "undefined" && typeof getDoc !== "undefined" && typeof setDoc !== "undefined") {
    window._fs = { doc, getDoc, setDoc };
    console.log("[Firebase] Helpers do Firestore expostos em window._fs");
  } else {
    console.warn("[Firebase] doc/getDoc/setDoc não detectados aqui.");
  }
} catch (e) {
  console.warn("[Firebase] Falha ao expor helpers:", e);
}
