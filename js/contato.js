// Gerenciamento do Formulário de Contato

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
  }

  // Máscara para telefone
  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
        value = value.replace(/(\d)(\d{4})$/, "$1-$2");
        e.target.value = value;
      }
    });
  }
});

function handleFormSubmit(e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  // Validações
  if (
    !formData.name ||
    !formData.email ||
    !formData.subject ||
    !formData.message
  ) {
    showFeedback("Por favor, preencha todos os campos obrigatórios.", "error");
    return;
  }

  if (!isValidEmail(formData.email)) {
    showFeedback("Por favor, insira um e-mail válido.", "error");
    return;
  }

  // Simular envio (aqui você conectaria com seu backend)
  simulateFormSubmit(formData);
}

function simulateFormSubmit(formData) {
  const submitBtn = document.querySelector(".submit-btn");
  const originalText = submitBtn.innerHTML;

  // Mostrar estado de carregamento
  submitBtn.disabled = true;
  submitBtn.innerHTML =
    '<span class="btn-text">Enviando...</span><span class="btn-icon">⏳</span>';

  // Simular envio para o servidor
  setTimeout(() => {
    console.log("[v0] Formulário enviado:", formData);

    // Resetar formulário
    document.getElementById("contactForm").reset();

    // Mostrar mensagem de sucesso
    showFeedback(
      "Mensagem enviada com sucesso! Entraremos em contato em breve.",
      "success"
    );

    // Restaurar botão
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;

    // Limpar mensagem após 5 segundos
    setTimeout(() => {
      hideFeedback();
    }, 5000);
  }, 1500);
}

function showFeedback(message, type) {
  const formFeedback = document.getElementById("formFeedback");
  formFeedback.textContent = message;
  formFeedback.className = `form-feedback ${type}`;
  formFeedback.style.display = "block";

  // Scroll suave até o feedback
  formFeedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function hideFeedback() {
  const formFeedback = document.getElementById("formFeedback");
  formFeedback.style.display = "none";
  formFeedback.className = "form-feedback";
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

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
