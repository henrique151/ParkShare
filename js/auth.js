// Login Form Handler
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Simulating login - replace with actual API call
    console.log("[v0] Login attempt:", { email, password });

    // Redirect based on user type (simulated)
    // In production, this would come from the API response
    setTimeout(() => {
      // Example: redirect to external user profile
      window.location.href = "gerenciar-perfil-do-usuario-externo.html";
    }, 1000);
  });
}

// Recover Password Form Handler
const recoverForm = document.getElementById("recoverForm");
if (recoverForm) {
  recoverForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;

    console.log("[v0] Password recovery for:", email);

    // Redirect to code verification
    setTimeout(() => {
      window.location.href = "verificar-codigo.html";
    }, 1000);
  });
}

// Code Verification Handler
const verifyForm = document.getElementById("verifyForm");
if (verifyForm) {
  const codeInputs = document.querySelectorAll(".code-input");

  // Auto-focus next input
  codeInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      const value = e.target.value;

      if (value.length === 1 && index < codeInputs.length - 1) {
        codeInputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !e.target.value && index > 0) {
        codeInputs[index - 1].focus();
      }
    });
  });

  verifyForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const code = Array.from(codeInputs)
      .map((input) => input.value)
      .join("");

    console.log("[v0] Verification code:", code);

    if (code.length === 6) {
      setTimeout(() => {
        window.location.href = "nova-senha.html";
      }, 1000);
    }
  });

  // Resend code
  const resendLink = document.getElementById("resendCode");
  if (resendLink) {
    resendLink.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("[v0] Resending verification code");
      alert("Código reenviado para seu e-mail!");
    });
  }
}

// New Password Form Handler
const newPasswordForm = document.getElementById("newPasswordForm");
if (newPasswordForm) {
  newPasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const errorMessage = document.getElementById("passwordError");

    if (newPassword !== confirmPassword) {
      errorMessage.textContent = "As senhas não coincidem";
      errorMessage.classList.add("show");
      return;
    }

    if (newPassword.length < 6) {
      errorMessage.textContent = "A senha deve ter pelo menos 6 caracteres";
      errorMessage.classList.add("show");
      return;
    }

    console.log("[v0] New password set");
    errorMessage.classList.remove("show");

    // Redirect to login
    setTimeout(() => {
      alert("Senha alterada com sucesso!");
      window.location.href = "login.html";
    }, 1000);
  });
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
