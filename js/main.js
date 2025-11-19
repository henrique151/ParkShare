// ========================================
// APLICAÇÃO DE BUSCA DE IMÓVEIS
// ========================================

// Estado da aplicação
const state = {
  carouselPositions: {
    "sao-miguel": 0,
    itaquera: 0,
  },
  propertyData: null,
  touchStartX: 0,
  touchEndX: 0,
};

// Configurações
const config = {
  cardGap: 30,
  swipeThreshold: 50,
  carouselSections: [
    { id: "sao-miguel", title: "São Miguel" },
    { id: "itaquera", title: "Itaquera" },
  ],
};

// ========================================
// GERENCIAMENTO DE TEMA (DARK/LIGHT MODE)
// ========================================

function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const theme = savedTheme || (systemPrefersDark ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", theme);

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        document.documentElement.setAttribute(
          "data-theme",
          e.matches ? "dark" : "light"
        );
      }
    });
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

// ========================================
// CARREGAMENTO E RENDERIZAÇÃO DE DADOS
// ========================================

async function loadPropertyData() {
  try {
    const response = await fetch("cardInfo.json");
    const data = await response.json();
    state.propertyData = data;
    return data;
  } catch (error) {
    console.error("Erro ao carregar dados dos imóveis:", error);
    return { "sao-miguel": [], itaquera: [] };
  }
}

async function loadAndRenderData() {
  const data = await loadPropertyData();
  const container = document.getElementById("mainContainer");

  config.carouselSections.forEach((section) => {
    const sectionHTML = createCarouselSection(section, data[section.id]);
    container.innerHTML += sectionHTML;
  });
}

function createCarouselSection(section, properties) {
  return `
    <div class="section-wrapper">
      <div class="section-header">
        <h2 class="section-title">${section.title}</h2>
        <div class="section-nav">
          <button class="section-nav-btn" data-section="${
            section.id
          }" data-direction="-1" id="${section.id}-prev">‹</button>
          <button class="section-nav-btn" data-section="${
            section.id
          }" data-direction="1" id="${section.id}-next">›</button>
        </div>
      </div>
      <div class="carousel-wrapper">
        <div class="cards-grid" id="${section.id}">
          ${properties.map((property) => createPropertyCard(property)).join("")}
        </div>
      </div>
    </div>
  `;
}

function createPropertyCard(property) {
  return `
    <div class="card" data-id="${property.id}">
      <div class="card-image">
        ${
          property.image
            ? `<img src="${property.image}" alt="${property.address}" onerror="this.style.display='none'">`
            : ""
        }
      </div>
      <div class="card-content">
        <div class="card-address" data-property-id="${property.id}">${
    property.address
  }</div>
        <button class="card-button" data-property-id="${
          property.id
        }">Ver Detalhes</button>
      </div>
    </div>
  `;
}

// ========================================
// CONTROLE DOS CARROSSÉIS
// ========================================

function calculateVisibleCards(carousel) {
  const cards = carousel.querySelectorAll(".card");
  if (cards.length === 0) return 1;

  const cardWidth = cards[0].offsetWidth;
  const containerWidth = carousel.parentElement.offsetWidth;
  return Math.floor(containerWidth / (cardWidth + config.cardGap));
}

function calculateMaxPosition(carousel) {
  const cards = carousel.querySelectorAll(".card");
  const visibleCards = calculateVisibleCards(carousel);
  return Math.max(0, cards.length - visibleCards);
}

function scrollCarousel(sectionId, direction) {
  const carousel = document.getElementById(sectionId);
  if (!carousel) return;

  const cards = carousel.querySelectorAll(".card");
  if (cards.length === 0) return;

  const cardWidth = cards[0].offsetWidth;
  const scrollAmount = cardWidth + config.cardGap;
  const maxPosition = calculateMaxPosition(carousel);

  state.carouselPositions[sectionId] += direction;
  state.carouselPositions[sectionId] = Math.max(
    0,
    Math.min(state.carouselPositions[sectionId], maxPosition)
  );

  const offset = -state.carouselPositions[sectionId] * scrollAmount;
  carousel.style.transform = `translateX(${offset}px)`;

  updateNavigationButtons(sectionId, maxPosition);
}

function updateNavigationButtons(sectionId, maxPosition) {
  const prevBtn = document.getElementById(`${sectionId}-prev`);
  const nextBtn = document.getElementById(`${sectionId}-next`);

  if (prevBtn) prevBtn.disabled = state.carouselPositions[sectionId] === 0;
  if (nextBtn)
    nextBtn.disabled = state.carouselPositions[sectionId] >= maxPosition - 1;
}

function initAllCarousels() {
  config.carouselSections.forEach((section) => {
    const carousel = document.getElementById(section.id);
    if (!carousel) return;

    const maxPosition = calculateMaxPosition(carousel);
    updateNavigationButtons(section.id, maxPosition);
  });
}

function resetAllCarousels() {
  config.carouselSections.forEach((section) => {
    state.carouselPositions[section.id] = 0;
    const carousel = document.getElementById(section.id);
    if (carousel) {
      carousel.style.transform = "translateX(0)";
    }
  });
  initAllCarousels();
}

// ========================================
// NAVEGAÇÃO TOUCH (MOBILE)
// ========================================

function handleSwipe(sectionId) {
  const diff = state.touchStartX - state.touchEndX;

  if (Math.abs(diff) > config.swipeThreshold) {
    const direction = diff > 0 ? 1 : -1;
    scrollCarousel(sectionId, direction);
  }
}

function setupTouchNavigation() {
  config.carouselSections.forEach((section) => {
    const carousel = document.getElementById(section.id);
    if (!carousel) return;

    carousel.addEventListener("touchstart", (e) => {
      state.touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener("touchend", (e) => {
      state.touchEndX = e.changedTouches[0].screenX;
      handleSwipe(section.id);
    });
  });
}

// ========================================
// SISTEMA DE PESQUISA
// ========================================

function getAllAddresses() {
  if (!state.propertyData) return [];

  const addresses = [];
  config.carouselSections.forEach((section) => {
    const properties = state.propertyData[section.id] || [];
    properties.forEach((property) => {
      addresses.push({
        id: property.id,
        title: property.address,
        subtitle: section.title + " - SP",
      });
    });
  });
  return addresses;
}

function filterAddresses(query) {
  const addresses = getAllAddresses();
  return addresses.filter(
    (addr) =>
      addr.title.toLowerCase().includes(query) ||
      addr.subtitle.toLowerCase().includes(query)
  );
}

function renderSearchSuggestions(suggestions) {
  const container = document.getElementById("searchSuggestions");

  if (suggestions.length === 0) {
    container.classList.remove("active");
    return;
  }

  const html = suggestions
    .map(
      (addr) => `
      <div class="suggestion-item" data-property-id="${addr.id}">
        <span class="suggestion-icon">📍</span>
        <div class="suggestion-text">
          <div class="suggestion-title">${addr.title}</div>
          <div class="suggestion-subtitle">${addr.subtitle}</div>
        </div>
      </div>
    `
    )
    .join("");

  container.innerHTML = html;
  container.classList.add("active");
}

function handleSearchInput(query) {
  const trimmedQuery = query.toLowerCase().trim();

  if (trimmedQuery.length < 2) {
    document.getElementById("searchSuggestions").classList.remove("active");
    return;
  }

  const filtered = filterAddresses(trimmedQuery);
  renderSearchSuggestions(filtered);
}

// ========================================
// NAVEGAÇÃO
// ========================================

function goToDetails(propertyId) {
  window.location.href = `detalhes.html?id=${propertyId}`;
}

function goToMap() {
  alert("Mapa");
}

// ========================================
// EVENT LISTENERS
// ========================================

function setupEventListeners() {
  // Botão de tema
  document.getElementById("themeToggle")?.addEventListener("click", () => {
    toggleTheme();
  });

  // Botões de navegação do carrossel
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("section-nav-btn")) {
      const sectionId = e.target.dataset.section;
      const direction = Number.parseInt(e.target.dataset.direction);
      scrollCarousel(sectionId, direction);
    }
  });

  // Cards e botões de detalhes
  document.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("card-address") ||
      e.target.classList.contains("card-button")
    ) {
      const propertyId = e.target.dataset.propertyId;
      if (propertyId) goToDetails(propertyId);
    }

    if (e.target.closest(".suggestion-item")) {
      const propertyId =
        e.target.closest(".suggestion-item").dataset.propertyId;
      if (propertyId) goToDetails(propertyId);
    }
  });

  // Campo de pesquisa
  const searchInput = document.getElementById("searchInput");
  searchInput?.addEventListener("input", (e) => {
    handleSearchInput(e.target.value);
  });

  searchInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      document.getElementById("searchSuggestions").classList.remove("active");
    }
  });

  // Menu dropdown
  const menuToggle = document.getElementById("menuToggle");
  const dropdownMenu = document.getElementById("dropdownMenu");

  menuToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("active");
  });

  // Fechar menu ao clicar fora
  document.addEventListener("click", (e) => {
    if (menuToggle && !menuToggle.contains(e.target)) {
      dropdownMenu?.classList.remove("active");
    }

    if (
      searchInput &&
      !searchInput.contains(e.target) &&
      !e.target.closest("#searchSuggestions")
    ) {
      document.getElementById("searchSuggestions")?.classList.remove("active");
    }
  });

  // Itens do menu
  document.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", () => {
      dropdownMenu?.classList.remove("active");
    });
  });

  // Ícone do mapa
  document.getElementById("mapIcon")?.addEventListener("click", () => {
    goToMap();
  });

  // Redimensionamento da janela
  window.addEventListener("resize", () => {
    resetAllCarousels();
  });
}

// ========================================
// INICIALIZAÇ��O
// ========================================

document.addEventListener("DOMContentLoaded", async () => {
  initTheme();
  await loadAndRenderData();
  setupEventListeners();

  setTimeout(() => {
    initAllCarousels();
    setupTouchNavigation();
  }, 100);
});
