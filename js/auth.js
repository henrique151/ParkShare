function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add("show");
    setTimeout(() => {
      errorElement.classList.remove("show");
    }, 5000);
  }
}

function setupPasswordToggle(toggleButtonId, passwordInputId) {
  const toggleButton = document.getElementById(toggleButtonId);
  const passwordInput = document.getElementById(passwordInputId);

  if (toggleButton && passwordInput) {
    toggleButton.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";

      const eyeOpen = toggleButton.querySelectorAll(".eye-open");
      const eyeClosed = toggleButton.querySelectorAll(".eye-closed");

      eyeOpen.forEach((el) => (el.style.display = isPassword ? "none" : ""));
      eyeClosed.forEach((el) => (el.style.display = isPassword ? "" : "none"));
    });
  }
}

setupPasswordToggle("togglePassword", "password");
setupPasswordToggle("toggleNewPassword", "newPassword");
setupPasswordToggle("toggleConfirmPassword", "confirmPassword");

// Login Form Handler
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!isValidEmail(email)) {
      showError(
        "loginError",
        "❌ E-mail inválido. Por favor, insira um e-mail válido."
      );
      return;
    }

    if (!password || password.length < 6) {
      showError("loginError", "❌ A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    // Simulating login - replace with actual API call
    console.log("[v0] Login attempt:", { email, password });

    setTimeout(() => {
      if (email === "usuarioexterno" && password === "admin123!") {
        window.location.href = "administrador.html";
      } else if (email === "sindico@gmail.com" && password === "sindico123!") {
        window.location.href = "sindico.html";
      } else if (email === "usuario@gmail.com" && password === "usuario123!") {
        window.location.href = "gerenciar-perfil-do-usuario-externo.html";
      } else if (
        email === "condomino@gmail.com" &&
        password === "condomino123!"
      ) {
        window.location.href = "gerenciar-vaga.html";
      } else {
        showError(
          "loginError",
          "❌ E-mail ou senha incorretos. Verifique suas credenciais e tente novamente."
        );
      }
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

    if (!newPassword || newPassword.length < 6) {
      errorMessage.textContent = "❌ A senha deve ter pelo menos 6 caracteres";
      errorMessage.classList.add("show");
      return;
    }

    if (!confirmPassword) {
      errorMessage.textContent = "❌ Por favor, confirme sua senha";
      errorMessage.classList.add("show");
      return;
    }

    if (newPassword !== confirmPassword) {
      errorMessage.textContent =
        "❌ As senhas não coincidem. Verifique e tente novamente.";
      errorMessage.classList.add("show");
      return;
    }

    console.log("[v0] New password set");
    errorMessage.classList.remove("show");

    // Redirect to login
    setTimeout(() => {
      alert("✅ Senha alterada com sucesso!");
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
