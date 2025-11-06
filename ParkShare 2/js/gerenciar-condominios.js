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

const condominios = [...mockCondominios];
let editingId = null;

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  setupEventListeners();
  renderCondominios();
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
    const filtered = mockCondominios.filter(
      (c) =>
        c.nome.toLowerCase().includes(searchTerm) ||
        c.local.toLowerCase().includes(searchTerm)
    );
    renderCondominios(filtered);
  });

  document
    .getElementById("cadastroCondominioForm")
    ?.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = document.getElementById("nomeCondominio").value;
      const local = document.getElementById("localCondominio").value;
      const vagas = Number.parseInt(
        document.getElementById("vagasDisponiveis").value
      );

      if (editingId) {
        const index = condominios.findIndex((c) => c.id === editingId);
        if (index > -1) {
          condominios[index] = {
            ...condominios[index],
            nome,
            local,
            vagas,
          };
          alert("Condomínio atualizado com sucesso!");
          editingId = null;
        }
      } else {
        const newCond = {
          id: Math.max(...condominios.map((c) => c.id), 0) + 1,
          nome,
          local,
          vagas,
          vagasOcupadas: 0,
        };
        condominios.push(newCond);
        alert("Condomínio cadastrado com sucesso!");
      }

      closeModal("cadastroCondominioModal");
      renderCondominios();
      document.getElementById("cadastroCondominioForm").reset();
    });
}

function renderCondominios(list = condominios) {
  const condominiosList = document.getElementById("condominiosList");

  if (list.length === 0) {
    condominiosList.innerHTML =
      '<p class="no-orders">Nenhum condomínio encontrado</p>';
    return;
  }

  condominiosList.innerHTML = list
    .map(
      (cond) => `
        <div class="condominio-item">
            <div class="condominio-info">
                <div class="condominio-nome">${cond.nome}</div>
                <div class="condominio-local">📍 ${cond.local}</div>
                <div class="condominio-vagas">🅿️ Vagas: ${cond.vagasOcupadas}/${cond.vagas} ocupadas</div>
            </div>
            <div class="condominio-actions">
                <button class="btn-editar" onclick="editarCondominio(${cond.id})">Editar</button>
                <button class="btn-remover" onclick="removerCondominio(${cond.id})">Deletar</button>
            </div>
        </div>
    `
    )
    .join("");
}

function editarCondominio(id) {
  editingId = id;
  const cond = condominios.find((c) => c.id === id);

  document.getElementById("modalTitle").textContent = "Editar Condomínio";
  document.getElementById("nomeCondominio").value = cond.nome;
  document.getElementById("localCondominio").value = cond.local;
  document.getElementById("vagasDisponiveis").value = cond.vagas;

  openModal("cadastroCondominioModal");
}

function removerCondominio(id) {
  if (confirm("Tem certeza que deseja deletar este condomínio?")) {
    const index = condominios.findIndex((c) => c.id === id);
    if (index > -1) {
      condominios.splice(index, 1);
      renderCondominios();
      alert("Condomínio deletado com sucesso!");
    }
  }
}

function openCadastroCondominioModal() {
  editingId = null;
  document.getElementById("modalTitle").textContent =
    "Cadastrar Novo Condomínio";
  document.getElementById("cadastroCondominioForm").reset();
  openModal("cadastroCondominioModal");
}

function openModal(modalId) {
  document.getElementById(modalId)?.classList.add("active");
}

function closeModal(modalId) {
  document.getElementById(modalId)?.classList.remove("active");
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
