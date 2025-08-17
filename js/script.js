console.log('✅ script.js carregado com sucesso');

// =====================
// Funções de Login/Cadastro (Firebase)
// =====================

async function login() {
  const matricula = document.getElementById("matricula").value;
  const senha = document.getElementById("senha").value;
  console.log("[UI] Login acionado", matricula);

  try {
    const userRef = window._fs.doc(window.db, "usuarios", matricula);
    const snap = await window._fs.getDoc(userRef);
    if (!snap.exists()) {
      alert("❌ Usuário não encontrado.");
      console.warn("[Auth] Usuário não encontrado:", matricula);
      return;
    }
    const data = snap.data();
    if (data.senha !== senha) {
      alert("❌ Senha incorreta.");
      console.warn("[Auth] Senha incorreta para:", matricula);
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

async function register() {
  const matricula = document.getElementById("matricula").value;
  const nome = document.getElementById("nome").value;
  const senha = document.getElementById("senha").value;
  console.log("[UI] Cadastro acionado", matricula);

  try {
    const userRef = window._fs.doc(window.db, "usuarios", matricula);
    const snap = await window._fs.getDoc(userRef);
    if (snap.exists()) {
      alert("❌ Matrícula já cadastrada.");
      console.warn("[Auth] Documento já existe:", matricula);
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

// =====================
// Função renderMain (mantida)
// =====================
function renderMain(usuario) {
  console.log("[App] Entrando em renderMain com usuário:", usuario);
  document.body.innerHTML = `
    <div class="container">
      <h1>Relatórios</h1>
      <p>Bem-vindo, ${usuario.nome} (Matrícula: ${usuario.matricula})</p>
      <!-- resto da sua UI aqui -->
    </div>
  `;
}

window.renderMain = renderMain;
window.login = login;
window.register = register;
