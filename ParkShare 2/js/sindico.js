// Mock data para pedidos
const mockOrders = [
  {
    id: 1,
    codigo: "#PED001",
    condominio: "José dos Santos",
    usuario: "Otávio Silva",
    status: "pendentes",
    data: "2025-01-15",
  },
  {
    id: 2,
    codigo: "#PED002",
    condominio: "Maria Santos",
    usuario: "Ana Costa",
    status: "pendentes",
    data: "2025-01-14",
  },
  {
    id: 3,
    codigo: "#PED003",
    condominio: "São Miguel",
    usuario: "Carlos Lima",
    status: "concluidos",
    data: "2025-01-13",
  },
  {
    id: 4,
    codigo: "#PED004",
    condominio: "Itaquera",
    usuario: "João Paulo",
    status: "cancelados",
    data: "2025-01-12",
  },
];

const mockCondominios = [
  {
    id: 1,
    nome: "José dos Santos",
    local: "Av. Paulista, 1000 - São Paulo",
    vagas: 50,
    vagasOcupadas: 35,
  },
  {
    id: 2,
    nome: "Maria Santos",
    local: "Rua Oscar Freire, 500 - São Paulo",
    vagas: 30,
    vagasOcupadas: 22,
  },
  {
    id: 3,
    nome: "São Miguel",
    local: "Av. Radial Leste, 579 - São Miguel",
    vagas: 80,
    vagasOcupadas: 45,
  },
  {
    id: 4,
    nome: "Itaquera",
    local: "Estrada da Congregação, 100 - Itaquera",
    vagas: 60,
    vagasOcupadas: 38,
  },
];

const mockUsuarios = [
  {
    id: 1,
    nome: "Otávio Silva",
    email: "otavio.silva@email.com",
    vaga: "José dos Santos - Vaga 10",
    dataAluguel: "2025-01-15",
    status: "ativo",
  },
  {
    id: 2,
    nome: "Ana Costa",
    email: "ana.costa@email.com",
    vaga: "Maria Santos - Vaga 5",
    dataAluguel: "2025-01-10",
    status: "ativo",
  },
  {
    id: 3,
    nome: "Carlos Lima",
    email: "carlos.lima@email.com",
    vaga: "São Miguel - Vaga 25",
    dataAluguel: "2025-01-05",
    status: "inativo",
  },
  {
    id: 4,
    nome: "João Paulo",
    email: "joao.paulo@email.com",
    vaga: "Itaquera - Vaga 40",
    dataAluguel: "2024-12-20",
    status: "ativo",
  },
];

let currentFilter = "all";
let orders = [...mockOrders];

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  setupEventListeners();
  renderOrders();
});

function setupEventListeners() {
  // Filtros da sidebar
  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document
        .querySelectorAll("[data-filter]")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      updatePageTitle();
      renderOrders();
    });
  });

  // Ações da sidebar
  document.querySelectorAll("[data-action]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const action = btn.dataset.action;
      if (action === "gerenciar-vagas") {
        // Manter na mesma página quando clicar em Gerenciar Vagas
        //alert("Gerenciador de Vagas - Em desenvolvimento");
      }
    });
  });

  // Busca
  document.getElementById("searchInput")?.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    orders = mockOrders.filter(
      (order) =>
        order.codigo.toLowerCase().includes(searchTerm) ||
        order.condominio.toLowerCase().includes(searchTerm) ||
        order.usuario.toLowerCase().includes(searchTerm)
    );
    renderOrders();
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
    dropdownMenu.classList.toggle("active");
  });
}

function updatePageTitle() {
  const titles = {
    all: "Todos os Pedidos",
    pendentes: "Pedidos Pendentes",
    cancelados: "Pedidos Cancelados",
    concluidos: "Pedidos Concluídos",
  };
  document.getElementById("pageTitle").textContent =
    titles[currentFilter] || "Todos os Pedidos";
}

function renderOrders() {
  const ordersList = document.getElementById("ordersList");
  let filteredOrders = orders;

  if (currentFilter !== "all") {
    filteredOrders = orders.filter((order) => order.status === currentFilter);
  }

  if (filteredOrders.length === 0) {
    ordersList.innerHTML = '<p class="no-orders">Nenhum pedido encontrado</p>';
    return;
  }

  ordersList.innerHTML = filteredOrders
    .map(
      (order) => `
        <div class="order-item">
            <div class="order-info">
                <span class="order-code">${order.codigo}</span>
                <div class="order-names">
                    <div class="order-name-item">
                        <span>🏢 Condomínio:</span>
                        <strong>${order.condominio}</strong>
                    </div>
                    <div class="order-name-item">
                        <span>👤 Usuário:</span>
                        <strong>${order.usuario}</strong>
                    </div>
                </div>
            </div>
            <div class="order-status ${order.status}">${getStatusLabel(
        order.status
      )}</div>
            <div class="order-actions">
                <button class="btn-action-item primary" onclick="goToConfirmacao(${
                  order.id
                })">
                    Visualizar
                </button>
                <button class="btn-action-item secondary">
                    Mais ações
                </button>
            </div>
        </div>
    `
    )
    .join("");
}

function getStatusLabel(status) {
  const labels = {
    pendentes: "⏳ Pendente",
    cancelados: "❌ Cancelado",
    concluidos: "✅ Concluído",
  };
  return labels[status] || status;
}

function goToConfirmacao(orderId) {
  const order = mockOrders.find((o) => o.id === orderId);
  localStorage.setItem("pedidoSelecionado", JSON.stringify(order));
  window.location.href = "confirmacao-sindico.html";
}

// Tema
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

function editarCondominio(id) {
  const cond = mockCondominios.find((c) => c.id === id);
  alert(`Editando condomínio: ${cond.nome}`);
}

function removerCondominio(id) {
  if (confirm("Tem certeza que deseja remover este condomínio?")) {
    const index = mockCondominios.findIndex((c) => c.id === id);
    if (index > -1) {
      mockCondominios.splice(index, 1);
      alert("Condomínio removido com sucesso!");
    }
  }
}

function consultarUsuario(id) {
  const user = mockUsuarios.find((u) => u.id === id);
  alert(
    `Consultando usuário: ${user.nome}\nEmail: ${user.email}\nVaga: ${user.vaga}`
  );
}

function bloquearUsuario(id) {
  if (confirm("Tem certeza que deseja bloquear este usuário?")) {
    const user = mockUsuarios.find((u) => u.id === id);
    user.status = user.status === "ativo" ? "inativo" : "ativo";
    alert(
      `Usuário ${
        user.status === "ativo" ? "desbloqueado" : "bloqueado"
      } com sucesso!`
    );
  }
}
