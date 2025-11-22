//Moisés
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

//Inicia os eventos
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
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


// Atualizar estilo do login conforme o tema
function updateLoginTheme() {
    const theme = document.documentElement.getAttribute("data-theme");

    const card = document.querySelector(".login-card");
    const inputs = document.querySelectorAll(".login-input");
    const button = document.querySelector(".login-btn");

    if (!card) return; // Não está na página de login

    if (theme === "dark") {
        card.classList.add("login-dark");
        card.classList.remove("login-light");

        inputs.forEach(i => {
            i.classList.add("login-dark");
            i.classList.remove("login-light");
        });

        button.classList.add("login-dark");
        button.classList.remove("login-light");

    } else {
        card.classList.add("login-light");
        card.classList.remove("login-dark");

        inputs.forEach(i => {
            i.classList.add("login-light");
            i.classList.remove("login-dark");
        });

        button.classList.add("login-light");
        button.classList.remove("login-dark");
    }
}

// Atualiza ao carregar a página
document.addEventListener("DOMContentLoaded", updateLoginTheme);

// Atualiza ao trocar o tema
document.getElementById("themeToggle")?.addEventListener("click", () => {
    setTimeout(updateLoginTheme, 50);
});
