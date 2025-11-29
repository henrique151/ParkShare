const mockCadastroCondominos = [
  {
    id: 1,
    nome: "Adriano Moreira Cruz",
    telefone: "Masculino",
    cpf: "1245678909",
    rg: "553123252",
    email: "Adriano@gmail.com",
    vaga: 25,
  },
];

let cadastroAtual = null;
function carregarCadastros() {
  const cadastroId = localStorage.getItem("cadastroEditarId") || 1;
  cadastroAtual = mockCadastroCondominos.find((c) => c.id == cadastroId);
}
function validarFormulario() {
  const campos = [
    "nomeCondomino",
    "telefoneCondomino",
    "cpfCondomino",
    "idNumVaga",
    "rgCondomino",
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
  cadastroAtual.nome = document.getElementById("nomeCondomino").value;
  cadastroAtual.telefone = document.getElementById("telefoneCondomino").value;
  cadastroAtual.cpf = document.getElementById("cpfCondomino").value;
  cadastroAtual.vaga = document.getElementById("idNumVaga").value;
  cadastroAtual.rg = document.getElementById("rgCondomino").value;
  cadastroAtual.email = document.getElementById("emailCondomino").value;

  // Salvar no localStorage para simular persistência
  localStorage.setItem(
    "cadastrocondominos",
    JSON.stringify(mockCadastroCondominos)
  );

  alert("✅ Cadastro atualizado com sucesso!");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  carregarCadastros();
  setupEventListeners();
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
