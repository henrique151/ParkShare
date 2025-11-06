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
  {
    id: 5,
    nome: "João Paulo",
    email: "joao.paulo@email.com",
    vaga: "Itaquera - Vaga 40",
    dataAluguel: "2024-12-20",
    status: "ativo",
  },
  {
    id: 6,
    nome: "João Paulo",
    email: "joao.paulo@email.com",
    vaga: "Itaquera - Vaga 40",
    dataAluguel: "2024-12-20",
    status: "ativo",
  },
  {
    id: 7,
    nome: "João Paulo",
    email: "joao.paulo@email.com",
    vaga: "Itaquera - Vaga 40",
    dataAluguel: "2024-12-20",
    status: "ativo",
  },
];

const usuarios = [...mockUsuarios];

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  setupEventListeners();
  renderUsuarios();
});

function setupEventListeners() {
  document
    .getElementById("themeToggle")
    ?.addEventListener("click", toggleTheme);

  const menuToggle = document.getElementById("menuToggle");
  const dropdownMenu = document.getElementById("dropdownMenu");
  menuToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("active");
  });

  document.getElementById("searchInput")?.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = mockUsuarios.filter(
      (u) =>
        u.nome.toLowerCase().includes(searchTerm) ||
        u.email.toLowerCase().includes(searchTerm)
    );
    renderUsuarios(filtered);
  });
}

function renderUsuarios(list = usuarios) {
  const usuariosList = document.getElementById("usuariosList");

  if (list.length === 0) {
    usuariosList.innerHTML =
      '<p class="no-orders">Nenhum usuário encontrado</p>';
    return;
  }

  usuariosList.innerHTML = list
    .map(
      (user) => `
        <div class="usuario-item">
            <div class="usuario-info">
                <div class="usuario-nome">👤 ${user.nome}</div>
                <div class="usuario-email">📧 ${user.email}</div>
                <div class="usuario-vaga">🅿️ ${user.vaga}</div>
                <div class="usuario-vaga">📅 Alugada desde: ${
                  user.dataAluguel
                }</div>
                <div class="usuario-vaga">Status: <strong>${
                  user.status === "ativo" ? "✅ Ativo" : "❌ Bloqueado"
                }</strong></div>
            </div>
            <div class="usuario-actions">
                <button class="btn-editar" onclick="consultarUsuario(${
                  user.id
                })">Consultar</button>
                <button class="btn-remover" onclick="bloquearUsuario(${
                  user.id
                })">${
        user.status === "ativo" ? "Bloquear" : "Desbloquear"
      }</button>
            </div>
        </div>
    `
    )
    .join("");
}

function consultarUsuario(id) {
  const user = usuarios.find((u) => u.id === id);
  alert(
    `Consultando usuário:\n\nNome: ${user.nome}\nEmail: ${user.email}\nVaga: ${
      user.vaga
    }\nAlugada desde: ${user.dataAluguel}\nStatus: ${
      user.status === "ativo" ? "Ativo" : "Bloqueado"
    }`
  );
}

function bloquearUsuario(id) {
  const user = usuarios.find((u) => u.id === id);
  const acao = user.status === "ativo" ? "bloquear" : "desbloquear";

  if (confirm(`Tem certeza que deseja ${acao} este usuário?`)) {
    user.status = user.status === "ativo" ? "inativo" : "ativo";
    renderUsuarios();
    alert(
      `Usuário ${
        user.status === "ativo" ? "desbloqueado" : "bloqueado"
      } com sucesso!`
    );
  }
}

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
