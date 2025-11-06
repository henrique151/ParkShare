// Inicializar tema
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const theme = savedTheme || (systemPrefersDark ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", theme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

// Formatar data
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function loadReservationData() {
  const data = localStorage.getItem("reservationData");

  if (!data) {
    alert("Nenhuma reserva encontrada. Redirecionando...");
    window.location.href = "profile.html";
    return;
  }

  const reservation = JSON.parse(data);

  // Preencher informações do condomínio/proprietário da vaga
  document.getElementById("condominiumName").textContent =
    reservation.profile.nome;
  document.getElementById("rentalHours").textContent =
    reservation.profile.horario;
  document.getElementById("reservedDays").textContent = `${formatDate(
    reservation.startDate
  )} à ${formatDate(reservation.endDate)}`;

  // Informações do usuário externo (dados mockados - podem ser substituídos por dados reais do usuário logado)
  // Você pode pegar esses dados de um sistema de autenticação ou localStorage
  const userData = {
    nome: "Otávio Silva",
    carroModelo: "Porsche 911",
    carroCor: "Preto",
  };

  document.getElementById("userName").textContent = userData.nome;
  document.getElementById("carModel").textContent = userData.carroModelo;
  document.getElementById("carColor").textContent = userData.carroCor;
}

// Event listeners
function setupEventListeners() {
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

  document.addEventListener("click", (e) => {
    if (menuToggle && !menuToggle.contains(e.target)) {
      dropdownMenu?.classList.remove("active");
    }
  });

  document.getElementById("rentButton")?.addEventListener("click", () => {
    const data = localStorage.getItem("reservationData");
    if (data) {
      const reservation = JSON.parse(data);
      const userData = {
        nome: "Otávio Silva",
        carroModelo: "Porsche 911",
        carroCor: "Preto",
      };

      // Extrair horário de início e fim
      const horarioParts = reservation.profile.horario.split(" - ");
      const startTime = horarioParts[0] || "08:00";
      const endTime = horarioParts[1] || "18:00";

      // Criar URL com parâmetros para o chat
      const params = new URLSearchParams({
        userName: userData.nome,
        condominiumName: reservation.profile.nome,
        startDate: formatDate(reservation.startDate),
        endDate: formatDate(reservation.endDate),
        startTime: startTime,
        endTime: endTime,
        carModel: userData.carroModelo,
        carColor: userData.carroCor,
      });

      // Redirecionar para o chat
      window.location.href = `chat.html?${params.toString()}`;
    }
  });
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadReservationData();
  setupEventListeners();
});
