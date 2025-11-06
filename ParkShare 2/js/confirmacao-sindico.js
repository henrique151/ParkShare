let pedidoData = null;
let statusCondominio = false;
let statusUsuario = false;
let actionCallback = null;

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadPedidoData();
  setupEventListeners();
  checkApprovalStatus();
});

function loadPedidoData() {
  const data = localStorage.getItem("pedidoSelecionado");

  if (!data) {
    alert("Nenhum pedido encontrado. Redirecionando...");
    window.location.href = "sindico.html";
    return;
  }

  pedidoData = JSON.parse(data);

  document.getElementById("codigoPedido").textContent =
    pedidoData.codigo || "#PED001";
  document.getElementById("nomeCondominio").textContent =
    pedidoData.condominio || "José dos Santos";
  document.getElementById("localVaga").textContent =
    pedidoData.localVaga || "10, Pátio 3";
  document.getElementById("horarioAluguel").textContent =
    pedidoData.horario || "09:00 - 12:00";
  document.getElementById("diasReservados").textContent =
    pedidoData.dias || "22/10/2025 a 31/12/2025";

  document.getElementById("nomeUsuarioExterno").textContent =
    pedidoData.usuario || "Otávio Silva";
  document.getElementById("modeloCarro").textContent =
    pedidoData.modeloCarro || "Porsche 911";
  document.getElementById("corCarro").textContent =
    pedidoData.corCarro || "Preto";

  statusCondominio = true;
  updateStatusCondominio();
}

function setupEventListeners() {
  document
    .getElementById("consultarSindicoBtn")
    ?.addEventListener("click", () => {
      openModal("modalSindico");
    });

  document
    .getElementById("consultarUsuarioBtn")
    ?.addEventListener("click", () => {
      openModal("modalUsuario");
    });

  document
    .getElementById("consultarVeiculoBtn")
    ?.addEventListener("click", () => {
      openModal("modalVeiculo");
    });

  document
    .getElementById("bloquearSindicoBtn")
    ?.addEventListener("click", () => {
      showConfirmation(
        "Bloquear Síndico",
        "Tem certeza que deseja bloquear este síndico? Esta ação não poderá ser desfeita.",
        () => bloquearSindico()
      );
    });

  document
    .getElementById("bloquearUsuarioBtn")
    ?.addEventListener("click", () => {
      showConfirmation(
        "Bloquear Usuário",
        "Tem certeza que deseja bloquear este usuário externo?",
        () => bloquearUsuario()
      );
    });

  document.getElementById("concluirBtn")?.addEventListener("click", () => {
    showConfirmation(
      "Concluir Pedido",
      "Tem certeza que deseja concluir este pedido? Esta ação não poderá ser desfeita.",
      () => concluirPedido()
    );
  });

  document.getElementById("negarBtn")?.addEventListener("click", () => {
    showConfirmation(
      "Negar Pedido",
      "Tem certeza que deseja negar este pedido?",
      () => negarPedido()
    );
  });

  // Tema
  document
    .getElementById("themeToggle")
    ?.addEventListener("click", toggleTheme);

  // Menu
  const menuToggle = document.getElementById("menuToggle");
  const dropdownMenu = document.getElementById("dropdownMenu");

  menuToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu?.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (menuToggle && !menuToggle.contains(e.target)) {
      dropdownMenu?.classList.remove("active");
    }
  });

  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (link.textContent === "Dashboard") {
        window.location.href = "index.html";
      } else if (link.textContent === "Pedidos") {
        window.location.href = "sindico.html";
      }
    });
  });

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
  }
}

function showConfirmation(title, message, callback) {
  document.getElementById("confirmTitle").textContent = title;
  document.getElementById("confirmMessage").textContent = message;
  actionCallback = callback;

  const confirmBtn = document.getElementById("confirmBtn");
  confirmBtn.onclick = () => {
    if (actionCallback) {
      actionCallback();
    }
    closeModal("modalConfirmacao");
  };

  openModal("modalConfirmacao");
}

function bloquearSindico() {
  console.log("[v0] Síndico bloqueado!");
  alert("Síndico bloqueado com sucesso!");
  statusCondominio = false;
  updateStatusCondominio();
  disableFinalButtons();
}

function bloquearUsuario() {
  console.log("[v0] Usuário externo bloqueado!");
  alert("Usuário externo bloqueado com sucesso!");
  statusUsuario = false;
  updateStatusUsuario();
  disableFinalButtons();
}

// Atualizar status do condomínio
function updateStatusCondominio() {
  const statusElement = document.getElementById("statusCondominio");
  if (statusCondominio) {
    statusElement.textContent = "✓ Pedido Feito";
    statusElement.className = "status-value status-done";
  }
}

function checkApprovalStatus() {
  // Simular aprovação automática após 3 segundos (para demo)
  setTimeout(() => {
    statusUsuario = true;
    updateStatusUsuario();
    enableFinalButtons();
  }, 3000);
}

// Atualizar status do usuário externo
function updateStatusUsuario() {
  const statusElement = document.getElementById("statusUsuario");
  if (statusUsuario) {
    statusElement.textContent = "✓ Aprovado";
    statusElement.className = "status-value status-done";
  } else {
    statusElement.textContent = "⏳ Ainda não aprovado";
    statusElement.className = "status-value status-pending";
  }
}

function enableFinalButtons() {
  if (statusCondominio && statusUsuario) {
    document.getElementById("concluirBtn").disabled = false;
    document.getElementById("negarBtn").disabled = false;
    console.log("[v0] Ambas as solicitações aprovadas. Botões ativados!");
  }
}

function disableFinalButtons() {
  document.getElementById("concluirBtn").disabled = true;
  document.getElementById("negarBtn").disabled = true;
}

function concluirPedido() {
  console.log("[v0] Pedido concluído com sucesso!");
  alert("Pedido concluído com sucesso!");
  localStorage.removeItem("pedidoSelecionado");
  window.location.href = "sindico.html";
}

function negarPedido() {
  console.log("[v0] Pedido negado!");
  alert("Pedido negado!");
  localStorage.removeItem("pedidoSelecionado");
  window.location.href = "sindico.html";
}

// Inicializar tema
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
}

// Alternar tema
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}
