// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  setupEventListeners();
});

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  setupThemeToggle();
}

function setupThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

// Event Listeners
function setupEventListeners() {
  const menuToggle = document.getElementById("menuToggle");
  const dropdownMenu = document.getElementById("dropdownMenu");

  if (menuToggle && dropdownMenu) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle("active");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!menuToggle.contains(e.target)) {
        dropdownMenu.classList.remove("active");
      }
    });
  }

  const tipoUsuarioSelect = document.getElementById("tipoUsuario");
  if (tipoUsuarioSelect) {
    tipoUsuarioSelect.addEventListener("change", (e) => {
      const value = e.target.value;
      if (value && value !== "") {
        // Abrir modal automaticamente quando selecionar um tipo
        openModal("modalTiposUsuario");
      }
    });
  }
}

// Modal Functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Close modal when clicking outside
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    closeModal(e.target.id);
  }
});

// Form Functions
function validarFormulario() {
  const campos = [
    "nomeUsuario",
    "sexoUsuario",
    "cpfUsuario",
    "rgUsuario",
    "tipoUsuario",
    "nascimentoUsuario",
    "telefoneUsuario",
  ];

  return campos.every((campo) => {
    const elemento = document.getElementById(campo);
    const valor = elemento ? elemento.value.trim() : "";
    return valor !== "";
  });
}

function salvarCadastro() {
  if (!validarFormulario()) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  const cadastro = {
    nome: document.getElementById("nomeUsuario").value,
    sexo: document.getElementById("sexoUsuario").value,
    cpf: document.getElementById("cpfUsuario").value,
    rg: document.getElementById("rgUsuario").value,
    tipoUsuario: document.getElementById("tipoUsuario").value,
    nascimento: document.getElementById("nascimentoUsuario").value,
    telefone: document.getElementById("telefoneUsuario").value,
  };

  console.log("[v0] Cadastro salvo:", cadastro);

  // Salvar no localStorage (simulação)
  localStorage.setItem("cadastroUsuario", JSON.stringify(cadastro));

  alert("✅ Cadastro realizado com sucesso!");

  // Redirect based on user type
  if (cadastro.tipoUsuario === "sindico") {
    window.location.href = "sindico.html";
  } else if (cadastro.tipoUsuario === "usuarioexterno") {
    window.location.href = "gerenciar-perfil-do-usuario-externo.html";
  } else {
    window.location.href = "index.html";
  }
}

function reiniciarCadastro() {
  if (confirm("Tem certeza que deseja limpar todos os campos?")) {
    document.getElementById("formCadastro").reset();
  }
}
