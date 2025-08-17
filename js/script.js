console.log('✅ script.js carregado com sucesso');

// =====================
// Renderiza tela de login/cadastro inicial (lado a lado)
// =====================
function renderLogin() {
  document.getElementById("app").innerHTML = `
    <div class="auth-container">
      <div class="auth-box">
        <h2>Login</h2>
        <input id="matricula" type="text" placeholder="Matrícula" class="input-dark">
        <input id="senha" type="password" placeholder="Senha" class="input-dark">
        <button onclick="login()">Entrar</button>
      </div>
      <div class="auth-box">
        <h2>Cadastro</h2>
        <input id="nome" type="text" placeholder="Nome" class="input-dark">
        <input id="matriculaCadastro" type="text" placeholder="Matrícula" class="input-dark">
        <input id="senhaCadastro" type="password" placeholder="Senha" class="input-dark">
        <button onclick="register()">Cadastrar</button>
      </div>
    </div>
  `;
}

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
  const matricula = document.getElementById("matriculaCadastro").value;
  const nome = document.getElementById("nome").value;
  const senha = document.getElementById("senhaCadastro").value;
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
  document.getElementById("app").innerHTML = `
    <div class="container">
      <h1>Relatórios</h1>
      <p>Bem-vindo, ${usuario.nome} (Matrícula: ${usuario.matricula})</p>
      <!-- resto da sua UI aqui -->
    </div>
  `;
}

// Inicializa tela de login no carregamento
document.addEventListener("DOMContentLoaded", renderLogin);

window.renderMain = renderMain;
