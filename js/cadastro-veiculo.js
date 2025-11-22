//Moisés
const mockVeiculos = [
  {
    id: 1,
    modelo: "Porsche 911",
    marca: "Porsche",
    cor: "Preto",
    placa: "ABC-1234",
    ano: "2022",
  },
];

let cadastroAtual = null;
function carregarCadastros() {
  const cadastroId = localStorage.getItem("condominioEditarId") || 1;
  cadastroAtual = mockVeiculos.find((c) => c.id == cadastroId);
}
function validarFormulario() {
  const campos = [
    "modeloVeiculo",
    "marcaVeiculo",
    "corVeiculo",
    "placaVeiculo",
    "anoFabricacao",
  ];

  return campos.every((campo) => {
    const valor = document.getElementById(campo).value.trim();
    return valor !== "";
  });
}
function salvarCadastro() {
  if (!validarFormulario()) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  // Atualizar dados
  cadastroAtual.modelo = document.getElementById("modeloVeiculo").value;
  cadastroAtual.marca = document.getElementById("marcaVeiculo").value;
  cadastroAtual.cor = document.getElementById("corVeiculo").value;
  cadastroAtual.placa = document.getElementById("placaVeiculo").value;
  cadastroAtual.ano = document.getElementById("anoFabricacao").value;

  // Salvar no localStorage para simular persistência
  localStorage.setItem("cadastrousuarios", JSON.stringify(mockVeiculos));

  alert("✅ Cadastro atualizado com sucesso!");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  carregarCadastros();
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

const input = document.getElementById("anoFabricacao");
const calendar = document.getElementById("singleDateCalendar");
const calGrid = document.getElementById("calGrid");
const calMonthYear = document.getElementById("calMonthYear");
const prevBtn = document.getElementById("calPrevMonth");
const nextBtn = document.getElementById("calNextMonth");

let currentDate = new Date();

// Função para renderizar calendário
function renderCalendar(date) {
  calGrid.innerHTML = "";
  const year = date.getFullYear();
  const month = date.getMonth();

  calMonthYear.textContent = `${month + 1}/${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Preenche dias vazios antes do primeiro dia
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    calGrid.appendChild(emptyCell);
  }

  // Preenche dias do mês
  for (let d = 1; d <= daysInMonth; d++) {
    const dayCell = document.createElement("div");
    dayCell.classList.add("calendar-day");
    dayCell.textContent = d;

    const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      d
    ).padStart(2, "0")}`;
    dayCell.dataset.date = fullDate;

    dayCell.addEventListener("click", () => {
      input.value = fullDate;
      calendar.style.display = "none";
    });

    calGrid.appendChild(dayCell);
  }
}

// Navegação entre meses
prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

// Abrir calendário ao focar/clicar
input.addEventListener("focus", () => {
  calendar.style.display = "block";
  renderCalendar(currentDate);
});

input.addEventListener("click", () => {
  calendar.style.display = "block";
  renderCalendar(currentDate);
});

// Fechar ao clicar fora
document.addEventListener("click", (e) => {
  if (!calendar.contains(e.target) && e.target !== input) {
    calendar.style.display = "none";
  }
});
function openAllModals() {
  openModal("modalGrupo");
}

function openModal(id) {
  document.getElementById(id).classList.add("active");
}

function closeModal(id) {
  document.getElementById(id).classList.remove("active");
}
