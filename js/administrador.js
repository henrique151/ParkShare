// Dados de exemplo
const pedidosSindicosData = [
  {
    id: 1,
    sindicoNome: "João Pedro Silva",
    edificioNome: "Edifício Solar das Flores",
    edificioEndereco: "Rua das Palmeiras, 123 - Centro",
    edificioCodigo: "EDF-001",
    telefone: "(11) 98765-4321",
    email: "joao.pedro@email.com",
    dataPedido: "15/01/2025",
    status: "pendente",
  },
  {
    id: 2,
    sindicoNome: "Maria Santos Costa",
    edificioNome: "Residencial Bela Vista",
    edificioEndereco: "Av. Principal, 456 - Jardim América",
    edificioCodigo: "EDF-002",
    telefone: "(11) 91234-5678",
    email: "maria.santos@email.com",
    dataPedido: "18/01/2025",
    status: "pendente",
  },
];

const edificiosData = [
  {
    id: 1,
    codigo: "EDF-001",
    nome: "Edifício Solar das Flores",
    responsavel: "João Pedro Silva",
    vagas: 50,
  },
  {
    id: 2,
    codigo: "EDF-002",
    nome: "Residencial Bela Vista",
    responsavel: "Maria Santos Costa",
    vagas: 30,
  },
  {
    id: 3,
    codigo: "EDF-003",
    nome: "Condomínio Parque Verde",
    responsavel: "Carlos Alberto",
    vagas: 40,
  },
];

const sindicosData = [
  {
    id: 1,
    nome: "João Pedro Silva",
    edificio: "Edifício Solar das Flores",
    telefone: "(11) 98765-4321",
  },
  {
    id: 2,
    nome: "Maria Santos Costa",
    edificio: "Residencial Bela Vista",
    telefone: "(11) 91234-5678",
  },
  {
    id: 3,
    nome: "Carlos Alberto",
    edificio: "Condomínio Parque Verde",
    telefone: "(11) 97654-3210",
  },
];

const usuariosData = [
  {
    id: 1,
    nome: "Otávio Silva",
    email: "otavio@email.com",
    telefone: "(11) 99999-8888",
    veiculos: 1,
  },
  {
    id: 2,
    nome: "Ana Paula",
    email: "ana@email.com",
    telefone: "(11) 98888-7777",
    veiculos: 2,
  },
  {
    id: 3,
    nome: "Roberto Lima",
    email: "roberto@email.com",
    telefone: "(11) 97777-6666",
    veiculos: 1,
  },
];

const vagasData = [
  {
    id: 1,
    codigo: "VAGA-001",
    edificio: "Edifício Solar das Flores",
    localizacao: "10, Pátio 3",
    status: "Disponível",
  },
  {
    id: 2,
    codigo: "VAGA-002",
    edificio: "Residencial Bela Vista",
    localizacao: "5, Pátio 1",
    status: "Ocupada",
  },
  {
    id: 3,
    codigo: "VAGA-003",
    edificio: "Condomínio Parque Verde",
    localizacao: "8, Pátio 2",
    status: "Manutenção",
  },
];

const veiculosData = [
  {
    id: 1,
    placa: "ABC-1234",
    modelo: "Porsche 911",
    cor: "Vermelho",
    proprietario: "Otávio Silva",
  },
  {
    id: 2,
    placa: "DEF-5678",
    modelo: "Honda Civic",
    cor: "Preto",
    proprietario: "Ana Paula",
  },
  {
    id: 3,
    placa: "GHI-9012",
    modelo: "Toyota Corolla",
    cor: "Branco",
    proprietario: "Roberto Lima",
  },
];

const chatsData = [
  {
    id: 1,
    usuario1: "João Pedro Silva",
    usuario2: "Otávio Silva",
    ultimaMensagem: "Ótimo! Obrigado.",
    data: "20/01/2025",
  },
  {
    id: 2,
    usuario1: "Maria Santos Costa",
    usuario2: "Ana Paula",
    ultimaMensagem: "A vaga está disponível.",
    data: "19/01/2025",
  },
  {
    id: 3,
    usuario1: "Carlos Alberto",
    usuario2: "Roberto Lima",
    ultimaMensagem: "Confirmo o horário.",
    data: "18/01/2025",
  },
];

const denunciasData = [
  {
    id: 1,
    denunciante: "Otávio Silva",
    denunciado: "João Pedro Silva",
    motivo: "Cancelamento injustificado",
    data: "21/01/2025",
  },
  {
    id: 2,
    denunciante: "Ana Paula",
    denunciado: "Maria Santos Costa",
    motivo: "Vaga ocupada indevidamente",
    data: "20/01/2025",
  },
];

const condominosData = [
  {
    id: 1,
    nome: "Roberto Almeida",
    edificio: "Edifício Solar das Flores",
    apartamento: "101",
    telefone: "(11) 99876-5432",
    email: "roberto.almeida@email.com",
  },
  {
    id: 2,
    nome: "Juliana Costa",
    edificio: "Residencial Bela Vista",
    apartamento: "205",
    telefone: "(11) 98765-1234",
    email: "juliana.costa@email.com",
  },
  {
    id: 3,
    nome: "Fernando Santos",
    edificio: "Condomínio Parque Verde",
    apartamento: "308",
    telefone: "(11) 97654-9876",
    email: "fernando.santos@email.com",
  },
  {
    id: 4,
    nome: "Patricia Oliveira",
    edificio: "Edifício Solar das Flores",
    apartamento: "502",
    telefone: "(11) 96543-8765",
    email: "patricia.oliveira@email.com",
  },
];

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  loadPedidosSindicos();
  setupThemeToggle();
  setupSearches();
});

// Setup navegação entre seções
function setupNavigation() {
  const navButtons = document.querySelectorAll(".nav-btn");

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const sectionId = button.getAttribute("data-section");

      // Atualizar botões ativos
      navButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Atualizar seções ativas
      document.querySelectorAll(".content-section").forEach((section) => {
        section.classList.remove("active");
      });
      document.getElementById(sectionId).classList.add("active");

      // Carregar dados da seção
      loadSectionData(sectionId);
    });
  });
}

// Carregar dados da seção
function loadSectionData(sectionId) {
  switch (sectionId) {
    case "pedidos-sindicos":
      loadPedidosSindicos();
      break;
    case "gerenciar-edificios":
      loadEdificios();
      break;
    case "gerenciar-sindicos":
      loadSindicos();
      break;
    case "gerenciar-condominos":
      loadCondominos();
      break;
    case "gerenciar-usuarios":
      loadUsuarios();
      break;
    case "gerenciar-vagas":
      loadVagas();
      break;
    case "gerenciar-veiculos":
      loadVeiculos();
      break;
    case "gerenciar-chats":
      loadChats();
      break;
    case "pedidos-denuncia":
      loadDenuncias();
      break;
  }
}

// Carregar pedidos de síndicos
function loadPedidosSindicos() {
  const grid = document.getElementById("pedidosSindicosGrid");
  grid.innerHTML = "";

  pedidosSindicosData.forEach((pedido) => {
    const card = document.createElement("div");
    card.className = "pedido-card";
    card.innerHTML = `
      <div class="pedido-header">
        <span class="pedido-id">ID: ${pedido.id}</span>
        <span class="pedido-status ${pedido.status}">${pedido.status}</span>
      </div>
      <div class="pedido-info-row">
        <span class="pedido-info-label">Síndico</span>
        <span class="pedido-info-value">${pedido.sindicoNome}</span>
      </div>
      <div class="pedido-info-row">
        <span class="pedido-info-label">Edifício</span>
        <span class="pedido-info-value">${pedido.edificioNome}</span>
      </div>
      <div class="pedido-info-row">
        <span class="pedido-info-label">Data do Pedido</span>
        <span class="pedido-info-value">${pedido.dataPedido}</span>
      </div>
      <div class="pedido-actions">
        <button class="btn-consultar" onclick="consultarPedidoSindico(${pedido.id})">
          🔍 Consultar Informações
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Consultar pedido de síndico
function consultarPedidoSindico(id) {
  const pedido = pedidosSindicosData.find((p) => p.id === id);
  if (!pedido) return;

  const modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = `
    <div class="modal-info-section">
      <h4>🧑 Informações do Síndico</h4>
      <div class="modal-info-row">
        <span class="modal-info-label">Nome</span>
        <span class="modal-info-value">${pedido.sindicoNome}</span>
      </div>
      <div class="modal-info-row">
        <span class="modal-info-label">Telefone</span>
        <span class="modal-info-value">${pedido.telefone}</span>
      </div>
      <div class="modal-info-row">
        <span class="modal-info-label">E-mail</span>
        <span class="modal-info-value">${pedido.email}</span>
      </div>
    </div>
    
    <div class="modal-info-section">
      <h4>🏢 Informações do Edifício</h4>
      <div class="modal-info-row">
        <span class="modal-info-label">Nome</span>
        <span class="modal-info-value">${pedido.edificioNome}</span>
      </div>
      <div class="modal-info-row">
        <span class="modal-info-label">Código</span>
        <span class="modal-info-value">${pedido.edificioCodigo}</span>
      </div>
      <div class="modal-info-row">
        <span class="modal-info-label">Endereço</span>
        <span class="modal-info-value">${pedido.edificioEndereco}</span>
      </div>
      <div class="modal-info-row">
        <span class="modal-info-label">Data do Pedido</span>
        <span class="modal-info-value">${pedido.dataPedido}</span>
      </div>
    </div>
    
    <div class="modal-actions">
      <button class="btn-liberar" onclick="liberarSindico(${id})">
        ✅ Liberar Síndico
      </button>
      <button class="btn-rejeitar" onclick="rejeitarSindico(${id})">
        ❌ Rejeitar Pedido
      </button>
    </div>
  `;

  document.getElementById("modalTitle").textContent =
    "Detalhes do Pedido de Síndico";
  openModal();
}

// Liberar síndico
function liberarSindico(id) {
  alert(`Síndico ID ${id} foi liberado para cadastrar o edifício no sistema!`);
  closeModal();
  // Aqui você faria a chamada para a API
}

// Rejeitar síndico
function rejeitarSindico(id) {
  alert(`Pedido do síndico ID ${id} foi rejeitado.`);
  closeModal();
  // Aqui você faria a chamada para a API
}

// Carregar edifícios
function loadEdificios() {
  const list = document.getElementById("edificiosList");
  list.innerHTML = "";

  edificiosData.forEach((edificio) => {
    const card = createItemCard(
      edificio.id,
      edificio.codigo,
      edificio.nome,
      `Responsável: ${edificio.responsavel} | Vagas: ${edificio.vagas}`,
      "edificio"
    );
    list.appendChild(card);
  });
}

// Carregar síndicos
function loadSindicos() {
  const list = document.getElementById("sindicosList");
  list.innerHTML = "";

  sindicosData.forEach((sindico) => {
    const card = createItemCard(
      sindico.id,
      `ID: ${sindico.id}`,
      sindico.nome,
      `Edifício: ${sindico.edificio}`,
      "sindico"
    );
    list.appendChild(card);
  });
}

// Carregar condôminos
function loadCondominos() {
  const list = document.getElementById("condominosList");
  list.innerHTML = "";

  condominosData.forEach((condomino) => {
    const card = createItemCard(
      condomino.id,
      `ID: ${condomino.id}`,
      condomino.nome,
      `Edifício: ${condomino.edificio} | Apt: ${condomino.apartamento}`,
      "condomino"
    );
    list.appendChild(card);
  });
}

// Carregar usuários
function loadUsuarios() {
  const list = document.getElementById("usuariosList");
  list.innerHTML = "";

  usuariosData.forEach((usuario) => {
    const card = createItemCard(
      usuario.id,
      `ID: ${usuario.id}`,
      usuario.nome,
      `E-mail: ${usuario.email} | Veículos: ${usuario.veiculos}`,
      "usuario"
    );
    list.appendChild(card);
  });
}

// Carregar vagas
function loadVagas() {
  const list = document.getElementById("vagasList");
  list.innerHTML = "";

  vagasData.forEach((vaga) => {
    const card = createItemCard(
      vaga.id,
      vaga.codigo,
      vaga.localizacao,
      `Edifício: ${vaga.edificio} | Status: ${vaga.status}`,
      "vaga"
    );
    list.appendChild(card);
  });
}

// Carregar veículos
function loadVeiculos() {
  const list = document.getElementById("veiculosList");
  list.innerHTML = "";

  veiculosData.forEach((veiculo) => {
    const card = createItemCard(
      veiculo.id,
      veiculo.placa,
      `${veiculo.modelo} - ${veiculo.cor}`,
      `Proprietário: ${veiculo.proprietario}`,
      "veiculo"
    );
    list.appendChild(card);
  });
}

// Carregar chats
function loadChats() {
  const list = document.getElementById("chatsList");
  list.innerHTML = "";

  chatsData.forEach((chat) => {
    const card = createItemCard(
      chat.id,
      `ID: ${chat.id}`,
      `${chat.usuario1} ↔ ${chat.usuario2}`,
      `Última msg: "${chat.ultimaMensagem}" | ${chat.data}`,
      "chat"
    );
    list.appendChild(card);
  });
}

// Carregar denúncias
function loadDenuncias() {
  const list = document.getElementById("denunciasList");
  list.innerHTML = "";

  denunciasData.forEach((denuncia) => {
    const card = createItemCard(
      denuncia.id,
      `ID: ${denuncia.id}`,
      `${denuncia.denunciante} → ${denuncia.denunciado}`,
      `Motivo: ${denuncia.motivo} | Data: ${denuncia.data}`,
      "denuncia"
    );
    list.appendChild(card);
  });
}

// Criar card genérico
function createItemCard(id, codigo, nome, extra, tipo) {
  const card = document.createElement("div");
  card.className = "item-card";
  card.innerHTML = `
    <div class="item-info">
      <span class="item-id">${codigo}</span>
      <div class="item-details">
        <span class="item-name">${nome}</span>
        <span class="item-extra">${extra}</span>
      </div>
    </div>
    <div class="item-actions">
      <button class="btn-consultar-small" onclick="consultarItem(${id}, '${tipo}')">
        🔍 Consultar
      </button>
      ${
        tipo !== "denuncia" && tipo !== "chat"
          ? `
        <button class="btn-editar" onclick="editarItem(${id}, '${tipo}')">
          ✏️ Editar
        </button>
      `
          : ""
      }
      <button class="btn-excluir" onclick="excluirItem(${id}, '${tipo}')">
        🗑️ Excluir
      </button>
      ${
        tipo === "sindico" || tipo === "usuario" || tipo === "condomino"
          ? `
        <button class="btn-bloquear" onclick="bloquearItem(${id}, '${tipo}')">
          🚫 Bloquear
        </button>
      `
          : ""
      }
    </div>
  `;
  return card;
}

// Consultar item
function consultarItem(id, tipo) {
  let item, data;

  switch (tipo) {
    case "edificio":
      item = edificiosData.find((e) => e.id === id);
      data = `
        <div class="modal-info-section">
          <h4>🏢 Informações do Edifício</h4>
          <div class="modal-info-row">
            <span class="modal-info-label">Código</span>
            <span class="modal-info-value">${item.codigo}</span>
          </div>
          <div class="modal-info-row">
            <span class="modal-info-label">Nome</span>
            <span class="modal-info-value">${item.nome}</span>
          </div>
          <div class="modal-info-row">
            <span class="modal-info-label">Responsável</span>
            <span class="modal-info-value">${item.responsavel}</span>
          </div>
          <div class="modal-info-row">
            <span class="modal-info-label">Total de Vagas</span>
            <span class="modal-info-value">${item.vagas}</span>
          </div>
        </div>
      `;
      break;
    case "sindico":
      item = sindicosData.find((s) => s.id === id);
      data = `
        <div class="modal-info-section">
          <h4>🧑 Informações do Síndico</h4>
          <div class="modal-info-row">
            <span class="modal-info-label">ID</span>
            <span class="modal-info-value">${item.id}</span>
          </div>
          <div class="modal-info-row">
            <span class="modal-info-label">Nome</span>
            <span class="modal-info-value">${item.nome}</span>
          </div>
          <div class="modal-info-row">
            <span class="modal-info-label">Edifício</span>
            <span class="modal-info-value">${item.edificio}</span>
          </div>
          <div class="modal-info-row">
            <span class="modal-info-label">Telefone</span>
            <span class="modal-info-value">${item.telefone}</span>
          </div>
        </div>
      `;
      break;
    case "condomino":
      item = condominosData.find((c) => c.id === id);
      data = `
        <div class="modal-info-section">
          <h4>🏘️ Informações do Condômino</h4>
          <div class="modal-info-row">
            <span class="modal-info-label">ID</span>
            <span class="modal-info-value">${item.id}</span>
          </div>
          <div class="modal-info-row">
            <span class="modal-info-label">Nome</span>
            <span class="modal-info-value">${item.nome}</span>
          </div>
          <div class="modal-info-row">
            <span class="modal-info-label">Edifício</span>
            <span class="modal-info-value">${item.edificio}</span>
          </div>
          <div class="modal-info-row">
            <span class="modal-info-label">Apartamento</span>
            <span class="modal-info-value">${item.apartamento}</span>
          </div>
          <div class="modal-info-row">
            <span class="modal-info-label">Telefone</span>
            <span class="modal-info-value">${item.telefone}</span>
          </div>
          <div class="modal-info-row">
            <span class="modal-info-label">E-mail</span>
            <span class="modal-info-value">${item.email}</span>
          </div>
        </div>
      `;
      break;
    default:
      data = "<p>Informações não disponíveis.</p>";
  }

  document.getElementById("modalTitle").textContent = `Detalhes - ${
    tipo.charAt(0).toUpperCase() + tipo.slice(1)
  }`;
  document.getElementById("modalBody").innerHTML = data;
  openModal();
}

// Editar item
function editarItem(id, tipo) {
  alert(`Editar ${tipo} ID ${id}`);
}

// Excluir item
function excluirItem(id, tipo) {
  if (confirm(`Deseja realmente excluir este ${tipo}?`)) {
    alert(`${tipo} ID ${id} excluído!`);
  }
}

// Bloquear item
function bloquearItem(id, tipo) {
  if (confirm(`Deseja bloquear este ${tipo}?`)) {
    alert(`${tipo} ID ${id} bloqueado!`);
  }
}

// Modal functions
function openModal() {
  document.getElementById("detailsModal").classList.add("active");
}

function closeModal() {
  document.getElementById("detailsModal").classList.remove("active");
}

// Setup buscas
function setupSearches() {
  setupSearch("searchEdificios", "edificiosList");
  setupSearch("searchSindicos", "sindicosList");
  setupSearch("searchCondominos", "condominosList");
  setupSearch("searchUsuarios", "usuariosList");
  setupSearch("searchVagas", "vagasList");
}

function setupSearch(inputId, listId) {
  const input = document.getElementById(inputId);
  if (input) {
    input.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const list = document.getElementById(listId);
      const items = list.querySelectorAll(".item-card");

      items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchTerm) ? "flex" : "none";
      });
    });
  }
}

// Setup tema
function setupThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;

  const savedTheme = localStorage.getItem("theme") || "dark";
  html.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = html.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      html.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.textContent = theme === "dark" ? "🌙" : "☀️";
  }
}

// Fechar modal ao clicar fora
window.addEventListener("click", (e) => {
  const modal = document.getElementById("detailsModal");
  if (e.target === modal) {
    closeModal();
  }
});
