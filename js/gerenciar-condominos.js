const mockCondominios = [
  {
    id: 1,
    nome: "José dos Santos",
    cpf: "123.456.789-10",
    email: "jose@email.com",
    telefone: "(11) 98765-4321",
    numeroVaga: 101,
  },
  {
    id: 2,
    nome: "Maria Santos",
    cpf: "234.567.890-21",
    email: "maria@email.com",
    telefone: "(11) 97654-3210",
    numeroVaga: 102,
  },
  {
    id: 3,
    nome: "Carlos Silva",
    cpf: "345.678.901-32",
    email: "carlos@email.com",
    telefone: "(11) 96543-2109",
    numeroVaga: 103,
  },
  {
    id: 4,
    nome: "Ana Paula Oliveira",
    cpf: "456.789.012-43",
    email: "ana@email.com",
    telefone: "(11) 95432-1098",
    numeroVaga: 104,
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
        c.nome.toLowerCase().includes(searchTerm) || c.cpf.includes(searchTerm)
    );
    renderCondominios(filtered);
  });

  document
    .getElementById("cadastroCondominioForm")
    ?.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = document.getElementById("nomeCondominio").value;
      const cpf = document.getElementById("cpfCondominio").value;
      const email = document.getElementById("emailCondominio").value;
      const telefone = document.getElementById("telefoneCondominio").value;
      const numeroVaga = Number(document.getElementById("numeroVagaCondominio").value);

      if (editingId) {
        const index = condominios.findIndex((c) => c.id === editingId);
        if (index > -1) {
          condominios[index] = {
            ...condominios[index],
            nome,
            cpf,
            email,
            telefone,
            numeroVaga,
          };
          alert("Condômino atualizado com sucesso!");
          editingId = null;
        }
      } else {
        const newCond = {
          id: Math.max(...condominios.map((c) => c.id), 0) + 1,
          nome,
          cpf,
          email,
          telefone,
          numeroVaga,
        };
        condominios.push(newCond);
        alert("Condômino cadastrado com sucesso!");
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
      '<p class="no-orders">Nenhum condômino encontrado</p>';
    return;
  }

  condominiosList.innerHTML = list
    .map(
      (cond) => `
        <div class="condominio-item">
            <div class="condominio-info">
                <div class="condominio-nome">${cond.nome}</div>
                <div class="condominio-local">📱 ${cond.telefone} | 📧 ${cond.email}</div>
                <div class="condominio-local">🆔 CPF: ${cond.cpf}</div>
                <div class="condominio-local">🅿️ Vaga: ${cond.numeroVaga}</div>
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

  document.getElementById("modalTitle").textContent = "Editar Condômino";
  document.getElementById("nomeCondominio").value = cond.nome;
  document.getElementById("cpfCondominio").value = cond.cpf;
  document.getElementById("emailCondominio").value = cond.email;
  document.getElementById("telefoneCondominio").value = cond.telefone;
  document.getElementById("numeroVagaCondominio").value = cond.numeroVaga;

  openModal("cadastroCondominioModal");
}

function removerCondominio(id) {
  if (confirm("Tem certeza que deseja deletar este condômino?")) {
    const index = condominios.findIndex((c) => c.id === id);
    if (index > -1) {
      condominios.splice(index, 1);
      renderCondominios();
      alert("Condômino deletado com sucesso!");
    }
  }
}

function openCadastroCondominioModal() {
  editingId = null;
  document.getElementById("modalTitle").textContent =
    "Cadastrar Novo Condômino";
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
