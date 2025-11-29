// Variáveis que controlam o estado do pedido
let pedidoData = null; // Guarda os dados do pedido carregado
let statusCondominio = false; // Status se o condomínio aprovou
let statusUsuario = false; // Status se o usuário foi aprovado
let actionCallback = null; // Guarda qual ação será executada após confirmação

// Quando a página carrega
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadPedidoData();
  setupEventListeners();
  checkApprovalStatus();
});

// Carrega os dados do pedido da página anterior
function loadPedidoData() {
  const data = localStorage.getItem("pedidoSelecionado");

  // Se não tiver pedido, volta para a página de síndico
  if (!data) {
    alert("Nenhum pedido encontrado. Redirecionando...");
    window.location.href = "sindico.html";
    return;
  }

  // Converte de JSON para objeto
  pedidoData = JSON.parse(data);

  // Preenche as informações na tela
  document.getElementById("codigoPedido").textContent = pedidoData.codigo;
  document.getElementById("nomeCondominio").textContent = pedidoData.condominio;
  document.getElementById("localVaga").textContent =
    pedidoData.localVaga || "10, Pátio 3";
  document.getElementById("horarioAluguel").textContent =
    pedidoData.horario || "09:00 - 12:00";
  document.getElementById("diasReservados").textContent =
    pedidoData.dias || "22/10/2025 a 31/12/2025";

  document.getElementById("nomeUsuarioExterno").textContent =
    pedidoData.usuario;
  document.getElementById("modeloCarro").textContent =
    pedidoData.modeloCarro || "Porsche 911";
  document.getElementById("corCarro").textContent =
    pedidoData.corCarro || "Preto";

  // Condomínio já inicia como aprovado
  statusCondominio = true;
  updateStatusCondominio();
}

// Configura todos os botões da página
function setupEventListeners() {
  // Abrir modais de consulta
  document
    .getElementById("consultarSindicoBtn")
    ?.addEventListener("click", () => openModal("modalSindico"));
  document
    .getElementById("consultarUsuarioBtn")
    ?.addEventListener("click", () => openModal("modalUsuario"));
  document
    .getElementById("consultarVeiculoBtn")
    ?.addEventListener("click", () => openModal("modalVeiculo"));

  // Ações com modal de confirmação
  document
    .getElementById("bloquearSindicoBtn")
    ?.addEventListener("click", () => {
      showConfirmation(
        "Bloquear Síndico",
        "Tem certeza que deseja bloquear este síndico?",
        bloquearSindico
      );
    });

  document
    .getElementById("bloquearUsuarioBtn")
    ?.addEventListener("click", () => {
      showConfirmation(
        "Bloquear Usuário",
        "Tem certeza que deseja bloquear este usuário externo?",
        bloquearUsuario
      );
    });

  // Botões de concluir ou negar o pedido
  document.getElementById("concluirBtn")?.addEventListener("click", () => {
    showConfirmation(
      "Concluir Pedido",
      "Deseja concluir este pedido?",
      concluirPedido
    );
  });

  document.getElementById("negarBtn")?.addEventListener("click", () => {
    showConfirmation("Negar Pedido", "Deseja negar este pedido?", negarPedido);
  });

  // Alternar tema claro/escuro
  document
    .getElementById("themeToggle")
    ?.addEventListener("click", toggleTheme);

  // Menu mobile
  const menuToggle = document.getElementById("menuToggle");
  const dropdownMenu = document.getElementById("dropdownMenu");

  menuToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu?.classList.toggle("active");
  });

  // Fecha o menu ao clicar fora
  document.addEventListener("click", (e) => {
    if (menuToggle && !menuToggle.contains(e.target)) {
      dropdownMenu?.classList.remove("active");
    }
  });

  // Navegação
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (link.textContent === "Dashboard") window.location.href = "index.html";
      if (link.textContent === "Pedidos") window.location.href = "sindico.html";
    });
  });

  // Fecha modais ao clicar fora deles
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal(modal.id);
    });
  });
}

// Abre um modal
function openModal(modalId) {
  document.getElementById(modalId)?.classList.add("active");
}

// Fecha um modal
function closeModal(modalId) {
  document.getElementById(modalId)?.classList.remove("active");
}

// Modal de confirmação genérico
function showConfirmation(title, message, callback) {
  document.getElementById("confirmTitle").textContent = title;
  document.getElementById("confirmMessage").textContent = message;

  actionCallback = callback; // Guarda ação

  document.getElementById("confirmBtn").onclick = () => {
    actionCallback();
    closeModal("modalConfirmacao");
  };

  openModal("modalConfirmacao");
}

// Bloqueia o síndico (mock)
function bloquearSindico() {
  alert("Síndico bloqueado!");
  statusCondominio = false;
  updateStatusCondominio();
  disableFinalButtons();
}

// Bloqueia o usuário (mock)
function bloquearUsuario() {
  alert("Usuário bloqueado!");
  statusUsuario = false;
  updateStatusUsuario();
  disableFinalButtons();
}

// Atualiza status visual do condomínio
function updateStatusCondominio() {
  const el = document.getElementById("statusCondominio");
  if (statusCondominio) {
    el.textContent = "✓ Pedido Feito";
    el.className = "status-value status-done";
  }
}

// Simula aprovação automática do usuário após 3s
function checkApprovalStatus() {
  setTimeout(() => {
    statusUsuario = true;
    updateStatusUsuario();
    enableFinalButtons();
  }, 3000);
}

// Atualiza status visual do usuário
function updateStatusUsuario() {
  const el = document.getElementById("statusUsuario");
  if (statusUsuario) {
    el.textContent = "✓ Aprovado";
    el.className = "status-value status-done";
  } else {
    el.textContent = "⏳ Ainda não aprovado";
    el.className = "status-value status-pending";
  }
}

// Habilita botões de Concluir / Negar
function enableFinalButtons() {
  if (statusCondominio && statusUsuario) {
    document.getElementById("concluirBtn").disabled = false;
    document.getElementById("negarBtn").disabled = false;
  }
}

// Desabilita botões finais
function disableFinalButtons() {
  document.getElementById("concluirBtn").disabled = true;
  document.getElementById("negarBtn").disabled = true;
}

// Concluir pedido (mock)
function concluirPedido() {
  alert("Pedido concluído!");
  localStorage.removeItem("pedidoSelecionado");
  window.location.href = "sindico.html";
}

// Negar pedido (mock)
function negarPedido() {
  alert("Pedido negado!");
  localStorage.removeItem("pedidoSelecionado");
  window.location.href = "sindico.html";
}

// Tema: inicializa com o último salvo
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
}

// Alterna entre modo claro e escuro
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}
