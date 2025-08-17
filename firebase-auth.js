import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// =========================
// Funções revisadas Firebase
// =========================

async function cadastrarUsuario(matricula, nome, senha) {
  console.log("[Firebase] Tentando cadastrar:", matricula);

  try {
    const userRef = doc(db, "usuarios", matricula);
    const snap = await getDoc(userRef);

    if (snap.exists()) {
      console.error("[Firebase] Matrícula já existe:", matricula);
      alert("❌ Matrícula já cadastrada!");
      return;
    }

    await setDoc(userRef, { matricula, nome, senha });
    console.log("[Firebase] Usuário cadastrado:", matricula);
    alert("✅ Usuário cadastrado com sucesso!");
    window.renderLogin();
  } catch (e) {
    console.error("[Firebase] Erro ao cadastrar usuário:", e);
    alert("❌ Erro ao cadastrar usuário");
  }
}

async function loginUsuario(matricula, senha) {
  console.log("[Firebase] Tentando login:", matricula);

  try {
    const userRef = doc(db, "usuarios", matricula);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      console.error("[Firebase] Usuário não encontrado:", matricula);
      alert("❌ Usuário não encontrado!");
      return;
    }

    const dados = snap.data();
    if (dados.senha === senha) {
      console.log("[Firebase] Login OK:", dados);
      alert("✅ Login realizado com sucesso!");
      window.renderMain(dados);
    } else {
      console.error("[Firebase] Senha incorreta para:", matricula);
      alert("❌ Senha incorreta!");
    }
  } catch (e) {
    console.error("[Firebase] Erro no login:", e);
    alert("❌ Erro no login");
  }
}

// Exporta globalmente
window.cadastrarUsuario = cadastrarUsuario;
window.loginUsuario = loginUsuario;
