// ========================================
// APLICAÇÃO DE BUSCA DE IMÓVEIS
// Organizado seguindo boas práticas de código
// ========================================

/**
 * Módulo principal da aplicação
 * Encapsula toda a lógica para evitar poluição do namespace global
 */
const ImoveisApp = {
  // Estado da aplicação
  state: {
    carouselPositions: {
      "sao-miguel": 0,
      itaquera: 0,
    },
    propertyData: null,
    touchStartX: 0,
    touchEndX: 0,
  },

  // Configurações
  config: {
    cardGap: 30,
    swipeThreshold: 50,
    carouselSections: [
      { id: "sao-miguel", title: "São Miguel" },
      { id: "itaquera", title: "Itaquera" },
    ],
  },

  // ========================================
  // INICIALIZAÇÃO
  // ========================================

  /**
   * Inicializa a aplicação
   * Ponto de entrada principal
   */
  async init() {
    this.initTheme();
    await this.loadAndRenderData();
    this.setupEventListeners();

    // Aguarda renderização completa antes de inicializar carrosséis
    setTimeout(() => {
      this.initAllCarousels();
      this.setupTouchNavigation();
    }, 100);
  },

  // ========================================
  // GERENCIAMENTO DE TEMA (DARK/LIGHT MODE)
  // ========================================

  /**
   * Inicializa o tema da aplicação
   * Prioridade: 1) Tema salvo, 2) Preferência do sistema
   */
  initTheme() {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const theme = savedTheme || (systemPrefersDark ? "dark" : "light");

    document.documentElement.setAttribute("data-theme", theme);

    // Listener para mudanças na preferência do sistema
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
  },

  /**
   * Alterna entre tema claro e escuro
   */
  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  },

  // ========================================
  // CARREGAMENTO E RENDERIZAÇÃO DE DADOS
  // ========================================

  /**
   * Carrega dados dos imóveis do arquivo JSON
   */
  async loadPropertyData() {
    try {
      const response = await fetch("cardInfo.json");
      const data = await response.json();
      this.state.propertyData = data;
      return data;
    } catch (error) {
      console.error("Erro ao carregar dados dos imóveis:", error);
      return { "sao-miguel": [], itaquera: [] };
    }
  },

  /**
   * Carrega dados e renderiza todos os carrosséis
   */
  async loadAndRenderData() {
    const data = await this.loadPropertyData();
    const container = document.getElementById("mainContainer");

    // Renderiza cada seção de carrossel
    this.config.carouselSections.forEach((section) => {
      const sectionHTML = this.createCarouselSection(section, data[section.id]);
      container.innerHTML += sectionHTML;
    });
  },

  /**
   * Cria HTML de uma seção de carrossel
   */
  createCarouselSection(section, properties) {
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
            ${properties
              .map((property) => this.createPropertyCard(property))
              .join("")}
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Cria HTML de um card de imóvel
   */
  createPropertyCard(property) {
    return `
      <div class="card" data-id="${property.id}">
        <div class="card-image">
          ${
            property.image
              ? `<img src="${property.image}" alt="${property.placeholder}" onerror="this.style.display='none'">`
              : ""
          }
          <span class="card-image-placeholder">${property.placeholder}</span>
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
  },

  // ========================================
  // CONTROLE DOS CARROSSÉIS
  // ========================================

  /**
   * Calcula quantos cards cabem na viewport
   */
  calculateVisibleCards(carousel) {
    const cards = carousel.querySelectorAll(".card");
    if (cards.length === 0) return 1;

    const cardWidth = cards[0].offsetWidth;
    const containerWidth = carousel.parentElement.offsetWidth;
    return Math.floor(containerWidth / (cardWidth + this.config.cardGap));
  },

  /**
   * Calcula posição máxima do carrossel
   */
  calculateMaxPosition(carousel) {
    const cards = carousel.querySelectorAll(".card");
    const visibleCards = this.calculateVisibleCards(carousel);
    return Math.max(0, cards.length - visibleCards);
  },

  /**
   * Move o carrossel na direção especificada
   */
  scrollCarousel(sectionId, direction) {
    const carousel = document.getElementById(sectionId);
    if (!carousel) return;

    const cards = carousel.querySelectorAll(".card");
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth;
    const scrollAmount = cardWidth + this.config.cardGap;
    const maxPosition = this.calculateMaxPosition(carousel);

    // Atualiza posição
    this.state.carouselPositions[sectionId] += direction;
    this.state.carouselPositions[sectionId] = Math.max(
      0,
      Math.min(this.state.carouselPositions[sectionId], maxPosition)
    );

    // Aplica transformação
    const offset = -this.state.carouselPositions[sectionId] * scrollAmount;
    carousel.style.transform = `translateX(${offset}px)`;

    // Atualiza botões
    this.updateNavigationButtons(sectionId, maxPosition);
  },

  /**
   * Atualiza estado dos botões de navegação
   */
  updateNavigationButtons(sectionId, maxPosition) {
    const prevBtn = document.getElementById(`${sectionId}-prev`);
    const nextBtn = document.getElementById(`${sectionId}-next`);

    if (prevBtn)
      prevBtn.disabled = this.state.carouselPositions[sectionId] === 0;
    if (nextBtn)
      nextBtn.disabled =
        this.state.carouselPositions[sectionId] >= maxPosition - 1;
  },

  /**
   * Inicializa todos os carrosséis
   */
  initAllCarousels() {
    this.config.carouselSections.forEach((section) => {
      const carousel = document.getElementById(section.id);
      if (!carousel) return;

      const maxPosition = this.calculateMaxPosition(carousel);
      this.updateNavigationButtons(section.id, maxPosition);
    });
  },

  /**
   * Reseta posição de todos os carrosséis
   */
  resetAllCarousels() {
    this.config.carouselSections.forEach((section) => {
      this.state.carouselPositions[section.id] = 0;
      const carousel = document.getElementById(section.id);
      if (carousel) {
        carousel.style.transform = "translateX(0)";
      }
    });
    this.initAllCarousels();
  },

  // ========================================
  // NAVEGAÇÃO TOUCH (MOBILE)
  // ========================================

  /**
   * Processa gesto de swipe
   */
  handleSwipe(sectionId) {
    const diff = this.state.touchStartX - this.state.touchEndX;

    if (Math.abs(diff) > this.config.swipeThreshold) {
      const direction = diff > 0 ? 1 : -1;
      this.scrollCarousel(sectionId, direction);
    }
  },

  /**
   * Configura navegação por touch/swipe
   */
  setupTouchNavigation() {
    this.config.carouselSections.forEach((section) => {
      const carousel = document.getElementById(section.id);
      if (!carousel) return;

      carousel.addEventListener("touchstart", (e) => {
        this.state.touchStartX = e.changedTouches[0].screenX;
      });

      carousel.addEventListener("touchend", (e) => {
        this.state.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe(section.id);
      });
    });
  },

  // ========================================
  // SISTEMA DE PESQUISA
  // ========================================

  /**
   * Obtém todos os endereços disponíveis para pesquisa
   */
  getAllAddresses() {
    if (!this.state.propertyData) return [];

    const addresses = [];
    this.config.carouselSections.forEach((section) => {
      const properties = this.state.propertyData[section.id] || [];
      properties.forEach((property) => {
        addresses.push({
          id: property.id,
          title: property.address,
          subtitle: section.title + " - SP",
        });
      });
    });
    return addresses;
  },

  /**
   * Filtra endereços baseado na query de pesquisa
   */
  filterAddresses(query) {
    const addresses = this.getAllAddresses();
    return addresses.filter(
      (addr) =>
        addr.title.toLowerCase().includes(query) ||
        addr.subtitle.toLowerCase().includes(query)
    );
  },

  /**
   * Renderiza sugestões de pesquisa
   */
  renderSearchSuggestions(suggestions) {
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
  },

  /**
   * Processa input de pesquisa
   */
  handleSearchInput(query) {
    const trimmedQuery = query.toLowerCase().trim();

    if (trimmedQuery.length < 2) {
      document.getElementById("searchSuggestions").classList.remove("active");
      return;
    }

    const filtered = this.filterAddresses(trimmedQuery);
    this.renderSearchSuggestions(filtered);
  },

  // ========================================
  // NAVEGAÇÃO
  // ========================================

  /**
   * Navega para página de detalhes do imóvel
   */
  goToDetails(propertyId) {
    window.location.href = `detalhes.html?id=${propertyId}`;
  },

  /**
   * Navega para página do mapa
   */
  goToMap() {
    window.location.href = "mapa.html";
  },

  // ========================================
  // EVENT LISTENERS
  // ========================================

  /**
   * Configura todos os event listeners da aplicação
   */
  setupEventListeners() {
    // Botão de tema
    document.getElementById("themeToggle")?.addEventListener("click", () => {
      this.toggleTheme();
    });

    // Botões de navegação do carrossel (usando event delegation)
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("section-nav-btn")) {
        const sectionId = e.target.dataset.section;
        const direction = Number.parseInt(e.target.dataset.direction);
        this.scrollCarousel(sectionId, direction);
      }
    });

    // Cards e botões de detalhes (usando event delegation)
    document.addEventListener("click", (e) => {
      // Clique no endereço ou botão "Ver Detalhes"
      if (
        e.target.classList.contains("card-address") ||
        e.target.classList.contains("card-button")
      ) {
        const propertyId = e.target.dataset.propertyId;
        if (propertyId) this.goToDetails(propertyId);
      }

      // Clique em sugestão de pesquisa
      if (e.target.closest(".suggestion-item")) {
        const propertyId =
          e.target.closest(".suggestion-item").dataset.propertyId;
        if (propertyId) this.goToDetails(propertyId);
      }
    });

    // Campo de pesquisa
    const searchInput = document.getElementById("searchInput");
    searchInput?.addEventListener("input", (e) => {
      this.handleSearchInput(e.target.value);
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

      // Fechar sugestões ao clicar fora
      if (
        searchInput &&
        !searchInput.contains(e.target) &&
        !e.target.closest("#searchSuggestions")
      ) {
        document
          .getElementById("searchSuggestions")
          ?.classList.remove("active");
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
      this.goToMap();
    });

    // Redimensionamento da janela
    window.addEventListener("resize", () => {
      this.resetAllCarousels();
    });
  },
};

// ========================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ========================================

// Inicializa quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  ImoveisApp.init();
});
