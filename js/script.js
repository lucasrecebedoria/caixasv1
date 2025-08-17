console.log('✅ script.js carregado com sucesso');

// =====================
// Funções de Login/Cadastro (Firebase)
// =====================

function login() {
  const matricula = document.getElementById("matricula").value;
  const senha = document.getElementById("senha").value;
  console.log("[UI] Login acionado", matricula);
  if (window.loginUsuario) {
    window.loginUsuario(matricula, senha);
  } else {
    console.error("loginUsuario não disponível!");
  }
}

function register() {
  const matricula = document.getElementById("matricula").value;
  const nome = document.getElementById("nome").value;
  const senha = document.getElementById("senha").value;
  console.log("[UI] Cadastro acionado", matricula);
  if (window.cadastrarUsuario) {
    window.cadastrarUsuario(matricula, nome, senha);
  } else {
    console.error("cadastrarUsuario não disponível!");
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

// =====================
// Função de Login (UI)
// =====================
function renderLogin() {
  console.log("✅ Tela de login renderizada");

  document.getElementById("app").innerHTML = `
    <div class="login-container">
      <h2>Acesso ao Sistema</h2>
      <input id="matricula" placeholder="Matrícula">
      <input id="nome" placeholder="Nome (para cadastro)">
      <input id="senha" type="password" placeholder="Senha">
      <div class="buttons">
        <button onclick="login()">Entrar</button>
        <button onclick="register()">Criar Conta</button>
      </div>
    </div>
  `;
}

// Forçar tela de login ao carregar
window.addEventListener("DOMContentLoaded", () => {
  if (typeof renderLogin === "function") {
    renderLogin();
  }
});
