// =====================
// Firebase Auth - Firestore baseado
// =====================
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { app } from "./firebase-init.js";

const db = getFirestore(app);
console.log("[Firebase] Firestore inicializado:", db);

// =====================
// Função de cadastro
// =====================

    await setDoc(ref, {
      matricula,
      nome,
      senha,
      criadoEm: new Date().toISOString()
    });
    console.log("[Firebase] Usuário cadastrado com sucesso:", matricula);
    alert("Usuário cadastrado com sucesso!");
  } catch (e) {
    console.error("[Firebase] Erro ao cadastrar usuário:", e);
    alert("Erro ao cadastrar usuário.");
  }
}

// =====================
// Função de login
// =====================

    const data = docSnap.data();
    console.log("[Firebase] Usuário encontrado:", data);

    if (data.senha === senha) {
      console.log("[Firebase] Login bem-sucedido:", matricula);
      alert("Login realizado com sucesso!");
      if (window.renderMain) {
        window.renderMain(data);
      }
    } else {
      console.warn("[Firebase] Senha incorreta para matrícula:", matricula);
      alert("Senha incorreta!");
    }
  } catch (e) {
    console.error("[Firebase] Erro no login:", e);
    alert("Erro ao realizar login.");
  }
}

// Expor para uso no script.js
window.cadastrarUsuario = cadastrarUsuario;
window.loginUsuario = loginUsuario;


// =========================
// Funções revisadas Firebase
// =========================

import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

export async function cadastrarUsuario(matricula, nome, senha) {
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

export async function loginUsuario(matricula, senha) {
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
