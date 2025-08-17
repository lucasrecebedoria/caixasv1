import { db } from "./firebase-init.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

export async function cadastrarUsuario(matricula, nome, senha) {
  try {
    console.log("[Cadastro] Tentando cadastrar:", matricula, nome);
    const m = String(matricula || "").trim();
    const s = String(senha || "").trim();
    const n = String(nome || "").trim();
    if (!m || !s) {
      alert("Preencha matrícula e senha.");
      return;
    }
    const ref = doc(db, "usuarios", m);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      alert("Matrícula já cadastrada.");
      return;
    }
    await setDoc(ref, { nome: n, senha: s, criadoEm: new Date().toISOString() });
    console.log("[Cadastro] Documento criado em Firestore:", m);
    alert("Usuário cadastrado com sucesso!");
  } catch (err) {
    console.error("Erro ao cadastrar:", err);
    alert("Erro ao cadastrar usuário. Veja o console.");
  }
}

export async function loginUsuario(matricula, senha) {
  try {
    console.log("[Login] Tentando login:", matricula);
    const m = String(matricula || "").trim();
    const s = String(senha || "").trim();
    if (!m || !s) {
      alert("Preencha matrícula e senha.");
      return;
    }
    const ref = doc(db, "usuarios", m);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      alert("Usuário não encontrado.");
      return;
    }
    const data = snap.data();
    console.log("[Login] Documento encontrado:", data);
    console.log("[Login] Senha digitada:", s, " | Senha salva:", data.senha);
    if (String(data.senha) !== s) {
      alert("Senha incorreta.");
      return;
    }
    alert("Login realizado com sucesso!");
    if (typeof window.renderMain === "function") {
      window.renderMain({ matricula: m, ...data });
    }
  } catch (err) {
    console.error("Erro no login:", err);
    alert("Erro no login. Veja o console.");
  }
}

window.cadastrarUsuario = cadastrarUsuario;
window.loginUsuario = loginUsuario;
console.log("[Firebase] cadastrarUsuario/loginUsuario prontos");
