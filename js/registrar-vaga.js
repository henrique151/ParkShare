const mockVagas = [
  {
    id: 1,
    localvaga: "Condomínio Residencial Vida Nova - Av. Paulista, 1000",
    horainicio: "21:30",
    horafim: "23:30",
    datainicio: "25/06/2024",
    datafim: "28/06/2025",
    vaga: "23"
  },
];


let registroAtual = null;
function carregarRegistros() {
  const registroId = localStorage.getItem("condominioEditarId") || 1;
  registroAtual = mockVagas.find((c) => c.id == registroId);
}
function validarFormulario() {
  const campos = [
    "localVaga",
    "datasVagaInicio",
    "datasVagaFim",
    "horaInicio",
    "horaFim",
    "idNumVaga"
  ];

  return campos.every((campo) => {
    const valor = document.getElementById(campo).value.trim();
    return valor !== "";
  });
}
function salvarRegistro() {
  if (!validarFormulario()) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  // Atualizar dados
  // Atualizar dados do edifício
  registroAtual.localvaga = document.getElementById("localVaga").value;
  registroAtual.datainicio = document.getElementById("datasVagaInicio").value;
  registroAtual.datafim = document.getElementById("datasVagaFim").value;
  registroAtual.horainicio = document.getElementById("horaInicio").value;
  registroAtual.horafim = document.getElementById("horaFim").value;
  registroAtual.vaga = document.getElementById("idNumVaga").value;


  localStorage.setItem("registrovagas", JSON.stringify(mockVagas));

  alert("✅ Registro da Vaga atualizado com sucesso!");
  window.location.href = "gerenciar-vaga.html";
}


document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  carregarRegistros();
  setupEventListeners()
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

