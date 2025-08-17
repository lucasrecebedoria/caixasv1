// js/firebase-auth.js
console.log("[Firebase Auth] Carregado");

if (!window.db || !window._fs) {
  console.error("[Firebase Auth] Firestore não inicializado (verifique firebase-init.js).");
}

const { doc, getDoc, setDoc } = window._fs || {};

// Cadastrar usuário em usuarios/{matricula}
async function cadastrarUsuario(matricula, nome, senha) {
  try {
    if (!matricula || !nome || !senha) {
      alert("⚠️ Preencha matrícula, nome e senha.");
      return;
    }
    const userRef = doc(window.db, "usuarios", matricula);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      alert("❌ Matrícula já cadastrada.");
      return;
    }
    await setDoc(userRef, { matricula, nome, senha });
    alert("✅ Usuário cadastrado com sucesso.");
    console.log("[Firestore] Cadastrado:", { matricula, nome });
  } catch (e) {
    console.error("[Firestore] Erro ao cadastrar:", e);
    alert("❌ Erro ao cadastrar: " + e.message);
  }
}

// Login: compara senha do documento usuarios/{matricula}
async function loginUsuario(matricula, senha) {
  try {
    if (!matricula || !senha) {
      alert("⚠️ Informe matrícula e senha.");
      return;
    }
    const userRef = doc(window.db, "usuarios", matricula);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      alert("❌ Usuário não encontrado.");
      return;
    }
    const data = snap.data();
    if (data.senha !== senha) {
      alert("❌ Senha incorreta.");
      return;
    }
    alert("✅ Login realizado com sucesso.");
    console.log("[Firestore] Login OK:", data);
    if (window.renderMain) window.renderMain(data);
  } catch (e) {
    console.error("[Firestore] Erro no login:", e);
    alert("❌ Erro no login: " + e.message);
  }
}

// Expor globalmente para seu script.js atual
window.cadastrarUsuario = cadastrarUsuario;
window.loginUsuario = loginUsuario;
