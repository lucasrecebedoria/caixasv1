// firebase-auth.js
console.log("[Firebase Auth] Arquivo carregado");

// Garantir que o Firestore está disponível
if (!window.db || !window._fs) {
  console.error("[Firebase Auth] Erro: Firestore não inicializado corretamente no firebase-init.js");
}

// Extrair helpers expostos globalmente
const { doc, getDoc, setDoc, collection, addDoc } = window._fs || {};

// =====================
// Função para cadastrar usuário
// =====================
async function cadastrarUsuario(matricula, nome, senha) {
  try {
    if (!matricula || !nome || !senha) {
      alert("⚠️ Preencha todos os campos!");
      return;
    }

    const userRef = doc(window.db, "usuarios", matricula);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      alert("❌ Matrícula já cadastrada!");
      console.warn("[Firebase] Matrícula já existe:", matricula);
      return;
    }

    await setDoc(userRef, { matricula, nome, senha });
    alert("✅ Usuário cadastrado com sucesso!");
    console.log("[Firebase] Usuário cadastrado:", { matricula, nome });
  } catch (err) {
    console.error("[Firebase] Erro ao cadastrar usuário:", err);
    alert("❌ Erro ao cadastrar usuário: " + err.message);
  }
}

// =====================
// Função para login de usuário
// =====================
async function loginUsuario(matricula, senha) {
  try {
    if (!matricula || !senha) {
      alert("⚠️ Informe matrícula e senha!");
      return;
    }

    const userRef = doc(window.db, "usuarios", matricula);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      alert("❌ Usuário não encontrado!");
      console.warn("[Firebase] Usuário não encontrado:", matricula);
      return;
    }

    const data = userSnap.data();
    if (data.senha !== senha) {
      alert("❌ Senha incorreta!");
      console.warn("[Firebase] Senha incorreta para matrícula:", matricula);
      return;
    }

    alert("✅ Login realizado com sucesso!");
    console.log("[Firebase] Login OK:", data);

    if (window.renderMain) {
      window.renderMain(data);
    }
  } catch (err) {
    console.error("[Firebase] Erro no login:", err);
    alert("❌ Erro no login: " + err.message);
  }
}

// Expor globalmente
window.cadastrarUsuario = cadastrarUsuario;
window.loginUsuario = loginUsuario;

console.log("[Firebase Auth] Funções de cadastro/login expostas em window");
