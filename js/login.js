//Moisés
const mockLogin = [
  {
    id: 1,
    email: "Rodrigo@gmail.com",
    senha: "1234"
  },
];


let cadastroAtual = null;
function carregarCadastros() {
  const cadastroId = localStorage.getItem("cadastroEditarId") || 1;
  cadastroAtual = mockLogin.find((c) => c.id == cadastroId);
}
function validarFormulario() {
  const campos = [
    "emailPessoa",
    "senhaPessoa"
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
  cadastroAtual.email = document.getElementById("emailPessoa").value;
  cadastroAtual.senha = document.getElementById("senhaPessoa").value;
  
  // Salvar no localStorage para simular persistência
  localStorage.setItem("cadastrousuarios", JSON.stringify(mockLogin));

  alert("✅ Seja Bem-vindo!");
  window.location.href = "index.html";
}



// Inicializar tema
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const theme = savedTheme || (systemPrefersDark ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", theme);
}


/**
 * Alterna entre tema claro e escuro
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

function setupEventListeners() {
  // Tema
  document
    .getElementById("themeToggle")
    ?.addEventListener("click", toggleTheme);

  // Menu
  const menuToggle = document.getElementById("menuToggle");
  const dropdownMenu = document.getElementById("dropdownMenu");

  menuToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (menuToggle && !menuToggle.contains(e.target)) {
      dropdownMenu?.classList.remove("active");
    }
  });
}

//Iniciar eventos
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  carregarCadastros();
  setupEventListeners();
});


//Para Mobile
function handleSwipe(sectionId) {
  const diff = state.touchStartX - state.touchEndX;

  if (Math.abs(diff) > config.swipeThreshold) {
    const direction = diff > 0 ? 1 : -1;
    scrollCarousel(sectionId, direction);
  }
}

function setupTouchNavigation() {
  config.carouselSections.forEach((section) => {
    const carousel = document.getElementById(section.id);
    if (!carousel) return;

    carousel.addEventListener("touchstart", (e) => {
      state.touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener("touchend", (e) => {
      state.touchEndX = e.changedTouches[0].screenX;
      handleSwipe(section.id);
    });
  });
}


