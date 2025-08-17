
// ======================
// Firebase Auth (cadastro/login)
// ======================
console.log("[Firebase Auth] carregado");

async function cadastrarUsuario(matricula, nome, senha) {
  try {
    const { doc, setDoc } = window._fs;
    const ref = doc(window.db, "usuarios", matricula);
    await setDoc(ref, { matricula, nome, senha });
    console.log("✅ Usuário cadastrado com sucesso");
    console.table({ matricula, nome, senha });
    alert("✅ Usuário cadastrado com sucesso!\nID: " + matricula);
    document.getElementById("matricula").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("senha").value = "";
  } catch (e) {
    console.error("❌ Erro ao cadastrar:", e);
    alert("❌ Erro ao cadastrar usuário");
  }
}

async function loginUsuario(matricula, senha) {
  try {
    const { doc, getDoc } = window._fs;
    const ref = doc(window.db, "usuarios", matricula);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      alert("❌ Usuário não encontrado!");
      console.warn("Usuário não encontrado:", matricula);
      return;
    }
    const user = snap.data();
    if (user.senha === senha) {
      console.log("✅ Login realizado com sucesso");
      console.table(user);
      alert("✅ Login realizado com sucesso!");
      document.getElementById("matricula").value = "";
      document.getElementById("senha").value = "";
      if (window.renderMain) window.renderMain(user);
    } else {
      alert("❌ Senha incorreta!");
      console.error("Senha incorreta para matrícula", matricula);
    }
  } catch (e) {
    console.error("❌ Erro no login:", e);
    alert("❌ Erro no login");
  }
}

window.cadastrarUsuario = cadastrarUsuario;
window.loginUsuario = loginUsuario;
