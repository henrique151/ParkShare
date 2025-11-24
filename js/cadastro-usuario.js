
const mockCadastros = [
  {
    id: 1,
    nome: "Adriano Moreira Cruz",
    sexo: "Masculino",
    cpf: "1245678909",
    rg: "987654321",
    tipousuario: "Usuário Externo",
    nascimento: "2002-08-11",
    telefone: "(11) 9876-5432"
  },
];


let cadastroAtual = null;
function carregarCadastros() {
  const cadastroId = localStorage.getItem("cadastroEditarId") || 1;
  cadastroAtual = mockCadastros.find((c) => c.id == cadastroId);
}
function validarFormulario() {
  const campos = [
    "nomeUsuario",
    "sexoUsuario",
    "cpfUsuario",
    "rgUsuario",
    "tipoUsuario",
    "nascimentoUsuario",
    "telefoneUsuario"
  ];

  return campos.every((campo) => {
    const valor = document.getElementById(campo).value.trim();
    return valor !== "";
  });
}
function salvarCadastro() {
  if (!validarFormulario()) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  // Atualizar dados
  cadastroAtual.nome = document.getElementById("nomeUsuario").value;
  cadastroAtual.sexo = document.getElementById("sexoUsuario").value;
  cadastroAtual.cpf = document.getElementById("cpfUsuario").value;
  cadastroAtual.rg = document.getElementById("rgUsuario").value;
  cadastroAtual.tipousuario = document.getElementById("tipoUsuario").value;
  cadastroAtual.nascimento = document.getElementById("nascimentoUsuario").value;
  cadastroAtual.telefone = document.getElementById("telefoneUsuario").value;

  // Salvar no localStorage para simular persistência
  localStorage.setItem("cadastrousuarios", JSON.stringify(mockCadastros));

  alert("✅ Cadastro atualizado com sucesso!");
  window.location.href = "index.html";
}


document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  carregarCadastros();
  setupEventListeners() 

});

function setupEventListeners() { 
  const menuToggle = document.getElementById("menuToggle");
  const dropdownMenu = document.getElementById("dropdownMenu");
  menuToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("active");
  });
}

// Tema
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  setupThemeToggle();
}

function setupThemeToggle() {
  document
    .getElementById("themeToggle")
    ?.addEventListener("click", toggleTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

function openAllModals() {
    openModal("modalGrupo");
}

function openModal(id) {
    document.getElementById(id).classList.add("active");
}

function closeModal(id) {
    document.getElementById(id).classList.remove("active");
}

