// Estado global
const profileState = {
  profiles: [],
  currentProfile: null,
  selectedDays: [],
  startDate: null,
  endDate: null,
};

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

// Carregar dados de perfis
async function loadProfiles() {
  try {
    const response = await fetch("profileInfo.json");
    profileState.profiles = await response.json();
    renderProfiles();
  } catch (error) {
    console.error("Erro ao carregar perfis:", error);
  }
}

// Renderizar perfis na grid
function renderProfiles() {
  const grid = document.getElementById("profilesGrid");
  grid.innerHTML = profileState.profiles
    .map((profile) => createProfileCard(profile))
    .join("");
}

function createProfileCard(profile) {
  const initials = profile.nome
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const isAvailable = true;
  const statusClass = isAvailable ? "disponivel" : "ocupado";
  const statusText = isAvailable ? "Disponível" : "Ocupado";

  return `
    <div class="profile-card">
      <!-- Header com avatar e status -->
      <div class="profile-header">
        <div class="profile-avatar-wrapper">
          <img 
            src="${profile.imagemPerfil}" 
            alt="Foto de ${profile.nome}" 
            class="profile-avatar"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
          >
          <div class="profile-avatar-fallback" style="display: none;">
            ${initials}
          </div>
          
          <div class="status-badge ${statusClass}">
            <span class="status-icon"></span>
            ${statusText}
          </div>
        </div>
        
        <h3 class="profile-name">${profile.nome}</h3>
      </div>
      
      <!-- Body com informações -->
      <div class="profile-body">
        <div class="info-item">
          <span class="info-icon">⏰</span>
          <div class="info-content">
            <span class="info-label">Horário</span>
            <span class="info-text">${profile.horario}</span>
          </div>
        </div>
        
        <div class="info-item">
          <span class="info-icon">📅</span>
          <div class="info-content">
            <span class="info-label">Dias Disponíveis</span>
            <div class="days-inline">
              ${profile.dias_disponiveis
                .map((dia) => `<span class="day-tag">${dia}</span>`)
                .join("")}
            </div>
          </div>
        </div>
        
        <div class="info-item">
          <span class="info-icon">📆</span>
          <div class="info-content">
            <span class="info-label">Período</span>
            <span class="info-text">${formatDate(
              profile.disponivel_de
            )} - ${formatDate(profile.disponivel_ate)}</span>
          </div>
        </div>
      </div>
      
      <!-- Footer com botões -->
      <div class="profile-footer">
        <button class="btn-calendar" data-profile-id="${
          profile.id
        }" data-action="calendar">
          📅 Calendário
        </button>

      </div>
    </div>
  `;
}
// <button class="btn-details" data-profile-id="${
//   profile.id
// }" data-action="details">
//   Voltar
// </button>

// Formatar data
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Abrir modal de disponibilidade
function openAvailabilityModal(profileId) {
  const profile = profileState.profiles.find((p) => p.id === profileId);
  if (!profile) return;

  profileState.currentProfile = profile;

  document.getElementById("availabilityPeriod").textContent = `${formatDate(
    profile.disponivel_de
  )} à ${formatDate(profile.disponivel_ate)}`;
  document.getElementById("availabilityHours").textContent = profile.horario;
  document.getElementById("availabilityDays").textContent =
    profile.dias_disponiveis.join(", ");

  document.getElementById("availabilityModal").classList.add("active");
}

// Fechar modal
function closeAvailabilityModal() {
  document.getElementById("availabilityModal").classList.remove("active");
  profileState.currentProfile = null;
}

function openCalendarModal(profileId) {
  const profile = profileState.profiles.find((p) => p.id === profileId);
  if (!profile) return;

  profileState.currentProfile = profile;
  profileState.selectedDays = [];
  profileState.startDate = null;
  profileState.endDate = null;

  generateCalendar(profile);
  document.getElementById("calendarModal").classList.add("active");
}

function generateCalendar(profile) {
  const calendarGrid = document.getElementById("calendarGrid");
  const startDate = new Date(profile.disponivel_de);
  const endDate = new Date(profile.disponivel_ate);

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const availableDays = profile.dias_disponiveis;

  const dayMap = {
    Dom: 0,
    Seg: 1,
    Ter: 2,
    Qua: 3,
    Qui: 4,
    Sex: 5,
    Sáb: 6,
  };
  const availableDayNumbers = availableDays.map((day) => dayMap[day]);

  let html = "";
  const currentMonth = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    1
  );
  const lastMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

  while (currentMonth <= lastMonth) {
    const monthYear = `${
      monthNames[currentMonth.getMonth()]
    } ${currentMonth.getFullYear()}`;
    const firstDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const lastDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );

    html += `<div class="calendar-month">`;
    html += `<div class="calendar-month-header">${monthYear}</div>`;
    html += `<div class="calendar-days-grid">`;

    // Cabeçalho com dias da semana
    weekDays.forEach((day) => {
      html += `<div class="calendar-day-header">${day}</div>`;
    });

    // Dias vazios antes do primeiro dia
    for (let i = 0; i < firstDay.getDay(); i++) {
      html += `<div class="calendar-day unavailable"></div>`;
    }

    // Dias do mês
    const date = new Date(firstDay);
    while (date <= lastDay) {
      const dayOfWeek = date.getDay();
      const isAvailable =
        availableDayNumbers.includes(dayOfWeek) &&
        date >= startDate &&
        date <= endDate;
      const dateStr = date.toISOString().split("T")[0];
      const dayNumber = date.getDate();

      html += `
        <div class="calendar-day ${isAvailable ? "available" : "unavailable"}" 
             data-date="${dateStr}" 
             data-available="${isAvailable}">
          ${dayNumber}
        </div>
      `;

      date.setDate(date.getDate() + 1);
    }

    html += `</div></div>`;
    currentMonth.setMonth(currentMonth.getMonth() + 1);
  }

  calendarGrid.innerHTML = html;
}

function closeCalendarModal(shouldResetState = true) {
  document.getElementById("calendarModal").classList.remove("active");
  if (shouldResetState) {
    console.log("Resetando o estado do calendário.");
    profileState.currentProfile = null;
    profileState.selectedDays = [];
    profileState.startDate = null;
    profileState.endDate = null;
  }
}

function openConfirmationModal() {
  console.log("Tentando abrir o modal de confirmação com os seguintes dados:", {
    profile: profileState.currentProfile,
    startDate: profileState.startDate,
    endDate: profileState.endDate,
  });
  if (
    !profileState.currentProfile ||
    !profileState.startDate ||
    !profileState.endDate
  )
    return;

  const profile = profileState.currentProfile;

  document.getElementById("confirmOwnerName").textContent = profile.nome;
  document.getElementById("confirmPeriod").textContent = `${formatDate(
    profileState.startDate
  )} até ${formatDate(profileState.endDate)}`;
  document.getElementById("confirmHours").textContent = profile.horario;
  document.getElementById("confirmDays").textContent =
    profile.dias_disponiveis.join(", ");

  document.getElementById("confirmationModal").classList.add("active");
}

function closeConfirmationModal() {
  document.getElementById("confirmationModal").classList.remove("active");
}

function selectDateRange(clickedDate) {
  if (!profileState.startDate) {
    // Primeira seleção: data inicial
    profileState.startDate = clickedDate;
    profileState.endDate = null;
    profileState.selectedDays = [clickedDate];
    updateCalendarSelection();
  } else if (!profileState.endDate) {
    // Segunda seleção: data final
    if (new Date(clickedDate) < new Date(profileState.startDate)) {
      // Se a data final for antes da inicial, trocar
      profileState.endDate = profileState.startDate;
      profileState.startDate = clickedDate;
    } else {
      profileState.endDate = clickedDate;
    }
    fillDateRange();
    updateCalendarSelection();

    // Abrir modal de confirmação após 300ms
    setTimeout(() => {
      closeCalendarModal(false); // Não reseta o estado para manter os dados da reserva
      openConfirmationModal();
    }, 300);
  } else {
    // Resetar e começar nova seleção
    profileState.startDate = clickedDate;
    profileState.endDate = null;
    profileState.selectedDays = [clickedDate];
    updateCalendarSelection();
  }
}

function fillDateRange() {
  if (!profileState.startDate || !profileState.endDate) return;

  profileState.selectedDays = [];
  const start = new Date(profileState.startDate);
  const end = new Date(profileState.endDate);
  const current = new Date(start);

  while (current <= end) {
    profileState.selectedDays.push(current.toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }
}

function updateCalendarSelection() {
  document.querySelectorAll(".calendar-day").forEach((day) => {
    day.classList.remove("selected", "in-range");

    if (day.dataset.available === "true") {
      const date = day.dataset.date;

      if (date === profileState.startDate && !profileState.endDate) {
        // Apenas data inicial selecionada
        day.classList.add("selected");
      } else if (profileState.selectedDays.includes(date)) {
        // Intervalo completo selecionado
        if (date === profileState.startDate || date === profileState.endDate) {
          day.classList.add("selected");
        } else {
          day.classList.add("in-range");
        }
      }
    }
  });
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

  // Modal de calendário
  document
    .getElementById("calendarClose")
    ?.addEventListener("click", closeCalendarModal);

  document.getElementById("calendarModal")?.addEventListener("click", (e) => {
    if (e.target.id === "calendarModal") {
      closeCalendarModal();
    }
  });

  document.getElementById("clearSelection")?.addEventListener("click", () => {
    profileState.selectedDays = [];
    profileState.startDate = null;
    profileState.endDate = null;
    updateCalendarSelection();
  });

  document
    .getElementById("cancelConfirmation")
    ?.addEventListener("click", () => {
      closeConfirmationModal();
      openCalendarModal(profileState.currentProfile.id);
    });

  document.getElementById("finalConfirm")?.addEventListener("click", () => {
    if (
      profileState.currentProfile &&
      profileState.startDate &&
      profileState.endDate
    ) {
      // Salvar dados no localStorage para a página de confirmação
      const reservationData = {
        profile: profileState.currentProfile,
        startDate: profileState.startDate,
        endDate: profileState.endDate,
        selectedDays: profileState.selectedDays,
      };
      localStorage.setItem("reservationData", JSON.stringify(reservationData));

      // Redirecionar para página de confirmação
      window.location.href = "confirmacao.html";
    }
  });

  // Delegação de eventos
  document.addEventListener("click", (e) => {
    // Botões de ação nos cards
    const button = e.target.closest(".btn-calendar, .btn-details");
    if (button) {
      const profileId = Number.parseInt(button.dataset.profileId);
      const action = button.dataset.action;

      if (action === "calendar") {
        openCalendarModal(profileId);
      } else if (action === "details") {
        // Redirecionar para página de detalhes (pode ser implementado)
        window.location.href = `detalhes.html?id=${profileId}`;
      }
    }

    const calendarDay = e.target.closest(".calendar-day");
    if (calendarDay && calendarDay.dataset.available === "true") {
      const date = calendarDay.dataset.date;
      selectDateRange(date);
    }
  });
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadProfiles();
  setupEventListeners();
});
