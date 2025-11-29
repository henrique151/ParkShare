//Moisés
const mockVeiculos = [
  {
    id: 1,
    modelo: "Porsche 911",
    marca: "Porsche",
    cor: "Preto",
    placa: "ABC-1234",
    ano: "2022",
    tipo: "carro",
  },
];

let cadastroAtual = null;
function carregarCadastros() {
  const cadastroId = localStorage.getItem("condominioEditarId") || 1;
  cadastroAtual = mockVeiculos.find((c) => c.id == cadastroId);
}
function validarFormulario() {
  const campos = [
    "modeloVeiculo",
    "marcaVeiculo",
    "corVeiculo",
    "placaVeiculo",
    "anoFabricacao",
    "tipoVeiculo",
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
  cadastroAtual.modelo = document.getElementById("modeloVeiculo").value;
  cadastroAtual.marca = document.getElementById("marcaVeiculo").value;
  cadastroAtual.cor = document.getElementById("corVeiculo").value;
  cadastroAtual.placa = document.getElementById("placaVeiculo").value;
  cadastroAtual.ano = document.getElementById("anoFabricacao").value;
  cadastroAtual.tipoVeiculo = document.getElementById("tipoVeiculo").value;

  // Salvar no localStorage para simular persistência
  localStorage.setItem("cadastrousuarios", JSON.stringify(mockVeiculos));

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
