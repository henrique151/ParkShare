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

  // Submit handler para o formulário de cadastro de edifício
  const buildingForm = document.getElementById("buildingRegistrationForm");
  if (buildingForm) {
    buildingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      salvarCadastroEdificio();
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

function reiniciarCadastro() {
  if (confirm("Tem certeza que deseja limpar todos os campos?")) {
    document.getElementById("formCadastro").reset();
  }
}

function salvarCadastroEdificio() {
  const formData = {
    nome: document.getElementById("buildingName")?.value,
    cnpj: document.getElementById("cnpj")?.value,
    cep: document.getElementById("cep")?.value,
    rua: document.getElementById("street")?.value,
    numero: document.getElementById("number")?.value,
    bairro: document.getElementById("neighborhood")?.value,
    cidade: document.getElementById("city")?.value,
    estado: document.getElementById("state")?.value,
    totalVagas: document.getElementById("parkingSpots")?.value,
    tiposVagas: document.getElementById("spotTypes")?.value,
    regrasEstacionamento: document.getElementById("parkingRules")?.value,
    telefone: document.getElementById("adminPhone")?.value,
    email: document.getElementById("condoEmail")?.value,
    horarioFuncionamento: document.getElementById("adminHours")?.value,
    regulamento: document.getElementById("condoRules")?.value,
  };

  console.log("[v0] Cadastro de edifício salvo:", formData);
  localStorage.setItem("cadastroEdificio", JSON.stringify(formData));

  alert("✅ Edifício cadastrado com sucesso!");

  setTimeout(() => {
    alert(
      "✅ Você será redirecionado para a tela de cadastro do condomínio. Porém, conforme a proposta, o administrador deverá verificar e validar os dados do próprio síndico e do edifício. Somente após a aprovação será permitido cadastrar o condomínio."
    );
    window.location.href = "cadastro-condomino.html";
  }, 2000);
}
