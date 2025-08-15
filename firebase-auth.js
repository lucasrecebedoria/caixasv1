// firebase-auth.js
import { db } from "./firebase-init.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

export async function cadastrarUsuario(matricula, nome, senha) {
  if (!matricula || !senha) {
    alert("Preencha matrícula e senha.");
    return;
  }
  const ref = doc(db, "usuarios", matricula);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    alert("Matrícula já cadastrada.");
    return;
  }
  await setDoc(ref, {
    matricula: matricula,
    nome: nome || "",
    senha: senha,
    criadoEm: new Date().toISOString()
  });
  alert("Usuário cadastrado com sucesso!");
}

export async function loginUsuario(matricula, senha) {
  if (!matricula || !senha) {
    alert("Preencha matrícula e senha.");
    return;
  }
  const ref = doc(db, "usuarios", matricula);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    alert("Usuário não encontrado.");
    return;
  }
  const data = snap.data();
  if (data.senha !== senha) {
    alert("Senha incorreta.");
    return;
  }
  alert("Login realizado com sucesso!");
}

window.cadastrarUsuario = cadastrarUsuario;
window.loginUsuario = loginUsuario;
