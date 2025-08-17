function register(){
  console.log("[UI] Botão de cadastro pressionado");
  const m = document.getElementById('matricula')?.value?.trim() || "";
  const n = document.getElementById('nome')?.value?.trim() || "";
  const s = document.getElementById('senha')?.value?.trim() || "";
  if(!m || !s){ alert("Preencha matrícula e senha."); return; }
  if(!window.cadastrarUsuario){ alert("Firebase não carregou. Verifique firebase-init.js e firebase-auth.js."); return; }
  window.cadastrarUsuario(m, n, s);
}

function login(){
  console.log("[UI] Botão de login pressionado");
  const m = document.getElementById('matricula')?.value?.trim() || "";
  const s = document.getElementById('senha')?.value?.trim() || "";
  if(!m || !s){ alert("Preencha matrícula e senha."); return; }
  if(!window.loginUsuario){ alert("Firebase não carregou. Verifique firebase-init.js e firebase-auth.js."); return; }
  window.loginUsuario(m, s);
}
