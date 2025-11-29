// Script para página Como Funciona

// Alternância entre perfis
const profileTabs = document.querySelectorAll(".profile-tab");
const profileContents = document.querySelectorAll(".profile-content");

profileTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const profile = tab.getAttribute("data-profile");

    // Remove active de todas as tabs e contents
    profileTabs.forEach((t) => t.classList.remove("active"));
    profileContents.forEach((c) => c.classList.remove("active"));

    // Adiciona active na tab clicada e no content correspondente
    tab.classList.add("active");
    document.getElementById(`${profile}-content`).classList.add("active");

    // Scroll suave para o conteúdo
    document.querySelector(".profile-content.active").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    // Fecha todos os outros itens
    faqItems.forEach((faq) => faq.classList.remove("active"));

    // Abre o item clicado se não estava ativo
    if (!isActive) {
      item.classList.add("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
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
