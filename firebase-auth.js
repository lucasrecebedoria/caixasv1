/* firebase-auth.js (sem imports, usa window.db e window._fs) */
(function(){
  console.log("[Firebase Auth] Arquivo carregado");

  if (!window.db) {
    console.error("[Firebase Auth] db não disponível na janela. Verifique firebase-init.js");
    alert("❌ Erro interno: Firestore (db) não carregado.");
    return;
  }

  const fns = window._fs || {};
  const docFn = fns.doc;
  const getDocFn = fns.getDoc;
  const setDocFn = fns.setDoc;

  if (!docFn || !getDocFn || !setDocFn) {
    console.error("[Firebase Auth] Funções do Firestore não expostas. Ajuste firebase-init.js para setar window._fs = { doc, getDoc, setDoc }");
    alert("❌ Erro interno: Funções do Firestore indisponíveis.");
    return;
  }

  async function cadastrarUsuario(matricula, nome, senha) {
    console.log("[Firebase] Tentando cadastrar:", matricula);

    try {
      const userRef = docFn(db, "usuarios", matricula);
      const snap = await getDocFn(userRef);

      if (snap.exists()) {
        console.error("[Firebase] Matrícula já existe:", matricula);
        alert("❌ Matrícula já cadastrada!");
        return;
      }

      await setDocFn(userRef, { matricula, nome, senha });
      console.log("[Firebase] Usuário cadastrado:", matricula);
      alert("✅ Usuário cadastrado com sucesso!");
      if (window.renderLogin) window.renderLogin();
    } catch (e) {
      console.error("[Firebase] Erro ao cadastrar usuário:", e);
      alert("❌ Erro ao cadastrar usuário");
    }
  }

  async function loginUsuario(matricula, senha) {
    console.log("[Firebase] Tentando login:", matricula);

    try {
      const userRef = docFn(db, "usuarios", matricula);
      const snap = await getDocFn(userRef);

      if (!snap.exists()) {
        console.error("[Firebase] Usuário não encontrado:", matricula);
        alert("❌ Usuário não encontrado!");
        return;
      }

      const dados = snap.data();
      if (dados.senha === senha) {
        console.log("[Firebase] Login OK:", dados);
        alert("✅ Login realizado com sucesso!");
        if (window.renderMain) window.renderMain(dados);
      } else {
        console.error("[Firebase] Senha incorreta para:", matricula);
        alert("❌ Senha incorreta!");
      }
    } catch (e) {
      console.error("[Firebase] Erro no login:", e);
      alert("❌ Erro no login");
    }
  }

  // Exportar globalmente
  window.cadastrarUsuario = cadastrarUsuario;
  window.loginUsuario = loginUsuario;
})();
