// [Firebase Auth] Arquivo carregado com logs de depuração

// Função de cadastro de usuário
async function cadastrarUsuario(matricula, nome, senha) {
  console.log("[Auth] Tentando cadastrar:", matricula, nome);
  try {
    const userRef = window._fs.doc(window.db, "usuarios", matricula);
    const snap = await window._fs.getDoc(userRef);
    if (snap.exists()) {
      console.warn("[Auth] Documento já existe:", matricula);
      alert("❌ Matrícula já cadastrada.");
      return;
    }
    await window._fs.setDoc(userRef, { matricula, nome, senha });
    console.log("[Auth] Usuário cadastrado com sucesso:", { matricula, nome });
    alert("✅ Usuário cadastrado com sucesso.");
  } catch (e) {
    console.error("[Firestore] Erro ao cadastrar:", e);
    alert("❌ Erro ao cadastrar: " + e.message);
  }
}

// Função de login
async function loginUsuario(matricula, senha) {
  console.log("[Auth] Tentando login:", matricula);
  try {
    const userRef = window._fs.doc(window.db, "usuarios", matricula);
    const snap = await window._fs.getDoc(userRef);
    if (!snap.exists()) {
      console.warn("[Auth] Usuário não encontrado:", matricula);
      alert("❌ Usuário não encontrado.");
      return;
    }
    const data = snap.data();
    console.log("[Auth] Usuário encontrado:", data);
    if (data.senha !== senha) {
      console.warn("[Auth] Senha incorreta para matrícula:", matricula);
      alert("❌ Senha incorreta.");
      return;
    }
    console.log("[Auth] Login OK:", data);
    alert("✅ Login realizado com sucesso.");
    if (window.renderMain) window.renderMain(data);
  } catch (e) {
    console.error("[Firestore] Erro no login:", e);
    alert("❌ Erro no login: " + e.message);
  }
}

// Expor para uso no script.js
window.cadastrarUsuario = cadastrarUsuario;
window.loginUsuario = loginUsuario;
