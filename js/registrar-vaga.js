// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  setupEventListeners();
  setupCustomInputs();
});

// Theme
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

// Event listeners
function setupEventListeners() {
  const menuToggle = document.getElementById("menuToggle");
  const dropdownMenu = document.getElementById("dropdownMenu");

  menuToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!menuToggle?.contains(e.target)) {
      dropdownMenu?.classList.remove("active");
    }
  });
}

function setupCustomInputs() {
  // Inputs de horário - abrem seletor de hora
  const horaInicio = document.getElementById("horaInicio");
  const horaFim = document.getElementById("horaFim");

  horaInicio?.addEventListener("click", () => abrirSeletorHora("horaInicio"));
  horaFim?.addEventListener("click", () => abrirSeletorHora("horaFim"));

  // Inputs de data - abrem calendário
  const dataInicio = document.getElementById("datasVagaInicio");
  const dataFim = document.getElementById("datasVagaFim");

  dataInicio?.addEventListener("click", () =>
    CriarCalendario("datasVagaInicio")
  );
  dataFim?.addEventListener("click", () => CriarCalendario("datasVagaFim"));
}

function validarFormulario() {
  const campos = [
    "localVaga",
    "pontoReferencia",
    "idNumVaga",
    "horaInicio",
    "horaFim",
    "datasVagaInicio",
    "datasVagaFim",
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

  // Formatar datas para formato brasileiro
  const dataInicio = document.getElementById("datasVagaInicio").value;
  const dataFim = document.getElementById("datasVagaFim").value;

  const formatarData = (data) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  // Criar objeto de vaga
  const vaga = {
    id: 1,
    localvaga: document.getElementById("localVaga").value,
    pontoReferencia: document.getElementById("pontoReferencia").value,
    vaga: document.getElementById("idNumVaga").value,
    horainicio: document.getElementById("horaInicio").value,
    horafim: document.getElementById("horaFim").value,
    datainicio: formatarData(dataInicio),
    datafim: formatarData(dataFim),
  };

  // Salvar no localStorage
  localStorage.setItem("registrovagas", JSON.stringify([vaga]));

  console.log("[v0] Vaga registrada:", vaga);
  alert("✅ Vaga registrada com sucesso!");

  // Redirecionar para o perfil do condômino
  window.location.href = "gerenciar-vaga.html";
}
